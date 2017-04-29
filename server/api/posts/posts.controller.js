/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /posts              ->  index
 * POST    /posts              ->  create
 * GET     /posts/:id          ->  show
 * PUT     /posts/:id          ->  update
 * DELETE  /posts/:id          ->  destroy
 */

'use strict';

var _     = require('lodash'),
    async = require('async'),
    AWS = require('aws-sdk');

var Posts          = require('./posts.model.js'),
    TagsController = require('../tags/tags.controller'),
    config = require('../../config/environment');

AWS.config = new AWS.Config(config.aws);

exports.uploadCoverImage = function (req, res) {
  return res.status(200).json(req.file);
};

exports.uploadResources = function (req, res) {
  return res.status(200).json(req.files);
};

// Get list of posts
exports.index = function (req, res) {
  Posts.find(function (err, posts) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(posts);
  });
};

// Get a single post
exports.show = function (req, res) {
  Posts.findById(req.params.id, function (err, post) {
    if (err) {
      return handleError(res, err);
    }
    if (!post) {
      return res.status(404).send('Not Found');
    }
    return res.json(post);
  });
};

// Creates a new post in the DB.
exports.create = function (req, res) {
  console.log(req.body);
  req.body.author = req.user._id;
  async.parallel([
    createPost.bind(null, req.body),
    TagsController.insertTags.bind(null, req.body.tags ? req.body.tags : [])
  ], function (err, result) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(result[0]);
  });
  function createPost (post, cb) {
    Posts.create(post, cb);
  }

};

// Updates an existing post in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Posts.findById(req.params.id, function (err, post) {
    if (err) {
      return handleError(res, err);
    }
    if (!post) {
      return res.status(404).send('Not Found');
    }
    var updated = _.merge(post, req.body);

    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(post);
    });
  });
};

// Deletes a post from the DB.
exports.destroy = function (req, res) {
  Posts.findById(req.params.id, function (err, post) {
    if (err) {
      return handleError(res, err);
    }

    if (!post) {
      return res.status(404).send('Not Found');
    }

    post.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};

exports.verifyPermLink = function (req, res) {
  var permalink = req.query.permalink;
  if (!permalink) {
    return res.status(200).send({isValid: false});
  }
  permalink = permalink.toString();
  Posts.findOne({permalink: permalink}, function (err, post) {
    if (err) {
      return handleError(res, err);
    }
    if (!post) {
      return res.status(200).send({isValid: true});
    }
    return res.status(200).send({isValid: false});
  });
};

function handleError (res, err) {
  return res.status(500).send(err);
}

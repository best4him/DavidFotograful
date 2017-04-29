/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /tags              ->  index
 * POST    /tags              ->  create
 * GET     /tags/:id          ->  show
 * PUT     /tags/:id          ->  update
 * DELETE  /tags/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Tags = require('./tags.model.js');

// Get list of things
exports.index = function(req, res) {
  Tags.find(function (err, tags) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(tags);
  });
};

// Get a single thing
exports.show = function(req, res) {
  Tags.findById(req.params.id, function (err, tag) {
    if(err) { return handleError(res, err); }
    if(!tag) { return res.status(404).send('Not Found'); }
    return res.json(tag);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  Tags.create(req.body, function(err, tag) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(tag);
  });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Tags.findById(req.params.id, function (err, tag) {
    if (err) { return handleError(res, err); }
    if(!tag) { return res.status(404).send('Not Found'); }
    var updated = _.merge(tag, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(tag);
    });
  });
};
function insertTags(tags, cb) {
  tags = _.map(tags, function (tag) {
    return {name: tag};
  });
  Tags.collection.insert(tags, {ordered:false}, function() {
    cb();
  });
}
exports.insertTags = insertTags;

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Tags.findById(req.params.id, function (err, tags) {
    if(err) { return handleError(res, err); }
    if(!tags) { return res.status(404).send('Not Found'); }
    tags.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}

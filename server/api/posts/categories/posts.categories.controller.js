/**
 * Created by AncientMachine on 06.07.2016.
 */
var PostsCategories = require('./posts.categories.model.js');

exports.index = function(req, res) {
  PostsCategories.find({}, function (err, categories){
    if (err) {return handleError(res, err)}
    return res.status(200).json(categories);
  })
};
// Get a single post
exports.show = function(req, res) {
  PostsCategories.findById(req.params.id, function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.status(404).send('Not Found'); }
    return res.json(post);
  });
};
// Creates a new post in the DB.
exports.create = function(req, res) {
  PostsCategories.create(req.body, function(err, post) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(post);
  });
};
// Updates an existing post in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  PostsCategories.findById(req.params.id, function (err, post) {
    if (err) { return handleError(res, err); }
    if(!post) { return res.status(404).send('Not Found'); }
    var updated = _.merge(post, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(post);
    });
  });
};

// Deletes a post from the DB.
exports.destroy = function(req, res) {
  PostsCategories.findById(req.params.id, function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.status(404).send('Not Found'); }
    post.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

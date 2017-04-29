'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  dateCreated: {type: Date, default: Date.now},
  path: {type: String, required: true},
  resources: [
    {
      path: {type: String, required: true},
      name: {type: String},
      mimetype: {type:String}
    }
  ]
});

module.exports = mongoose.model('Post', PostSchema);

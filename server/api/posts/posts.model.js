'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    dateCreated: {type: Date, default: Date.now},
    permalink: {type: String, required: true, unique: true},
    title: {type: String, required:true},
    synopsis:{type:String},
    categories: [{type:Schema.Types.ObjectId}],
    tags:[String],
    resources: [
        {
            path: {type: String, required: true},
            name: {type: String},
            mimetype: {type:String}
        }
    ],
    cover: {
      originalName: {type: String},
      path: {type: String},
      pathSmall: {type: String},
      mimetype: {type:String}
    }
});

module.exports = mongoose.model('Post', PostSchema);

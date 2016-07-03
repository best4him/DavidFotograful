'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    dateCreated: {type: Date, default: Date.now},
    permalink: {type: String, required: true},
    title: {type: String, required:true},
    synopsis:{type:String},
    category:{type:String},
    tags:[String],
    resources: [
        {
            path: {type: String, required: true},
            name: {type: String},
            mimetype:{type:String}
        }
    ]
});

module.exports = mongoose.model('Post', PostSchema);

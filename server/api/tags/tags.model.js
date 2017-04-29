'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  name: {type: String, unique: true, required: true}
});

module.exports = mongoose.model('Tags', ThingSchema);

/**
 * Created by AncientMachine on 06.07.2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var model = new Schema({
  name: {type: String, required: true, unique: true}
});
//module.exports = mongoose.model('Post', PostSchema);


module.exports = mongoose.model('Categories', model);

/**
 * Created by AncientMachine on 27.09.2016.
 */
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

module.exports = upload;

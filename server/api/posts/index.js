'use strict';

var express = require('express');
var controller = require('./posts.controller.js');
var auth = require('../../auth/auth.service');

var upload = require('../../components/upload/multer');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/verifyPermalink', auth.hasRole('admin'), controller.verifyPermLink);
router.get('/:id', auth.hasRole('admin'), controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.post('/uploadCoverImage', auth.hasRole('admin'), upload.single('coverImage'), controller.uploadCoverImage);
router.post('/uploadResources', auth.hasRole('admin'), upload.array(),  controller.uploadResources);

module.exports = router;

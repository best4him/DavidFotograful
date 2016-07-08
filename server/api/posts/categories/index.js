/**
 * Created by AncientMachine on 07.07.2016.
 */
'use strict';
var express = require('express'),
    router = express.Router(),
    auth = require('../../../auth/auth.service'),
    controller = require('../categories/posts.categories.controller');



router.get('/', auth.hasRole('admin'), controller.index);
router.get('/:id', auth.hasRole('admin'), controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);


module.exports = router;

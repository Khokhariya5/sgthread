const express = require('express');
const router = express.Router();
const group_controller = require('../controllers/group.controller');


var bodyparser = require('body-parser');
var urlencodedparser = bodyparser.urlencoded({ extended: false });

router.get('/', group_controller.group_get);

router.get('/add',group_controller.group_get);

router.post('/add',group_controller.group_post_add);

module.exports = router

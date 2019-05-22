const express = require('express');
const router = express.Router();
const category_controller = require('../controllers/category.controller');

var bodyparser = require('body-parser');
var urlencodedparser = bodyparser.urlencoded({ extended: false });

router.get('/', category_controller.category_get);

router.post('/add', urlencodedparser,category_controller.cat_post_add);

module.exports = router

const express = require('express');
const router = express.Router();
const product_controller = require('../controllers/product.controller');
const multer = require('multer')
var path = require('path')
var fs = require('fs')

var storage = multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,'assets/admin/1/')
	},
	filename: function(req,file,cb){
		cb(null,Date.now() + file.originalname);
	}
});
var upload = multer({ storage:storage });

var bodyparser = require('body-parser');
var urlencodedparser = bodyparser.urlencoded({ extended: false });

router.get('/', product_controller.product_get_add);

router.get('/shadecard', product_controller.shadecard_get_All);

router.get('/show', product_controller.product_get_showall);

router.post('/add',product_controller.product_post_add);

router.post('/shadecard',product_controller.shadecard_post_add);
module.exports = router

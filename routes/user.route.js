const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user.controller');

var bodyparser = require('body-parser');
var urlencodedparser = bodyparser.urlencoded({ extended: false });

router.get('/', user_controller.home_get);
router.get('/aboutus', user_controller.aboutus);
router.get('/grouplist', user_controller.group_get);
router.get('/productlist', user_controller.products_get);
router.get('/productone', user_controller.products_one_get);
router.get('/contactus', user_controller.contactus_get);
router.get('/branches', user_controller.branches_get);

router.get('/shedcard', user_controller.shedcard_get);

module.exports = router

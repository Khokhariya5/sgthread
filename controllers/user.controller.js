var productmodel = require('../models/product.model')
var groupmodel = require('../models/group.model')
var async = require('async')
var fs = require('fs');

exports.products_one = function (req, res) {
    return res.render('products_one'); 
}

exports.home_get = function (req, res) {
    var resData = {
        msg: '',
        res: 0,
        group:[],
        validation: [],
      }

    async.waterfall([
        function(done){
            groupmodel.find({},(err,groupData) => {
                console.log("DB")
                if(err){    
                }
                
                resData.group = groupData
                
                return res.render('home',resData); 
            });
        },
        function(previousResult,done)
        {
            console.log("bd")
            done(null);
            console.log("d");
        }
    ],function(err){
        if(err){
            throw new Error(err);
        }
        return res.render('home',resData);
    })
    
}


exports.product_get = function (req, res) {
    var resData = {
        msg: '',
        res: 0,
        product:[],
        validation: [],
      }

    async.waterfall([
        function(done){
            var data = String(req.param('p'));
            console.log(data)
            productmodel.find({group : data},(err,groupData) => {
                
                if(err){    
                }
                console.log(groupData)
                resData.product = groupData
                return res.render('products_search',resData); 
            });
        },
        function(previousResult,done)
        {
            console.log("bd")
            done(null);
            console.log("d");
        }
    ],function(err){
        if(err){
            throw new Error(err);
        }
        return res.render('products_search',resData);
    })
    
}

exports.group_get = function (req, res) {

    var resData = {
        msg: '',
        res: 0,
        product:[],
        validation: [],
      }

    async.waterfall([
        function(done){

            groupmodel.find({},(err,groupData) => {
                console.log("DB")
                if(err){    
                }
                
                resData.group = groupData
                
                return res.render('products_groups',resData); 
            });
            
        },
        function(previousResult,done)
        {
            done(null);
        }
    ],function(err){
        if(err){
            throw new Error(err);
        }
        return res.render('products_groups',resData); 
    })
    
}

exports.products_get = function (req, res) {
    
    var resData = {
        msg: '',
        res: 0,
        product:[],
        validation: [],
      }

    async.waterfall([
        function(done){
            var data = String(req.param('q'));
                
            console.log("------------------------------------>"+data)
            productmodel.find({ group: data },(err,productData) => {
                
                if(err){    
                }
                console.log("**************************************")
                resData.product = productData
                console.log(productData)
                return res.render('products_list',resData); 
            });
            
        },
        function(previousResult,done)
        {
            done(null);
        }
    ],function(err){
        if(err){
            throw new Error(err);
        }
        return res.render('products_list',resData);
    })
}

exports.products_one_get = function (req, res) {
    
    var resData = {
        msg: '',
        res: 0,
        product:[],
        validation: [],
      }

    async.waterfall([
        function(done){
            var data = String(req.param('q'));
                
            console.log(">>>>>>>>>>>>"+data)
            productmodel.findById( data ,(err,productData) => {
                
                if(err){    
                }
                console.log("**************************************")
                resData.product = productData
                console.log(productData)
                return res.render('products_one',resData); 
            });
            
        },
        function(previousResult,done)
        {
            done(null);
        }
    ],function(err){
        if(err){
            throw new Error(err);
        }
        return res.render('products_one',resData);
    })
    
}

exports.aboutus = function (req, res) {

    return res.render('aboutus');

}

exports.branches_get = function (req, res) {

    return res.render('branches');

}

exports.shedcard_get = function (req, res) {
    var resData = {
        msg: '',
        res: 0,
        filenames:[],
        validation: [],
      }
    
      async.waterfall([
        function(done){
    
          fs.readdirSync("./assets2/img/shadecard/").forEach(file => {
            console.log(file);
            resData.filenames.push(file);
          });
          return res.render('showshadecard',resData);
        },
        function(previousResult,done)
        {
            done(null);
        }
    ],function(err){
        if(err){
            throw new Error(err);
        }
        return res.render('showshadecard');
    })

}



exports.index = function (req, res) {

    res.sendFile('../views/index.html', {root: __dirname })

}


exports.contactus_get = function (req, res) {

    return res.render('contactus');

}
var fs = require('fs');
const multer = require('multer');
var async = require('async')
var productmodel = require('../models/product.model')
var groupmodel = require('../models/group.model')

exports.product_get_add = function (req, res) {

    var resData = {
      msg: '',
      res: 0,
      group:[],
      validation: [],
    }

    async.waterfall([
      function(done){

        groupmodel.find({},(err,groupData) => {
          
          if(err){    
          }
          
          resData.group = groupData
          res.render('product_add',resData);

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
      return res.render('product_add');
  })

};

exports.product_get_showall = function (req, res) {
  console.log(req);
  var resData = {
    msg: '',
    res: 0,
    group:[],
    validation: [],
  }

  console.log("asdsdasdasadasdasdas")
  async.waterfall([
    function(done){
      console.log("asdsds")
      groupmodel.find({},(err,groupData) => {
        
        if(err){    
        }
        
        resData.group = groupData
        console.log(resData)
        return res.render('product_show',resData);
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
    return res.render('product_show',resData);
})
  

};

exports.product_post_add = function (req, res) {
  
  async.waterfall([
    function(done){
      var filenames = [];
      var flag_validation = 1;
      var resData = {
        msg: "",
        res: 0,
        validation: [],
      }

      var storage =   multer.diskStorage({  
        destination: function (req, file, callback) {  
          callback(null, './assets/admin/');  
        },  
        filename: function (req, file, callback) {  
          var nowDate = new Date();
          var preFix = nowDate.getDate() + "_" + nowDate.getMonth()  + "_" + nowDate.getFullYear()  + "_" + nowDate.getHours() + "_"  + nowDate.getMinutes()  + "_" + nowDate.getSeconds() + "_"  + nowDate.getMilliseconds();
          var upload_filename = preFix+file.originalname;
          filenames.push(upload_filename)
          
          callback(null, upload_filename);  
        }  
      });  

      var upload = multer({ storage : storage}).array('img1');  
      
      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          
          resData.msg = "File can't be upload !";
          resData.res = -21;
          //res.end(JSON.stringify(resData));
          res.render('product_add',resData);
        } else {  
          
          const {req_title,req_price,req_unit,req_qty,req_group,myTextarea} = req.body;
          
          if(!req_title){
            flag_validation = 0;
            resData.validation.push('req_title');
          }
          if(!req_price){
            flag_validation = 0;
            resData.validation.push('req_price');
          }
          if(!req_unit){
            flag_validation = 0;
            resData.validation.push('req_unit');
          }
          if(!req_qty){
            flag_validation = 0;
            resData.validation.push('req_qty');
          }
          if(!req_group){
            flag_validation = 0;
            resData.validation.push('req_group');
          }
          if(!myTextarea){
            flag_validation = 0;
            resData.validation.push('myTextarea');
          }
          

          if(flag_validation == 1){
            var product = new productmodel({
              title: req_title,
              price: req_price,
              unit: req_unit,
              min_qty: req_qty,
              group: req_group,
              desc: escape(myTextarea),
              image:filenames
            });

            product.save(function (err) {
                              
              if (err)
              {
                console.log(err)
                resData.res = -1;
                resData.msg = "Data can't be save !";
                //res.end(JSON.stringify(resData));
                res.render('product_add',resData);
              }
              else
              {
                resData.res = 1;
                resData.msg = "Data save successfully !";
                //res.end(JSON.stringify(resData));
                res.render('product_add',resData);
              }

            });
          
          }
          else
          {
            resData.res = -11;
            resData.msg = 'Fill Required Data !';
            //res.end(JSON.stringify(resData));
            res.render('product_add',resData);
          }
        }
      })
  
    },
    function(previousResult,done)
    {
        done(null);

    }
    ],function(err){
        if(err){
            throw new Error(err);
            return res.send("404");
          }
        return res.send("504");
    })
  
};

exports.shadecard_post_add = function (req, res) {
  
  async.waterfall([
    function(done){
      var filenames = [];
      var flag_validation = 1;
      var resData = {
        msg: "",
        res: 0,
        filenames:[],
        validation: [],
      }

      var storage =   multer.diskStorage({  
        destination: function (req, file, callback) {  
          callback(null, './assets2/img/shadecard/');  
        },  
        filename: function (req, file, callback) {  
          var nowDate = new Date();
          var preFix = nowDate.getDate() + "_" + nowDate.getMonth()  + "_" + nowDate.getFullYear()  + "_" + nowDate.getHours() + "_"  + nowDate.getMinutes()  + "_" + nowDate.getSeconds() + "_"  + nowDate.getMilliseconds();
          var upload_filename = preFix+file.originalname;
          filenames.push(upload_filename)
          
          callback(null, upload_filename);  
        }  
      });  

      var upload = multer({ storage : storage}).array('img1');  
      
      upload(req, res, function (err) {
        fs.readdirSync("./assets2/img/shadecard/").forEach(file => {
          console.log(file);
          resData.filenames.push(file);
        });
        if (err instanceof multer.MulterError) {
          
          resData.msg = "File can't be upload !";
          resData.res = -21;
          //res.end(JSON.stringify(resData));
          res.render('shadecard',resData);
        } else {  
          resData.msg = "File uploaded successfully !";
          resData.res = 1;
          res.render('shadecard',resData);
        }
      })
  
    },
    function(previousResult,done)
    {
        done(null);

    }
    ],function(err){
        if(err){
            throw new Error(err);
            return res.send("404");
          }
        return res.send("504");
    })
  
};

exports.shadecard_get_All = function (req, res) {

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
      return res.render('shadecard',resData);
    },
    function(previousResult,done)
    {
        done(null);
    }
],function(err){
    if(err){
        throw new Error(err);
    }
    return res.render('shadecard');
})

};
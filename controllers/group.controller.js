const groupmodel = require('../models/group.model');
var fs = require('fs');
const multer = require('multer');
const async = require('async');
exports.group_get = function (req, res) {

    var resData = {}

    async.waterfall([
        function(done){
            groupmodel.find({},(err,groupData) => {
                console.log("DB")
                if(err){    
                }
                
                resData = groupData
                return res.render('group',{"group": resData}) 
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
        return res.render('group');
    })

};

exports.group_post_add = function (req, res) {
    async.waterfall([
        function(done){
            
            var filenames = [];
            var flag_validation = 1;
            var resData = {
                msg: "",
                res: 0,
                group:[],
                validation: [],
            }

            groupmodel.find({},(err,groupData) => {
           
            if(err){    
            }           
                resData.group = groupData
               
            });
    
          var storage =   multer.diskStorage({  
            destination: function (req, file, callback) {  
              callback(null, './assets2/img/group/');  
            }, 
            filename: function (req, file, callback) {  
              var nowDate = new Date();
              var preFix = nowDate.getDate() + "_" + nowDate.getMonth()  + "_" + nowDate.getFullYear()  + "_" + nowDate.getHours() + "_"  + nowDate.getMinutes()  + "_" + nowDate.getSeconds() + "_"  + nowDate.getMilliseconds();
              var upload_filename = (String) (preFix+file.originalname);
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
              return res.render('group',resData);
            } else {  
              
                const {req_name} = req.body;
                console.log(req_name)
                if(!req_name){
                    flag_validation = 0;
                    resData.validation.push('req_name');
                }
              
                if(flag_validation == 1){
                    var _group = new groupmodel({
                        groupname: req_name,
                        image: filenames[0]
                    });
    
                    _group.save(function (err) {
                                    
                    if (err)
                    {
                        console.log(err)
                        resData.res = -1;
                        resData.msg = "Data can't be save !";
                        //res.end(JSON.stringify(resData));
                        return res.render('group',resData);
                    }
                    else
                    {
                        resData.res = 1;
                        resData.msg = "Data save successfully !";
                        //res.end(JSON.stringify(resData));
                        return res.render('group',resData);
                    }

                    });
              
                }
                else
                {
                    resData.res = -11;
                    resData.msg = 'Fill Required Data !';
                    //res.end(JSON.stringify(resData));
                    return res.render('group',resData);
                }
            }
        })
      
        },
        function(previousResult,done)
        {
            done(null);
    
        }
    ],function(err){        
        return res.send("504");
    })
};

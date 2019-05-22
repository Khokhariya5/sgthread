var categorymodel = require('../models/category.model');
var async = require('async');

exports.category_get = function (req, res) {
    var resData = {
        msg: '',
        res: 0,
        cat: [],
        validation: [],
      }
    console.log('1.---->'+req.query.msg);
    console.log('2.---->'+req.query.res);
    console.log('3.---->'+req.query.valid);
    
    async.waterfall([
        function(done){
            categorymodel.find({},(err,catData) => {
                if(err){    
                }
                
                resData.cat = catData
                return res.render('category',resData) 
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
        return res.render('category',resData);
    })
}

exports.cat_post_add = function (req, res) {

    var resData = {
        res: 0,
        msg: "",
        cat: [],
        validation:[]
    }

    async.waterfall([
        function(done){
                
            const { cname,group } = req.body;

            if(cname && group)
            {
                var cat = new categorymodel({
                    category: cname,
                    groupnames: group
                });

                cat.save(function (err) {
                
                    if (err)
                    {
                        resData.res = -1;
                        resData.msg = "Category Not Saved Success !";
                    }
                    
                    resData.msg = "Category Saved Success !";
                    resData.res = 1;    
                    console.log(resData.msg);
                    res.redirect("/cat?msg="+resData.msg+'&res='+resData.res+'&v='+resData.validation); 
                });
            }
            else
            {
                if(!cname)
                {
                    resData.validation.push("cname");
                }
                if(!group)
                {
                    resData.validation.push("group");
                }
                resData.res = -11;
                resData.msg = "All Field are required !";
                res.redirect("/cat?msg="+resData.msg+'&res='+resData.res+'&v='+resData.validation);
            }   
        },
        function(previousResult,done)
        {
           done(null);
        }
    ],function(err){
        if(err){
            throw new Error(err);
        }
        return res.redirect('/cat');
    });
};

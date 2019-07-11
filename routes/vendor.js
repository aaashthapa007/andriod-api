const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const Vendor = require('../models/vendor');
const User = require('../models/register');
const router = express.Router();
const auth = require ('../middleware/Auth');

//to insert data into the table
//     router.post('/vendor/:id',auth,function(req,res, next){
//     console.log(req.body);

//     // var venData = new Vendor({...req.body,  userId : req.user._id});
//     var venData = new Vendor({...req.body, userid: req.params.id});
//     venData.save().then(function(venData){
//     res.send("Vendor succesfully add");
//     })
//     .catch(function()
//     {
//         console.log("something is wrong")
//     });
// });
router.post('/vendor/:id',function(req,res, next){
    User.findOne({
        _id:req.body._id
    },function(err,user){
        if(err){
            res.json("asdsd");
        }
        else if(!user){
            res.json("user not");
        }
        else if(user){
            if(user._id==req.body.user){
                var vendor =new Vendor();
                vendor.UserId=req.body.UserId,
                vendor.fullname = req.body.fullname,
                vendor.company=req.body.company;
                vendor.address=req.body.address;
                vendor.phonenumber=req.body.phonenumber;
                
                vendor.save((err,doc)=>{
                    if(err){
                        console.log("error");
                    }
                    else{
                        res.json('doc');
                        console.log(doc);
                    }
                });
            }
        }
    })
 
 })

///to update vendor details
    router.put('/vendor/:id', auth,function (req, res) {   
        vid = req.params.id.toString();
        console.log(vid);
        console.log(req.body);
        Vendor.findByIdAndUpdate( vid,req.body,{new: true}, (err,vendor) => {
            if(err) {
                console.log("error");
            }
            res.send("Updated");
            });
    });

    router.delete('/vendor/:id',auth, function (req, res) {   //delete product
        vid = req.params.id.toString();
        
        Vendor.findByIdAndDelete(vid).then(function(req,res){
            res.send('Vendor is deleted');
        }).catch(function(e){
            res.send(e);
        })
    });

    router.get('/vendor/:id',auth, function (req, res) {   //get data in dashboard
        console.log(req.params.id)
        Vendor.findById(req.params.id).then(function (vendor) {
            console.log(vendor);
            res.send(vendor);
        }).catch(function (e) {
            res.send(e)
        });
    });

    router.get('/getvendors/:id',auth, function (req, res) {   //get data in dashboard
    console.log(req.params.id);
        Vendor.find({inventoryid: req.params.id}).then(function (vendors) {
           
            res.send({vendors : vendors});
        }).catch(function (e) {
            res.send(e)
        });
    });

    module.exports = router;
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const multer = require('multer');
const path = require('path');
const Product = require('../models/Product')
const User = require('../models/register')
const router = express.Router();
const auth = require ('../middleware/Auth')

var storage = multer.diskStorage({
    destination: "images",
    filename: function(req, file, callback){
        const ext = path.extname(file.originalname);
        callback(null,"ashish" + Date.now() + ext);
    }
});
var imagefileFilter = (req,file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) { return cb(newError("You can upload only images files!"), false);}
    cb(null, true);
};

var upload =multer({
    storage: storage,
    fileFilter: imagefileFilter,
    limits: {
        fileSize: 1000000
    }

});


router.post('/uploadimage',upload.single('imageName'),(req,res)=>{
    console.log(req.file);
    res.json(req.file.filename);
})



// to get value inserted in products
// router.post('/product, auth,upload.single("imageName"),function(req,res, next){
   
    router.post('/product',function(req,res, next){
        var proData = new Product(req.body);
        proData.save().then(function(proData){
        res.json("Product add");
        })
        .catch(function()
        {console.log("something is wrong")})
  
})
router.post('/products/:id',upload.single("imageName"),function(req,res, next){
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
               var product =new Product();
               product.UserId=req.body.UserId,
               product.image = req.file.filename,
               product.pname=req.body.pname;
               product.ptype=req.body.ptype;
               product.psize=req.body.psize;
               product.quantity=req.body.quantity;
               product.price=req.body.price;
               product.save((err,doc)=>{
                   if(err){
                       console.log("error");
                   }
                   else{
                       res.json('Success');
                       console.log(doc);
                   }
               });
           }
       }
   })

})

router.put('/product/:id', upload.single("imageName"),function (req, res) {   //update product
    pid = req.params.id.toString(); 
    console.log(pid);
    console.log(req.body);
 

    Product.findByIdAndUpdate( pid,{...req.body},{new: true}, (err,product) => {
       
        res.send("Updated");
        }).catch(function(e){
            res.send(e);
            console.log(e);
        });
});

router.delete('/productdelete/:id', auth,function (req, res) {   //delete product
    pid = req.params.id.toString();
    console.log(pid);
    console.log(req.body);
    Product.findByIdAndDelete(pid).then(function(req,res){
        res.send('Product is deleted');
    }).catch(function(e){
        res.send(e);
    })
});

///for displaying the datas


// router.get('/product', function (req, res) {   //get data in dashboard
//     Product.find().then(function (product) {
//         res.send(product);
//     }).catch(function (e) {
//         res.send(e)
//     });
// });


router.get('/getproduct', function (req, res) {   //get data in dashboard
    // userId = req.params.id;
    Product.find().then(docs=> {
        res.json( docs);
    }).catch(function (e) {
        res.send(e)
    });
});

router.get('/product/:id',auth, function (req, res) {   //get data in dashboard
    console.log(req.params.id)

    Product.findById({_id : req.params.id}).then(function (product) {
        
        res.send({product: product});
    }).catch(function (e) {
        res.send(e)
    });
});


// router.get('/showproduct', async function(req,res){     //to check the product of the logged in user 
//     const show = await Product.find({userId: user._id})
//     res.send(show)
// })



module.exports = router;
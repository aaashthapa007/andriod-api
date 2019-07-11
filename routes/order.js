const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const Order = require('../models/order');
const Product = require('../models/Product');
const Vendor = require('../models/vendor');
const router = express.Router();
const auth = require ('../middleware/Auth');


//to insert data into the table
router.post('/order',auth,function(req,res, next){
    console.log(req.body);

    // var orderData = new Order({...req.body});
    // orderData.save().then(function(orderData){
    // res.send("Order succesfully added");
    // })
    // .catch(function()
    // {console.log("something is wrong")});

    var orderData = new Order({...req.body});
    orderData.save().then(function(orderData){
    res.send("Order succesfully added");
    Product.findById({_id:req.body.product}).then(function(data){
        var quantity = data.quantity-req.body.quantity;
        Product.findByIdAndUpdate( data._id,{quantity:quantity},{new: true}, (err,product) => {
            if(err) {
                console.log("error");
            }
            console.log("updated");
            });
    })
    
   
    })
    .catch(function()
    {console.log("something is wrong")});
});

///to update vendor details
    router.put('/order/:id',auth, function (req, res) {   
        oid = req.params.id.toString();
        console.log(oid);
        console.log(req.body);
        Order.findByIdAndUpdate( oid,req.body,{new: true}, (err,order) => {
            if(err) {
                console.log("error");
            }
            console.log("updated");
            });
    });

    router.delete('/order/:id', auth,function (req, res) {   //delete product
        oid = req.params.id.toString();
        console.log(oid);
        console.log(req.body);
        Order.findById(oid).populate('product').then(function(order){
            var orderquantity = order.quantity;
            Product.findById(order.product._id).then(function(product){
                var recoverquantity = parseFloat(product.quantity) + parseFloat(orderquantity);

                Product.findByIdAndUpdate( product._id,{quantity:recoverquantity}).then(function(){
                    Order.findByIdAndDelete(oid).then(function(req,res){
                        res.send('Order is deleted');
                    }).catch(function(e){
                        res.send(e);
                    })
                });
            });
        });
    
    });

    router.get('/order/:id',auth, function (req, res) {   //get data in dashboard
        console.log(req.params.id)
        Order.findById(req.params.id).then(function (order) {
            console.log(order);
            res.send(order);
        }).catch(function (e) {
            res.send(e)
        });
    });

    router.get('/getproductvendor/:id',auth, function (req, res) {   //get data in dashboard
        inventId = req.params.id.toString();

    Product.find({inventoryid : inventId}).then(function (products) {
        Vendor.find({inventoryid: req.params.id}).then(function (vendors) {
           
            res.send({
                products: products,
                vendors : vendors
            });

        }).catch(function (e) {
            res.send(e)
        });
    }).catch(function (e) {
        res.send(e)
    });
    });

    
    router.get('/order/',auth, function (req, res) {   //get data in dashboard
        console.log(req.params.id)
        Order.find().populate('product').populate('vendor').then(function (order) {
         
            res.send(order);
        }).catch(function (e) {
            res.send(e)
        });
    });
    

    router.get('/count/:id',function(req, res){

        Product.find({inventoryid : req.params.id}).count().then(function(pcount){
            Vendor.find({inventoryid : req.params.id}).count().then(function(vcount){
                res.send({
                    pcount : pcount,
                    vcount : vcount
                });

                
            });
        });
       
           

            
    });

    module.exports = router;
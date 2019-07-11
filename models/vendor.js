const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;



const vendorSchema = new mongoose.Schema( {
    userid: {
        type: Schema.ObjectId,
        ref: 'User'
     },
    fullname: {
        type: String
    },
    company: {
        type: String
    },
    address: {
        type: String
    },
    phonenumber: {
        type: String
    }
   
})

let vendor = mongoose.model('Vendor', vendorSchema);
 module.exports = vendor


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    userid: {
        type: Schema.ObjectId,
        ref: 'User'
     },
    pname: {
        type: String
    },
    ptype: {
        type : String
    },
    psize: {
        type: String
    }, 
    price: {
        type: String
    }, 
    quantity: {
        type: String
    },
    image: {
        type: String
    }
    

})
let Product = mongoose.model('Product', productSchema);
module.exports = Product;

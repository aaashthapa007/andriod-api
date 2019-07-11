const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    vendor: {
       type: Schema.Types.ObjectId,
       ref: 'Vendor'
    },
    product: {
       type: Schema.Types.ObjectId,
       ref: 'Product' 
    },
    quantity: {
        type: String
    },
    price: {
        type: String
    },
   credit: {
       type: String
   },
   date: {
    type: Date
   }

})

let order = mongoose.model('Order', orderSchema);
 module.exports = order;
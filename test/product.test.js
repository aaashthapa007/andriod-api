// const Product = require('../models/Product')
// const mongoose = require('mongoose');

// const url = 'mongodb://localhost:27017/inventory_test';  
// beforeAll(async () => { 
//         await mongoose.connect(url, {   
//             useNewUrlParser: true,  
//             useCreateIndex: true    
//         });
// });

// afterAll(async () => { 
 
//     await mongoose.connection.close(); 
// }); 
 

// describe('Product Schema test', () => { 
//     // the code below is for insert testing     
//     it('Add product', () => {  
//                const product = {          
//                       'pname': 'shirt',   
//                       'ptype': 'male'      
//            };

//            return Product.create(product)
//                         .then((products) => {      
//                            expect(products.pname).toEqual('shirt'); 
//                                     });    
//                          });
//     // the code below is for delete testing   
//     //   it(' delete product ', async () => {    
//     //            const status = await Product.deleteMany();  
//     //                   expect(status.ok).toBe(1); }); 
    
//                       it('update test', async () => { 
 
//                         return Product.findOneAndUpdate({_id :Object('5d246666e350fb3a384bb799')},
//                          {$set : {pname:'shirt'}})    
//                           .then((pp)=>{     
//                                   expect(pp.pname).toEqual('pant')    
//                                  })    
//                                 }); 
                     
//                          })

const Product = require('../models/Product')
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/testdatabase';
beforeAll(async () => {
   await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true
   });
});
afterAll(async () => {
   await mongoose.connection.close();
});

describe('Product added product testing testing', () => {
   var id='';
   // adding register
   it('Product register testing', () => {
      const product = {
        pname: 'Shirt',
         ptype: 'Male',
         psize: 'large',
         price: '1000',
         quantity: '10',
         image: 'anything.jpg'
      };

      return Product.create(product)
         .then((product_res) => {
            id=product_res._id;
            expect(product_res.productpname).toEqual('Shirt');
         });
   });

   //update user
   it('updateproduct testing', () => {
     
      const productup = {
         
         pname: 'shirt'
      }
      console.log(id)
      return Product.findByIdAndUpdate(id,productup,{ new: true })
         .then((productupd) => {
            expect(productupd.pname).toEqual('shirt');
         });
   });

    //user delete testing
      it('testing product delete', async () => {
         const status = await Product.deleteMany({producttype:'Product'});
         expect(status.ok).toBe(1);
      });
    
   });

      

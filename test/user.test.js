const user = require('../models/register');
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

describe('user testing testing', () => {
   var id='';
   // adding register
   it('User register testing', () => {
      const user = {
         username: 'Ashish',
         email: 'ashish@gmail.com',
         password: 'ashish',
         age: '22',
         Address: 'Bhaktapur',
         
      };

      return user.create(user)
         .then((user_res) => {
            id=user_res._id;
            expect(user_res.userusername).toEqual('Ashish');
         });
   });

   //update user
   it('updateuser testing', () => {
     
      const userup = {
         
         username: 'ashish'
      }
      console.log(id)
      return user.findByIdAndUpdate(id,userup,{ new: true })
         .then((userupd) => {
            expect(userupd.username).toEqual('Ashish');
         });
   });

    //user delete testing
      it('testing user delete', async () => {
         const status = await user.deleteMany({usertype:'User'});
         expect(status.ok).toBe(1);
      });
    
   });

      

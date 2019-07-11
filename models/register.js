const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const user = new mongoose.model('User',{
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: String
    },
    address: {
        type: String
    }
    
    // tokens:[{
    //     token: {
    //         type: String,
    // //         required : true
    //     }
    // }]
})


// userSchema.statics.myFirst = function(email,pass){
//     // console.log("this is my first function")
//     if(email=="" && pass ==""){
//     console.log("successfully registered")
//     }
//     else{
//         console.log("invalid")
//     }
//     }
//     userSchema.statics.checkCrediantialsDb = async (user22, pass) =>{
//     const user1 = await User.findOne({email : user22, password : pass})
    
//     //const user1 = "fdafdafafasfas"
//      //console.log(user22)
//        return user1; 
       
//     }
 module.exports = user
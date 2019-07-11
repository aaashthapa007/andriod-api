const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
// const User = mongoose.model('User',{
    
// })
const userSchema = new mongoose.Schema({
 
    email: {
        type: String
    },
    password: {
        type: String
    },
    tokens:[{
        token: {
            type: String,
            required : true
        }
    }]
})


userSchema.statics.myFirst = function(email,pass){
// console.log("this is my first function")
if(email=="" && pass ==""){
console.log("welcome")
}
else{
    console.log("invalid")
}
}
userSchema.statics.checkCrediantialsDb = async (user22, pass) =>{
const user1 = await User.findOne({email : user22, password : pass})

//const user1 = "fdafdafafasfas"
 //console.log(user22)
   return user1; 
  
}
userSchema.methods.generateAuthToken = async function(){
    const user = this
const token = jwt.sign({ _id:user._id.toString()}, 'thisismynewcourse')

console.log(token);
    user.tokens = user.tokens.concat({ token: token})
    await user.save()
    
    return token
}



const User = mongoose.model('users', userSchema)
module.exports = User
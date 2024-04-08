const mongoose = require("mongoose");
const InstructorRegisterSchema = new mongoose.Schema({
     
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
       required:true
    }, 
      contact:{
        type:Number,
       
    }, 
    password:{
        type:String,
        default:12345
        
    } ,

otp:{
  type:String
}, 
  

tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
    verifytoken:{
        type: String,
    }
});


module.exports = mongoose.model('InstructorRegister',InstructorRegisterSchema);
 
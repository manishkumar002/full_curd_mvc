const mongoose = require("mongoose");
const StoreSchema = new mongoose.Schema({
      
      id: {
        type: String,
        required: true,
      },
      
      logo: {
        type: String,
        required: true,
      },
      business_email: {
        type: String,
        required: true,
      },
     address: {
        type: String,
        required: true,
      },
     pin:{
        type: String,
        required: true,
     },
     location:{
        type: {type:String,require:true},
       coordinates:[]
     }
}); 
StoreSchema.index({location:"2dsphere"});
module.exports = mongoose.model('Store',StoreSchema);
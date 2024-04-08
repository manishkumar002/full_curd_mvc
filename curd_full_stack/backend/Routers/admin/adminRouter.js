   
const express=require("express");
const Router=express.Router();
const { 
    createCategory,
   putCategory,
   getCategory,
    deleteCategory,
    getSingleCategory,
    loginInstrucor,
  createInstructor,
  Updatepassword, 
 resetpassword, 
 Fargetpassword,
 changepassword,
 sendOtp,
 submitOtp,

 }=require('../../controllers/admin/AdminController') 
const img_upload=require('../../multer/admin/fileupload')
 
 const {requireSignIn}=require('../../middlewares/authMiddleware')
  
Router.route('/content/:_id').put(img_upload.single('img'),requireSignIn,putCategory);
Router.route('/content/:_id').delete(requireSignIn,deleteCategory); 
Router.route('/content/:_id').get(requireSignIn,getSingleCategory); 
Router.route('/content').post(img_upload.single('img'),createCategory);
Router.get('/content',requireSignIn,getCategory)


Router.route('/instructorlogin').post(loginInstrucor);
Router.route('/instructor').post(createInstructor);
Router.route('/updatepass').post(Updatepassword); 
Router.route('/reset').post(resetpassword); 
Router.route('/forgotpassword/:id/:token').get(Fargetpassword); 
Router.route('/:id/:token').post(changepassword); 
Router.route('/sendotp').post(sendOtp); 
Router.route('/submitotp').post(submitOtp); 

 
module.exports=Router; 
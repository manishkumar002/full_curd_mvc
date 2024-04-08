const InstructorRegisterSchema=require('../../models/admin/InstructorModel') 
const ContentSchema=require('../../models/admin/content') 
 const jwt=require('jsonwebtoken')
 const nodemailer = require("nodemailer")


const loginInstrucor=async(req,resp,next)=>{
  try { 
    const email = req.body.email;
    const password = req.body.password;
    const usermail = await InstructorRegisterSchema.findOne({
      email: email,
      password: password,
    });
    if (usermail) {
      let token=await jwt.sign({username:usermail.email},process.env.JWT_SECRET,{expiresIn:'1h'})
      resp.status(200).json({
        code: 200,
        message: "user Login successfully",
        data: {
          _id: usermail._id,
          name: usermail.name,
          email: usermail.email,
          token: token,
        },
        error: false,
        status: true,
      });
      console.log(usermail._id);
    } else {
      resp.status(404).json({
        code: 404,
        message: "Invalid User details, Try Again.  ",
        data: [],
        error: false,
        status: false,
      });
    }
    } catch (err) {
      console.log(err);
    }
} 
 
const createInstructor=async(req,resp)=>{
  try { 
          const { name,email,contact,password}=req.body
     const usermail = await InstructorRegisterSchema.findOne({ email: email });
     console.log(usermail);
     if (usermail) {
       resp.status(404).json({
         code: 404,
         message: "user aleready exist....  ",
         data: [],
         error: false,
         status: false,
       });
     } else {
       let data = new InstructorRegisterSchema({ name,email,contact,password}); 
       await data.save(); 
       resp.status(200).json({
         code: 200,
         message: "user  Register successfully",
 
         error: false,
         status: true,
       });
     }
   } catch (err) {
     console.log(err);
   }
}



const Updatepassword = async (req, res) => {
  try {
    const { email, oldpass, newpass, cpass } = req.body;
    if (newpass === cpass) {
      const user = await InstructorRegisterSchema.findOne({
        email: email,
        password: oldpass,
      });

      if (user) {
        await InstructorRegisterSchema.updateOne(
          { email: email },
          { $set: { password: newpass } }
        );
        res.send("Password updated successfully!");
      } else {
        res.send("Invalid details");
      }
    } else {
      res.send("Your new password does not match with confirm password.");
    }
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).send("Internal Server Error");
  }
};






const createCategory= async(req,resp)=>{
  try { 
  
  let {fname,lname,contact,email,location}=req.body   
  const img=req.file.filename  
       let data = new ContentSchema( {fname,lname,contact,email,img,location}); 
         await data.save(); 
       resp.status(200).json({
         code: 200,
         message: "Content added successfully", 
         error: false,
         status: true,
       });
    
   } catch (err) {
     console.log(err);
   }
}

const putCategory=async(req,res)=>{
  try {

    let {fname,lname,contact,email,location}=req.body   
    const img=req.file.filename

     let data = await ContentSchema.updateOne(
     {_id: req.params._id},
      { $set:  {fname,lname,contact,email,img,location}} 
  );
       res.send(data); 
   } catch (err) {
       console.log(err)
   }
 
}
const getCategory=async(req,res)=>{

  let data = await ContentSchema.find( );

  res.send(data);
}
 
const getSingleCategory=async(req,res)=>{

  let data = await ContentSchema.find({_id:req.params._id});

  res.send(data);
}

 const deleteCategory= async (req, resp) => {
  try {
    console.log(req.params);
    let data = await ContentSchema.deleteOne({_id:req.params._id});
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
}






//send email Link For reset Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
 port: 587,
 auth: {
     user: 'xteammanish12@gmail.com',
     pass: 'rryk fwos xxry oivz'
 }
});
const resetpassword=async(req,res)=>{
 console.log(req.body)

 const {email} = req.body;

 if(!email){
     res.status(401).json({status:401,message:"Enter Your Email"})
 }

 try {
     const userfind = await InstructorRegisterSchema.findOne({email:email});

     // token generate for reset password
     const token = jwt.sign({_id:userfind._id},process.env.JWT_SECRET,{
         expiresIn:"120s"
     });
     
     const setusertoken = await InstructorRegisterSchema.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true});
     //console.log("setusertoken", setusertoken);

     if(setusertoken){
         const mailOptions = {
             from:"xteammanish12@gmail.com",
             to:email,
             subject:"Sending Email For password Reset",
             text:`This Link Valid For 2 MINUTES http://localhost:3000/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`
         }

         transporter.sendMail(mailOptions,(error,info)=>{
             if(error){
                 console.log("error",error);
                 res.status(401).json({status:401,message:"email not send"})
             }else{
                 console.log("Email sent",info.response);
                 res.status(201).json({status:201,message:"Email sent Succsfully"})
             }
         })

     }

 } catch (error) {
     res.status(401).json({status:401,message:"invalid user"})
 }

};




// verify user for forgot password time
const Fargetpassword=async(req,res)=>{
  const {id,token} = req.params;
 //console.log(id,token)

   try {
       const validuser = await InstructorRegisterSchema.findOne({_id:id,verifytoken:token});
      //  console.log(validuser)

      const verifyToken = jwt.verify(token,process.env.JWT_SECRET);

       console.log(verifyToken)

      if(validuser && verifyToken._id){
          res.status(201).json({status:201,validuser})
      }else{
          res.status(401).json({status:401,message:"user not exist"})
      }
   }catch(error){
    res.status(401).json({status:401,error})
   }
};




// change password
const changepassword=async(req,res)=>{
  const {id,token} = req.params;

  const {password} = req.body;

  try {
      const validuser = await InstructorRegisterSchema.findOne({_id:id,verifytoken:token});
      
      const verifyToken = jwt.verify(token,process.env.JWT_SECRET);

      if(validuser && verifyToken._id){
          //  const newpassword = await bcrypt.hash(password,12);
           const newpassword = await password;

          const setnewuserpass = await InstructorRegisterSchema .findByIdAndUpdate({_id:id},{password:newpassword});

          setnewuserpass.save();
          res.status(201).json({status:201,setnewuserpass})

      }else{
          res.status(401).json({status:401,message:"user not exist"})
      }
  } catch (error) {
      res.status(401).json({status:401,error})
  }
}




//send otp

const sendOtp=async(req,res)=>{
const _otp = Math.floor(100000 + Math.random() * 900000)
let user = await InstructorRegisterSchema.findOne({ email: req.body.email })
// send to user mail
if (!user) {
    res.send({ code: 500, message: 'user not found' })
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
 port: 587,
 auth: {
     user: 'xteammanish12@gmail.com',
     pass: 'rryk fwos xxry oivz'
 }
});



let info = await transporter.sendMail({
    from: 'xteammanish12@gmail.com',
    to: req.body.email, 
    subject: "OTP", 
    text: String(_otp),
    html: `<html>
        < body >
        Hello and welcome${_otp}
    </ >
   </html > `,
})

if (info.messageId) {
    InstructorRegisterSchema.updateOne({ email: req.body.email }, { otp: _otp })
        .then(result => {
            res.send({ code: 200, message: 'otp send' })
        })
        .catch(err => {
            res.send({ code: 500, message: 'Server err' })

        })

} else {
    res.send({ code: 500, message: 'Server err' })
}
}



const submitOtp = (req, res) => {

  InstructorRegisterSchema.findOne({ otp: req.body.otp }).then(result => {

      //  update the password
      InstructorRegisterSchema.updateOne({ email: result.email }, { password: req.body.password })
          .then(result => {
              res.send({ code: 200, message: 'Password updated' })
          })
          .catch(err => {
              res.send({ code: 500, message: 'Server err' })

          })


  }).catch(err => {
      res.send({ code: 500, message: 'otp is wrong' })

  })
}



module.exports={  
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
   submitOtp
}
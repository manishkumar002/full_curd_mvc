

const express=require('express'); 
const app=express();
const bodyParser=require("body-parser");
const cors=require('cors'); 
 const env=require('dotenv')

 const session = require("express-session");
 const passport = require("passport");
 const OAuth2Strategy = require("passport-google-oauth2").Strategy;
 const userdb = require("./models/admin/InstructorModel")

const PORT=process.env.PORT || 8000;
const   adminRouter=require('./Routers/admin/adminRouter') 
app.use(bodyParser.json()); 
app.use(express.json());
app.use(cors()
        ) ;
  env.config()
require('./config/db'); 
app.use("/api",adminRouter);  

app.use("/api/img", express.static("./public/upload")); 

// <----------------------------------------------------------------------------------->

const clientid = "1030941327532-mottsr2tfn4th7tk29unbt9sbcsflb0p.apps.googleusercontent.com"
const clientsecret = "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"


app.use(cors({
  origin:"http://localhost:3000",
  methods:"GET,POST,PUT,DELETE",
  credentials:true
}));
app.use(express.json());


// setup session
app.use(session({
  secret:"process.env.JWT_SECRET",
  resave:false,
  saveUninitialized:true
}))

// setuppassport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID:clientid,
        clientSecret:clientsecret,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
      console.log("profile",profile)
        try {
            let user = await userdb.findOne({googleId:profile.id});

            if(!user){
                user = new userdb({
                    Id:profile.id,
                    name:profile.displayName,
                    email:profile.emails[0].value,
                });

                await user.save();
            }

            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});


// initial google ouath login
app.get("/auth/google",passport.authenticate("google",{scope:["email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3000/addblog",
    failureRedirect:"http://localhost:3000/login"
}))

app.get("/login/sucess",async(req,res)=>{

    if(req.user){
        res.status(200).json({message:"user Login",user:req.user})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
})


// <----------------------------------------------------------------------------------->

app.listen(PORT, () => {
    console.log("Hi Manish Maurya your server is running at  this :" + PORT)
})






import React from 'react';
import { NextResponse } from "next/server";
import User from '@models/user';
//import { connectToDB } from '@lib/database';
//import {nodemailer} require from "nodemailer";
import { connectToDB } from "@lib/database"; 
const jwt = require('jsonwebtoken');
import {sendMail} from '@/lib/sendMail';
import {mailTemplates} from '@/lib/mailTemplates';
const JWT_USER_SECRET = process.env.JWT_USER_TOKEN_SECRET;
const  sitename = process.env.SITE_SHORT_NAME;
var error;
var message;



export  async function userActivation (token, callback) {

  function gowith(feed){

  callback(feed);
  return feed;  
  }

  console.log(token);
  if (!token) {
    // console.log(token);
     error = "Activation Token is not avilable or invalid. Please check or request for a new token";
     console.log("Error 6001 :::>>>", error);
      // return  ({redirect: 'reusertoken',status:404 , error});

       return NextResponse.redirect(new URL('/login/forgot', result));

 };
 
  const decoded = jwt.verify(token, JWT_USER_SECRET);

  console.log(decoded);
  
  if (!decoded) {
    // console.log(decoded);
       error = "Activation Token provided is Invalid or Expired...";
       console.log("Error  6002:::>>>", error);
         return  ({status:401 , error});
         // Token may be valid but does not match any user in the database
   };



//console.log(">>>>>>>>>>check ==>>",decoded);


      
    
try{
 // await connectToDB();
 
const user = await User.findById(decoded.id);

  console.log(">>>>>>>>>>check 001==>>",user);  

  




  


console.log(">>>>>>>>>>check ==>> 002",user);  
 if (!user) {
  // console.log(token);
   error = "Activation Token is Invalid or Expired...";
   console.log("Error  6003:::>>>", error);
     return  ({status:0 , error});

 }

 if (user.active) {
  // console.log(token);
 message = "Your account is already activated. if you still cant log in consider resetting your password";
   console.log("Message 6004:::>>>", message);

   //const loginUrl = new URL('/login', request.url)

   return NextResponse.redirect(new URL('/login', request.url))
    // return NextResponse.json ({status:200, message});

 }

 user.active = true;



 user.temporary = false;


  user.save()
  
  .then((user) => {

  

   const mailTemp = {user, templateName:'activationDone' }

//confirmation mail

const feedback = sendMail(mailTemplates(mailTemp)).then(feedback=>console.log(feedback))

message=`Successful Account Activation on ${sitename}, Weldone!`;
return  ({status:200 , message});

    
  }).catch((usererror) => {


    console.log("Error :::>>>", usererror);
    return  ({status:0 , usererror});
      });

    } catch (error) {

      console.log(">>>>>>>>>>check error 001==>>",error);  
      
    }
    



  console.log("Error 6006:::>>>", error);
  return  ({status:0 , error});

}

 


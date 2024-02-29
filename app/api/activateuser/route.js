
import { connectToDB } from "@lib/database"; 
//import {ActionUserActivation} from '@/lib/ActionUserActivation';
const jwt = require('jsonwebtoken');
import User from '@models/user';
import {sendMail, u } from '@/lib/uTools';
import {mailTemplates} from '@/lib/mailTemplates';

//import {jwt_decode} from "jwt-decode";

const JWT_USER = process.env.JWT_USER_TOKEN_SECRET;
const sitename = process.env.SITE_SHORT_NAME;
const website = process.env.WEBSITE;

//import {nodemailer} require from "nodemailer";

//import User from "@/models/user";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
//import {nodemailer} require from "nodemailer";
//import {nodemailer} require from "nodemailer";
const nodemailer = require("nodemailer");
import {GetLastSlug} from "@/lib/GetSlug"; 

const BASE_URL = process.env.NEXTAUTH_URI_INTERNAL;



export async function POST(req){


  var  {token}  = await req.json();
  
  


  u.hostpase='login/';
  if (!token) {
    // console.log(token);
    const  error = "Activation Requires a valid Token. Please check or request for a new token";
     console.log("Error 6001 :::>>>", error);
    
      return NextResponse.json({ error});



 };






// check token validation 

var decodedToken;
 try {

decodedToken = jwt.verify(token, JWT_USER);



  } 
  catch (ierrox) {

    console.log("token ", ierrox);


  




try{

 const badToken = jwt.decode(token, JWT_USER);


if(badToken ){

  const expdate = u.timestamp(badToken?.exp);

    const error = "Activation Token Expired.. on "+ expdate +" please request for a new one.";
 
    return NextResponse.json({ error});
  

}


 } catch (ierrox) {

  console.log("bad token ", ierrox);

   const error = "Activation Token is Invalid or Expired...";
 
   return NextResponse.json({ error});
     // const  goto = u.Turn('badtoken');
  
  //return NextResponse.redirect(new URL(goto));

    } 

};

    

//check epiration error








    
try{

await connectToDB();
//connectToDB 
 
const user = await User.findById(decodedToken.id);

console.log(">>>>>>>>>>check 001==>>",user);  

  

console.log(">>>>>>>>>>check ==>> 002",user);  


 if (!user){
  // console.log(token);
   const error = "incomplete Registration process, Please register again";
 
     //const  goto = u.Turn('invaliduser');
     return NextResponse.json({ error});
 //NextResponse.redirect(new URL(goto));

 } 

 
 


 if (user.active) {


  // console.log(token);
 const error = "Your account is already activated. Please login";
 

 return NextResponse.json({error});

 }

 user.active = true;
 user.temporary = false;
 user.save()
  
  .then((user) => {

  
 const mailTemp = {user, templateName:'activationDone' }

//confirmation mail

const feedback = sendMail(mailTemplates(mailTemp)).then((feedback)=>{
  
console.log(feedback);

const message=`Successful Account Activation on ${sitename}, Weldone!`;

return NextResponse.json({ message});

})



 //({status:200 , message});   

    
  }).catch((usererror) => {


    console.log("Error :::>>>  002||>", usererror);


    const error=" there is a system error 0023";
 
    return NextResponse.json({ error});
      });

    } catch (error) {

      if (!decodedToken) {

   
        const error = "The activation Token provided is Invalid";
        console.log("Error  6002:::>>>"+error);
      
        return NextResponse.json({ error});
      //console.log({result},"================j w t001========error");
      }
    
    }
    



console.log(">>>>>>>>>>check error 000==>>");  
    
  //const message = "end of line system error line 211 - activateuser router";
  const message=`Successful Account Activation. Now login`;
 return NextResponse.json({ message});

 // return NextResponse.redirect(new URL(goto));
 


}




//import {nodemailer} require from "nodemailer";
import { connectToDB } from "@lib/database";
//import User from "@/models/user";
import User from '@models/user';
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
var message ;
var error;
const BASE_URL = process.env.NEXTAUTH_URI_INTERNAL;
const HOST_URL = process.env.HOST_URL;
const HOST = process.env.HOST_URL;
var error;

export async function POST(req){

  var {token , password ,password1 }  = await req.json();

  //console.log("feeeeeeeeeeeerereeeeeeeeedeeeddd=====>",{token , password ,password1 });


try {

  await connectToDB();
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } } );
    
    
// }    

        //if (err) throw err; // Throw error if cannot connect
        if (!user) {
          const error='Password reset token is invalid or has expired. Please Request a new reset';
          console.log("errror reporting :; 001",error);
          return NextResponse.json({status :400, error});
          }
        if (password == null || password1 == '' || password1!=password) {
       const error= 'Valid Password not Provided';

       console.log("errror reporting :; 002",error);
          return NextResponse.json({status :400, error});
        } else {
      const salt = await bcrypt.genSalt(10 );
      const hashpasswd = await bcrypt.hash(password, salt);
              user.password = hashpasswd; // Save user's new password to the user object
             
              user.active = true;
              user.temporary = false;
  
              console.log("---------------------pass ---001-----------------");

              user.resetPasswordToken = undefined;
              user.resetPasswordExpires = undefined;
          //user.resettoken = false; // Clear user's resettoken 
          // Save user's new data
         const saveUser = await user.save();
       //  function(error) {

      

              console.log("---------------------pass ---006-----------------");
              var smtpTransport = nodemailer.createTransport({
                host: "mail.imediaport.com",
                port: 587,
                auth: {
                  user: "renny@imediaport.com",
                  pass: "@Pass2021"
                }
              });
              // Create e-mail object to send to user
              var email = {
                from: 'iMediaPORT Team,   cloud@imediaport.com',
                to: user.email,
                subject: 'Reset Password',
                text: 'Hello ' + user.firstname + ', This e-mail is to notify you that your password was recently reset at localhost.com',
                html: 'Hello<strong> ' + user.firstname + '</strong>,<br><br>This e-mail is to notify you that your password was recently reset at localhost.com'
              }
              console.log(email);
              // Function to send e-mail to the user
              smtpTransport.sendMail(email, function(err) {

              const message='Success! Your password has been changed. please login with your new password';
             
              console.log(message)
               return NextResponse.json({status :200, message});
              });

              const message='Success! Your password has been changed. please login with your new password';
            
              console.log("error reporting :; 007",{message});
             /* res.json({ success: true, message: 'Password has been reset!' }); // Return success message*/
             return NextResponse.json({status :200, message});
            }
          
        }
      


  
 catch (err) {
  console.log("---------------------pass ---002-----------------");
  if (err) {
    console.log("------------error---------pass ---004-----------------");
    console.log("errror reporting :; 004",err);
    return NextResponse.json({status :200, error:"There was an issue with your password reset please try again later"});
   // res.json({ success: false, message: err });
  }


     return NextResponse.json({status :200, error});
}

}
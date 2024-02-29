
//import {nodemailer} require from "nodemailer";
import { connectToDB } from "@lib/database";
//import User from "@/models/user";
import User from '@models/user';
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
var message ;
const BASE_URL = process.env.NEXTAUTH_URI_INTERNAL;
const HOST = process.env.HOST_URL;

var error;

export async function POST(req){
 const host = process.env.HOST_URL;
  //const host = req.headers.host;
  //console.log("Host ==>", BASE_URL);
  //console.log( {host});
  var  {   email}  = await req.json();

  //trow ({status :200, message:"error no go"});
  //return NextResponse.json({status :200, message:"error no go"});


  try {
    
    await connectToDB(); // Assuming connectToDB is your database connection function

    const ttoken = await new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (error, salt) => {
        if (error) reject(error);
        bcrypt.hash(Math.random().toString(36).substring(7), salt, (error, hash) => {
          if (error) reject(error);
          resolve(hash);
        });
      });
    });
  

    //const token  = await bcrypt.genSalt(10 );

    var token = ttoken.replace(/[^a-zA-Z ]/g, "");
console.log("show tyoekns");
    console.log(ttoken, token);
    const user = await User.findOne({ email: email});

    if (!user) {
     error = 'No account with that email address exists.';
     return NextResponse.json({status :200, error});
  
    } ;


    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const smtpTransport = nodemailer.createTransport({
      host: "mail.imediaport.com",
      port: 587,
      auth: {
        user: "renny@imediaport.com",
        pass: "@Pass2021"
      }
    });

    const mailOptions = {
      to: user.email,
      from: 'cloud@imediaport.com',
      subject: 'iMediaPORT Password Reset',
      text: `Hi ${user.firstname}, You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
           ${host}recover/${token}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    await smtpTransport.sendMail(mailOptions);

    console.log('mail sent');
    const success_msg = message = 'Great! We have mailed you a reset instruction. Please check your email box for instructions on how to reset your password.';
    return NextResponse.json({status :200, message });
  
  } catch (error) {
    console.log("Issues ooh==>",error);
    // Handle errors appropriately
  return NextResponse.json({status :200,error });

  }
}

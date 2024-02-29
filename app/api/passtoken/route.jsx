import { connectToDB } from "@lib/database";
import User from '@models/user';
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
var message ;
var error;
const BASE_URL = process.env.NEXTAUTH_URI_INTERNAL;
const HOST = process.env.HOST_URL;
var error;

export async function POST(req){


    const {token} = await req.json();


    
console.log("----------------------ccc-c--=================", token );

  //  try {
      
  await connectToDB();

    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

        if (!user) {
       const error='Password reset token is invalid or has expired. Please Reset Password again';
       return NextResponse.json({status :200, debug:"0030" , error});
        } else {

    console.log({user});
        return NextResponse.json({status :200, debug:"0031" , message:"Request is Approved!. Please enter New Password"});
      }

   // } catch (err) {
    //  console.log(err)
    //  return NextResponse.json({status :200, debug:"0032" ,error:err});
   // }
}



//import {nodemailer} require from "nodemailer";
import { connectToDB } from "@lib/database";
//import User from "@/models/user";
import User from '@models/user';
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import waterfall from 'async-waterfall';
//import series from 'async/series';
//import {nodemailer} require from "nodemailer";
//import {nodemailer} require from "nodemailer";
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken"); // Import JWT Package


const BASE_URL = process.env.NEXTAUTH_URI_INTERNAL;



export async function POST(req){

    waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ username: req.body.username }, function(err, user) {
         //if (user.name ) user.username = user.name;
         
        // if (user.username )user.name=user.username;
  
          if (!user) {
            req.flash('error', 'No account with that email address exists.');
            return res.redirect('/forget');
          }
  
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 36000000; // 1 hour
  
          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
       var smtpTransport = nodemailer.createTransport({
        host: "mail.imediaport.com",
        port: 587,
        auth: {
          user: "renny@imediaport.com",
          pass: "@Pass2021"
        }
      });
       
        var mailOptions = {
          to: user.username,
          from: 'cloud@imediaport.com',
          subject: 'iMediaPORT  Password Reset',
          text: 'Hi '+user.name+', You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'https://' + req.headers.host + '/newpass/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          console.log('mail sent');
          //req.flash('success_msg', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
          done(err, 'done');
        });
        //req.flash('Dne', 'Check your Email for instructions on how to reset your password ');
        success_msg= 'Great! we have mailed you a reset Instruction. Please check your Email box for instructions on how to reset your password ';
        return res.render('forget',{success_msg});
        //res.render("error",{'err' : err});
        
      }
    ], function(err) {
console.log({err});
      if (err) trow (err);
      if (err) return next(err);

     // res.render('pass-reset1');
    });
  };
  
  
  
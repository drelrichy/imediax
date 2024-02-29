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


export  async function forget (req, res, next) {
    async.waterfall([
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
      if (err) return next(err);
      res.render('pass-reset1');
    });
  };
  
  
  /*============================================================================================================*/
  
  
  export function newpass (req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      if (!user) {
        req.flash('error', 'Password reset token is invalid or has expired.');
        return res.render('forget', {});
      }
      res.render('newpass', {token: req.params.token, });
    });
  };
  /*============================================================================================================*/
 
  export async function newpasss (req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } } , async (err, user) => {
        if (err) throw err; // Throw error if cannot connect
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.render('newpass');
          }
        if (req.body.password == null || req.body.C_password == '') {
          req.flash('error', 'Password not Provided');
            return res.render('newpass');
        } else {
      const salt = await bcrypt.genSalt(10 );
      const hashpasswd = await bcrypt.hash(req.body.password, salt);
              user.password = hashpasswd; // Save user's new password to the user object
             
              user.active = true;
              user.temporary = false;
  
              user.resetPasswordToken = undefined;
              user.resetPasswordExpires = undefined;
          //user.resettoken = false; // Clear user's resettoken 
          // Save user's new data
         const saveUser = await user.save(function(err) {
            if (err) {
              res.json({ success: false, message: err });
            } else {
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
                to: user.username,
                subject: 'Reset Password',
                text: 'Hello ' + user.name + ', This e-mail is to notify you that your password was recently reset at localhost.com',
                html: 'Hello<strong> ' + user.name + '</strong>,<br><br>This e-mail is to notify you that your password was recently reset at localhost.com'
              }
              console.log(email);
              // Function to send e-mail to the user
              smtpTransport.sendMail(email, function(err) {
                req.flash('success_msg', 'Success! Your password has been changed.');
                done(err);
              });
             /* res.json({ success: true, message: 'Password has been reset!' }); // Return success message*/
              res.redirect('/login');
            }
          })
        }
      });
  }
  
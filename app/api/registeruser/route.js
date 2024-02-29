

//import {nodemailer} require from "nodemailer";
import { connectToDB } from "@lib/database";
//import User from "@/models/user";
import User from '@models/user';
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
//import {nodemailer} require from "nodemailer";
//import {nodemailer} require from "nodemailer";
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken"); // Import JWT Package


const BASE_URL = process.env.NEXTAUTH_URI_INTERNAL;



export async function POST(req){

;



  var  { username, firstname, email, lastname,  role, image, name, password, password2 , hostURL: host}  = await req.json();
   
  var role='user';


  
  console.log("-------->",{ username, firstname, email, lastname,  name, password, password2 } );

  
  /**
   * 

   
   let error = [];
   if (!username ||!name || !password || !password) {
    error = "Please Fill All Fields";
 return NextResponse.json({ error,  email , firstname, lastname , username, role ,   password});
      } else {
      if (name.length < 5) {
      error = "Name must be at least 5 characters" ;
   return NextResponse.json({ error,  email , firstname, lastname , username, role ,   password});
    }
    if (name.length < 3) {
      error = "Name must be at least 3 characters" ;
   return NextResponse.json({ error,  email , firstname, lastname , username, role ,   password});
    }
      if (password.length < 6) {
      error = "Password must be at least 6 characters" ;
   return NextResponse.json({ error,  email , firstname, lastname , username, role ,   password});
    }
     if (error.length > 0) {
     return NextResponse.json({ error,  email , firstname, lastname , username, role ,   password});
    } 
  
      }
*/

  const userExist = await User.findOne({email: email});
  const channelExist = false ;//await Serv.findOne({channel_id : req.body.adminchannel});

 
  
 if (userExist){

     error = "A username with this Email Already Exist";

  return NextResponse.json({ error,  email , firstname, lastname , username, role ,   password});
   

  } ;





     try {
      //   ---------------------------------------------------------

      //var  { firstname, lastname, username, image, role, email, password } = await req.json();
       if(!username)username= email;
       if(!image)image="";
       if(!role)role ='user';
   
   
      
       const hashedPassword = await bcrypt.hash(password, 10);
       await connectToDB();
   
     
       const user = new User({ firstname, lastname, username,temporary:"", role, image, email, password: hashedPassword });
  
   
  
    await user.save().then( saveduser=>{

      //const saveUser = await User.create({ firstname, lastname, username, role, image, email, password: hashedPassword },(feeedback)=>{

   
        const temporarytoken = jwt.sign({ id: user._id }, 'shhhhh', { expiresIn: '24h' }); 
  
        user.temporary = temporarytoken ;
        user.save();
     
       //global.USER[user._id]= user;


  
        var smtpTransport = nodemailer.createTransport({
          host: "mail.imediaport.com",
          port: 587,
          auth: {
            user: "renny@imediaport.com",
            pass: "@Pass2021"
          }
        });
  

        //serverhost= req.get('host');
  console.log(req);
  
        var mailOptions = {
          to:email,
          bcc:'mstudios.me@gmail.com',
          from: 'cloud@imediaport.com',
          subject: 'Account Confirmation Link',
          text: 
            'Please click on the following link, to Confirm your Account:\n\n' +
            ' Please click <a  href="' + BASE_URL + '/api/activate/' + user.temporary + '" > click '+ BASE_URL + '/api/activate/' + user.temporary +' to activate  \n\n' +
            'If you did not request this, please ignore this email..\n'
        };
  
        smtpTransport.sendMail(mailOptions, function(error, data) {
  
          console.log('mail sent');
  
          console.log("error=",error);
          console.log("error=",data);
          
        });


      });



      //});

    

     
   

       

       //return NextResponse.json({ message: "User registered." }, { status: 201 });

     } catch (error) {   
      
      //--------------------------------
   
       console.log(error);
      return NextResponse.json(
         { message: "API :: An error occurred while registering the user. :"+error },
         { status: 500 }
      );
     }




  
   try {
        
  
  
        //console.log("user before user");
        //console
    const saveUser = await user.save((result)=>{
  
      if (result) {  console.log(result) }else{
  
    
  
    temporarytoken = jwt.sign({ id: user._id }, 'shhhhh', { expiresIn: '24h' }); 
  
     user.temporary = temporarytoken ;
  
     console.log(user);
  
  
     global.USER[user._id]= user;
  
       // console.log("Na here we dey temporry =", user.temporary );
       // console.log('https://' + req.headers.host + '/activate/' + user.temporary + '\n\n');
  
  
        var smtpTransport = nodemailer.createTransport({
          host: "mail.imediaport.com",
          port: 587,
          auth: {
            user: "renny@imediaport.com",
            pass: "@Pass2021"
          }
        });
  
  
  
  
  
        var mailOptions = {
          to: email,
          from: 'cloud@imediaport.com',
          subject: 'Account Confirmation Link',
          text: 
            'Please click on the following link, to Confirm your Account:\n\n' +
            'https://' + BASE_URL + '/api/activate/' + user.temporary + '\n\n' +
            'If you did not request this, please ignore this email..\n'
        };
  
        smtpTransport.sendMail(mailOptions, function(error, data) {
  
          console.log('mail sent');
  
          console.log("error=",error);
          console.log("error=",data);
          
        });
  
  
 return NextResponse.json({ success_msg :'Account Registered But not yet Activated. Account Confirmation link sent to your ' + user.email + ' Please Click on the link to Activate your account'}); 
    
  
  
  
    
            }
  
  
  
    });
  
  
     //return res.redirect('/login');
      
    }catch(error){
  
      return NextResponse.json({status :400, error});
      }
  
  
  
      /** 
        user.save(function(err) {
          
          if (err) {
            console.log("Na error be sooooh",err);
          }else{
          var smtpTransport = nodemailer.createTransport({
                host: 'smtp.gmail.com',
            port: 465,
            secure: true,
           service : 'gmail',
                auth: {
                  user: 'onetv.ng@gmail.com', 
                pass: 'avyfuzccdkbcfhrc'
                }
  
              });
  
  
              var mailOptions = {
                to: user.username,
                from: 'iMediaPORT Team,   onetv.ng@gmail.com',
                subject: 'Account Confirmation Link',
                text: 
                  'Please click on the following link, to Confirm your Account:\n\n' +
                  'https://' + req.headers.host + '/activate/' + user.temporary + '\n\n' +
                  'If you did not request this, please ignore this email..\n'
              };
  
              smtpTransport.sendMail(mailOptions, function(err) {
                console.log('mail sent');
                
              });
       return NextResponse.json({ success_msg :'Account Registered But not yet Activated. Account Confirmation link sent to your ' + user.email + ' Please Click on the link to Activate your account'}); 
          
      
      }
  
  
  
          });
  */
  
  
  };
  
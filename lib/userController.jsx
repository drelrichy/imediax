//'use strict';
const express = require('express');
const bcrypt = require("bcryptjs");
const passport = require("passport");
const cookieparser = require('cookie-parser');
const async = require('async');
const _ =  require('lodash');
const os = require('os');
var speakeasy = require("speakeasy");
const session = require('express-session');
var secret = new Buffer('yoursecret', 'base64');
const jwt = require('jsonwebtoken'); // Import JWT Package
const nodemailer = require('nodemailer');
const SMTPServer = require("smtp-server").SMTPServer;
const crypto = require('crypto');
const bodyparser   = require('body-parser');
const flash = require("connect-flash");
const passportLocalMongoose = require("passport-local-mongoose");
var dialog = require('dialog');
const alert =require('alert-node');
const User = require("../models/user");
const Serv = require("../models/serv");
const Admin = require("../models/admin");
 //Usser = require("../models/Usser");
//const/**** */
const Comment = require("../models/comment");
const Comment1 = require("../models/comment1");
const Comment2 = require("../models/comment2");
require("../../config/passport")(passport);
const { loginValidation , checkAuthenticated , forwardAuthenticated } = require('../../config/auth');
const app = express();
var calledPage ;
var user;
const ROLE = {
  SUPER : 'super',
  ADMIN: 'admin',
  MANAGE: 'manage',
  EDIT: 'edit',
  BASIC: 'basic'
}
var comment = Comment;
//Login Function

//Register Funcion
exports.register = (req, res) => res.render("register",{'success_msg':'', 'error': ''});
exports.cregister  = (req, res) => res.render("cloud/cregister",{'success_msg':'', 'error': ''});
//exports.registeruser = async (req,res)=>{};



exports.login= async (req,res)=>{
var channel;

// if(typeof user=='unfefined'){ const user ={username:'guest', role:'guest'}; const channel={channel_id:'new', role:'shopper'};

  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
success_msg = req.flash("success_msg");
error_msg = req.flash("error_msg");
error = req.flash("error");
  error_msg 
 // var success_msg="";

 const user = req.user;

 //console.log("user details", req.user);
 //if(typeof user=='undefined') const user ={username:'guest', role:'guest'}; 
//const  channel={channel_id:'new', role:'shopper'};
//if (typeof user.username == 'undefined') user.username = 'guest';
//const username="guest";
//console.log(user);
  res.render("login", { user, success_msg,error, error_msg , channel, comment, loginValidation , checkAuthenticated , forwardAuthenticated });

};



exports.registeruser = async (req,res)=>{

//console.log("Wetin dey happen here");

//console.log("user controler .67");


const { username, name, email, surname,  password, password2, adminchannel } = req.body;

console.log("the channel name =",adminchannel);

 let err = [];
 if (!username ||!name || !password || !password) {
  err = "Please Fill All Fields";
res.render('register',{'err' : err, 'email' : email , 'name' : name , username, adminchannel, surname,  'password' : password});
    } else {
    if (name.length < 5) {
    err = "Name must be at least 5 characters" ;
   return res.render('register',{'err' : err, 'email' : email , 'name' : name , username, surname, adminchannel, 'password' : password});
  }
  if (name.length < 3) {
    err = "Name must be at least 3 characters" ;
   return res.render('register',{'err' : err, 'email' : email , 'name' : name , username, surname,adminchannel,  'password' : password});
  }
    if (password.length < 6) {
    err = "Password must be at least 6 characters" ;
   return res.render('register',{'err' : err, 'email' : email , 'name' : name , username, surname, adminchannel, 'password' : password});
  }
   if (err.length > 0) {
   return res.render("register", { 'err' : err});
  } 


const usernameExist = await User.findOne({username : req.body.username});
const channelExist = await Serv.findOne({channel_id : req.body.adminchannel});
if (channelExist){
  err = "The Channel ID " +req.body.adminchannel+" already exist. Please login with its credential or try another Channel ID";
  return res.render('register',{'err' : err, email , name , username, surname, adminchannel,  password});
 


}


   if (usernameExist){
   err = "A username with this Email Already Exist";
  return res.render('register',{'err' : err, email , name , username, surname, adminchannel,  password});
 

} else {
 	const salt = await bcrypt.genSalt(10 );
    const hashpasswd = await bcrypt.hash(req.body.password, salt);
   // const user = new User(); // Create new User object
	//user.name = req.body.name; // Save username from request to User object
  //user.role = ROLE.BASIC;
	//user.email = req.body.username // Save email from request to User object
  //user.hostname = os.hostname();
	//user.password = hashpasswd;
  /*user : _.pick(user, 'id')*/
  /*id: user._id*/
  //temporarytoken = jwt.sign({ id: user._id }, 'shhhhh', { expiresIn: '24h' }); 
	//user.temporary = temporarytoken ;

   console.log("The body Channel Name is=|"+req.body.adminchannel+"|");
   console.log("The Channel Name is=|"+adminchannel+"|");

   let thisrole =(adminchannel!="")? ROLE.EDIT : ROLE.BASIC;
   //let admindata="";
   const admindata= {channel_id:adminchannel, role: ROLE.ADMIN};
   //let admindata="";

   console.log(admindata);

let xchan= {"channel_id": adminchannel ,"owner":req.body.name,"email":req.body.username ,"password": hashpasswd ,"channel_name":"","channel_info":"","contact_email":"","telephone_contact":"","address":"","city":"","start_time":"21600","timezone":"+01:00","logo":"","cbrand":"","thumbnail":"","adminemail":["",""],"ckeyword":""};

   let email2 =(req.body.username)? req.body.username: "";
      const user = new User({
      username : req.body.username,
      name: req.body.name, 
      surname: req.body.surname,
      role : ROLE.BASIC,
      email : email2,
      adminchannel : admindata,
      hostname : os.hostname(),
      password : hashpasswd

    });

   // console.log(user)

   sUser = await user.save().then((error, result)=>{

console.log("ER="+error, "Result="+result);

   }).catch((error)=>{

    console.log(error);
   })


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
        to: user.username,
        from: 'cloud@imediaport.com',
        subject: 'Account Confirmation Link',
        text: 
          'Please click on the following link, to Confirm your Account:\n\n' +
          'https://' + req.headers.host + '/activate/' + user.temporary + '\n\n' +
          'If you did not request this, please ignore this email..\n'
      };

      smtpTransport.sendMail(mailOptions, function(err, data) {

        console.log('mail sent');

        console.log("error=",err);
        console.log("error=",data);
        
      });


res.render('register',{ success_msg :'Account Registered But not yet Activated. Account Confirmation link sent to your ' + user.email + ' Please Click on the link to Activate your account'}); 
  



  
          }



  });


   //return res.redirect('/login');
    
  }catch(err){

    res.status(400).send(err);
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
			res.render('register',{ success_msg :'Account Registered But not yet Activated. Account Confirmation link sent to your ' + user.email + ' Please Click on the link to Activate your account'}); 
      	
    
    }



				});
*/

}
};
};


exports.loginPage =  async (req,res,next) => {

  const calledPage = "./serv"+req.url;
  console.log("Caller --------------->>>",calledPage);
 trace2= false;

  if (trace2)console.log("are we logging in;");

  const {error} = loginValidation(req.body);
 

  if (error) {
    error_msg = error.details[0].message;
    console.log( error_msg);
    user = req.user;

    if (trace2) console.log("The userrrrrr==>", user);

    res.render("login", { user:{username:""}, error: error_msg } );
  return    ;
  }
  //res.status(400).send(error.details[0].message);
//  Check if user is  exist in database or not
User.findOne({username : req.body.username} , async function(err,user){
trace2=false;
  var success_msg="";
  var error=err;

  //var error ="";
	if (!user) {
    //user = reg.user;

    if (trace2)console.log("naaaa user oohhhh ", user );
		   err = "Username or Password is Incorrect";
   	//	res.render('login',{layout:'main', err , success_msg, error });
       res.render("login", { user, username : req.body.username,success_msg,error: err , comment, loginValidation , checkAuthenticated , forwardAuthenticated , email : req.body.username});
	}
	if (user) {
		if (!user.active) {
				err = "Account is Not yet Activated, Check your email to activate your account.";
		   	//	res.render('login',{err : err});
        let  error_msg = "Sorry!, "+err;
           res.render("login", {user,username : req.body.username, success_msg, error :err, error_msg , comment, loginValidation , checkAuthenticated , forwardAuthenticated , email : req.body.username});
			}

      console.log("	//  Its's Only Matched the Encrypted Password....");
			if(user.active){
				//  Its's Only Matched the Encrypted Password....
				  const validPass = await bcrypt.compare(req.body.password,user.password);
				  if (!validPass) {
				  	err = "Username or Password is Incorrect";
            console.log(err);
            			   		res.render('login',{user, username : req.body.username,error: err, success_msg, email : req.body.username});
			   		}

         
			   	if (validPass) {
            const hoste = user._id;
            const moon = os.hostname();
            const mooni = moon.toString();
            console.log("DB ID : " +hoste);
            console.log("Hostname : " + mooni);
            const muchi = { hostname : { $elemMatch : { $in: [ moon ] } } } ;

     User.findOne({ hostname : { $elemMatch : { $in: [ moon ] } } }, function(err,wow){
              //console.log("what is : "+ wow);
              if (wow) {
                //console.log("wow :",wow);
             

                //console.log(user);
                passport.authenticate('local', {
                            successRedirect: calledPage,
                            failureRedirect: "./login",
                            failureFlash: true,
                          })(req, res, next);

                          console.log(wow);

                        //  res.render('login',{layout:'index', err , success_msg, error });
                        

                          return 
              }
              if (!wow) {

                var secret = speakeasy.generateSecret({length: 20});
                    var token = speakeasy.totp({ secret: req.body.secret, encoding: 'base32' });
                    const verifytoken = jwt.sign({ password : req.body.password  }, 'shhhhh', { expiresIn: '24h' }); 
                    const verified_token = jwt.verify(verifytoken, 'shhhhh');
     /*               console.log(secret);
                    console.log(token);
                    console.log(verifytoken);
                    console.log(verified_token);*/
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
                          from: 'iMediaPORT Team,  cloud@imediaport.com',
                          subject: 'Device Verification',
                          text: 
                            'Hey '+ user.name +'!\n'+
                            'A sign in attempt requires further verification because we did not recognize your device. To complete the sign in, enter the verification code on the unrecognized device.\n'+
                            'Device : '+ os.hostname() + '\n'+
                            'Verification Code : ' + token + '\n'+
                            'If you did not attempt to sign in to your account, your password may be compromised.'
                        };
                        smtpTransport.sendMail(mailOptions, function(err) {
                          console.log('mail sent');
                          
                        });
                    res.render("device_verify",{ user : user , verified_token , sess : req.session , success_msg :'Device Verification Code send to your Email : '+ user.email+' Check Your email account to get the verification Code..'});
              }
/*        				if (os.hostname() != moon ) {
                    
                  }s
                  if (os.hostname() == wow) {
                            passport.authenticate('local', {
                            successRedirect: "/index",
                            failureRedirect: "/login",
                            failureFlash: true,
                          })(req, res, next);
                  }*/
      /*});*/ } );
					    }
			   		}
	}
});
};

exports.verify_token = async (req, res,next) => {
  var tokenValidates = speakeasy.totp.verify({
                  secret: req.body.secret,
                  encoding: 'base32',
                  token: req.body.anyword,
                  window: 6
                });
          if (tokenValidates == true) {
           User.findOne({username : req.body.username} , async function(err,user){

            //console.log(user);
              if (err) throw err;
              if (user) { 
               const hoste = os.hostname(); 
                User.findOneAndUpdate({ username: req.body.username },{ $push: { "hostname": hoste }},{new: true, upsert: true },function(err,wow){ 
                 
                 
                  passport.authenticate('local', {
                            successRedirect: "/channel",
                            failureRedirect: "/login",
                            failureFlash: true,
                          })(req, res, next);
                });

               // let xchan= {"channel_id": adminchannel ,"owner":req.body.name,"email":req.body.username ,"password": hashpasswd ,"channel_name":"","channel_info":"","contact_email":"","telephone_contact":"","address":"","city":"","start_time":"21600","timezone":"+01:00","logo":"","cbrand":"","thumbnail":"","adminemail":["",""],"ckeyword":""};



                }else{
                      res.render("login",{ err :'Incorrect Information..!'});
                    }
         })
     }
          if (tokenValidates == false) {
            res.render("device_verify",{ err :'Verification Code in invalid Or Session has been expired.'});
          }
}
/*



exports.loginuser = (req,res,next)=>{
  passport.authenticate('local', {
    successRedirect: "/index",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};
*/
exports.AllJson = async (req, res) => {
  const Comments = await Comment.find();
  if (Comments) {
    console.log(Comments);
   return res.render('partials/ajax_comment_load',{ comment : Comments });
    /*res.status(200).send({ Comments });*/
  }else{
    console.log(Comments);
    console.log("Error");
    res.status(200).send({ Comments });
  }
};

exports.AllJson1 = async (req, res) => {
  const Comments = await Comment1.find();
  if (Comments) {
    console.log(Comments);
   return res.render('partials/ajax_comment_load1',{ comment : Comments });
    /*res.status(200).send({ Comments });*/
  }else{
    console.log(Comments);
    console.log("Error");
    res.status(200).send({ Comments });
  }
};

exports.AllJson2 = async (req, res) => {
  const Comments = await Comment2.find();
  if (Comments) {
    console.log(Comments);
   return res.render('partials/ajax_comment_load2',{ comment : Comments });
    /*res.status(200).send({ Comments });*/
  }else{
    console.log(Comments);
    console.log("Error");
    res.status(200).send({ Comments });
  }
};

exports.comment = (req,res) => {

    User.findOne(req.user,(err)=>{
    if (err) throw err;
    if (req.user) {
      const nammee = req.user.name;
        const { commentTxt } = req.body;
        const coo = new Comment();
        coo.name = nammee;
        coo.commentTxt = req.body.commentTxt;
        coo.save(function(err){
          if (err) {
            console.log(err);
          }else{
            res.render("index", { subscr : req.sub , user : req.user , sess : req.session , comment : coo});
            console.log(coo);
            console.log(req.sub);
          }
        });
    }
    else if (!req.user ) {
        const { commentTxt } = req.body;
        const coo = new Comment();
        coo.name = "Random User";
        coo.commentTxt = req.body.commentTxt;
        console.log(req.body.commentTxt);
        coo.save(function(err){
          if (err) {
            console.log(err);
          }else{
            res.render("index", { subscr : req.sub , user : req.user , sess : req.session , comment : coo});
            /*res.send(coo);*/
            console.log(coo);
          }
        });
  };
});
};
exports.comment1 = (req,res) => {

    User.findOne(req.user,(err,result)=>{
    if (err) throw err;
    /*console.log(result);*/
    if (req.user) {
      const nammee = req.user.name;
        const { commentTxt } = req.body;
        const cooo = new Comment1();
        cooo.name = nammee;
        cooo.commentTxt = req.body.commentTxt;
        cooo.save(function(err){
          if (err) {
            console.log(err);
          }else{
            res.render("index", { subscr : req.sub , user : req.user , sess : req.session , comment : cooo});
            console.log(cooo);
          }
        });
    }
    else if (!req.user ) {
        const { commentTxt } = req.body;
        const cooo = new Comment1();
        cooo.name = "Random User";
        cooo.commentTxt = req.body.commentTxt;
        cooo.save(function(err){
          if (err) {
            console.log(err);
          }else{
            res.render("index", { user : req.user , sess : req.session , comment : cooo , subscr : req.sub});
            console.log(cooo);
          }
        });
  };
});
};

exports.comment2 = (req,res) => {

    User.findOne(req.user,(err,result)=>{
    if (err) throw err;
    /*console.log(result);*/
    if (req.user) {
      const nammee = req.user.name;
        const { commentTxt } = req.body;
        const coo = new Comment2();
        coo.name = nammee;
        coo.commentTxt = req.body.commentTxt;
        coo.save(function(err){
          if (err) {
            console.log(err);
          }else{
            res.render("index", { user : req.user , sess : req.session , comment : coo , subscr : req.sub});
            console.log(coo);
          }
        });
    }
    else if (!req.user ) {
        const { commentTxt } = req.body;
        const coo = new Comment2();
        coo.name = "Random User";
        coo.commentTxt = req.body.commentTxt;
        coo.save(function(err){
          if (err) {
            console.log(err);
          }else{
            res.render("index", { user : req.user , sess : req.session , comment : coo , subscr : req.sub});
            console.log(coo);
          }
        });
  };
});
};

exports.Newletter = (req,res)=>{
  User.findOne(req.user,(err,resulttt)=>{
    if (err) throw err;
    if (req.user) {
      const name = req.user.name;
      const emaillee = req.user.email;
      const email = req.body.username
       if (emaillee == email ) {
        User.findOne({ username: req.body.username }, function(err, user) {
            user.Subscribed = true ;
            user.save();
        Usser.findOne({ username: req.body.username }, function(err, resultt) {
              if (resultt) {
                err = "You Have Already Subscribed..";
               res.render("error",{'err' : err});
              }
               if (!resultt) {
                  const sub = new Usser();
                    sub.name = req.body.name;
                    sub.email = req.body.username
                    sub.Subscribed = true ;
                    sub.save(function(err){
                      if (err) {
                        console.log(err);
                      }else{  
                        var smtpTransport = nodemailer.createTransport({
                          host: "mail.imediaport.com",
                          port: 587,
                          auth: {
                            user: "renny@imediaport.com",
                            pass: "@Pass2021"
                          }
                        });
                          var mailOptions = {
                            to: req.body.username,
                            from: 'cloud@imediaport.com',
                            subject: 'Subcription Email',
                            text: 'You Have SuccessFully Subscribed the Electro Store Site'
                          };
                          smtpTransport.sendMail(mailOptions, function(err) {
                            console.log('mail sent');
                            //console.log(subscr);
                           done(err, 'done');
                          });
                        }
                            });
                    
                        res.redirect(calledPage);
                      }
                  });
         });
      } if (emaillee != email ) {
              Usser.findOne({ username: req.body.username }, function(err, resultt) {
              if (resultt) {
                err = "You Have Already Subscribed..";
               res.render("error",{'err' : err});
              }
               if (!resultt) {
                  const sub = new Usser();
                    sub.name = req.body.name;
                    sub.email = req.body.username
                    sub.Subscribed = true ;
                    sub.save(function(err){
                      if (err) {
                        console.log(err);
                      }else{  
                        var smtpTransport = nodemailer.createTransport({
                          host: "mail.imediaport.com",
                          port: 587,
                          auth: {
                            user: "renny@imediaport.com",
                            pass: "@Pass2021"
                          }
                        });
                          var mailOptions = {
                            to: req.body.username,
                            from: 'cloud@imediaport.com',
                            subject: 'Subcription Email',
                            text: 'You Have SuccessFully Subscribed the Electro Store Site'
                          };
                          smtpTransport.sendMail(mailOptions, function(err) {
                            console.log('mail sent');
                            //console.log(subscr);
                           done(err, 'done');
                          });
                        }
                            });
                    
                        res.redirect(calledPage );
                      }
                  });
      }
    }else{
      if (!req.user) {
        const name = req.body.name;
        const email = req.body.username
      Usser.findOne({ username: req.body.username }, function(err, resultt) {
      if (resultt) {
        err = "You Have Already Subscribed..";
       res.render("error",{'err' : err});
      }
       if (!resultt) {
          const sub = new Usser();
            sub.name = req.body.name;
            sub.email = req.body.username
            sub.Subscribed = true ;
            sub.save(function(err){
              if (err) {
                console.log(err);
              }else{  
                var smtpTransport = nodemailer.createTransport({
                  host: "mail.imediaport.com",
                  port: 587,
                  auth: {
                    user: "renny@imediaport.com",
                    pass: "@Pass2021"
                  }
                });
                var mailOptions = {
                  to: req.body.username,
                  from: 'cloud@imediaport.com',
                  subject: 'Subcription Email',
                  text: 'You Have SuccessFully Subscribed the Electro Store Site'
                };
                smtpTransport.sendMail(mailOptions, function(err) {
                  console.log('mail sent');
                  //console.log(subscr);
                 done(err, 'done');
                });
              }
            });
    
        res.redirect(calledPage);
      }
    });
    }
}
});
};

exports.unsubscribe = (req,res)=>{
     const name = req.body.name;
      const email = req.body.username
      Usser.findOne({ username: req.body.username }, function(err, resultt) {
      if (resultt) {
        err = "You Have Already Subscribed..";
       res.render("error",{'err' : err});
      }
});
    };
/*app.get('/index',checkAuthenticated,(req,res)=>{
  res.render('index',{user : req.user });
  console.log(req.user);
});*/

// Logout
//router.get('/logout', userController.logout);
exports.logout = (req,res)=>{
  /* req.logout();*/
   req.session.destroy((err) => {
    if(err) {
        return console.log(err);
      }
  res.redirect("/login");
  return
});
};


exports.forget = (req, res, next) => {
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


exports.newpass =  function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.render('forget', {});
    }
    res.render('newpass', {token: req.params.token, });
  });
};
/*============================================================================================================*/
exports.newpasss =  async (req, res) => {
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



exports.activate = async function(req, res) {

  const token = req.params.temporarytoken;
  console.log(token);
  /*const { user : { id }} =*/ 
  jwt.verify(token, 'shhhhh', async (err, decoded) => {

//User.findOne({ temporary : req.params.temporarytoken } , async function (err, user) {

  console.log ("This is decod ==>",decoded);
  console.log ("This is err ==>",err);

 User.findById(decoded.id,async function (err, user) {
 // User.findOne(

//console.log(token);
///*const { user : { id }} =*/ jwt.verify(token, 'shhhhh', async (err, decoded) => {
      if (err) {
          console.log(err);
          err = "Activation Token is Invalid or Expired...";
            res.render('register', {'err' : err});
      }
        if (!token) {
          console.log(token);
          err = "Activation Token is Invalid or Expired...";
            res.render('register', {'err' : err});
      }
      if (!user) {
          console.log(token);
          err = "Activation Token is Invalid or Expired...";
            res.render('register', {'err' : err});
      }
      if (!decoded) {
        console.log(decoded);
          err = "Activation Token is Invalid or Expired...";
            res.render('register', {'err' : err});
            // Token may be valid but does not match any user in the database
      }if (decoded){
     //user =  global.USER[decoded.id];

        console.log("user=",user);
        console.log("decoded=",decoded);
        console.log("decoded.id=",decoded.id);
         user.active = true;
         user.temporary = false;
        /*await User.update({ active : true , temporary : false} , { where : { idd } });*/
          user.save(function(err) {
            if (err) {
              console.log(err); // If unable to save user, log error info to console/terminal
            } else {
                const smtpTransport = nodemailer.createTransport({
                  host: "mail.imediaport.com",
                  port: 587,
                  auth: {
                    user: "renny@imediaport.com",
                    pass: "@Pass2021"
                  }
                });
              // If save succeeds, create e-mail object
              var email = {
                from: 'iMediaPORT, admin@imediaport.com',
                to: user.username,
                subject: 'Localhost Account Activated',
                text: 'Hello ' + user.name + ', Your account ' + user.username + 'has been successfully activated!',
                html: 'Hello<strong> ' + user.name + '</strong>,<br><br>Your account has been successfully activated!'
              };

              // Send e-mail object to user
               smtpTransport.sendMail(email, function(err) {
                if (err) console.log(err); // If unable to send e-mail, log error info to console/terminal
              });
                res.render('login',{ success_msg :'Account activated!.. Please Login'});  
            }
          });
      }
        });
      });
};
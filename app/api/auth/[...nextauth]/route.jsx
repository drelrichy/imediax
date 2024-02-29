import NextAuth from 'next-auth';
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
const AUTHURL = process.env.NEXTAUTH_URL
import { NextResponse } from "next/server";

var error;
var message;
import User from '@/models/user';
import { connectToDB } from '@/lib/database';




//const authOptions = NextAuth({
  //const handler  = NextAuth({
//email='info@imediaport.com';
//const url='';
 const authOptions ={
  //const authOptions = NextAuth({
  providers: [ GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
  }),
  FacebookProvider({
    clientId: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET
  }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "E-mail", type: "email", placeholder: "" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {


        //throw new Error("Bros How far naa.!");
        // Add logic here to look up the user from the credentials supplied
        //const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
        const { email, password } = credentials;



  
        
          await connectToDB();

          console.log("Show email 011202>>",{email});
          const user = await User.findOne({ email });

          //console.log({user});

          if (!user) {
            
const error="User E-mail provides doesnt exits here";


     throw new Error(error);
            return NextResponse.json({status:0, message, error:"the user you seek does not exist please check again or register a new user "});
          }



          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
const error="Sorry, please check credentials, Rest password or create an account";
throw new Error(error);

return NextResponse.json({status:0, message,error});

//return null;
//return ({status:0, error});

           // return NextResponse.json( {redirect:"loginerror", error, email});
          };

//user.name = user.firstname+" "+user.lastname;
//console.log({user});

//console.log("password OK");


if (!user.active && credentials) {
  const error = "Sorry!, Account is Not yet Activated, Check your email to activate your account. or reset password";
  throw new Error(error);
   return NextResponse.json({status:0, message,error});



  }

  if (user.disabled && credentials) {
    const error = "Account is Disabled, Please contact Support.";
     //	res.render('login',{err : err});
     throw new Error(error);
     throw new Error({status:0, message,error});
     return NextResponse.json({status:0, message,error});
   // return NextResponse.json( {redirect:"contactadmin", error, email :user.email});
  
  }

  console.log(" UUUUUUUUUU====>",{user});
  if(user.name=='fname')user.name= user.firstname;
if(!user.image)user.image="/assets/images/profiles.png";
  return user;



       
        
      }
    })
  ],
  callbacks: {
   
    async session({ session }) {
    //  console.log('{ session }');
     // console.log({ session });
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    pages: {
      signIn: AUTHURL+'signin',
      signOut: AUTHURL+'signout',
      error: AUTHURL+'error', // Error code passed in query string as ?error=
      verifyRequest: AUTHURL+'verify-request', // (used for check email message)
      newUser: AUTHURL+'new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
      register: AUTHURL+'register',
    },
async signIn({ account, profile, user, credentials }) {



      try {


      

        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne( { email:user?.email});

        // if not, create a new document and save user in MongoDB
        if (!userExists && profile) {
          await User.create({
            email: profile.email,
            firstname:  profile.given_name,
            lastname: profile.family_name,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
            role:'user',
            active: true,
           password: profile.at_hash
          });
        }

        return true
      } catch (error) {
trew (error);
      console.log("Error  101 checking if user exists: >>", {error});
      return NextResponse.json({status:0, message,error});


      //{ status:false, message , error}
      }
  //}

    },
  },
  register: async (req,res)=>{

    //console.log("Wetin dey happen here");
    
    //console.log("user controler .67");
    
    
    const { username, firstname, email, lastname,  name, password, password2 } = req.body;

    
    console.log({ username, firstname, email, lastname,  name, password, password2 } );
    
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
    }
}
//)



const registeruser = async (req,res)=>{

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
  
  
  
     
  
  }
  };
  };
  

const handler = NextAuth(authOptions);

export {authOptions, handler as GET, handler as POST }

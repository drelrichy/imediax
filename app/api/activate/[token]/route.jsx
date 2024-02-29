
import { NextResponse } from "next/server";
import { useRouter } from 'next/navigation';
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

var hostpage ='login/';

u.hostpage = hostpage;
//const hostpage ='login/';
var error;
var message;
const NextURL='http://localhost:3000/';

import {GetLastSlug} from "@/lib/GetSlug"; 


export async function GET(req ){
  
var decodedToken;
const token =  GetLastSlug(req.url);

const gotoPage= '//login/?activate='+token;



 u.hostpase='login/';
  if (!token) {
    // console.log(token);
     error = "Activation Requires a valid Token. Please check or request for a new token";
     console.log("Error 6001 :::>>>", error);
      // return  ({rednpmirect: 'reusertoken',status:404 , error});


//redirect('/login/notoken');
const  goto = u.Turn('badtoken');
 
throw  Error (error);

 return NextResponse.redirect(new URL(goto));


 };






// check token validation 

const  goNow = u.Turn("?activate="+token);

return NextResponse.redirect(new URL(goNow));
 try {

 decodedToken = jwt.verify(token, JWT_USER);



  } 
  catch (ierrox) {

    console.log("token ", ierrox);




try{

 const badToken = jwt.decode(token, JWT_USER);


if(badToken ){

  const expdate = u.timestamp(badToken?.exp);

    error = "Activation Token Expired.. on "+ expdate +" please request for a new one.";
 

    const  goto = u.Turn('expiredtoken');

return NextResponse.redirect(new URL(goto+'?ts='+badToken?.exp));

}


 } catch (ierrox) {

  console.log("bad token ", ierrox);

   error = "Activation Token is Invalid or Expired...";
 

      const  goto = u.Turn('badtoken');
  
  return NextResponse.redirect(new URL(goto));

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
   error = "incomplete process, Please register again";
 
     const  goto = u.Turn('invaliduser');
 
 NextResponse.redirect(new URL(goto));

 } 

 
 


 if (user.active) {


  // console.log(token);
 message = "Your account is already activated. if you still cant log in consider resetting your password";
 
 const  goto = u.Turn('donebefore');
 
 console.log(goto);
 return NextResponse.redirect(new URL(goto));
    // return NextResponse.json ({status:200, message});

 }

 user.active = true;
 user.temporary = false;
 user.save()
  
  .then((user) => {

  
 const mailTemp = {user, templateName:'activationDone' }

//confirmation mail

const feedback = sendMail(mailTemplates(mailTemp)).then((feedback)=>{
  
console.log(feedback);

message=`Successful Account Activation on ${sitename}, Weldone!`;

const  goto = u.Turn('donetoken');
 
 return NextResponse.redirect(new URL(goto));

})



 //({status:200 , message});   

    
  }).catch((usererror) => {


    console.log("Error :::>>>  002||>", usererror);
    const  goto = u.Turn('got_error002'); //make an error page 
 
    return NextResponse.redirect(new URL(goto));
      });

    } catch (error) {

      if (!decodedToken) {

   
        error = "The activation Token provided is Invalid";
        console.log("Error  6002:::>>>"+error);
      
        const  goto = u.Turn('invalidtoken');
      
        return NextResponse.redirect(new URL(goto));
      //console.log({result},"================j w t001========error");
      }
    
    }
    



console.log(">>>>>>>>>>check error 000==>>");  
    
  const  goto = u.Turn('');

 // return NextResponse.redirect(new URL(goto));
 

}

export async function POST(req, res){
 
  //const tokenid =  GetLastSlug(req.url);

 const  { tokenid } = await req.json();

  const activateFeedback = await userActivation(tokenid)
  
  .then((result) => {
  //  return NextResponse.redirect(new URL('//login', result));

    
    //console.log("======================Sesilt===========", result);

    const  goto = u.Turn('error6005');
 
    return NextResponse.redirect(new URL(goto));
    
  }).catch((err) => {
    console.log("error ==>", err);
    const  goto = u.Turn('error6007');
 
    return NextResponse.redirect(new URL(goto));
    
  });
  ;
 // console.log("my params ----->", activateFeedback);

//return NextResponse.json(activateFeedback );
//return NextResponse.redirect(new URL('//login', req.url));
}






//export { POST}


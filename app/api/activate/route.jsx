
import { NextResponse } from "next/server";
import { useRouter } from 'next/navigation';
import {userActivation} from '@/lib/userActivation';
//import { createContext } from 'react'
 
//const Context = createContext()

import {GetLastSlug} from "@/lib/GetSlug"; 


  //async function handler (req) {

  export async function GET(req, res){
 
  const tokenid =  GetLastSlug(req.url);

  const activateFeedback = await userActivation(tokenid)
  
  .then((result) => {
  //  return NextResponse.redirect(new URL('/login', result));

    
    //console.log("======================Sesilt===========", result);

  return NextResponse.json(result);
    
  }).catch((err) => {
    console.log("error ==>", err);
    
  });
  ;
 // console.log("my params ----->", activateFeedback);

//return NextResponse.json(activateFeedback );
//return NextResponse.redirect(new URL('/login', req.url));
}

export async function POST(req, res){
 
  //const tokenid =  GetLastSlug(req.url);

 const  { tokenid } = await req.json();

  const activateFeedback = await userActivation(tokenid)
  
  .then((result) => {
  //  return NextResponse.redirect(new URL('/login', result));

    
    //console.log("======================Sesilt===========", result);

  return NextResponse.json(result);
    
  }).catch((err) => {
    console.log("error ==>", err);
    
  });
  ;
 // console.log("my params ----->", activateFeedback);

//return NextResponse.json(activateFeedback );
//return NextResponse.redirect(new URL('/login', req.url));
}





//export default GET;
//export { handler as fetch, post, put, get}


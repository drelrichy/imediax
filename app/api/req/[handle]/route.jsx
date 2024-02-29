
const bcrypt = require("bcryptjs");
import {  ImediaServer, YouTubeServer,  GetPlaylistFromChanelN } from '@/imedia/lib/ImediaServer';
import { NextResponse } from 'next/server';





function GetHandler(req, context) {

  //const router = useRouter()
  const toHandle = context.params.handle ;//router.query.handle;
  const rUrl= req.url;
  console.log("t---------------------------->",{rUrl});
  console.log(toHandle);
  return new NextResponse({status:200,  message: 'This is a DELETE request' });
}


async function PostHandler(req, context) {

console.log("---------------------presennt at 998-------------------");
  
const channel_id ='UCrGWaDtpP8cpQBuIPVkfdrA';

//return new NextResponse({status:200,  message: 'This is a DELETE request', data: channel_id });
  //const router = useRouter()
  const toHandle = context.params.handle ;//router.query.handle;
  const rUrl= req.url;
  console.log("t---------------------------->",{rUrl});
  console.log(toHandle);

  if (toHandle === 'youtubegetplaylist') {

   
const channel_id ='UCrGWaDtpP8cpQBuIPVkfdrA';
//return new NextResponse({status:200,  message: 'This is a DELETE request', data: channel_id });

const feedplay =  await GetPlaylistFromChanelN (channel_id).then((result) =>{
  
  
  console.log("---------55--03---->",{result});
  
  //return new NextResponse({ result}) 
});

console.log("---------55--02---->",{feedplay});


return new Response({ status:200, feedplay });
//return new Response( 'This is a POST request '+ feedplay );



  }



}



export const GET= PostHandler;
export const POST = PostHandler;
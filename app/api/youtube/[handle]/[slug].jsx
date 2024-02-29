function PostHandler(req, context) {

    //const router = useRouter()
    const toHandle = context.params.handle ;//router.query.handle;
    const rUrl= req.url;
    console.log("t---------------------------->",{rUrl});
    console.log(toHandle);
  }
  
  
  async function GetHandler(req, context) {
  
    //const router = useRouter()
    const toHandle = context.params.handle ;//router.query.handle;
    const actOn = context.params.slug ;

    const rUrl= req.url;
   // console.log("t---------------------------->",{rUrl});
    console.log(toHandle);
    console.log(actOn);
  
    if (toHandle === 'youtubegetplaylist') {
  
     
  const channel_id ='UCrGWaDtpP8cpQBuIPVkfdrA';
  
  const feedplay = await GetPlaylist(channel_id, (reply)=>{
    return  Response( 'This is a POST request' + reply);
    console.log("---------55------>",{reply});
    const ans1 = reply[0];
  
    //return new Response(JSON.stringify({ans1}));
    return new Response({ status:200, message: 'This is a POST request' });
  
  
  });
  //return new Response( 'This is a POST request '+ feedplay );
  
  
        // Handle GET request
     // return new Response(200).json({feedplay});
      //return new Response({feedplay} );
  
    }
  
  
  
   if (req.method === 'POST') {
        // Handle POST request
      return new Response(200).json({ status:200, message: 'This is a POST request' });
    } else if (req.method === 'PUT') {
        // Handle PUT request
        res.status(200).json({ status:200, message: 'This is a PUT request' });
    } else if(req.method === 'DELETE') {
        // Handle DELETE request
      NextResponse({status:200,  message: 'This is a DELETE request' });
    }
  
   // return new Response({status:200,  message: 'This is a DELETE request' });
  }
  
  
  
  export const GET= GetHandler;
  export const POST = PostHandler;
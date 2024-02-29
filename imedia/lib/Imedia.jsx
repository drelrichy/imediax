

import { React, useState, useEffect } from 'react';
import $ from "jquery";
const waitingIcon ="./assets/images/loading.gif";
 




export function ImediaClock (){

    let time  = new Date().toLocaleTimeString();
    const [cTime, setTime] = useState(time);
  
    const UpdateTime=()=>{
      time =  new Date().toLocaleTimeString();
  
      $("#ChannelClock").text(time);
      $("#ChannelClock2").text(time);
      
    setTime(time)
    }
  
  
        setInterval(UpdateTime)  
      
        return (
          <div>
      
            {cTime}
          </div>
        );
      }


export   function TrimText(s, maxLength ) {

  if(typeof s==='undefined') return ;
        // Function to trim the string to a specified number of characters
       // const trimString = (s, maxLength) => {
            if (s.length <= maxLength) {
                return s;
            } else {
                return s.slice(0, maxLength);
            }
        };

      



export  function GetYoutubeID(urll){
  let url=urll;

const  data={playlist:null,id:null,channel_id:null, channel_name:null,video_id:null, duration:null ,all:[]};


   url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
const finna1=  undefined !== url[2]?url[2].split(/[^0-9a-z_\-]/i)[0]:url[0];

//const channelUsername = finna1.split('/@').pop();
//onsole.log(channelUsername);

if(url.includes('v=')){
 data.video_id =  finna1;
 data.return =   finna1;
 data.return_id="video_id";
//alldata = { }

let myall={
 data :data.return_id,
type: data.return_id
}
data.all.push(myall);

 if(url.includes('list=PL')){

   data.playlist = match[0];
   data.return = data.playlist;
   data.return_id="playlist";
   let myall={
     data :data.return_id,
   type: data.return_id
   }
   data.all.push(myall);
 }
 }
 


if(finna1.includes('/@')){
data.channel_name =  finna1.split('/@').pop();
data.return = data.channel_name;
data.return_id="channel_name";

let myall={
 data :data.return_id,
type: data.return_id
}
data.all.push(myall);
}


if (urll.charAt(0) === '@') {

data.channel_name = urll.slice(1);

  data.return = data.channel_name;
data.return_id="channel_name";

let myall={
data :data.return_id,
type: data.return_id
}
data.all.push(myall);

} 
 
if(urll.includes('list=PL')){
 var regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]list=)|youtu\.be\/)([a-zA-Z0-9_-]{18,34})/;
 var match = urll.match(regex);
 

 if (match && match[1]) {
   data.playlist = match[1];
   data.return = data.playlist;
   data.return_id="playlist";

   let myall={
     data :data.return_id,
   type: data.return_id
   }
   data.all.push(myall);
 } else
 {
   data.playlist = match[0];
   data.return = data.playlist;
   data.return_id="playlist";

   let myall={
     data :data.return_id,
   type: data.return_id
   }
   data.all.push(myall);

 }


 }

   var regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:channel|c(?:hannel)?|user)\/|\S*?[?&]channel=|\S*?[?&]user=)|youtu\.be\/)([a-zA-Z0-9_-]{24})/;
   var match = urll.match(regex);
   
   if (match && match[1]) {
       data.channel_id= match[1];
       data.return = data.channel_id;
       data.return_id="channel_id";

let myall={
 data :data.return_id,
type: data.return_id
}
data.all.push(myall);
   }
//-------------- plain playlist

if (urll.charAt(0) === 'P'&&urll.charAt(1) === 'L'){
   
  data.playlist = urll;



      data.return = data.playlist;
      data.return_id="playlist";
   
      let myall={
        data :data.return_id,
      type: data.return_id
      }
      data.all.push(myall);
   
  
      data.all.push(myall);
   
    }
   
   
    
   



 return  data;
 //"{"+dataTye+":'"+data+"' , Playlist:'"+playList+"' "


}

export  function ChannelCard ({ channel , channelShowInfo, HandleClick, HandleInfo}) {

console.log(channel);

  //const activeChannel =  channel ;

  const waitingIcon ="./assets/images/loading.gif";
 
  const { title, thumbnails, description } = channel;

 // "title": "Tech God",
  //"description"
  //const thumbnailUrl = thumbnails?.medium.url;
  const thumbnailUrl = thumbnails?.default.url;
  return ( 

    <div>

{!channel.title ? (
<div 


>  
<img
  src = {waitingIcon}
            alt="Channel Logo"
            className=" w-20  rounded-lg" />

</div>) :
(<div>  

    <div className="max-w-xs bg-white text-slate-600 dark:text-slate-200 dark:bg-slate-500 shadow-lg rounded-lg overflow-hidden mx-auto">
    <div className="  flex flex-wrap">
      <div className=" w-full  ">
   
    {thumbnailUrl && ( <div  className=" p-1 mt-2 rounded-lg flex flex-wrap max-h-28">
      
   {channelShowInfo? <img className="w-full" src={thumbnailUrl} alt={title} />
     : <img
            src={thumbnailUrl}
            alt={title} 
            className="h-9  p-1 mt-2 rounded-lg"
          /> }      <div className=" text-xl m-2 ">{channel.title} </div>  </div> ) }
         </div> 
              <div className="  ">
              {channelShowInfo && (
   <div>
      <p className="text-gray-900 text-sm dark:text-slate-300 p-2 gap-2">{channel.description}</p>
    </div>
  )}
      <div className=" text-xl m-2 ">
        <button 
         onClick={()=>{ HandleClick({handle:'sub', host:'channel', action:'Subscribe Channel '} )}}
         
        className="bg-red-500 text-white px-3 py-1 rounded-lg mr-2 text-xs">
            Sub!
          </button>
          <button
           onClick={()=>{ HandleClick({handle:'playlist', host:'channel', action:'Show Channel Playlist'} )}}
           className="bg-blue-500 text-white px-3 py-1 rounded-lg mr-2 text-xs">
       PlayList(s)
          </button>
          <button 
          
          onClick={()=>{ HandleClick({handle:'videos', host:'channel', action:'Show Channel Videos'} )}}
          className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs">
          Videos
          </button>
          </div>
  </div>

   
     

</div>
</div>
</div>   )  }
</div>
  );
};

// YouTube Playlist Card Component
export function PlaylistCard  ({ playlist , videos , active ,HandleClick,  HandleInfo}) {


//const video  = child;
console.log("Playlist ====>",{playlist});
console.log("Videos==",videos);
console.log("active ==",active);
  const { title, thumbnails, description } = playlist;

  // "title": "Tech God",
   //"description"
   //const thumbnailUrl = thumbnails?.medium.url;
   const thumbnailUrl = thumbnails?.default.url;
  //console.log(thumbnailUrl);
  return (<div>
    <a href= {'#'+title}
    onClick={()=>{ HandleClick({handle:'videos', id:playlist.id, host:'playlist', action:'Show Channel Videos'} )}}
         
     >
  <div className="max-w-xs p-2 m-2  overflow-hidden shadow-lg">


    <img hidden className="w-full" src={thumbnailUrl} alt={playlist.title} />
    <div className="px-2 py-2 gap-2 flex flex-wrap">
    <img
            src={thumbnailUrl}
            alt={title} 
            className="h-9  rounded-lg"
          /><div className="font-bold  dark:text-slate-200  text-xl mb-2 whitespace-nowrap truncate overflow-hidden">{TrimText(playlist.title,18)}</div>
    {!active&&(  <p className="text-gray-700  dark:text-slate-200  text-base">{playlist.description}</p>)}
    </div>
   
  </div>
 
  </a>
{active ===playlist.id&&(
<div className="" >
<div className=" text-xl m-2 ">
        <button 
         onClick={()=>{ HandleClick({handle:'sub', host:'channel', action:'Subscribe Channel '} )}}
         
        className="bg-slate-900 text-white px-3 py-1 rounded-lg mr-2 text-xs">
            Select All
          </button>
          <button
           onClick={()=>{ HandleClick({handle:'playlist', host:'channel', action:'Show Channel Playlist'} )}}
           className="bg-slate-900 text-white px-3 py-1 rounded-lg mr-2 text-xs">
     (*)
          </button>
          <button 
          
          onClick={()=>{ HandleClick({handle:'videos', host:'videolist', action:'Show Channel Videos'} )}}
          className="bg-slate-900 text-white px-3 py-1 rounded-lg text-xs">
       Save
          </button>
          <button 
          
          onClick={()=>{ HandleClick({handle:'addall', host:'videolist', action:'Show Channel Videos'} )}}
          className="bg-slate-900 text-white px-3 py-1 rounded-lg text-xs">
          Add All
          </button>
          </div>

{videos.map((video) => (

  <div>

<VideoListCard video={video} />
  
  </div>
  ))
}
</div>
)}

  </div>
  );
};

export  function VideoListCard({video, Handlers }){
  console.log('----------video-------------');
  console.log(video);

return (
  <a href={"#----Video--"+video.id }
  
  id={video.id}
  onClick={()=>{ Handlers.Click({ image:video.thumbnail, handle:'select', host:'video_id', video_id: video.id,  action:'Show Channel Videos'} )}}
  onMouseEnter={()=>{ Handlers.MouseOver({ image:video.thumbnail, handle:'select', host:'video_id', video_id: video.id,  action:'Show Channel Videos'} )}}
  onMouseLeave={()=>{Handlers.MouseOut({ image:video.thumbnail, handle:'select', host:'video_id', video_id: video.id,  action:'Show Channel Videos'} )}}
 
 >
<div className="  rounded-full  hover:ring-2 shadow-lg  m-2   gap-2 ring-1 mb-4 flex  h-8 flex-wrap  flex-end">
 
 <span className="flex mx-3 overflow-hidden whitespace-nowrap  h-8" > <h4 className="text-sm flex flex-end my-2  font-size-5  font-semibold mb-2 justify-self-end ">{TrimText(video.title, 24)}</h4>
  <p hidden className="text-gray-600 text-sm  text-size-sm">{
  TrimText(video.description,22)
  }</p></span>  
  <img src={video.thumbnail} alt={video.title} className="w-8 rounded-full h-6 object-cover " />

</div>
</a>

)


}

export  function VideoCard ({ video })  {
   //console.log('----------video-------------');
    //console.log(video);
    return (
      <div className="bg-slate-300 rounded-lg shadow-md ring-1 m-2 p-4 mb-4">
      <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover mb-4" />
      <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
      <p className="text-gray-600">{video.description}</p>
    </div>
   
    );
  };

export  function PlaylistVideoCard ({ video })  {
//  console.log('----------video-------------');
 // console.log(video);
  return (

    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
    <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover mb-4" />
    <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
    <p className="text-gray-600">{video.description}</p>
  </div>
 
  );
};


export  function ShowVideoList ({video}, hostdiv )  {

console.log('----------video------------- >|'+hostdiv,{video});
console.log(video);





const max = 
 
`
  <div className="bg-white rounded-lg shadow-md p-4 mb-4">
  <img src='${video.thumbnail}' alt=${video.title} className="w-full h-48 object-cover mb-4" />
  <h3 className="text-lg font-semibold mb-2">${video.title}</h3>
  <p className="text-gray-600">${video.description}</p>
</div>
` 
  ;

  //hostdiv

$(hostdiv).append(max);

console.log(max);


  return ;
  
 const xxx= ( <div className="bg-white rounded-lg shadow-md p-4 mb-4">
  <img src='{video.thumbnail}' alt={video.title} className="w-full h-48 object-cover mb-4" />
  <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
  <p className="text-gray-600">{video.description}</p>
</div>)
};
//export { ChannelCard, PlaylistCard, VideoCard , Imedia , YouTube };
'use client'
import { useEffect, useState } from "react";
//import { UilFilm } from '@iconscout/react-unicons';
//import { UilReact,  UilYoutube ,  UilFilm } from '@iconscout/react-unicons/icons/uil-react'
import { UilReact, UilCloudUpload, UilDesktopCloudAlt, UilYoutube , UilFilm, UilHome } from '@iconscout/react-unicons';

//import { UilCloudUpload } from '@iconscout/react-unicons'

import { YouTube, GetYoutubeID, Imedia} from '@/imedia/lib/Imedia';
import { GetPlayListFromChannelName } from '@/imedia/lib/ImediaServer';

import $ from "jquery";






const fetchDataWithTimeout = async (url, options, timeout = 5000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

// Usage:









const handleRequest = async (handler,data) => {
  // e.preventDefault();


  console.log(handler,data);

  //try {


    //setMessage(".. Activating New User please wait..");
    try {
      const res = await fetchDataWithTimeout("api/req/" + handler, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data,
        }),
      }, 6000000); // Specify your desired timeout value in milliseconds (e.g., 10000 for 10 seconds)
      
      // Process the response
   




    const feedback = await res.json();

console.log(feedback );
//console.log(res );
    } catch (error) {
      // Handle errors, including timeouts
    }
   
  //  const feedError = feedback.error;
  //  const feedMessage = feedback.message;

//return feedback;
 
  //} catch (error) {
    // setError(error);
   // console.log("Error process: ", error);
  //}


};

const youtubeEmbedUrl = 'https://www.youtube.com/embed/';

const handleMouseEvent = (e) => {
  e.preventDefault();
  // Do something
};





const getPlaylistIdFromChannel = async (channelN) => {
  const API_KEY = 'AIzaSyC_Np_qFsUC1YvnxJAr5-YNFVMzLPREp-s';//
const APIKEY= process.env.YOUTUBE_API_KEY;

  console.log("Keeey              gfghfghfghf--->",APIKEY);


    //console.log(channelN);
    //console.log(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=${channelN}&key=${API_KEY}`);
    //const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=${channelN}&key=${API_KEY}`);
    const response = await  handleRequest('youtubegetplaylist',channelN);
return response;

}


const location="Serv Page";
    let xcount =0;
    function testIT (e){
      xcount++;
      //const evid=Event;
        //$("#ChannelClock").text(e.id);
        $("#info").text(e.id+" @ "+location+" = "+xcount);
        $("#showtest").text(e.id+" @ "+location+" = "+xcount);
        console.log(e.id+" @ "+location+" = "+xcount);
      }
  

export default function page  () {
  let value;
  let lYtSearch
  // Get the value from local storage if it exists lastYoutubeSearch}
  value = localStorage.getItem("favoriteNumber") || "";

  lYtSearch = localStorage.getItem("lastYoutubeSearch") || "";
  // Set the value received from the local storage to a local state
  const [favoriteNumber, setFavoriteNumber] = useState(value);

const [lastYoutubeSearch, setLastYoutubeSearch] = useState (lYtSearch);

  const [cpMenuTab, setCpMenuTab] = useState('home');
  const [ytSearchId, setYtSearchId] = useState(null);
  const [ytSearchPl, setYtSearchPl] = useState(null);
  const [ytSearchChN, setYtSearchChN] = useState(null);
  const [ytSearchChId, setYtSearchChId] = useState(null);
  const [ytSearch, setYtSearch] = useState(null);
  const [ytSearchInput, setYtSearchInput] = useState(lYtSearch);
  const [channelName, setChannelName]= useState('MattTalkTech')


  const [playlistId, setPlaylistId] = useState([]);
  //const channelName = 'CHANNEL_NAME';



const  HandleYoutubeSeach =  async  (inSearch, e)=>{
  localStorage.setItem("lastYoutubeSearch", inSearch);
  e.preventDefault();



//const eShow = await YouTube.GetID(inSearch);
const eShow = await GetYoutubeID(inSearch);
  console.log({eShow});

if(eShow.video_id){

$('#showtest').append("Video  ID is = : "+eShow.video_id+"<BR>" );

}

if(eShow.channel_name){

  const channel_name = eShow.channel_name;
  setChannelName(channel_name);
console.log(channel_name);

 // const id = await getPlaylistIdFromChannel(channel_name);
 const id = await GetPlayListFromChannelName(channel_name);
    
console.log(id);

const mx= JSON.stringify(id);

   setPlaylistId(mx);


  $('#showtest').append("Channel Name = : "+eShow.channel_name+"<BR>" );

  /*
  id.map(item => ({
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnails: item.snippet.thumbnails,
  }));
  */

}


  if(eShow.playlist){

    $('#showtest').append("Playlist ID  : "+eShow.playlist+"<BR>" );
    
    }

    if(eShow.channel_id){
    
      $('#showtest').append("Channel  ID  : "+eShow.channel_id+"<BR>" );
      
      }
 /*
$('#showtest').text(eShow );
  localStorage.setItem("lastYoutubeSearch", inSearch);
var urlSearch;
 if(inSearch.includes('http')){

  if(inSearch.includes('/@'))

  {
 
  const channelUsername = inSearch.split('/@').pop();
  console.log(channelUsername);
 
  } else if(!inSearch.includes('embed')){
 
    //if(!inSearch.includes('embed')){




  const inUrl = new URL(inSearch);
 urlSearch =  inUrl.search
  console.log(urlSearch);
  const params = new URLSearchParams( urlSearch);

  setYtSearchId(params.get('v'));
  console.log(params.get('v'));
  //youtubeEmbedUrl
console.log(params.get('list'));
}

 } else if(inSearch.includes('?')&& inSearch.includes('=')) {

 urlSearch = inSearch;
 const params = new URLSearchParams( urlSearch);
 setYtSearchId(params.get('v'));
 console.log(params.get('v'));
console.log(params.get('list'));


 } 
  //(inSearch.contains('http')
  
*/


 // inSearch
//} else{

//get channel id from channel name
//https://youtube.googleapis.com/youtube/v3/search?part=snippet&q={CHANNEL_NAME}&type=channel&key={YOUTUBE_API_KEY}

//https://www.youtube.com/watch?v=gny2hqkaSjg&list=PLy_wKxVmWb4b1efRCOFzax3JQrRj2VWfH

//}




}



  return (

    
    <div className='w-full    dark:bg-slate-900 dark:text-gray-100 ' >



  <div className= '   h-screen bg-slate-200 text-gray-800 dark:bg-slate-950  dark:text-gray-100 p-2 '>

<div className= 'flex flex-wrap gap-2 '>
<div className=' rounded-lg ring-1 flex   w-80 bg-blue-600 '  > <p className="mx-2" >PREVIEW!</p> </div>
  <div className=" rounded-lg ring-1 bg-gray-600 flex-auto "> <p className="mx-2" >CUE-!</p> </div> 
  <div className=" rounded-lg ring-1 bg-green-600 flex flex-auto "> <p className="mx-2" >NEXT!</p>   </div> 

    <div className="  rounded-lg ring-1 flex bg-red-950 flex w-80"> <p className="mx-2" >LIVE!</p>  </div>

</div>

    <div className= 'gap-2 flex flex-wrap mb-2 mt-2 h-48 shadow-lg shadow-inner '>

             <div className='bg-slate-400   dark:bg-slate-800 w-80 h-48 rounded-lg ring-1 ring-slate-900/5 shadow-xl ' ><iframe id='cueframe' className='self-end rounded-lg  w-80  h-48 ' src="https://www.youtube.com/embed/k2L9BQJISPU" title="Today95.1fm Live Stream" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> </div>
            <div className=" bg-slate-400 dark:bg-slate-800 rounded-lg ring-slate-900/5 shadow-xl flex-auto  h-48 ">CUE!</div> 
            <div className=" bg-slate-400 dark:bg-slate-800 rounded-lg ring-slate-900/5 shadow-xl flex-auto  h-48 ">CUE!</div> 

            <div className="bg-slate-400   dark:bg-slate-800 w-80  h-48 rounded-lg ring-1 ring-slate-900/5 shadow-xl"> <iframe id='liveframe' className='self-end w-80 rounded-lg  h-48 ' src="https://www.youtube.com/embed/k2L9BQJISPU" title="Today95.1fm Live Stream" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>

    </div>


    <div id="mainwindow" className= ' h-3/5 min-h-max flex flex-wrap gap-2  '>



<div className='bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200  dark:bg-slate-800 rounded-lg px-2 py-2 ring-1 ring-slate-900/5 shadow-xl w-80 '  > 

<div className="flex  hover:bg-gray-500  bg-gray-300 0 dark:text-gray-200 dark:bg-gray-900  rounded-lg h-7 text-sm"  asin="conrolbar" >
 <span  className={cpMenuTab=='home' ? "imedia-cp-menu-button-active rounded-l" : "imedia-cp-menu-button rounded-l"}  >
  <button  onClick={()=>{setCpMenuTab('home') }} className=" ">
   <UilHome  size="20" color="blue"  /> 
  </button></span>
  <button  onClick={()=>{setCpMenuTab('youtube')  }}  className={cpMenuTab=='youtube' ? "imedia-cp-menu-button-active " : "imedia-cp-menu-button "}>
  <UilYoutube size="20" color="red"  /> Youtube
  </button>
  <button  onClick={()=>{setCpMenuTab('web') }} className={cpMenuTab=='web' ? "imedia-cp-menu-button-active " : "imedia-cp-menu-button"} >
  <UilDesktopCloudAlt  size="20" color="#87CEEB"  /> WEB
  </button>
  <button  onClick={()=>{setCpMenuTab('url') }}  className={cpMenuTab=='url' ? "imedia-cp-menu-button-active rounded-t" : "imedia-cp-menu-button "}>
  <UilFilm  size="20" color="green"  /> URL
  </button>
  <button  onClick={()=>{setCpMenuTab('file') }} className={cpMenuTab=='file' ? "imedia-cp-menu-button-active rounded-t" : "imedia-cp-menu-button "}>
  <UilCloudUpload  size="20" color="orange"  /> FILE
  </button>
</div>

<div className="imedia-cp-menu-active-tab flex flex-auto h-5/6 rounded-md">
{cpMenuTab=='home'&&( 
<h2> WEB Links</h2>

)}
{cpMenuTab=='youtube'&&( <div className="w-full">
<h2> Youtube Search </h2>
 <input  id="youtubesearch" className="w-full"
  value={ytSearchInput}



 onChange={e =>{ setYtSearchInput(e.target.value); HandleYoutubeSeach(e.target.value, e)}} />




{ytSearchId && (
  <div>
  



  </div>
 

)}

<div>
      {playlistId ? (
        <p>Playlist ID: {playlistId}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>

</div>)}
{cpMenuTab=='web'&&( 
  <div>
<h2> WEB Links</h2>
</div>
)}

{cpMenuTab=='file'&&( 
<h2> Local File upload</h2>

)}

{cpMenuTab=='url'&&( 
<h2> Remote File Server</h2>

)}

</div>


 </div>

  <div className="'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg px-2 py-2 ring-1 ring-slate-900/5 shadow-xl flex-auto ">CUE!
  <p  id="info" className="mx-2   text-gray-900 flex   flex-auto" >03:34:44</p>

  <div className="container mx-auto py-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
   
   
      {
      //<!-- YouTube Card Component -->
    }
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4">
          <img src="https://via.placeholder.com/150" alt="Channel/Playlist Thumbnail" className="w-full h-auto rounded" />
        </div>
        <div className="px-4 py-2">
          <h3 className="text-lg font-semibold">Channel/Playlist Name</h3>
          <p className="text-gray-600">Description of the channel/playlist</p>
        </div>
        <div className="px-4 py-2">
          <a href="#" className="text-blue-500 font-semibold">View Channel/Playlist</a>
        </div>
      </div>
{
     // <!-- Repeat the above card component for each channel/playlist -->
    }
    </div>
  </div>


  <div id="showtest" className='text-black dark:text-white'>
 

 
  

  </div>
  
  
  </div> 
    <div className=" bg-white dark:bg-slate-800 rounded-lg px-2 py-2 ring-1 ring-slate-900/5 shadow-xl w-80">play list LIVE!</div>

</div>
 </div>
    <div hidden className="bg-slate-900 h-5  text-white p-0 m-0 text-center fixed bottom-10 w-screen">
      <p className="m-0 h-5 ">&copy; 2024 1TV Channel Admin Portal. All rights reserved.</p>
    </div>
    
    <div className= 'w-full flex flex-wrap gap-0 p-0 z-40 fixed bottom-0'>


        <div className=' w-80 bg-slate-300 dark:bg-slate-900  dark:text-gray-300 text-gray-600 '  > PREVIEW!  </div>
          <div className="flex-auto bg-slate-300  dark:text-gray-300 text-gray-600  dark:bg-slate-900 ">CUE! </div> 
            <div className=" pr-4 bg-slate-300 dark:text-gray-300 text-gray-600 dark:bg-slate-900 w-80  ">LIVE! </div>

   
    </div>
 
</div>

  )
}

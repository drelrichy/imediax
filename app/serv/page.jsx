'use client'
import { useEffect, useState } from "react";
import { UilReact, UilCloudUpload, UilDesktopCloudAlt, UilYoutube , UilFilm, UilHome } from '@iconscout/react-unicons';


import { ChannelCard, PlaylistCard,  ShowVideoList, VideoListCard, PlaylistVideoCard, VideoCard, GetYoutubeID, Imedia} from '@/imedia/lib/Imedia';
import { GetPlayListFromChannelName , GetVideoInfoFromID, getYoutubeChannelData ,GetPlayListInfoFromPlaylistID, GetVideosFromPlaylistId, GetChannelInfoFromChannelName, GetPlayListAllFromChannelName} from '@/imedia/lib/ImediaServer';

import $ from "jquery";

const iMASTER = {
 youtube:{
playlists: [{id:'', data:{}}],
channels: [{channel_id:'', channel_name:'', data:{}}],
videos: [{id:'', data:{}}]
},

getYoutube: function (action , id){

if(action==="GetPlayListFromChannelName"){
const channel_name = id;
if (iMASTER.checkYoutube('channel_name', channel_name)){




return iMASTER.checkYoutube('channel_name', channel_name);



}
else {





}



}

}
,


checkYoutube: function ( check , id){

  if(check==="channel_name"){

  const channel_name = id;

  const youtubeChannels = iMASTER.youtube.channels;

  const result = youtubeChannels.filter((channel) => channel.channel_name === channel_name);

if (result.length === 0){
return null;



} else{

return result.data;

}




  if (iMASTER.check('channel_name', channel_name)){
  
  
    
  }


}








}





}






var  channel_name = null ;
const YoutubeChannelCard= ({activeChannelInfo}) => {

  const { title, thumbnails, description } = activeChannelInfo;

 // "title": "Tech God",
  //"description"
  const thumbnailUrl = thumbnails?.default.url;
  console.log({activeChannelInfo});
  return (

 
    <div className="max-w-xs bg-white text-slate-600 dark:text-slate-200 dark:bg-slate-500 shadow-lg rounded-lg overflow-hidden mx-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{activeChannelInfo.title}</h2>
        <div className="flex items-center mb-2">
          <img
            src={thumbnailUrl}
            alt="Channel Logo"
            className="h-6 w-6 rounded-full mr-2"
          />
          <span className="text-gray-700 text-sm">{activeChannelInfo.description}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Channel Description
        </p>
        <div className="flex justify-between">
          <button className="bg-red-500 text-white px-3 py-1 rounded-lg mr-2 text-xs">
            Subscribe
          </button>
          <button className="bg-blue-500 text-white px-3 py-1 rounded-lg mr-2 text-xs">
            Custom Button 1
          </button>
          <button className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs">
            Custom Button 2
          </button>
        </div>
      </div>
    </div>
  );
};





// Usage:










const youtubeEmbedUrl = 'https://www.youtube.com/embed/';

const handleMouseEvent = (e) => {
  e.preventDefault();
  // Do something
};






const location="Serv Page";

  

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
  const [channelName, setChannelName]= useState(null);
  const [newSearch, setNewSearch] = useState (true);
  const [activeChannelInfo, setactiveChannelInfoInfo] = useState ({});
  const [activePlaylist, setActivePlaylist] = useState ();
  const [showActivePlaylist, setShowActivePlaylist] = useState ();
  const [activeVideo, setActiveVideo] = useState (null);
  const [channelPlaylists, setChannelPlaylists] = useState (null);

  const [ channelShowInfo, setChannelShowInfo ] = useState (false);
  const [playlistVideos, setPlaylistVideos] = useState (null);
  const [nowPlaylistVideos, setNowPlaylistVideos] = useState (null);
  const [ channelShowPlaylist, setChannelShowPlaylist ] = useState (false);
  const [ channelShowPlaylistVideo, setChannelShowPlaylistVideo ] = useState (false);
  const [ singlePlaylist, setSinglePlaylist ] = useState (false);
  const [ singlePlaylistInfo, setSinglePlaylistInfo ] = useState (false);
  const [ singleVideo, setSingleVideo ] = useState (false);
  const [ singleSearch, setSingleSearch ] = useState (false);

  const [ channelShowVideos, setChannelShowVideos ] = useState (false);
const [ hidder, setHidder] =useState();
  //const [ channelShowInfo, setChannelShowInfo ] = useState (true);


  const [playlistId, setPlaylistId] = useState(null);
  
  
  
  
  //************************* .  handlers      */

      
  
  const HandleMouseOver = async (handle)=>{
    console.log(handle.id)
  }

  const HandleMouseOut = async (handle)=>{
    console.log(handle.id)
  }

  const HandleClick= async (handle)=>{


    //setShowActivePlaylist()


    console.log({handle});
    if(handle.host ==='channel'){
      setChannelShowInfo(false);
    
    }
    
    
    if(handle.host ==='channel' && handle.handle ==='playlist'){
    
      setChannelShowPlaylist(!channelShowPlaylist);
      setChannelShowInfo(false);
     // setActiveVideo
    
    }



        //  Videos from Play list
    if(handle.host ==='playlist' && handle.handle ==='videos'){

console.log(" Handle id = "+handle.id , "activePlaylist= "+activePlaylist);


if(singlePlaylist === activePlaylist){

 // setShowActivePlaylist(!showActivePlaylist);

}
    
 if(handle.id === activePlaylist){

  setActivePlaylist(null);
    setShowActivePlaylist(!showActivePlaylist);

 //console.log("  000002 ----- new reguest "+handle.id , "old one is "+ activePlaylist);

     //const plVideos = await GetVideosFromPlaylistId(handle.id)
     // setPlaylistVideos(plVideos);
     //setNowPlaylistVideos

     // setActivePlaylist(null);
      if(handle.id){
      const nowPlVideos = playlistVideos.filter(list=>{return activePlaylist=== list.id;
      })
}

if(singlePlaylist){
  const nowPlVideos = playlistVideos.filter(list=>{return activePlaylist=== singlePlaylist;
  })
}
    //console.log("plVideos");
    
    setNowPlaylistVideos(playlistVideos);


     } else{


      console.log("  000003 -----   after id= "+handle.id , "after active= "+activePlaylist);
  
      setPlaylistVideos([{}]);
      
      const plVideos = await GetVideosFromPlaylistId(handle.id)
     


     if(plVideos) {
      
      setActivePlaylist(handle.id);
      setPlaylistVideos(plVideos);
      setShowActivePlaylist(true);
      setNowPlaylistVideos(plVideos);
      //console.log(" Ready!--------------------");


     }
      //setPlaylistVideos(plVideos);
      //setShowActivePlaylist(!showActivePlaylist);


     }
    // console.log(plVideos);


 
    
    //  setChannelShowPlaylist(!channelShowPlaylist);
     // setChannelShowInfo(false);
    
    }
    
 


    }  //end of handle click function
    

    const HandleInfo=(props)=>{
    
    
      
    }

const Handlers={
Click:HandleClick,
MouseOver:HandleMouseOver,
MouseOut: HandleMouseOut

    }
const  HandleYoutubeSeach =  async  (inSearch, e)=>{
  localStorage.setItem("lastYoutubeSearch", inSearch);
  e.preventDefault();



//const eShow = await YouTube.GetID(inSearch);
const eShow = await GetYoutubeID(inSearch);
  console.log({eShow});

if(eShow.video_id){
  setNewSearch(false);
//$('#showtest').append("Video  ID is = : "+eShow.video_id+"<BR>" );



setSingleVideo(eShow.video_id);
const vLoader = await GetVideoInfoFromID(eShow.video_id);

setActiveVideo(vLoader);

//setSingleVideoInfo()

}

if(eShow.channel_id){
  setNewSearch(false);
//$('#showtest').append("Video  ID is = : "+eShow.video_id+"<BR>" );

}



if(eShow.channel_name){
  setNewSearch(false);
 channel_name = eShow.channel_name;
  setYtSearchChN(channel_name);
  setChannelName(channel_name);
  //ChannelName
console.log(channel_name);



 const ChannelPlaylistLoad = await GetPlayListFromChannelName(channel_name);
  
 setChannelPlaylists(ChannelPlaylistLoad);


 const allCFx  = await GetChannelInfoFromChannelName(channel_name);
 const activeChannelInfoInfo =  allCFx.channel_details;

 setactiveChannelInfoInfo(activeChannelInfoInfo);



}


  if(eShow.playlist){
    setNewSearch(false);

    setSinglePlaylist(eShow.playlist);
    setActivePlaylist(eShow.playlist);

    if(activePlaylist === eShow.playlist){


//console.log("=============================101=========================");


    }
    else
 

{


 // console.log("=============================202=========================");
 
  const plInfo = await GetPlayListInfoFromPlaylistID(eShow.playlist);
 setSinglePlaylistInfo(plInfo);

      const plVideos = await GetVideosFromPlaylistId(eShow.playlist);
      setPlaylistVideos(plVideos);
  
}


    //$('#showtest').append("Playlist ID  : "+eShow.playlist+"<BR>" );
    
    }

    if(eShow.channel_id){
      setNewSearch(false);
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
    <div className=' w-full flex flex-wrap   flex-center '>
  <div id="info" className='  gap-2 flex flex-wrap w-screen led   h-8' >   

  <div className="flex flex-wrap flex-auto gap-2 p-1">
   <div className="flex flex-wrap h-8 rounded-lg ring-2  w-80 "> Welcome </div>  <div id="wrapper" className="rounded-lg ring-2 flex-auto  led overflow-hidden text-green-200  w-[400px] bg-black px-300 h-8 " >    <div id="ticker" className='led text-green-200 h-8' >  Welcome to Info text box. we are here for you  </div> 
</div>  <div className="flex flex-wrap h-8 rounded-lg ring-2  w-80 "> Welcome </div> 
 </div></div> 
    <div className='w-screen   dark:bg-slate-900 dark:text-gray-100 ' >
  <div className= '   h-auto bg-slate-200 text-gray-800 dark:bg-slate-950  dark:text-gray-100 p-2 '>

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


    <div id="mainwindow" className= ' h-auto min-h-max flex flex-wrap gap-2  '>



<div className='bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200  dark:bg-slate-800 rounded-lg px-2 py-2 ring-1 ring-slate-900/5 shadow-xl w-80'  > 

<div className="flex  hover:bg-gray-500 px-2  bg-gray-300 0 dark:text-gray-200 dark:bg-gray-900  rounded-lg h-7 text-sm"  asin="conrolbar" >
 <span  className={cpMenuTab=='home' ? "imedia-cp-menu-button-active rounded-l" : "imedia-cp-menu-button rounded-l"}  >
  <button  onClick={()=>{setCpMenuTab('home') }} className=" ">
   <UilHome  size="20" color="blue"  /> 
  </button></span>
  <button  onClick={()=>{setCpMenuTab('youtube') ;  if(cpMenuTab=='youtube') setNewSearch(!newSearch)}}  className={cpMenuTab=='youtube' ? "imedia-cp-menu-button-active " : "imedia-cp-menu-button "}>
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

<div className="imedia-cp-menu-active-tab flex flex-auto h-[500px] max-[440px] rounded-md">
{cpMenuTab=='home'&&( <div>
  <h2 className="imedia-Tab-title"> Home</h2>
<div>




</div>

</div>

)}
{cpMenuTab=='youtube'&&( <div className="w-full overflow-hidden">

{newSearch&&(
<div>

  

<h2 className="imedia-Tab-title"> Youtube Search </h2>
 <input  id="youtubesearch" className="ring-2 p-2 w-full rounded-md "
  value={ytSearchInput}



 onChange={e =>{ setYtSearchInput(e.target.value); HandleYoutubeSeach(e.target.value, e)}} />



</div>


        )}




    

{ytSearchChN && (
  <div className=""  onMouseLeave={()=>{ if(channelShowPlaylist)setChannelShowInfo(false)}}   onMouseEnter={()=>{  if(!channelShowPlaylist)setChannelShowInfo(true)}}>
  <ChannelCard channel={activeChannelInfo} channelShowInfo ={channelShowInfo} HandleClick={HandleClick} />



  </div>
 

)}




{ytSearchId && (
  <div className="">
  



  </div>
 

)}


<div className="overflow-x-auto h-96 max-[400px] bg-red-399 " >
   




   {channelShowPlaylist && channelPlaylists ? (<div className="overflow-x-auto pt-2">
    <div className="rounded-lg">

    { channelPlaylists.map((playlist) => (



<div  className ={hidder}>

<div  className=' bg-slate-100 dark:bg-slate-800  text-slate-900 dark:text-slate-200  rounded-xl ring-2 '>

      <div key={playlist.id} > <PlaylistCard playlist ={playlist } videos={playlistVideos} active ={activePlaylist}  HandleClick={HandleClick} /> </div>
    
    

    </div>
</div>


    ))}



    </div>

    


    </div>  ) : (<div>
      
        <p> </p>


      


        </div>
      )}


{ singlePlaylist&&playlistVideos &&(
<div> 

<PlaylistCard playlist ={singlePlaylistInfo } videos={ playlistVideos } active = {activePlaylist} Handlers  HandleClick={HandleClick} />

</div>


)}
  { singleVideo&&activeVideo  &&(
<div> 

<VideoListCard video={activeVideo } Handlers={Handlers} HandleClick={HandleClick} />

</div>


)}
                  
    </div>

</div>)}
{cpMenuTab=='web'&&( 
  <div>
<h2 className="imedia-Tab-title"> WEB Links</h2>
</div>
)}

{cpMenuTab=='file'&&( 
  <h2 className="imedia-Tab-title"> Local File upload</h2>

)}

{cpMenuTab=='url'&&( 
  <h2 className="imedia-Tab-title"> Remote File Server</h2>

)}

</div>


 </div>

  <div className="'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg px-2 py-2 ring-1 ring-slate-900/5 shadow-xl flex-auto overflow-y-auto ">CUE!
  <p  id="info" className="mx-2   text-gray-900 flex   flex-auto" >03:34:44</p>


  <div id="showtest" className='text-black dark:text-white'>
 

 
  

  </div>
  
  
  </div> 
    <div className=" bg-white dark:bg-slate-800 rounded-lg px-2 py-2 ring-1 ring-slate-900/5 shadow-xl w-80 overflow-y-auto">play list LIVE!</div>

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
<div className=" h-100 w-screen bd-black " ></div>
</div>
  )
}

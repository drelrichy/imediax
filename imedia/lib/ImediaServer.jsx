

'use server'
import { google } from 'googleapis';
import { MongoClient } from 'mongodb';
const mongoURI = process.env.MONGODB_URI;
const maxResults = 50;
//const API_KEY="AIzaSyAb-L-8Xxz1iyf6Xb5RI9mVFLhqCbuYJU0";
const API_KEY="AIzaSyBigzrNaaq2QxjHS9lObezzuaB7wby08_U";

const youtube = google.youtube({
  version: 'v3',
  auth: API_KEY
});
//import { React, useState, useEffect } from 'react';
//import $ from "jquery";

const MASTER= {



}





//'AIzaSyC_Np_qFsUC1YvnxJAr5-YNFVMzLPREp-s';
 export const ImediaServer  = ()=>  {

 //welcome :()=>{},  
}

export async function getYoutubeChannelData(channelIdentifier) {
  const youtube = google.youtube({
    version: 'v3',
    auth: API_KEY, // Make sure to set up your API key
  });

  //const maxResults = 500;


  
  //const { channelIdentifier } = req.query;
  //const apiKey = process.env.YOUTUBE_API_KEY;

  const apiKey = API_KEY;
  const mongoURI = process.env.MONGODB_URI;

  try {
    const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('youtube'); // Replace 'your_database_name' with your database name
    const collection = db.collection('channels');

    // Check if channel information exists in the database


    const channelInfo = await collection.findOne({
      $or: [
        { channel_id: channelIdentifier },
        { channel_name: channelIdentifier }
      ]
    });

    console.log('// Check if channel information exists in the database == 0011 ==>>', channelInfo );
    if (channelInfo) {
      // If channel information exists in the database, send it back
     return (channelInfo);

    } else {
     const channelName= channelIdentifier;

      const channelResponse = await youtube.search.list({
        q: channelName,
        part: 'id',
        type: 'channel',
      });
    
      // Extract the channel ID from the response
      const channelId = channelResponse.data.items[0].id.channelId;
    
      // Get the playlists associated with the channel
      const playlistResponse = await youtube.playlists.list({
        channelId,
        part: 'snippet',
        maxResults:maxResults,
      });

      const playlists = playlistResponse.data.items.map(item => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnails: item.snippet.thumbnails,
      }));

      // If channel information doesn't exist in the database, fetch from YouTube API
     // const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelIdentifier}&key=${apiKey}`);
     const response = await fetch(  `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${channelIdentifier}&maxResults=${maxResults}&type=channel&key=${apiKey}`);

      if (!response.ok) {
        throw new Error('Failed to fetch channel information');

      }

      const data = await response.json();


      console.log('Check if channel information exists in the data == 0022 ==>>', data);
      console.log( '{data}');
      console.log( {data});

      if (data.items.length === 0) {

        throw new Error('Channel not found');

      }

      const fetchedChannelInfo = data.items[0];
  
      console.log({data});

      console.log({fetchedChannelInfo});

      // Store the fetched channel information in the database



      await collection.insertOne({
        channel_title: fetchedChannelInfo.snippet.title,
        channel_name: channelIdentifier,
        channel_id: fetchedChannelInfo.id.channelId,
        channel_info: fetchedChannelInfo,
        channel_playlists : playlists
      });

    return (fetchedChannelInfo);
    }

    client.close();
  } catch (error) {
    console.error('Error fetching and storing channel information:', error);
   return({ error: error.message || 'Failed to fetch and store channel information' });
  }
}


export async function getYoutubeVideo(videoId) {
  //const { videoId } = req.query;
  const apiKey = process.env.API_KEY;
  const mongoURI = process.env.MONGODB_URI;

  try {
    const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('youtube'); // Replace 'your_database_name' with your database name
    const collection = db.collection('videos');

    // Check if video information exists in the database
    const videoInfo = await collection.findOne({
      video_id: videoId
    });

    if (videoInfo) {
      // If video information exists in the database, send it back
      res.status(200).json(videoInfo);
    } else {
      // If video information doesn't exist in the database, fetch from YouTube API
      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${apiKey}`);

      if (!response.ok) {
        throw new Error('Failed to fetch video information');
      }

      const data = await response.json();

      if (data.items.length === 0) {
        throw new Error('Video not found');
      }

      const fetchedVideoInfo = data.items[0];

      // Store the fetched video information in the database
      await collection.insertOne({
        video_id: fetchedVideoInfo.id,
        video_data: fetchedVideoInfo
      });

      return (fetchedVideoInfo);
    }

    client.close();
  } catch (error) {
    console.error('Error fetching and storing video information:', error);
return ({ error: error.message || 'Failed to fetch and store video information' });
  }
}


export async function GetPlaylist (channel_id, callback){

// Replace 'YOUR_API_KEY' with your actual YouTube Data API key
var API_KEY = process.env.YOUTUBE_API_KEY;

// Channel ID of the YouTube channel from which you want to retrieve playlists
var channelID = channel_id;

// Number of playlists to retrieve

//var maxResults = 50;

// Fetch playlists from the channel using the YouTube Data API
fetch(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelID}&maxResults=${maxResults}&key=${API_KEY}`)
    .then((response )=>{ 
        
        
      const   data = response.json().then((data)=>{

       callback(data.items);
     return  data.items;
    

      } )
    
   
    
    })
   
    .catch(error => console.error('Error fetching playlists:', error));



}

export async function YouTubeGetID(urll){
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



 return  data;
 //"{"+dataTye+":'"+data+"' , Playlist:'"+playList+"' "


}

export const  GetPlaylistFromChanelN = async (channel_id, callback) =>{

  // Replace 'YOUR_API_KEY' with your actual YouTube Data API key
  var API_KEY = process.env.YOUTUBE_API_KEY;
  
  // Channel ID of the YouTube channel from which you want to retrieve playlists
  var channelID = channel_id;
  
  // Number of playlists to retrieve
  
  //----------var maxResults = 50;
  
  // Fetch playlists from the channel using the YouTube Data API
  fetch(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelID}&maxResults=${maxResults}&key=${API_KEY}`)
      .then((response )=>{ 
          
          
        const   data =  response.json().then((data)=>{
  
        if(callback)callback(data.items);
       return  data.items;
      
  
        } )
      
     
      
      })
     
      .catch(error => console.error('Error fetching playlists:', error));
  
  
  
  }
  

  MASTER.GetPlayListFromChannelName=[];

  //console.log({MASTER});

export async function GetPlayListFromChannelName(channelName ) {


 
  //const { channelName } = req.query;

  // Set up the YouTube Data API client
  const youtube = google.youtube({
    version: 'v3',
    auth: API_KEY, // Make sure to set up your API key
  });




  try {

    const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
    const db = client.db('youtube'); 
    const collection = db.collection('channels');



    const channelInfo = await collection.findOne({
      $or: [
        { channel_id: channelName},
        { channel_name: channelName }
      ]
    });

    console.log('// Check if channel information exists in the database == 0011 ==>>', channelInfo );
    if (channelInfo) {
      // If channel information exists in the database, send it back
     return (channelInfo.channel_playlists);

    } else {
     //const channelName= channelIdentifier;

      const channelResponse = await youtube.search.list({
        q: channelName,
        part: 'id',
        type: 'channel',
      });
    
      // Extract the channel ID from the response
      const channelId = channelResponse.data.items[0].id.channelId;
    
      // Get the playlists associated with the channel
      const playlistResponse = await youtube.playlists.list({
        channelId,
        part: 'snippet',
        maxResults:maxResults,
      });

      const playlists = playlistResponse.data.items.map(item => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnails: item.snippet.thumbnails,
      }));

      // If channel information doesn't exist in the database, fetch from YouTube API
     // const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelIdentifier}&key=${apiKey}`);
     const response = await fetch(  `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${channelName}&maxResults=${maxResults}&type=channel&key=${apiKey}`);

     /*** 
     const xresponse = await youtube.channels.list({
      part: 'snippet',
      forUsername: channelName,
      maxResults: 1
    });

*/
      if (!response.ok) {
        console.log(response);
        throw new Error('Failed to fetch channel information');

  

      }

      const data = await response.json();


      //console.log('Check if channel information exists in the data == 0022 ==>>', data);
     // console.log( '{data}');
     // console.log( {data});

      if (data.items.length === 0) {

        throw new Error('Channel not found');

      }

      const fetchedChannelInfo = data.items[0];


      const newData ={

        channel_title: fetchedChannelInfo.snippet.title,
        channel_name: channelName,
        channel_id: fetchedChannelInfo.id.channelId,
        channel_info: fetchedChannelInfo,
        channel_playlists : playlists, 
        channel_details: fetchedChannelInfo.snippet

      };
  
      console.log({data});

      console.log({fetchedChannelInfo});

      // Store the fetched channel information in the database

      await collection.insertOne({
        ...newData
      });

      MASTER.GetPlayListFromChannelName.push({channelName, playlists});

      //console.log({MASTER});
  
      // Return the playlists
  //console.log({playlists});
     return (playlists);


    
    }

    client.close();

/*** 
    // Search for the channel by name
    const channelResponse = await youtube.search.list({
      q: channelName,
      part: 'id',
      type: 'channel',
    });

    // Extract the channel ID from the response
    const channelId = channelResponse.data.items[0].id.channelId;

    // Get the playlists associated with the channel
    const playlistResponse = await youtube.playlists.list({
      channelId,
      part: 'snippet',
      maxResults:maxResults ,
    });

    // Extract the playlist information from the response
    const playlists = playlistResponse.data.items.map(item => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnails: item.snippet.thumbnails,
    }));



*/




  

  } catch (error) {

    console.error('Error fetching playlist:', error);

   return { error: 'Failed to fetch playlist' };
  }
}

export async function GetPlayListAllFromChannelName(channelName ) {
  //const { channelName } = req.query;

  // Set up the YouTube Data API client
  const youtube = google.youtube({
    version: 'v3',
    auth: API_KEY, // Make sure to set up your API key
  });

  console.log('API_KEY ------------------>',API_KEY);
  try {
    // Search for the channel by name
    const channelResponse = await youtube.search.list({
      q: channelName,
      part: 'id',
      type: 'channel',
    });

    // Extract the channel ID from the response
    const channelId = channelResponse.data.items[0].id.channelId;

    // Get the playlists associated with the channel
    const playlistResponse = await youtube.playlists.list({
      channelId,
      part: 'snippet',
      maxResults:maxResults ,
    });

    // Extract the playlist information from the response
    const playlists = playlistResponse.data.items.map(item => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnails: item.snippet.thumbnails,
    }));

    // Return the playlists

   return (playlistResponse.data);

  } catch (error) {

    console.error('Error fetching playlist:', error);

   return { error: 'Failed to fetch playlist' };
  }
}


export  async function GetPlayListInfoFromPlaylistID(playlist_id ) {
 // const { playlist_id } = req.query;

  try {

    const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
    const db = client.db('youtube'); 
    const collection = db.collection('playlist');



    // Check MongoDB for playlist info
    const playlistInfo = await collection.findOne({ playlist_id });

    if (playlistInfo) {
     return playlistInfo;
     //({ message: 'Playlist info found in MongoDB', playlistInfo });




     
    } else {
      // Playlist info not found in MongoDB, fetch from YouTube API
      const youtubeResponse = await youtube.playlists.list({
        part: 'snippet',
        id: playlist_id,
      });

      if (youtubeResponse.data.items.length === 0) {
        
        return({ message: 'Playlist not found in MongoDB or YouTube API' });
        return;
      }

      // Update MongoDB with playlist info
      const yData  = youtubeResponse.data.items[0].snippet;
      yData.id =playlist_id;
      await collection.insertOne(yData );
      await client.close();
      // Return feedback
      //res.status(200).json({ message: 'Playlist info updated in MongoDB', title, description });
      return yData ;
    }
  } catch (error) {
    console.error('Error:', error);
    return({ message: 'Internal Server Error' });
  }
  
  finally {
   
  }
}

// pages/api/youtube.js



export async function GetChannelInfoFromChannelName(channelName) {


  //const { channelName } = req.query;
  //const apiKey = process.env.YOUTUBE_API_KEY; // Your YouTube Data API key
  const apiKey = API_KEY; // Your YouTube Data API key
  
 
  try {

    const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
    const db = client.db('youtube'); // Replace 'your_database_name' with your database name
    const collection = db.collection('channels');
/** 
    // Check if channel information exists in the database
    const channelInfo = await collection.findOne({
      channel_name: channelName
    });


    const response = await fetch(  `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${channelName}&type=channel&key=${apiKey}`);

    if (!response.ok) {
      throw new Error('Failed to fetch channel details');
    }

    const data = await response.json();


    if (data.items.length > 0) {
      const channelDetails = data.items[0].snippet;
      return (channelDetails);
    } else {
      return ({ message: 'Channel not found' });
    }
    */


    const channelInfo = await collection.findOne({
      $or: [
        { channel_id: channelName},
        { channel_name: channelName }
      ]
    });

    console.log('// Check if channel information exists in the database == 0011 ==>>', channelInfo );
    if (channelInfo) {
      // If channel information exists in the database, send it back
     return (channelInfo);

    } else {
     //const channelName= channelIdentifier;

      const channelResponse = await youtube.search.list({
        q: channelName,
        part: 'id',
        type: 'channel',
      });
    
      // Extract the channel ID from the response
      const channelId = channelResponse.data.items[0].id.channelId;
    
      // Get the playlists associated with the channel
      const playlistResponse = await youtube.playlists.list({
        channelId,
        part: 'snippet',
        maxResults:maxResults,
      });

      const playlists = playlistResponse.data.items.map(item => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnails: item.snippet.thumbnails,
      }));

      // If channel information doesn't exist in the database, fetch from YouTube API
     // const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelIdentifier}&key=${apiKey}`);
     const response = await fetch(  `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${channelName}&maxResults=${maxResults}&type=channel&key=${apiKey}`);

     /*** 
     const xresponse = await youtube.channels.list({
      part: 'snippet',
      forUsername: channelName,
      maxResults: 1
    });

*/
      if (!response.ok) {
        console.log(response);
        throw new Error('Failed to fetch channel information');

  

      }

      const data = await response.json();


      console.log('Check if channel information exists in the data == 0022 ==>>', data);
      console.log( '{data}');
      console.log( {data});

      if (data.items.length === 0) {

        throw new Error('Channel not found');

      }

      const fetchedChannelInfo = data.items[0];


      const newData ={

        channel_title: fetchedChannelInfo.snippet.title,
        channel_name: channelName,
        channel_id: fetchedChannelInfo.id.channelId,
        channel_info: fetchedChannelInfo,
        channel_playlists : playlists, 
        channel_details: fetchedChannelInfo.snippet

      };
  
      console.log({data});

      console.log({fetchedChannelInfo});

      // Store the fetched channel information in the database



      await collection.insertOne({
        ...newData
      });

    return ({newData});
    }

    client.close();

  } catch (error) {
    console.error('Error fetching channel details:', error);
    return ({ message: 'Internal Server Error' });
  }
}


MASTER.GetVideosFromPlaylistId = [];
export async function GetVideosFromPlaylistId(playlistId) {

  


  //const { channelName } = req.query;
  //const apiKey = process.env.YOUTUBE_API_KEY; // Your YouTube Data API key
  const apiKey = API_KEY; // Your YouTube Data API key
  console.log('API_KEY,playlistId');
  console.log(API_KEY,playlistId);
  if (!apiKey) {
    return ({ message: 'API key not found' });
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${playlistId}&key=${API_KEY}`
    );

  
    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }

    const data = await response.json();
    const videos = data.items.map(item => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url,
    }));
console.log(videos);

MASTER.GetVideosFromPlaylistId.push({playlistId, videos});

console.log({MASTER});

    return videos;
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
}


export async function GetVideoInfoFromID(videoId) {
 // const { videoId } = req.query;
 // const mongoURI = process.env.MONGODB_URI;

  try {
    const client = await MongoClient.connect(mongoURI, {  useUnifiedTopology: true });
    const db = client.db('youtube'); // Replace 'your_database_name' with your database name
    const collection = db.collection('videos');

    // Check if video information exists in the database
    const videoInfo = await collection.findOne({
      video_id: videoId
    });

    if (videoInfo) {
      // If video information exists in the database, send it back
   return(videoInfo);
    } else {
      // If video information doesn't exist in the database, fetch from YouTube API
      const response = await youtube.videos.list({
        part: 'snippet,contentDetails',
        id: videoId,
        maxResults: 1
      });

     // const fetchedVideoInfo = await response.data.items[0];

     const myVideo  = await response.data.items[0].snippet;

    // console.log(response.data.items[0] );

     const  yVideo =    { 
      
      
      vid: myVideo.video_id ,
    duration  : response.data.items[0].contentDetails.duration,
  thumbnail : myVideo.thumbnails.default.url,
  ... myVideo
     }
       // video_data: fetchedVideoInfo
     // console.log(myVideo.thumbnail);

      // Store the fetched video information in the database
      await collection.insertOne(
        yVideo
      );

    return(yVideo);
    }

    client.close();
  } catch (error) {
    console.error('Error fetching and storing video information:', error);
   return({ error: error.message || 'Failed to fetch and store video information' });
  }
}




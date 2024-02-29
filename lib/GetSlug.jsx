import React from 'react';

 let slug = url => new URL(url).pathname.match(/[^\/]+/g)

export const GetSlug = (fromURL) => {

   

    return  slug(fromURL);
 
}


export const GetLastSlug = (fromURL) => {


    //let slug = url => new URL(url).pathname.match(/[^\/]+/g)


   const  tokenids = slug(fromURL);

  //console.log ( "lenth of -->",tokenids.length-1);
   //console.log( "Final answer",tokenids[ tokenids.length-1]);

   return    tokenids[ tokenids.length-1];


    
 
}

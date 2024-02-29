import React from 'react'

export const userActivation = async (token) => {
const tokenid= token;
const API_WEB = process.env.API_PATH+"/activate/";  

  console.log("----------------------------API-->",API_WEB);
  
  try{
    //if(false){
      const activate = await fetch( API_WEB, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenid }),
      });
  
      const respond = await resUserExists.json();
  
      if (respond.error) {
        setError(respond.error);
        return;
      }
  
      if (respond.message) {
        setMessage(respond.message);
        return;
      }
  
  
    } catch (error) {
  
      console.log("Error during Arivation: ", error);
    }
  };
  

export const UserTokenActivate = () => {
  return (
    <div>UserTokenActivate</div>
  )
}

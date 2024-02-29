"use client";
import Link from "next/link";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, redirect} from "next/navigation";
import { setting } from "./Setup";
const HOST = setting.HOST;

console.log(HOST);

export default function Reset({params}) {

//const loginAction  =  userActivation (params.action)

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  //const [doaction, setDoaction] = useState("");
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  //const router = useRouter()
  //same name as name of your file, can be [slug].js; [specialId].js - any name you want
 
  const handleSubmit = async (e) => {

 e.preventDefault();

//const username = email;

 //try {
  const resUserExists = await fetch(HOST+"api/userExists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email}),
  });

  //console.log(resUserExists);

  const { user } = await resUserExists.json();

  if (!user) {
    setError("Sorry we cant find that user. Please check or Register it");
    return;
  } else {


setMessage(" Processing ... Please wait");

  }


  const res = await fetch(HOST+"api/password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },



    body: JSON.stringify({
      email
  
    }),
  });
const feedback= await res.json();;
  //console.log({email, username});
 // console.log(JSON.parse({res}));
const feedMessage = feedback.message;
const feedError = feedback.error;
 
  if (res.ok) {
    const form = e.target;
    form.reset();
const goNow="login?message="+ JSON.stringify(feedMessage);
window.location.href = HOST+goNow
   // redirect(goNow);
    console.log('will go  to /login');
    setTimeout(() => {
      console.log('going to /login');
      const goNow="/login?message="+feedMessage;
   // redirect( goNow);
    }, 3000);
  
   setMessage(feedMessage );
   setError("");

   // router.push("/");
    console.log(feedMessage);
  } else {
    const goNow="/login?error="+feedError;
    window.location.href = HOST+goNow
   // redirect("/forgot?error="+feedError)
    console.log('going to /forgot')
    setTimeout(() => {
    console.log("/forgot");
  
   // redirect("/forgot");
    }, 3000);
  
 setError(feedError);
 setMessage("");
   
  }
  
//} catch (error) {
  //setError(error);
  //console.log("Error while requesting  Reset of Password: ", error);
//}

  };


 // if (loginAction) setError(loginAction);
  const returnn= `(
 
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-800">
        <h1 className="text-xl font-bold my-4">Request a Password Reset</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => {setEmail(e.target.value);setError("");setMessage("")}}
            type="text"
            placeholder="Email"
          />
      
          <button className="bg-green-900 text-white font-bold cursor-pointer px-6 py-2">
            Reset Password ::
          </button>
          {message && (
            <div className="bg-blue-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

 {error && ( <Link className="text-sm mt-3 text-left" href={"/forgot"}>
            forgot password? <span className="underline">Reset it</span>
          </Link> )}
          <Link className="text-sm mt-6 " href={"/register"}>
           New account?<span className="underline">Register</span>
          </Link> <Link className="text-sm mt-6 " href={"/forgot"}><span className="underline">Reset</span></Link>
        </form>
      </div>
  
  );`

  return (

    <div>
    
    <section className="h-screen">
    <div className="h-full">
    
    {//<!--- Left column container with background-->
    }
      <div
        className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
        <div
          className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="w-full"
            alt="Sample image" />
        </div>
    
      { // <!-- Right column container -->
      }
        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
     <form onSubmit={handleSubmit}  >
          { // <!--Sign in section-->
          }
            <div
              className="flex flex-row items-center justify-center lg:justify-start">
              <p className="mb-0 mr-4 text-lg">Forgot Password?</p>
    
              { //<!-- Google -->
          }
              <button
               onClick={() => {
                signIn('google');
              }}
                type="button"
                data-te-ripple-init
                data-te-ripple-color="light"
                className="mx-1 h-9 w-9 rounded-full bg-green-900  uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
             { //{  //  <!-- Google -->
             }
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path 
                    d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z" />
                </svg>
              </button>
    
          { //<!-- Facebook -->
          }
              <button
                onClick={() => {
                  signIn('facebook');
                }}
                type="button"
                data-te-ripple-init
                data-te-ripple-color="light"
                className="mx-1 h-9 w-9 rounded-full bg-green-900  uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
             { //{  //  <!-- Facebook -->
             }
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path 
                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </button>
    
            { // <!-- Twitter -->
            }
              <button
                type="button"
                data-te-ripple-init
                data-te-ripple-color="light"
                className="mx-1 h-9 w-9 rounded-full bg-green-900   uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
             { //{  //  <!-- Twitter -->
             }
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </button>
    
          {  //{  //  <!-- Linkedin -->
          }
              <button
                type="button"
                data-te-ripple-init
                data-te-ripple-color="light"
                className="mx-1 h-9 w-9 rounded-full bg-green-900  uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
           {  // {  //  <!-- Linkedin -->
           }
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </button>
            </div>
    
          {  //  <!-- Separator between social media sign in and email/password sign in -->
    }
            <div
              className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p
                className="mx-4 mb-0 text-center font-semibold dark:text-white">
            Request Password Reset
              </p>
            </div>

            {message && (
                <div className="bg-blue-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                  {message}
                </div>
              )}
              {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                  {error}
                </div>
              )}
    
    
      {  
            
            //  <!-- Email input -->
          }
            <div className="relative mb-6" data-te-input-wrapper-init>
              <input
                type="text"
                onChange={(e) => {setEmail(e.target.value);setError("");setMessage("")}}
             placeholder="Email"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="iemail"
              />
              <label 
                for="iemail"
                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >Email address
              </label>
    
            </div>
    
    
    
            <div className="mb-6 flex items-center justify-between">
          
    
              {  //  <!-- Remember me checkbox -->
      }
           
                <input
                  onChange={(e) => {setRemember(e.target.value);}}
                  className="relative hidden float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-green-900  checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-green-900  dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                  type="checkbox"
                  value=""
                 />
        
                <label 
                  className=" hidden pl-[0.15rem] hover:cursor-pointer"
                  for="ipass">Remember me 
                </label> 
                
      
            </div>
    
            <div className="text-center lg:text-left"> 
           
    
              <button
          
                className=" bg-green-900   rounded  px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light">Request Reset-Password
              </button>
    
    
              <div className="mb-6 flex items-center justify-between">
    
       <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]" hidden >
    
        {//  <!--Forgot password link-->
          }
          <a href="#!" hidden >Forgot password?</a>
           
              
              </div>
    
          {//  <!--Any link-->
    }
              <a href="#!" hidden >custom link </a>
            </div>
    
              
           
          
    
          {  //  <!-- Login button -->
          }
           
    
            {  //  <!-- Register link -->
            }
    
              <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                Don't have an account?
                <Link  className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                 href={"/register"}>
                Register</Link>  <Link  className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                 href={"/forgot"}>
                or Reset-Password</Link>
                  
              </p>
            
    
     {error && ( <Link className="text-sm mt-3 text-left" href={"/forgot"}>
                forgot password? <span className="underline">Reset it</span>
              </Link> )}
    
            </div>
          </form>
        </div>
      </div>
    </div>
    </section>
    
    
      </div>
      )
    



}



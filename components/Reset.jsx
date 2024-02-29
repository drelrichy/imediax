"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Reset({params}) {
  const HOST = process.env.HOST_URL;
//const loginAction  =  userActivation (params.action)

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [doaction, setDoaction] = useState("");
  const router = useRouter();


  //const router = useRouter()
  //same name as name of your file, can be [slug].js; [specialId].js - any name you want
 
  const handleSubmit = async (e) => {

 e.preventDefault();

//const username = email;

 try {
  const resUserExists = await fetch(HOST+"api/userExists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email}),
  });

  const { user } = await resUserExists.json();

  if (!user) {
    setError("Sorry we cant find that user. Please check or Register it");
    return;
  }

  const res = await fetch(HOST+"api/password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },



    body: JSON.stringify({
      email, username
  
    }),
  });
const feedback= await res.json();;
  //console.log({email, username});
 // console.log(JSON.parse({res}));

 
  if (res.ok) {
    const form = e.target;
    form.reset();
   
   setMessage(feedback.message);
   // router.push("/");
    console.log(res.message);
  } else {
   
 setError(feedback.error);
   
  }
} catch (error) {
  setError(error);
  console.log("Error during registration: ", error);
}
  };


 // if (loginAction) setError(loginAction);
  return (
 
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
  
  );
}

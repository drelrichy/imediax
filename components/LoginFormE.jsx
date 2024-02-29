"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


//params.token




//try{
  if(false){

    const resUserExists = await fetch("./api/activate/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tokenid:token }),
    });

    const respond = await resUserExists.json();

   

  }


 // } catch (error) {

    console.log("Error during Arivation: ", error);
 // }






export async function LoginForm() {

//console.log("===========================....>>>>",params.token);
 

  //await userActivation(params.token,(feedback)=>{ setMessage(feedback);})


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [next, setNext] = useState("");


  const router = useRouter();

  //setError(params.token);
 // console.log(params.token);

  //const { pid } = router?.query
 // setError(pid);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

    
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (

      <div className="shadow-lg p-5 rounded-lg border-t-4 border-orange-400">
        <h1 className="text-xl font-bold my-4">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button className="bg-orange-600 text-white font-bold cursor-pointer px-6 py-2">
            Login
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
  {message && (
            <div className="bg-green-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {message}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/register"}>
            need an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
   
  );
}

export default LoginForm;
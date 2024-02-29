import LoginForm from "@/components/LoginFormE";
import { getServerSession } from "next-auth";
import { authOptions} from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import {userActivation} from '@lib/UserTokenActivate'



export default async function Page({ params }){

//console.log(params.token);

const mss =  userActivation (params.token);



//const session = await getServerSession(authOptions);
 

//if (session) redirect("/");




  return (
    <main>
      <LoginForm />
    
    </main>
  );




  }
import LoginForm from "@/components/LoginFormM";
//import TwElementsDemo from "@/components/TwElementsDemo";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions} from "@/app/api/auth/[...nextauth]/route";

//import dynamic from "next/dynamic";

//const TwElementsDemo  = dynamic(() => import("@//TwElementsDemo "), { ssr: false });


export default async function Home(params) {
  const session = await getServerSession(authOptions);
const {action } = params;
  console.log("we have a winner",{params});

if (session) redirect("/");

  return (
    <main>
    <LoginForm  params={params} /> 
    
 { //<TwElementsDemo  params={params} /> 
 }
    </main>

  );
}

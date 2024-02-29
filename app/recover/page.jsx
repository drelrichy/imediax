
import Newpass from "@/components/Newpass";
import { useSearchParams } from 'next/navigation'
//import TwElementsDemo from "@/components/TwElementsDemo";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions} from "@/app/api/auth/[...nextauth]/route";

export default async function Home({params}) {



const session = await getServerSession(authOptions);
  if (session) redirect("/");


//const {action } = params;
  console.log({params});



  return (



    <main>
    <Newpass    action={params.action}  /> 
    
 { //<TwElementsDemo  params={params} /> 
 }
    </main>

);
}

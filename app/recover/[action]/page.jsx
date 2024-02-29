import Newpass from "@/components/Newpass";
//import TwElementsDemo from "@/components/TwElementsDemo";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions} from "@/app/api/auth/[...nextauth]/route";

//import dynamic from "next/dynamic";

//const TwElementsDemo  = dynamic(() => import("@//TwElementsDemo "), { ssr: false });


export default async function Home({params}) {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
 const action = params.action;



//const {action } = params;
  console.log("we have a winner..01",action);



  return (



    <main>
    <Newpass    action={params.action} /> 
    
 
    </main>

  );
}

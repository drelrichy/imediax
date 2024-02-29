import Newpass from "@/components/Newpass";
//import TwElementsDemo from "@/components/TwElementsDemo";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions} from "@/app/api/auth/[...nextauth]/route";

//import dynamic from "next/dynamic";

//const TwElementsDemo  = dynamic(() => import("@//TwElementsDemo "), { ssr: false });


export default async function Home(params) {

  
  const router = useRouter();
  const { action, slug } = router.query;

  useEffect(() => {
    // You can use the values of action and slug here for further logic or data fetching
    console.log('Action:', action);
    console.log('Slug:', slug);

    // Example: Fetch data based on action and slug
    // fetchData(action, slug);
  }, [action, slug]);


//const {action } = params;
  console.log("we have a winner",{params});

if (session) redirect("/");

  return (



    <main>
    <Newpass    action={action} slug={slug} /> 
    
 { //<TwElementsDemo  params={params} /> 
 }
    </main>

  );
}

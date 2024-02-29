import LoginForm from "@/components/LoginFormM";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions} from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);



  return (
    <main>
      <LoginForm />
    </main>
  );
}

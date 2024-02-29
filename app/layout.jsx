import "@/styles/globals.css";
import "@/styles/imedia.css";
import Nav from "@/components/Navbar";
import Footer from "@/components/Footer";
import Provider from "@/components/Provider";


import { Roboto, Inter } from "next/font/google";
const roboto = Roboto({ weight: "400", subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "1TV Admin",
  description: "Discover, Fund, Manage & Share Community Projects",
};

const RootLayout = ({ children }) => (

  <html lang='en'>


    <body className=' w-full bg-gray-300 text-gray-900 dark:bg-gray-900 flex gap-0  dark:text-gray-300 m-0 p-0'>

      <Provider>
      
        
        <main className='w-full h-screen p-0 m-0 flex flex-auto '>
      <Nav />  <div className='w-full flex h-screen flex-auto top-0 mt-0 '> 
          {children}</div>
          <Footer/>
        </main>
      </Provider>

    </body>
  </html>
);

export default RootLayout;

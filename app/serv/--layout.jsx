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


    <body>
      <Provider>
        <div className='w-full h-full'>
      

      
      <Nav />  <div className=' relative'> 
          {children}</div> 
          <Footer/>
        </div>
      </Provider>

    </body>
  </html>
);

export default RootLayout;

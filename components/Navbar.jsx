"use client";
import Link from "next/link";
import Image from "next/image";
//import ImediaClock from "@/imedia/lib/ImediaClock"
import DarkModeSwitch from '@/components/DarkModeSwitch';
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import $ from "jquery";
import ThemeSwitch from '@/components/ThemeSwitch';
import {  ImediaClock } from '@/imedia/lib/Imedia';
import { FaCaretDown } from "react-icons/fa";


//const{ ImediaClock} = Imedia;


let vData="";


const Nav = () => {




    const { data: session } = useSession();
    //const [ctime, setTime] = useState(time);
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [showDrawer, setshowDrawer] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    
    const [showSignInDropdown, setShowSignInDropdown] = useState(false);
    const [isDarkMode, setIsDarkMode]= useState (true);

    const location="Navbar";
 

//if(typeof ycount === 'undefined'){let ycount =0};
var ycount = 0;


    function testIT (e){
      ycount++;
      //const evid=Event;
        //$("#ChannelClock").text(e.id);
        $("#info").text(e+" @ "+location+" = "+ycount);
        $("#showtest").text(e+" @ "+location+" = "+ycount);
        console.log(e.id+" @ "+location+" = "+ycount);
      }
  
    useEffect(() => { (async () => {


        const res = await getProviders();
        
        setProviders(res);
       // console.log({res});
   

      })();
    }, []);
  


    
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

 
  const handleLogin = () => {
    setIsLoggedIn(isLoggedIn);
    setProfilePicture(profilePicture);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setProfilePicture(null);
  };

  return (
    <div className="w-full  h-7 sticky flex flex-auto top-0 z-50  px-2 rounded-xl   ">
      <nav className=" bg-black z-50 rounded-lg p-0 flex flex-auto h-7 ">
      
      
      <Link href='/' className='flex gap-2 m-2  flex-center'>
        <Image
          src='/assets/images/1tvadmin.png'
          alt='logo'
          width={80}
          height={40}
          className='object-contain m-0 p-0'
        />
        <p className='logo_text' width='300px'>  </p>
      </Link>
  

     

        {
  // Start of Puldown menu
}
 <div id='pull down menu'  className=" . z-30 text-gray-100 absolute end-2 bg-slate-800  hover:bg-blue-600  rounded-lg h-7  ">
<button  type="button"
  //isExternal
onClick={() => setShowProfileDropdown(!showProfileDropdown)}
  className=" text-sm w-auto p-1 font-normal text-default-600 bg-default-100 flex-wrap flex  min-w-40 mx-1 gap-1"
  //href={siteConfig.links.sponsor}
  //startContent={<HeartFilledIcon className="text-danger" />}
  
  variant="flat"
>
{profilePicture ? (
                  <Image
                  height={30}
                  width={30}
                    src={profilePicture}
                    alt="Profile"
                    className="w-6 h-6 rounded-full"
                  />
                ):(  <img width={20} src="/assets/images/profiles.png"  />)}
   
<span className=" flex flex-wrap"> {session?.user ? session?.user.name  : "Login/Register"} <FaCaretDown/> </span>
  
</button>

{showProfileDropdown && 
<div
onMouseLeave={() => setShowProfileDropdown(!showProfileDropdown)}
className=" absolute  rounded-lg z-30 ring-1 bg-slate-800   p-4  mt-[4px]  flex-wrap text-sm font-normal text-default-600 bg-default-100 ">
{session?.user?(
<ul>
<li><a className=' block w-full p-1   mb-2  rounded-lg ring-1  hover:bg-blue-600 ' href='#'>Profile: { session?.user.email}</a></li>	
<li>	<Link  className='block w-full p-1   mb-2  rounded-lg ring-1 hover:bg-blue-600 ' href='#'><ThemeSwitch className=" block w-full" /></Link></li>	
<li>	<Link  className='block w-full p-1   mb-2  rounded-lg ring-1 hover:bg-blue-600 ' href='#'>Channel </Link></li>	
<li><Link className='block w-full p-1   mb-2  rounded-lg ring-1 hover:bg-blue-600'  href='/create-prompt'>Create-Prompt</Link></li>
<li>	<Link className='block w-full p-1   mb-2 rounded-lg ring-1 hover:bg-blue-600 ' href='#'> Settings </Link></li>	
<li>	<Link  onClick={signOut}  className='block w-full p-1   mb-2  rounded-lg ring-1 hover:bg-blue-600 ' href='#'>Sign-Out </Link></li>	

</ul>): (
<ul>
<li><Link href='/login' className=' block w-full p-1   mb-2  rounded-lg ring-1  hover:bg-blue-600 '>User Sign-In </Link></li>	
<li>	<Link href='/register'   className='flex flex-auto p-1   mb-2  rounded-lg ring-1 hover:bg-blue-600 '>User Sign-UP </Link></li>	

{providers &&  
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className=' flex flex-auto p-1  min-w-32 mb-2  rounded-lg ring-1  hover:bg-blue-600 '
                >
                <Image  
                //src = {"https://authjs.dev/img/providers/"+provider.id+".svg"}
                src = {"/assets/images/"+provider.id+".svg"}
                  width={15}
                  height={15}
                  margin={0}
                  padding={0}
                //  className='' className='flex gap-3 md:gap-5'
                  alt={provider.id+" Login"}
              
                /> {provider.name}</button> 
              
          
               
              ))}

<li>	<Link href='/forgot'  className='flex flex-auto p-1   mb-2 rounded-lg ring-1 hover:bg-blue-600 '>Reset Password </Link></li>	
<li>	<Link  className='flex flex-auto p-1   mb-2  rounded-lg ring-1 hover:bg-blue-600 ' href='#'><ThemeSwitch/></Link></li>	

</ul>)}
</div>

} </div >
{
  // end of Pulldown menu
}

<div className=" flex flex-wrap w-screen">

<Link  href='/about'className=" p-1 flex-auto" >  </Link>
<Link  href='/about'className=" p-1 flex-auto" >  </Link>
<Link  href='/about'className=" p-1 flex-auto" >  </Link> 
<div className=" p-1 flex flex-auto" > </div>
<p  id="SystemClock" className=" led text-green-300 mx-2   flex flex-auto  " > <ImediaClock/> </p> 

</div>
    
      </nav>


  
  
  
  
  
  
   </div>
  );
};

export default Nav;










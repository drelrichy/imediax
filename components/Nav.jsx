"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);


  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
      console.log({res});
    })();
  }, []);



  
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/1tvadmin.png'
          alt='logo'
          width={100}
          height={50}
          className='object-contain'
        />
        <p className='logo_text' width='300px'>::</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>

            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>  <Link href='/login'>
  <p className='logo_text' width='300px'>Login with</p>

          </Link>
           <div className='flex'>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
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
              <Link href='/register'>
               <p className='logo_text' width='300px'> or Register</p> 
              </Link>
             </div>
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={50}
              height={50}
              className='rounded-full'
              alt='dashboard'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/dashboard'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Dashboard
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Add Channel
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;

import { useTheme } from "next-themes";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';


export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)

    const {theme, setTheme} = useTheme();

      // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return null
  }
  return (

<div className=" block w-full">
      <button onClick={toggleDarkMode} className=" block w-full"  >


        {theme === 'dark' ? '(Light )' : '( Dark )'}
        <FontAwesomeIcon icon={theme === 'dark'  ? faSun : faMoon} />
      </button>
      {/* Additional UI or logic can be added here */}
    </div>
  )
}



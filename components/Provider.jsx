'use client';
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

const Provider = ({ children, session }) => (
  <ThemeProvider attribute="class">
    <SessionProvider session={session}>
    {children}
  </SessionProvider>
   </ThemeProvider>
)




export default Provider;

import "@styles/globals.css";

import Nav from "@components/Navbar";
import Provider from "@components/Provider";

export const metadata = {
  title: "1TV Admin",
  description: "Discover, Fund, Manage & Share Community Projects",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <Provider>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;

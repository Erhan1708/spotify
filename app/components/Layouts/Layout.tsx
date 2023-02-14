import Head from 'next/head';
import React, { FC, ReactNode } from 'react';
import Header from '../Header';
import Player from '../Player';

type LayoutProps = {
   children: ReactNode
}

const Layout:FC<LayoutProps> = ({children}) => {
   return (
      <div>
         <Head>
            <title>Музыкальная площадка</title>
         </Head>
         <Header />
         {children}
         <Player/>
      </div>
   );
};

export default Layout;
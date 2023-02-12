import React, { FC, ReactNode } from 'react';
import Header from '../Header';
import Player from '../Player';

type LayoutProps = {
   children: ReactNode
}

const Layout:FC<LayoutProps> = ({children}) => {
   return (
      <div>
         <Header />
         {children}
         <Player/>
      </div>
   );
};

export default Layout;
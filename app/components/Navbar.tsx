import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import {navBar} from "../constants/index"

const Navbar = () => {
   const {pathname}= useRouter()

   return (
      <div className='block_nav'>
            {
               navBar.map(item => {
                  return (
                     <Link className={pathname == item.path ? 'active' : ''} key={item.id} href={item.path} >{item.title}</Link>
               )
            })
            }
      </div>
   );
};

export default Navbar;
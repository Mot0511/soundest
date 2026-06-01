'use client'
import React, { useEffect, useState } from 'react';
import '../globals.css'
import Nav from '../components/nav/nav'
import MobileNav from '../components/mobileNav/mobileNav'
import { Provider } from 'react-redux';
import { setupStore } from '../store';

const layout = ({children}: {children: React.ReactNode}) => {

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.screen.width <= 840) {
      setIsMobile(true);
    }
  }, [])

  return (
    <Provider store={setupStore()}>
      <div className="service">
        {
            !isMobile
              ? <Nav />
              : <MobileNav />
        }
        <div className="page">
          {children}
        </div>
      </div>
    </Provider>
  ); 
};

export default layout;
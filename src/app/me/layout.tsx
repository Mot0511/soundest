'use client'

import React, { useEffect } from 'react';
import '../globals.css'
import Nav from '../components/nav/nav'
import MobileNav from '../components/mobileNav/mobileNav'
import { Provider } from 'react-redux';
import { setupStore } from '../store';

const layout = ({children}: {children: React.ReactNode}) => {

  return (
    <Provider store={setupStore()}>
      <div className="service">
        {
          typeof window !== 'undefined' && window.screen.width >= 840
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
'use client'

import React, { useEffect } from 'react';
import '../globals.css'
import Nav from '../components/nav/nav'
import { Provider } from 'react-redux';
import { setupStore } from '../store';

const layout = ({children}: {children: React.ReactNode}) => {

  return (
    <>
      <div className="service">
        <Nav />
        <div className='page'>
          {children}
        </div>
      </div>
    </>
  );
};

export default layout;
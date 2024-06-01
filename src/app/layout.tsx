'use client'

import React, { useEffect } from 'react';
import './globals.css'
import Nav from './components/nav/nav'
import { Provider } from 'react-redux';
import { setupStore } from './store';
import { useTypedDispatch } from './hooks/useTypedDispatch';
import { getItems } from './services/fetchItems';
import icon from './img/favicon.png'

const layout = ({children}: {children: React.ReactNode}) => {

  return (
    <Provider store={setupStore()}>
      <html>
        <head>
          <title>Soundest</title>
          <link rel='icon' href='/src/app/img/favicon.png' />
        </head>
        <body>
          <Nav />
          <div className='page'>
            {children}
          </div>
        </body>
      </html>
    </Provider>
  );
};

export default layout;
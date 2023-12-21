import React from 'react';
import './globals.css'
import Nav from './components/nav/nav'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <html>
      <head>

      </head>
      <body>
        <Nav />
        <div className='page'>
          {children}
        </div>
      </body>
    </html>
  );
};

export default layout;
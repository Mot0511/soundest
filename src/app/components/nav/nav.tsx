import React from 'react';
import cl from './nav.module.sass'
import Link from 'next/link';
import Fillbutton from '../UI/fillbutton';

const nav = () => {
    return (
        <div className={cl.nav}>
            <h1 className={cl.heading}><Link href='/'>Soundest</Link></h1>
            <ul className={cl.menu}>
                <li><Link href='/'>Моя музыка</Link></li>
                <li><Link href='/'>Плейлисты</Link></li>
            </ul>
            <Fillbutton style={{marginBottom: '50px'}} fullwidth={true}>Загрузить музыку</Fillbutton>
        </div>
    );
};

export default nav;
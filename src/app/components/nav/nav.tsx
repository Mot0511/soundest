import React, { useEffect, useState } from 'react';
import cl from './nav.module.sass'
import Link from 'next/link';
import Fillbutton from '../UI/fillbutton';
import { useTypedDispatch } from '@/app/hooks/useTypedDispatch';
import { addItem, getItems } from '@/app/services/fetchItems';
import { ItemsSlice } from '@/app/store/reducers/ItemsSlice';
import { useTypedSelector } from '@/app/hooks/useTypedSelector';
import { getPlaylists } from '@/app/services/fetchPlaylists';
import cookie from 'react-cookies'
import { useRouter } from 'next/navigation'
import { getAuth, signOut } from 'firebase/auth';

const Nav = () => {

    // const [cookie, setCookie, removeCookie] = useCookies()
    const login = cookie.load('login')
    const auth = getAuth();
    const dispatch = useTypedDispatch()
    const {fetchItems} = ItemsSlice.actions
    const isLoading = useTypedSelector(states => states.items.isLoading)
    const router = useRouter()
    
    const uploadSong = async () => {
        const files = (document.getElementById('file') as HTMLInputElement).files
        login && addItem(login, files, dispatch)
    }

    const logout = () => {
        signOut(auth).then(() => {
            cookie.remove('login')
            router.push('/login')
        })
    }
    return (
        <div className={cl.nav}>
            <h1 className={cl.heading}><Link href='/'>Soundest</Link></h1>
            <ul className={cl.menu}>
                <li><Link href='/'>Моя музыка</Link></li>
                <li><Link href='/playlists'>Плейлисты</Link></li>
            </ul>
            <div>
                <input multiple onChange={login && uploadSong} type="file" id='file' hidden accept='.mp3' />
                <Fillbutton style={{marginBottom: '10px', width: '100%', height: '40px'}} fullwidth={'true'}><label htmlFor='file'>Загрузить музыку</label></Fillbutton>
                <Fillbutton onClick={logout} style={{marginBottom: '50px', width: '100%', height: '40px'}} fullwidth={'true'}>Выйти</Fillbutton>
            </div>
        </div>
    );
};

export default Nav;
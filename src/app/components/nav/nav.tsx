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
import { auth, dbRef, storageRef } from '@/app/services/firebase';
import { get, set } from 'firebase/database';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import ItemType from '@/app/types/ItemType';

const Nav = () => {

    const user = auth.currentUser
    
    const dispatch = useTypedDispatch()
    const {fetchItems} = ItemsSlice.actions
    const isLoading = useTypedSelector(states => states.items.isLoading)
    const router = useRouter()
    
    const uploadSong = async () => {
        const files = (document.getElementById('file') as HTMLInputElement).files
        user && addItem(files, dispatch)
    }

    const logout = () => {
        signOut(auth).then(() => {
            router.push('/')
        })
    }

    return (
        <div className={cl.nav}>
            <h1 className={cl.heading}><Link href='/'>Soundest</Link></h1>
            <ul className={cl.menu}>
                <li><Link href='/'>Моя музыка</Link></li>
                <li><Link href='/me/playlists'>Плейлисты</Link></li>
            </ul>
            <div>
                <input multiple onChange={uploadSong} type="file" id='file' hidden accept='.mp3' />
                <Fillbutton style={{marginBottom: '10px', width: '100%'}} fullwidth={'true'}><label htmlFor='file'>Загрузить музыку</label></Fillbutton>
                <Fillbutton onClick={logout} style={{marginBottom: '50px', width: '100%', height: '40px'}} fullwidth={'true'}>Выйти</Fillbutton>
            </div>
        </div>
    );
};

export default Nav;
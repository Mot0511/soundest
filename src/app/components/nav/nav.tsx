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

    const users_ = {
        'artiteev': 'SmiygKOPf0VmR6RmynCyV4ZcJiv1',
        'colocup': 'SeDK74nXflhLzqVsnbkpORcUKmH2',
        'dima48ma': 'e5u7kUkI4zOrX0vYtPWdhjt3W553',
        'kirillvetoshkin5': 'jEiVITQPjgSWWPtAKD1i7fLfDci2',
        'mat0511': 'WHXGjYtc5bfoADszcfFCrqeG02K2',
        'myshanson2006': 'j3o2MalS2hg0h2uuel8hWNyKPzz2',
        'suvorovmatvej9': 'gAXzlErPXvRuVEZRVYb9phUHfhB2',
        'xboxm428': 'crWyMAx2QxgZOfRaX4k37dBWp3g1'
    }
    
    const tmp = () => {
        get(dbRef('/users')).then(snap => {
            const users = snap.val()
            for (let uid in users) {
                const user = users[uid]
                if (user.hasOwnProperty('songs')) {
                    user['songs'].forEach((song: ItemType) => {
                        getDownloadURL(storageRef(`/${user.email.split('@')[0]}/${song.id}.mp3`))
                            .then(url =>{ 
                                const xhr = new XMLHttpRequest();
                                xhr.responseType = 'blob';
                                xhr.onload = (event) => {
                                    const blob = xhr.response;
                                    uploadBytes(storageRef(`/${users_[user.email.split('@')[0]]}/${song.id}.mp3`), blob)
                                    console.log(blob)
                                };
                                xhr.open('GET', url);
                                xhr.send();
                            })
                    })
                }
            }
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
                <input multiple onChange={user && uploadSong} type="file" id='file' hidden accept='.mp3' />
                <Fillbutton style={{marginBottom: '10px', width: '100%'}} fullwidth={'true'}><label htmlFor='file'>Загрузить музыку</label></Fillbutton>
                <Fillbutton onClick={logout} style={{marginBottom: '50px', width: '100%', height: '40px'}} fullwidth={'true'}>Выйти</Fillbutton>
            </div>
        </div>
    );
};

export default Nav;
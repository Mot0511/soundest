import React, { useEffect, useState } from 'react';
import cl from './mobileNav.module.sass'
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
import { IconContext } from 'react-icons';
import { GiHamburgerMenu } from 'react-icons/gi';
import { auth } from '@/app/services/getApp';

const MobileNav = () => {

    const user = auth.currentUser
    const dispatch = useTypedDispatch()
    const {fetchItems} = ItemsSlice.actions
    const isLoading = useTypedSelector(states => states.items.isLoading)
    const router = useRouter()
    const [isMenuExpanded, setIsMenuExpanded] = useState<Boolean>(false)
    
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
        <div className={cl.nav} style={{height: isMenuExpanded ? '270px' : '40px'}}>
            <div className={cl.nav__top}>
                <h1 className={cl.heading}><Link href='/'>Soundest</Link></h1>
                <button className={'resetBtn'} onClick={() => setIsMenuExpanded(!isMenuExpanded)}>
                    <IconContext.Provider value={{ size: "3.5em", color: "#fffff" }}>
                        <GiHamburgerMenu />
                    </IconContext.Provider>
                </button>
            </div>
            <ul className={cl.menu}>
                <li><Link href='/'>Моя музыка</Link></li>
                <li><Link href='/me/playlists'>Плейлисты</Link></li>
            </ul>
            <div className={cl.nav__btns}>
                <input multiple onChange={user && uploadSong} type="file" id='file' hidden accept='.mp3' />
                <Fillbutton style={{marginBottom: '10px', width: '100%'}} fullwidth={'true'}><label htmlFor='file'>Загрузить музыку</label></Fillbutton>
                <Fillbutton onClick={logout} style={{marginBottom: '50px', width: '100%', height: '40px'}} fullwidth={'true'}>Выйти</Fillbutton>
            </div>
        </div>
    );
};

export default MobileNav;
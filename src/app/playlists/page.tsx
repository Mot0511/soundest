'use client'

import React, { useState } from 'react';
import cl from './style.module.sass'
import { useTypedSelector } from '../hooks/useTypedSelector';
import Loading from '../components/loading/loading'
import Playlist from '../components/playlist/playlist'
import Fillbutton from '../components/UI/fillbutton';
import Myinput from '../components/UI/myinput/myinput';
import { IconContext } from 'react-icons';
import { FaCheck } from 'react-icons/fa';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { PlaylistsSlice } from '../store/reducers/PlaylistsSlice';
import {useCookies} from 'react-cookie'
import { redirect } from 'next/navigation'

const Page = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    
    const login = useCookies()[0].login
    const {list, isLoading, error} = useTypedSelector(states => states.playlists)
    const dispatch = useTypedDispatch()
    const {addPlaylist} = PlaylistsSlice.actions
    const [isCreating, setIsCreating] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    if (!cookies.login){
        redirect('/login')
    }
    const objMap = (obj: any) => {
        const array: React.ReactNode[] = []
        for (let i in obj){
            array.push(<Playlist name={i} data={obj[i]} />)
        }
        return array
    }

    const createPlaylist = () => {
        dispatch(addPlaylist([login, name]))
    }

    return (
        <div>
            <h1 className="heading">Плейлисты</h1>
            <Fillbutton onClick={() => setIsCreating(!isCreating)}>Создать плейлист</Fillbutton><br />
            {
                isCreating && <div style={{display: 'flex', marginTop: '20px'}}>
                <Myinput text='Название' value={name} onChange={e => setName(e.target.value)} />
                <Fillbutton onClick={createPlaylist} style={{width: '30px', height: '30px', marginLeft: '10px', padding: '0', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><br />
                    <IconContext.Provider value={{size: '1.2em', color: '#fff'}}>
                        <FaCheck />
                    </IconContext.Provider>
                </Fillbutton>
            </div>
            }
            
            <div className={cl.list}>
                {
                    isLoading
                        ? <Loading />
                        : error
                            ? <h2>Произошла ошибка</h2>
                            : objMap(list)
                }
            </div>
        </div>
    );
};

export default Page;
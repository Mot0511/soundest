'use client'

import React, { useState } from 'react';
import cl from './playlist.module.sass'
import Link from 'next/link';
import Fillbutton from '../UI/fillbutton';
import { IconContext } from 'react-icons';
import { RxCross2 } from 'react-icons/rx';
import { MdEdit } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { PlaylistsSlice } from '@/app/store/reducers/PlaylistsSlice';
import Myinput from '../UI/myinput/myinput';
import { useTypedDispatch } from '@/app/hooks/useTypedDispatch';
import cookie from 'react-cookies'
import { auth } from '@/app/services/firebase';


const Playlist = ({name, data}: {name: string, data: number[]}) => {
    
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const {removePlaylist, editPlaylist} = PlaylistsSlice.actions
    const [newName, setNewName] = useState<string>(name)
    const dispatch = useTypedDispatch()

    return (
        <div>
            <Link href={isEditing ? '' : `/me/playlists/${name}`}><div className={cl.playlist+' '+(!isEditing ? cl.itemActive : '')}>
                {
                    isEditing
                        ? <Myinput style={{width: '100%', marginLeft: '10px'}} text='Название' value={newName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)} />
                        : <h2>{name}</h2>
                }
            </div></Link><br />
            <div className={cl.btns}>
                <Fillbutton onClick={() => setIsEditing(true)} style={{width: '150px', height: '50px', padding: '5px', marginBottom: '20px'}}>
                    <IconContext.Provider value={{size: '2em', color: '#fff'}}>
                        <MdEdit />
                    </IconContext.Provider>
                </Fillbutton>
                {
                    isEditing
                        ? <Fillbutton onClick={() => {
                            dispatch(editPlaylist([name, newName]))
                            name = newName
                            setIsEditing(false)
                            }} style={{width: '60px', height: '50px', paddingTop: '5px', paddingLeft: '10px', marginBottom: '20px'}}>
                            <IconContext.Provider value={{size: '2em', color: '#fff'}}>
                                <FaCheck />
                            </IconContext.Provider>
                        </Fillbutton>
                        : <Fillbutton onClick={() => dispatch(removePlaylist(newName))} style={{width: '60px', height: '50px', paddingTop: '5px', paddingLeft: '10px', marginBottom: '20px'}}>
                            <IconContext.Provider value={{size: '2em', color: '#fff'}}>
                                <RxCross2 />
                            </IconContext.Provider>
                        </Fillbutton>
                }
                
            </div>
            
        </div>
    );
};

export default Playlist;
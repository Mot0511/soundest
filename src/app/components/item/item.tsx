'use client'

import React, { useState } from 'react';
import cl from './item.module.sass'
import ItemType from '@/app/types/ItemType';
import Fillbutton from '../UI/fillbutton';
import { RxCross2 } from "react-icons/rx";
import { IconContext } from 'react-icons';
import { removeSong } from '@/app/services/fetchItems';
import { useTypedDispatch } from '@/app/hooks/useTypedDispatch';
import Myinput from '../UI/myinput/myinput'
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { ItemsSlice } from '@/app/store/reducers/ItemsSlice';
import { GoPlus } from "react-icons/go";
import { useTypedSelector } from '@/app/hooks/useTypedSelector';
import Loading from '../loading/loading';
import { PlaylistsSlice } from '@/app/store/reducers/PlaylistsSlice';
import cookie from 'react-cookies'

const Item = ({item, onClick, playlist=''}: {item: ItemType, onClick: (id: number) => void, playlist: string}) => {
    const login = cookie.load('login')

    const [title, setTitle] = useState<string>(item.title)
    const [author, setAuthor] = useState<string>(item.author)

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [isAdding, setIsAdding] = useState<boolean>(false)

    const dispatch = useTypedDispatch()
    const {editItem} = ItemsSlice.actions
    const {addItem, removeItem} = PlaylistsSlice.actions
    const {list, isLoading, error} = useTypedSelector(states => states.playlists)

    const objMap = (obj: any) => {
        const array: React.ReactNode[] = []
        for (let i in obj){
            array.push(
            <div className={cl.item+' '+cl.itemActive} onClick={() => {
                setIsAdding(!isAdding)
                dispatch(addItem([login, i, item.id]))
            }}>
                <p className={cl.title}>{i}</p>
            </div>)
        }
        return array
    }
    
    const remove = () => {
        removeSong(dispatch, login, item.id, list)
    }
    const removeFromPlaylist = () => {
        dispatch(removeItem([login, playlist, item.id]))
    }

    return (
        <div>
        <div className={cl.itemContainer}>
            <div className={cl.item + ' ' + (isEditing ? '' : cl.itemActive)} onClick={isEditing ? undefined : () => onClick(item.id)}>
            {
                isEditing
                    ? <>
                        <Myinput text='Название' value={title} onChange={(e: any) => setTitle(e.target.value)} style={{marginRight: '10px'}} />
                        <Myinput text='Автор' value={author} onChange={(e: any) => setAuthor(e.target.value)} />
                    </>
                    : <>
                        <p className={cl.title}>{item.title}</p>
                        <p className={cl.author}>{item.author}</p>
                    </>
            }
            </div>
            <Fillbutton onClick={() => setIsAdding(true)} style={{width: '50px', height: '50px', marginLeft: '10px', padding: '0'}}>
                    <IconContext.Provider value={{size: '2em', color: '#fff'}}>
                        <GoPlus />
                    </IconContext.Provider>
            </Fillbutton>
            <Fillbutton onClick={() => setIsEditing(true)} style={{width: '50px', height: '50px', marginLeft: '10px', padding: '0'}}>
                    <IconContext.Provider value={{size: '2em', color: '#fff'}}>
                        <MdEdit />
                    </IconContext.Provider>
            </Fillbutton>
            {
                isEditing
                    ? <Fillbutton onClick={() => {
                        dispatch(editItem([login, item.id, {title: title, author: author}]))
                        setIsEditing(false)

                    }} style={{width: '50px', height: '50px', marginLeft: '10px', padding: '0'}}>
                        <IconContext.Provider value={{size: '2em', color: '#fff'}}>
                            <FaCheck />
                        </IconContext.Provider>
                    </Fillbutton>

                    : <Fillbutton onClick={playlist ? removeFromPlaylist : remove} style={{width: '50px', height: '50px', marginLeft: '10px', padding: '0'}}>
                    <IconContext.Provider value={{size: '2em', color: '#fff'}}>
                        <RxCross2 />
                    </IconContext.Provider>
                </Fillbutton>
            }
            
        </div>
        <div className={cl.selectPlaylist}>
        
            {
                isAdding 
                    ? isLoading
                        ? <Loading /> 
                        : error
                            ? <h2>Произошла ошибка</h2>
                            : <>
                            <h3>Выберите плейлист</h3>
                            {objMap(list)}
                            </>
                    : ''
                }
        </div>
        </div>
        
    );
};

export default Item;
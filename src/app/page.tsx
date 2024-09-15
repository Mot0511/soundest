'use client'

import React, { useEffect, useState } from 'react';
import cl from './page.module.sass'
import Item from './components/item/item'
import Player from './components/player/player'
import { getDownloadURL, ref } from 'firebase/storage';
import { storageRef } from './services/getApp';
import Loading from './components/loading/loading'
import { useTypedSelector } from './hooks/useTypedSelector';
import cookie from 'react-cookies'
import { redirect } from 'next/navigation'
import { MdTheaterComedy } from 'react-icons/md';
import { getItems } from './services/fetchItems';
import { getPlaylists } from './services/fetchPlaylists';
import { useTypedDispatch } from './hooks/useTypedDispatch';
import Head from 'next/head';

const Page = () => {

    const login = cookie.load('login')

    const dispatch = useTypedDispatch()
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [url, setUrl] = useState<string>('')
    const [step, setStep] = useState<number>(0)
    const {items, isLoading, error} = useTypedSelector(states => states.items)
    
    // const [cookies, setCookie, removeCookie] = useCookies();

    useEffect(() => {
        if (!login){
            redirect('/login')
        }
    }, [login])

    useEffect(() => {
        login && getItems(login, dispatch)
        login && getPlaylists(login, dispatch)
    }, [])
    

    const leaf = () => {
        const newStep = Math.floor(Math.random() * items.length)
        const newSong = items[newStep]
        setIsPlaying(true)
        getUrl(newSong.id)
        setStep(newStep)
        // let newStep = 0
        // if (side){
        //     if (step < items.length - 1){
        //         newStep = step + 1
        //     }
        // } else{
        //     if (step > 0){
        //         newStep = step - 1
        //     }
        // }
        // const newSong = items[newStep]
        // setIsPlaying(true)
        // getUrl(newSong.id)
        // setStep(newStep)
    }

    const setSong = (id: number) => {
        for (let i in items){
            if (items[i].id == id){
                setStep(Number(i))
                break
            }
        }
        setIsPlaying(true)
        getUrl(id)
    }

    const getUrl = (id: number) => {
        getDownloadURL(storageRef(`/${login}/${id}.mp3`))
            .then(url =>{ 
                setUrl(url)
            })
    }

    return (
        <>
            <h1 className='heading'>Моя музыка</h1>
            {
                isLoading
                    ? <Loading />
                    : error
                        ? <h2>Произошла ошибка</h2>
                        : items.length > 1
                            ? <div className={cl.items}>
                                {
                                    [...items].reverse().map(item => <Item key={item.id} item={item} onClick={setSong} playlist={''} />)
                                }
                            </div> 
                            : <h2>У вас нет музыки</h2>      
            }    
            <div className={cl.playerContainer}>
                {
                    url
                        ? <Player data={{...items[step], url}} isPlaying={isPlaying} setIsPlaying={setIsPlaying} leaf={leaf} />
                        : <></>
                }
            </div>
        </>
    );
};``

export default Page
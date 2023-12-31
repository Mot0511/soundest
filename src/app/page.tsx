'use client'

import React, { useState } from 'react';
import cl from './page.module.sass'
import Item from './components/item/item'
import Player from './components/player/player'
import { getDownloadURL, ref } from 'firebase/storage';
import { storageRef } from './services/getApp';
import Loading from './components/loading/loading'
import { useTypedSelector } from './hooks/useTypedSelector';
import {useCookies} from 'react-cookie'
import { redirect } from 'next/navigation'
import { MdTheaterComedy } from 'react-icons/md';

const page = () => {

    const login = useCookies()[0].login

    const [isPlaying, setIsPlaying] = useState<boolean>(false);  
    const [url, setUrl] = useState<string>('')
    const [step, setStep] = useState<number>(0)
    const {items, isLoading, error} = useTypedSelector(states => states.items)
    
    const [cookies, setCookie, removeCookie] = useCookies();

    if (!cookies.login){
        console.log('Home - no cookies');
        redirect('/login')
    }

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
                        : items.length 
                            ? <div className={cl.items}>
                                {
                                    items?.map(item => <Item item={item} onClick={setSong} />)
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

export default page
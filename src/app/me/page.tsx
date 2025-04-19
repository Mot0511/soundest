'use client'

import React, { useEffect, useState } from 'react';
import cl from './page.module.sass';
import Item from '../components/item/item'
import Player from '../components/player/player'
import MobilePlayer from '../components/mobilePlayer/mobilePlayer'
import { getDownloadURL, ref } from 'firebase/storage';
import { auth, storageRef } from '../services/firebase';
import Loading from '../components/loading/loading'
import { useTypedSelector } from '../hooks/useTypedSelector';
import cookie from 'react-cookies'
import { redirect } from 'next/navigation'
import { MdTheaterComedy } from 'react-icons/md';
import { getItems } from '../services/fetchItems';
import { getPlaylists } from '../services/fetchPlaylists';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import Head from 'next/head';

const Page = () => {

    const user = auth.currentUser

    const dispatch = useTypedDispatch()
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [url, setUrl] = useState<string>('')
    const [step, setStep] = useState<number>(0)
    const {items, isLoading, error} = useTypedSelector(states => states.items)
    
    useEffect(() => {
        if (!user){
            redirect('/')
        }
    }, [user])

    useEffect(() => {
        user && !items.length && getItems(dispatch)
    }, [])
    

    const leaf = () => {
        const newStep = Math.floor(Math.random() * items.length)
        const newSong = items[newStep]
        setIsPlaying(true)
        getUrl(newSong.id)
        setStep(newStep)
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
        getDownloadURL(storageRef(`/${user?.uid}/${id}.mp3`))
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
                                    [...items].reverse().map(item => <Item key={item.id} item={item} onClick={setSong} playlist={''} />)
                                }
                            </div> 
                            : <h2>У вас нет музыки</h2>      
            }    
            <div className={cl.playerContainer}>
                {
                    url
                        ? window.screen.width >= 840
                            ? <Player data={{...items[step], url}} isPlaying={isPlaying} setIsPlaying={setIsPlaying} leaf={leaf} />
                            : <MobilePlayer data={{...items[step], url}} isPlaying={isPlaying} setIsPlaying={setIsPlaying} leaf={leaf} /> 
                        : <></>
                }
            </div>
        </>
    );
};``

export default Page
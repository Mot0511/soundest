'use client'

import React, { useEffect, useState } from 'react';
import cl from './page.module.sass';
import Item from '../components/item/item'
import Player from '../components/player/player'
import MobilePlayer from '../components/mobilePlayer/mobilePlayer'
import { getDownloadURL, ref } from 'firebase/storage';
import Loading from '../components/loading/loading'
import { useTypedSelector } from '../hooks/useTypedSelector';
import cookie from 'react-cookies'
import { redirect } from 'next/navigation'
import { MdTheaterComedy } from 'react-icons/md';
import { getItems, getURL } from '../services/fetchItems';
import { getPlaylists } from '../services/fetchPlaylists';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import Head from 'next/head';
import { getAnalytics } from 'firebase/analytics';
import { supabase } from '../services/supabase';
import Shimmer from '../components/shimmer/shimmer';

const Page = () => {

    const dispatch = useTypedDispatch()
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [url, setUrl] = useState<string>('')
    const [step, setStep] = useState<number>(0)
    const {items, isLoading, error, uploadingCount} = useTypedSelector(states => states.items)
    const {list} = useTypedSelector(states => states.playlists)

    useEffect(() => {
        !items.length && getItems(dispatch)
        getPlaylists(dispatch)
    }, [])
    

    const leaf = () => {
        const newStep = Math.floor(Math.random() * items.length)
        const newSong = items[newStep]
        setIsPlaying(true)
        getUrl(newSong.id, newSong.format)
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
        getUrl(id, items.find((i) => i.id === id)?.format)
    }

    const getUrl = async (id: number, format?: string) => {
        const user = await supabase.auth.getUser()
        const uid = user.data.user?.id;
        if (uid) {
            const ext = format ?? 'mp3'
            const url = getURL(id)
            setUrl(url)
        }
    }

    return (
        <>
            <h1 className='heading'>Моя музыка</h1>
            <div className={cl.items}>
            
            {
                isLoading
                    ? <div className='center'>
                        <Loading />
                    </div>
                    : error
                        ? <h2>Произошла ошибка</h2>
                        : items.length
                            ? <>
                                {
                                    Array.from({length: uploadingCount}, (v, k) => <Shimmer />)
                                }
                                {
                                    [...items].reverse().map(item => <Item key={item.id} item={item} onClick={setSong} playlist={''} />)
                                }
                            </>
                            : <h2>У вас нет музыки</h2>      
            } 
            </div>
            <div className={cl.playerContainer}>
                {
                    url
                        ? typeof window !== 'undefined' && window.screen.width >= 840
                            ? <Player data={{...items[step], url}} isPlaying={isPlaying} setIsPlaying={setIsPlaying} leaf={leaf} />
                            : <MobilePlayer data={{...items[step], url}} isPlaying={isPlaying} setIsPlaying={setIsPlaying} leaf={leaf} />
                        : <></>
                }
            </div>
        </>
    );
};

export default Page
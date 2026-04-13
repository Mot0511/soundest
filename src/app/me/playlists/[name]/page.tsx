'use client'

import React, { useEffect, useState } from 'react';
import cl from '../../page.module.sass'
import { useParams } from 'next/navigation'
import ItemType from '@/app/types/ItemType';
import { useTypedSelector } from '@/app/hooks/useTypedSelector';
import Item from '../../../components/item/item'
import { getDownloadURL } from 'firebase/storage';
import Player from '../../../components/player/player'
import Loading from '../../../components/loading/loading'
import cookie from 'react-cookies'
import { redirect } from 'next/navigation'
import { getPlaylists } from '@/app/services/fetchPlaylists';
import { useTypedDispatch } from '@/app/hooks/useTypedDispatch';
import { getItems } from '@/app/services/fetchItems';
import { getPublicURL, supabase } from '@/app/services/supabase';

const Page = () => {
    const name = decodeURIComponent(useParams<{name: string}>().name)
    const [isPlaying, setIsPlaying] = useState<boolean>(false);  
    const [url, setUrl] = useState<string>('')
    const [step, setStep] = useState<number>(0)

    const dispatch = useTypedDispatch()
    const [items, setItems] = useState<ItemType[]>([])
    const {list, isLoading: isLoadingPlaylists} = useTypedSelector(states => states.playlists)
    const {items: Allitems, isLoading, error} = useTypedSelector(states => states.items)

    useEffect(() => {
        !list.length && getPlaylists(dispatch)
        !Allitems.length && getItems(dispatch)
        setItems(Allitems.filter((item: ItemType) => item != undefined && list[name].includes(item.id)))
    }, [])

    useEffect(() => {
        if (isLoading) return
        setItems(Allitems.filter((item: ItemType) => item != undefined && list[name].includes(item.id)))
    }, [list]) 
    
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
    const getUrl = async (id: number) => {
        const user = await supabase.auth.getUser()
        const uid = user.data.user?.id;
        if (uid) {
            const url = getPublicURL(`songs/${uid}/${id}.mp3`)
            setUrl(url)
        }
    }
    const leaf = () => {
        const newStep = Math.floor(Math.random() * items.length)
        const newSong = items[newStep]
        setIsPlaying(true)
        getUrl(newSong.id)
        setStep(newStep)
    }

    return (
        <>
            <h1 className='heading'>{name}</h1>
            <div className={cl.items}>
            {
                isLoading
                    ? <Loading />
                    : error
                        ? <h2>Произошла ошибка</h2>
                        : Allitems.length
                            ? items.length
                                ? items.map(item => <Item key={item.id} item={item} onClick={setSong} playlist={name} />)                                
                                : <h2>В плейлисте нет музыки</h2>
                            : <h2>У вас нет музыки</h2>
            }
            </div>
            <div className={cl.playerContainer}>
                {
                    url
                        ? <Player data={{...items[step], url}} isPlaying={isPlaying} setIsPlaying={setIsPlaying} leaf={leaf} />
                        : <></>
                }
            </div>
        </>
    );
};

export default Page;
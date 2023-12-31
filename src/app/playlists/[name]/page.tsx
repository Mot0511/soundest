'use client'

import React, { useEffect, useState } from 'react';
import cl from '../../page.module.sass'
import { useParams } from 'next/navigation'
import ItemType from '@/app/types/ItemType';
import { useTypedSelector } from '@/app/hooks/useTypedSelector';
import Item from '../../components/item/item'
import { getDownloadURL } from 'firebase/storage';
import { storageRef } from '@/app/services/getApp';
import Player from '../../components/player/player'
import Loading from '../../components/loading/loading'
import {useCookies} from 'react-cookie'
import { redirect } from 'next/navigation'

const Page = () => {
    const login = useCookies()[0].login
    const [cookies, setCookie, removeCookie] = useCookies();

    const name = decodeURIComponent(useParams<{name: string}>().name)
    const [isPlaying, setIsPlaying] = useState<boolean>(false);  
    const [url, setUrl] = useState<string>('')
    const [step, setStep] = useState<number>(0)

    
    const [items, setItems] = useState<ItemType[]>([])
    const {list} = useTypedSelector(states => states.playlists)
    const {items: Allitems, isLoading, error} = useTypedSelector(states => states.items)
    if (!cookies.login){
        redirect('/login')
    }
    useEffect(() => {
        if (!isLoading){
            const tmp: ItemType[] = []
            list[name].map((id: number) => {
                if (id != 0) {
                    const item = Allitems.filter((item: ItemType) => item.id == id)[0]
                    console.log(Allitems)
                    tmp.push(item)
                }
            })
            setItems(tmp)
        }
    }, [isLoading])
    

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
    const leaf = (side: boolean) => {
        let newStep = 0
        if (side){
            if (step < items.length - 1){
                newStep = step + 1
            }
        } else{
            if (step > 0){
                newStep = step - 1
            }
        }
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
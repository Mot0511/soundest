'use client'

import React, { useEffect, useRef, useState } from 'react';
import cl from './page.module.sass'
import Item from './components/item/item'
import ItemType from './types/ItemType';
import Player from './components/player/player'
import PlayerType from './types/PlayerType';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from './services/getApp';

const page = () => {

    const [url, setUrl] = useState<string>('')
    const [step, setStep] = useState<number>(0)

    const [items, setItems] = useState<ItemType[]>([
        {
            id: 0,
            title: 'Six feet underground',
            author: 'Lord Of The Lost'
        },
        {
            id: 1,
            title: 'Zeit zu gehen',
            author: 'Unheilig'
        },
        
    ])
    useEffect(() => {
        getUrl(items[0].id)
        
    }, [])

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
        getUrl(newSong.id)
        setStep(newStep)
    }

    const getUrl = (id: number) => {
        getDownloadURL(ref(storage, `/Mot0511/${id}.mp3`))
            .then(url =>{ 
                setUrl(url)
            })
    }

    return (
        <>
            <h1 className='heading'>Моя музыка</h1>
            <div className={cl.items}>
                {
                    items?.map(item => <Item item={item} />)
                }
            </div>
            <div className={cl.playerContainer}>
                <Player data={{...items[step], url}} leaf={leaf} />
            </div>
        </>
    );
};``

export default page
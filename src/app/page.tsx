'use client'

import React, { useState } from 'react';
import cl from './page.module.sass'
import Item from './components/item/item'
import ItemType from './types/ItemType';
import Player from './components/player/player'
import PlayerType from './types/PlayerType';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from './services/getApp';

const page = () => {

    const [url, setUrl] = useState<string>('https://firebasestorage.googleapis.com/v0/b/soundest-95e52.appspot.com/o/Mot0511%2F1.mp3?alt=media&token=7f7e3ed3-8aaf-4288-abad-946e649f0c02')
    const [step, setStep] = useState<number>(0)

    const [items, setItems] = useState<ItemType[]>([
        {
            id: 0,
            title: 'Zeit zu gehen',
            author: 'Unheilig'
        },
        {
            id: 1,
            title: 'Six feet underground',
            author: 'Lord Of The Lost'
        }
    ])

    const next = () => {
        if (step < items.length - 1){
            getUrl(items[step + 1].id)
            setStep(step + 1)
        }
    }   
    const previous = () => {
        if (step > 0){
            getUrl(items[step - 1].id)
            setStep(step - 1)
        }
    }
    const getUrl = (id: number) => {
        getDownloadURL(ref(storage, `/Mot0511/${id}.mp3`))
            .then(url => setUrl(url))
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
                <Player data={{...items[step], url}} next={next} previous={previous} />
            </div>
        </>
    );
};``

export default page
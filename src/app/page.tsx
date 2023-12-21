'use client'

import React, { useState } from 'react';
import cl from './page.module.sass'
import Item from './components/item/item'
import ItemType from './types/ItemType';
import Player from './components/player/player'
import PlayerType from './types/PlayerType';

const page = () => {

    const [url, setUrl] = useState<string>('https://firebasestorage.googleapis.com/v0/b/soundest-95e52.appspot.com/o/Mot0511%2F0.mp3?alt=media&token=878c7938-bb45-4c7b-a256-7da081c3883f')
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
            setStep(step + 1)
        }
    }
    const previous = () => {
        if (step > 0){
            setStep(step - 1)
        }
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
};

export default page
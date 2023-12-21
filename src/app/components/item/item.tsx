import React from 'react';
import cl from './item.module.sass'
import ItemType from '@/app/types/ItemType';

const item = ({item}: {item: ItemType}) => {
    return (
        <div className={cl.item}>
            <p className={cl.title}>{item.title}</p>
            <p className={cl.author}>{item.author}</p>
        </div>
    );
};

export default item;
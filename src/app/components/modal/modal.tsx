import React from 'react';
import cl from './modal.module.sass'

const modal = ({children}: {children: React.ReactNode}) => {
    return (
        <>
        {
            <div className={cl.modalContainer}>
                <div className={cl.modal}>
                    {children}
                </div>
            </div>
        }
        </>
        
        
    );
};

export default modal;
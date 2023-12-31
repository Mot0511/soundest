import React from 'react';
import cl from './loading.module.sass'

const Loading = (props: any) => {
    return (
        <div className={cl.loadingContainer}>
            <div {...props} className={cl.loading}></div>
        </div>
    );
};

export default Loading;
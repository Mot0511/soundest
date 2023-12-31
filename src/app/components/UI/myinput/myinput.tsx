import React from 'react';
import cl from './myinput.module.sass'

const Myinput = (props: any) => {
    return (
        <input type="text" className={cl.input} placeholder={props.text} {...props} />
    );
};

export default Myinput;
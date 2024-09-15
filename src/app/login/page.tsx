'use client'

import React from 'react';
import cl from './login.module.sass'
import Fillbutton from '../components/UI/fillbutton';
import loginViaGoogle from '../services/loginViaGoogle';
import cookie from 'react-cookies'
import { useRouter } from 'next/navigation'

const Page = () => {
    // const [cookies, setCookie, removeCookie] = useCookies();
    const router = useRouter()
    return (
        <div className={cl.loginContainer}>
            <h1 className='heading'>Вход</h1>
            <Fillbutton onClick={() => loginViaGoogle((login) => {
                cookie.save('login', login, {path: '/', maxAge: 31536000})
                router.push('/')
            })}>Войти через Google</Fillbutton>
        </div>
    );
};

export default Page;
'use client'

import React from 'react';
import cl from './login.module.sass'
import Fillbutton from '../components/UI/fillbutton';
import loginViaGoogle from '../services/loginViaGoogle';
import {useCookies} from 'react-cookie'
import { useRouter } from 'next/navigation'

const page = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const router = useRouter()
    return (
        <div className={cl.loginContainer}>
            <h1 className='heading'>Вход</h1>
            <Fillbutton onClick={() => loginViaGoogle((login) => {
                router.push('/')
                setCookie('login', login)
            })}>Войти через Google</Fillbutton>
        </div>
    );
};

export default page;
'use client'
import { useEffect } from "react"
import Header from "./components/header/header"
import cookie from 'react-cookies'
import { redirect } from 'next/navigation'
import cl from './style.module.sass'

const Main = () => {

    const login = cookie.load('login')

    useEffect(() => {
        if (login){
            redirect('/me/')
        }
    }, [login])

    return (
        <>
            <Header />
            <div className={cl.def}>
                <h1 className={cl.def__text}>Soundest - это облако для хранения и прослушивания музыки</h1>
            </div>
            <div className={cl.infoBlock}>
                <h1 className="heading">зачем нужен Soundest</h1>
                <p className={cl.info}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum laboriosam praesentium minima accusantium quos? Tempora non voluptates quidem, quae quibusdam sunt numquam debitis totam dolorum aut neque voluptas similique laboriosam?
                </p>
            </div>
            <div className={cl.infoBlock}>
                <h1 className="heading">фишки сервиса</h1>
                <p className={cl.info}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum laboriosam praesentium minima accusantium quos? Tempora non voluptates quidem, quae quibusdam sunt numquam debitis totam dolorum aut neque voluptas similique laboriosam?
                </p>
            </div>
            <div className={cl.infoBlock}>
                <h1 className="heading">о создателе</h1>
                <p className={cl.info}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum laboriosam praesentium minima accusantium quos? Tempora non voluptates quidem, quae quibusdam sunt numquam debitis totam dolorum aut neque voluptas similique laboriosam?
                </p>
            </div>
        </>
    )
}

export default Main
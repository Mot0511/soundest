import loginViaGoogle from '@/app/services/loginViaGoogle'
import Fillbutton from '../UI/fillbutton'
import cl from './style.module.sass'
import cookie from 'react-cookies'
import { useRouter } from 'next/navigation'

const Header = () => {
    const router = useRouter()
    
    return (
        <div className={cl.header}>
            <h1 className='heading'>Soundest</h1>
            <ul className={cl.menu}>
                <li className={cl.menu__item}><a href="#forwhat">зачем нужен Soundest</a></li>
                <li className={cl.menu__item}><a href="#aboutme">о создателе</a></li>
            </ul>
            <div>
                <a href="https://www.rustore.ru/catalog/app/com.ms.sndst" target='_blank' className={cl.download}>скачать приложение для Android</a>
                <Fillbutton onClick={() => loginViaGoogle((login) => {
                    cookie.save('login', login, {path: '/', maxAge: 31536000})
                    router.push('/me')
                })}>Войти</Fillbutton>
            </div>
            
        </div>
    )
}

export default Header
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
                <li className={cl.menu__item}><a href="/">зачем нужен Soundest</a></li>
                <li className={cl.menu__item}><a href="#features">фишки сервиса</a></li>
                <li className={cl.menu__item}><a href="#aboutme">о создателе</a></li>
            </ul>
            <Fillbutton onClick={() => loginViaGoogle((login) => {
                cookie.save('login', login, {path: '/', maxAge: 31536000})
                router.push('/me')
            })}>Войти</Fillbutton>
        </div>
    )
}

export default Header
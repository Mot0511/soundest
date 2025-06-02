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
                <p className={cl.download}>скачайте приложение для Android <a href="https://www.rustore.ru/catalog/app/com.ms.sndst" style={{textDecoration: 'underline'}} target='_blank'>из Rustore</a> или <a href="https://drive.google.com/file/d/1AjmP--ow_N9fDvu4Uwgdwjc8brtzjDUT/view?usp=drive_link" style={{textDecoration: 'underline'}} target='_blank'>apk файл</a></p>
                <Fillbutton onClick={() => loginViaGoogle(() => {
                    router.push('/me')
                })}>Войти</Fillbutton>
            </div>
            
        </div>
    )
}

export default Header
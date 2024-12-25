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
            <div className={cl.infoBlock} id="forwhat">
                <h1 className="heading">зачем нужен Soundest</h1>
                <p className={cl.info}>
                Вы можете выгрузить всю свою скачанную музыку в Soundest, и она будет доступна на любом вашем устройстве (будь то это пк или телефон) c установленным Soundest. То есть вы сможете слушать всю свою музыку c любого своего устройства.<br /><br />

Если с одним из ваших устройств что-то случится (например вы сломаете или потеряете телефон), с вашей музыкой ничего не случиться, так как она будет хранится в облаке, а не на телефоне. Вам достаточно лишь найти новый телефон, скачать Soundest, и вот вся ваша музыка снова вам доступна, ее не нужно заново скачивать.<br /><br />

Soundest можно сравнить с Google Photo или Google Drive, только он для музыки.<br /><br />

Есть как эта web версия для пк или ноутбука, так и <a href="https://www.rustore.ru/catalog/app/com.ms.sndst" target="blank" style={{textDecoration: 'underline'}}>приложение</a> для Android.<br />
                </p>
            </div>
            <div className={cl.infoBlock} id="aboutme">
                <h1 className="heading">о создателе</h1>
                <p className={cl.info}>
                    Меня зовут Матвей, мне 16 лет, и я создатель Soundest.
                    <br /><br />
                    По одно время я пользовался Яндекс Музыкой с бесплатным пробным периодом.
                    Мне очень понравилось то, что я мог слушать всю свою музыку как на телефоне (пока гуляю), так и на компьюьтере (когда прихожу домой и сажусь за компьютер).
                    Но я понимал, что пробный период рано или поздно закончится, а кроссплатформенность музыки сохранить хочется. Поэтому я придумал создать сервис, с помощью
                    которого я смогу легко иметь доступ ко всей своей музыке и с телефона, и с компьютера. Чтобы была такая кроссплатформенность я сделал веб версию Soundest (вы сейчс на ней)
                    и мобильное приложение (можно скачать по ссылке в шапке сайта).
                    <br /><br />
                    О других моих проектах вы можете узнать на моем <a href="https://matvey.vercel.app" target="blank" style={{textDecoration: 'underline'}}>сайтe</a>.
                    Также добро пожаловать на мой <a href="https://www.youtube.com/@matveysuvorov" target="blank" style={{textDecoration: 'underline'}}>ютуб канал</a> и <a href="https://www.youtube.com/@matveysuvorov" target="blank" style={{textDecoration: 'underline'}}>гитхаб</a>.
                </p>
            </div>
        </>
    )
}

export default Main
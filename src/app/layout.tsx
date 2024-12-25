import React, { useEffect } from 'react';
import './globals.css'
import Nav from './components/nav/nav'
import { Provider } from 'react-redux';
import { setupStore } from './store';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Soundest',
  description: 'Облако для хранения и прослушивания музыки',
  keywords: [
    'перекинуть музыку на пк', 'как перекинуть музыку с телефона на пк', 'как передать файлы с компьютера на компьютер',
    'облачное хранилище файлов', 'сервисы облачного хранилища', 'облачное хранилище ответы', 'облачное хранилище c', 'облачное хранилище гугл', 'облачное хранилище для музыки',
    'облачное хранилище', 'облачное хранилище данных', 'облачное хранилище бесплатно', 'диск облачное хранилище', 'облачное хранилище яндекс', 'облачное хранилище яндекс диск',
    'слушающий музыку', 'слушающий музыку бесплатно', 'слушающий музыку онлайн', 'музыка без', 'слушающий музыку онлайн бесплатно',
    'музыку', 'музыка бесплатно', 'слушать музыку', 'музыка онлайн', 'слушать музыку бесплатно', 'слушать музыку онлайн', 'музыка онлайн бесплатно', 'музыка в хорошем качестве',
    'бесплатная музыка качество', 'музыка бесплатно в хорошем качестве', 'слушать музыку в хорошем качестве', 'слушать музыку бесплатно в качестве', 'слушать музыку бесплатно в хорошем качестве', 'музыка онлайн в хорошем качестве', 'музыка онлайн бесплатно в хорошем качестве'
  ]
}

const layout = ({children}: {children: React.ReactNode}) => {

  return (
    
      <html>
        <head>
          <title>Soundest</title>
        </head>
        <body>
            {children}
        </body>
      </html>
  );
};

export default layout;
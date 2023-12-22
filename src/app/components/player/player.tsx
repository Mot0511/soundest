'use client'

import React, { useEffect, useState } from 'react';
import cl from './player.module.sass'
import useSound from "use-sound"; //для работы со звуком
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // иконки для воспроизведения и паузы
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // иконки для следующего и предыдущего трека
import { IconContext } from "react-icons"; // для кастомизации иконок
import { FaPlay } from "react-icons/fa";
import PlayerType from '@/app/types/PlayerType';
import { FaPause } from "react-icons/fa";

const player = ({data, next, previous}: PlayerType) => {

    const [play, { pause, duration, sound }] = useSound(data.url);
    const [isPlaying, setIsPlaying] = useState(false);  
    const [seconds, setSeconds] = useState<number>();

    const playing = () => {
        if (isPlaying) {
          pause(); // приостанавливаем воспроизведение звука
          setIsPlaying(false);
        } else {
          play(); // воспроизводим аудиозапись
          setIsPlaying(true);
        }
      };
    useEffect(() => {
        const interval = setInterval(() => {
            if (sound){
                setSeconds(sound.seek([]))
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [sound])
    

    return (
        <div className={cl.player}>
            <button className="resetBtn" onClick={previous}>
                <IconContext.Provider value={{ size: "3.5em", color: "#27AE60" }}>
                    <BiSkipPrevious />
                </IconContext.Provider>
            </button>
            <button className='resetBtn' onClick={playing}>
                <IconContext.Provider value={{ size: "1.8em", color: "#27AE60" }}>
                    {
                        isPlaying
                            ? <FaPause />
                            : <FaPlay />
                    }
                </IconContext.Provider>
            </button>
            <button className="resetBtn" onClick={next}>
                <IconContext.Provider value={{ size: "3.5em", color: "#27AE60" }}>
                    <BiSkipNext />
                </IconContext.Provider>
            </button>
            <div className={cl.dataContainer}>
                <p className={cl.title}>{data.title}</p>
            </div>
            <div className={cl.dataContainer}>
            <p className={cl.author}>{data.author}</p>
          </div>
          <input 
            type="range" 
            className={cl.progress}
            min="0"
            max={duration / 1000}
            value={seconds}
            onChange={(e) => {
                sound.seek([seconds])
            }}
          />
        </div>
    );
};

export default player;  
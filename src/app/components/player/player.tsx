'use client'

import React, { useEffect, useRef, useState } from 'react';
import cl from './player.module.sass'
import useSound from "use-sound"; //для работы со звуком
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // иконки для воспроизведения и паузы
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // иконки для следующего и предыдущего трека
import { IconContext } from "react-icons"; // для кастомизации иконок
import { FaPlay } from "react-icons/fa";
import PlayerType from '@/app/types/PlayerType';
import { FaPause } from "react-icons/fa";

const player = ({data, next, previous}: PlayerType) => {

    const [isPlaying, setIsPlaying] = useState(false);  
    const [seconds, setSeconds] = useState<number>();

    const audioRef = useRef()
    const progressBarRef = useRef()
    console.log(audioRef);

    const play = () => {
        if (isPlaying) {
          audioRef.current?.pause()
          setIsPlaying(false);
        } else {
          audioRef.current?.play()
          setIsPlaying(true);
        }
      };
    
    const rewind = () => {

    }

    return (
        <div className={cl.player}>
            <audio src={data.url} currentTime='20sec' ref={audioRef} />
            <button className="resetBtn" onClick={previous}>
                <IconContext.Provider value={{ size: "3.5em", color: "#27AE60" }}>
                    <BiSkipPrevious />
                </IconContext.Provider>
            </button>
            <button className='resetBtn' onClick={play}>
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
          <p className={cl.title}>{data.title}</p>
          <p>{data.author}</p>
          <input 
            type="range" 
            className={cl.progress}
            onChange={rewind}
            ref={progressBarRef}
          />
        </div>
    );
};

export default player;  
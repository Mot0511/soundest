'use client'

import React, { useEffect, useRef, useState } from 'react';
import cl from './player.module.sass'
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // иконки для следующего и предыдущего трека
import { IconContext } from "react-icons"; // для кастомизации иконок
import { FaPlay } from "react-icons/fa";
import PlayerType from '@/app/types/PlayerType';
import { FaPause } from "react-icons/fa";

const Player = ({data, leaf, isPlaying, setIsPlaying}: PlayerType) => {

    const audioRef = useRef()
    const [seconds, setSeconds] = useState<number>(0);
    const [duration, setDuration] = useState<number>(1);
    const progressBarRef = useRef()
    const [isFirstPlaying, setIsFirstPlaying] = useState<boolean>(true)

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
        audioRef.current.currentTime = progressBarRef.current.value;
        setSeconds(progressBarRef.current?.value)
    }
    useEffect(() => {
        const interval = setInterval(() => {
            progressBarRef.current.value = audioRef.current.currentTime
            setSeconds(audioRef.current.currentTime)
        })
        return () => clearInterval(interval)
    }, [])
    useEffect(() => {
        if (seconds == duration){
            console.log(1);
            leaf()
        }
    }, [seconds])

    useEffect(() => {
        setDuration(audioRef.current.duration)
    }, [audioRef.current?.duration])


    return (
        <div className={cl.player}>
            <audio autoplay={'autoplay'} src={data.url} currentTime='20sec' ref={audioRef}/>
            {/* <button className="resetBtn" onClick={() => leaf()}>
                <IconContext.Provider value={{ size: "3.5em", color: "#27AE60" }}>
                    <BiSkipPrevious />
                </IconContext.Provider>
            </button> */}
            <button className='resetBtn' onClick={play}>
                <IconContext.Provider value={{ size: "1.8em", color: "#27AE60" }}>
                    {
                        isPlaying
                            ? <FaPause />
                            : <FaPlay />
                    }
                </IconContext.Provider>
            </button>
            <button className="resetBtn" onClick={() => leaf()}>
                <IconContext.Provider value={{ size: "3.5em", color: "#27AE60" }}>
                    <BiSkipNext />
                </IconContext.Provider>
            </button>
            <div className={cl.dataContainer}>
                <p className={cl.title + ' ' + (data.title?.length > 15 ? cl.animation : '')}>{data.title}</p>
            </div>
            <div className={cl.dataContainer}>
            <p className={cl.author + ' ' + (data.title?.length > 20 ? cl.animation : '')}>{data.author}</p>
          </div>
          <input 
            type="range" 
            className={cl.progress}
            value={seconds}
            onChange={rewind}
            min="0"
            max={duration}
            ref={progressBarRef}
          />
          <p>{Math.floor(seconds / 60)}:{Math.floor(seconds % 60)} / {duration ? Math.floor(duration / 60)+':'+Math.floor(duration % 60) : '0:0'}</p>
        </div>
    );
};

export default Player;  
'use client'

import React, { RefObject, useEffect, useRef, useState } from 'react';
import cl from './player.module.sass'
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // иконки для следующего и предыдущего трека
import { IconContext } from "react-icons"; // для кастомизации иконок
import { FaPlay } from "react-icons/fa";
import PlayerType from '@/app/types/PlayerType';
import { FaPause } from "react-icons/fa";

const Player = ({data, leaf, isPlaying, setIsPlaying}: PlayerType) => {

    const audioRef = useRef<HTMLAudioElement>(null);
    const [seconds, setSeconds] = useState<number | undefined>(0);
    const [duration, setDuration] = useState<number | undefined>(1);
    const progressBarRef = useRef<HTMLInputElement>(null);

    const play = () => {
        if (isPlaying) {
          audioRef?.current?.pause()
          setIsPlaying(false);
        } else {
          audioRef?.current?.play()
          setIsPlaying(true);
        }
      };
    
    const rewind = () => {
        const value = Number(progressBarRef?.current?.value)
        if (audioRef.current){
            audioRef.current.currentTime = value;
        }
        setSeconds(value)
    }
    useEffect(() => {
        const interval = setInterval(() => {
            if (progressBarRef.current){
                progressBarRef.current.value = String(audioRef.current?.currentTime)
            }
            setSeconds(audioRef?.current?.currentTime)
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
        setDuration(audioRef?.current?.duration)
    }, [audioRef?.current?.duration])

    return (
        <div className={cl.player}>
            <audio autoPlay={true} src={data.url} ref={audioRef}/>
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
                <p className={cl.author + ' ' + (data.title?.length > 15 ? cl.animation : '')}>{data.author}</p>
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
          <p>{Math.floor((seconds ? seconds : 0) / 60)}:{Math.floor((seconds ? seconds : 0) % 60)} / {duration ? Math.floor(duration / 60)+':'+Math.floor(duration % 60) : '0:0'}</p>
        </div>
    );
};

export default Player;  
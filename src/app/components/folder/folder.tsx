'use client'

import React, { useState } from 'react';
import cl from './folder.module.sass'
import Fillbutton from '../UI/fillbutton';
import { RxCross2 } from "react-icons/rx";
import { IconContext } from 'react-icons';
import { useTypedDispatch } from '@/app/hooks/useTypedDispatch';
import Myinput from '../UI/myinput/myinput'
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { useTypedSelector } from '@/app/hooks/useTypedSelector';
import Loading from '../loading/loading';
import { PlaylistsSlice } from '@/app/store/reducers/PlaylistsSlice';
import { ItemsSlice } from '@/app/store/reducers/ItemsSlice';
import Shimmer from '../shimmer/shimmer';

const Folder = ({treeTitle, path, isCardColor, children}: {treeTitle: string, path: string, isCardColor: boolean, children: React.ReactNode}) => {

    const [title, setTitle] = useState<string>(treeTitle)
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    const dispatch = useTypedDispatch()
    const {selectedFolder, uploadingCount} = useTypedSelector(states => states.items)
    const {setFolder} = ItemsSlice.actions

    const onExpand = (event: any) => {
        event.stopPropagation()
        if (!isExpanded) {
            console.log(1)
            console.log(path)
            dispatch(setFolder(path))
            setIsExpanded(true)
        } else if (isExpanded && selectedFolder != path) {
            console.log(2)
            dispatch(setFolder(path))
        } else {
            console.log(3)
            setIsExpanded(!isExpanded)
        }
    }

    return (
        <div>
            <div className={cl.folderContainer}>
                <div
                    className={cl.folder + ' ' + cl.folderActive}
                    onClick={onExpand}
                    style={{backgroundColor: selectedFolder == path ? '#1b2530' : isCardColor ? '#1C1C1C' : '#141414'}}
                >
                {/* {
                    isEditing
                        ? <>
                            <Myinput text='Название' value={title} onChange={(e: any) => setTitle(e.target.value)} style={{marginRight: '10px', marginBottom: typeof window !== 'undefined' && window.screen.width < 840 ? '10px' : '0'}} />
                        </>
                        : <>
                        </>
                } */}
                <p className={cl.title}>{title}</p>
                {
                    isExpanded && <div className={cl.children}>
                        {children}
                        {
                            Array.from({length: uploadingCount[path]}, (v, k) => <Shimmer />)
                        }
                    </div>
                }
                </div>
                {/* <Fillbutton onClick={() => setIsAdding(true)} style={{width: '50px', height: '50px', marginLeft: '10px', padding: '0'}}>
                        <IconContext.Provider value={{size: '2em', color: '#fff'}}>
                            <GoPlus />
                        </IconContext.Provider>
                </Fillbutton>
                <Fillbutton onClick={() => setIsEditing(true)} style={{width: '50px', height: '50px', marginLeft: '10px', padding: '0'}}>
                        <IconContext.Provider value={{size: '2em', color: '#fff'}}>
                            <MdEdit />
                        </IconContext.Provider>
                </Fillbutton>
                {
                    isEditing
                        ? <Fillbutton onClick={() => {
                            editfolder(dispatch, folder.id, title, author)
                            setIsEditing(false)

                        }} style={{width: '50px', height: '50px', marginLeft: '10px', padding: '0'}}>
                            <IconContext.Provider value={{size: '2em', color: '#fff'}}>
                                <FaCheck />
                            </IconContext.Provider>
                        </Fillbutton>

                        : <Fillbutton onClick={playlistID ? removeFromPlaylist : remove} style={{width: '50px', height: '50px', marginLeft: '10px', padding: '0'}}>
                        <IconContext.Provider value={{size: '2em', color: '#fff'}}>
                            <RxCross2 />
                        </IconContext.Provider>
                    </Fillbutton>
                } */}
                
            </div>
        </div>
        
    );
};

export default Folder;
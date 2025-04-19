import { get } from "firebase/database"
import {ItemsSlice} from "../store/reducers/ItemsSlice"
import { auth, dbRef, storageRef } from "./firebase"
import { ItemsActionType } from "../types/ItemsActionTypes"
import { Dispatch } from "redux"
import { deleteObject, uploadBytes } from "firebase/storage"
import { PlaylistsSlice } from '@/app/store/reducers/PlaylistsSlice';


export const getItems = (dispatch: Dispatch<ItemsActionType>) => {
    const {fetchItems, fetchItemsSuccess, fetchItemsError} = ItemsSlice.actions
    dispatch(fetchItems(true))
    const uid = auth.currentUser?.uid
    try {
        get(dbRef(`users/${uid}/songs`)).then(snap => {
            if (snap.val()){
                dispatch(fetchItemsSuccess(snap.val()))
            } else {
                dispatch(fetchItemsSuccess([]))
            }
        })
    } catch (e) {
        dispatch(fetchItemsError(true))
    }
}

export const addItem = (files: any, dispatch: Dispatch<ItemsActionType>) => {
    const {fetchItems, addItem} = ItemsSlice.actions
    const uid = auth.currentUser?.uid
    if (uid) {
        for (let file of files){
            const id = Math.floor(Date.now() * Math.random())
            const title = file.name.split('.')[0]
            dispatch(fetchItems(true))
            uploadBytes(storageRef(`${uid}/${id}.mp3`), file).then(() => {
                dispatch(addItem({id: id, title: title, author: ''}))
            })
        }
    }
}

export const removeSong = (dispatch: Dispatch<{type: any, payload: number | boolean}>, id: number, list: any) => {
    const {fetchItems, removeItem} = ItemsSlice.actions
    const {removeItem: removeItemFromPlaylist} = PlaylistsSlice.actions
    const uid = auth.currentUser?.uid
    if (uid) {
        dispatch(fetchItems(true))
        dispatch(removeItem(id))
        deleteObject(storageRef(`${uid}/${id}.mp3`))

        let playlists = []

        for (let i in list){
            if (list[i].includes(id)){
                playlists.push(i)
            }
        }
        console.log(playlists)
        playlists.forEach((playlist: string) => {
            // @ts-ignore
            dispatch(removeItemFromPlaylist([login, playlist, id]))
        })
        
        dispatch(fetchItems(false))
    }
    

}
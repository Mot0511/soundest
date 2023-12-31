import { get } from "firebase/database"
import {ItemsSlice} from "../store/reducers/ItemsSlice"
import { dbRef, storageRef } from "./getApp"
import { ItemsActionType } from "../types/ItemsActionTypes"
import { Dispatch } from "redux"
import { deleteObject, uploadBytes } from "firebase/storage"


export const getItems = (login: string, dispatch: Dispatch<ItemsActionType>) => {
    const {fetchItems, fetchItemsSuccess, fetchItemsError} = ItemsSlice.actions
    dispatch(fetchItems(true))
    try {
        get(dbRef(`users/${login}/songs`)).then(snap => {
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

export const addItem = (login: string, files: any, dispatch: Dispatch<ItemsActionType>) => {
    const {fetchItems, addItem} = ItemsSlice.actions

    for (let file of files){
        const id = Math.floor(Date.now() * Math.random())
        const title = file.name.split('.')[0]
        dispatch(fetchItems(true))
        uploadBytes(storageRef(`${login}/${id}.mp3`), file).then(() => {
            dispatch(addItem([login, {id: id, title: title, author: ''}]))
        })
    }
}

export const removeSong = (dispatch: Dispatch<{type: any, payload: [string, number] | boolean}>, login: string, id: number) => {
    const {fetchItems, removeItem} = ItemsSlice.actions

    dispatch(fetchItems(true))
    dispatch(removeItem([login, id]))
    deleteObject(storageRef(`${login}/${id}.mp3`))
    dispatch(fetchItems(false))

}
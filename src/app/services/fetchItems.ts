import { get } from "firebase/database"
import {ItemsSlice} from "../store/reducers/ItemsSlice"
import { ItemsActionType } from "../types/ItemsActionTypes"
import { deleteObject, uploadBytes } from "firebase/storage"
import { PlaylistsSlice } from '@/app/store/reducers/PlaylistsSlice';
import {supabase} from "./supabase";
import { Dispatch } from "@reduxjs/toolkit";
import { Exception } from "sass";
import { removeItemFromPlaylist } from "./fetchPlaylists";


export const getItems = async (dispatch: Dispatch<ItemsActionType>) => {
    const {fetchItems, fetchItemsSuccess, fetchItemsError} = ItemsSlice.actions
    dispatch(fetchItems(true))
    const userdata = await supabase.auth.getUser()
    const uid = userdata.data.user?.id;
    if (uid) {
        try {
            const {data} = await supabase.from('songs').select('id, title, author').eq('uid', uid)
            if (data) {
                dispatch(fetchItemsSuccess(data))
            } else {
                dispatch(fetchItemsSuccess([]))
            }
        } catch (e) {
            dispatch(fetchItemsError(true))
        }
    }
}

export const addItem = async (files: any, dispatch: Dispatch<ItemsActionType>) => {
    const {fetchItems, addItem} = ItemsSlice.actions
    dispatch(fetchItems(true))
    const userdata = await supabase.auth.getUser();
    const uid = userdata.data.user?.id;
    if (uid) {
        for (let file of files){
            const id = Math.floor(Date.now() * Math.random())
            const title = file.name.split('.')[0]
            console.log(id, title)
            await supabase.from('songs').insert({
                'id': id,
                'title': title,
                'author': '',
                'uid': uid
            })
            await supabase.storage.from('main').upload(`songs/${uid}/${id}.mp3`, file, {
                upsert: true
            });
            dispatch(addItem({id: id, title: title, author: ''}))
        }
    }
}

export const removeItem = async (dispatch: Dispatch<{type: any, payload: number | boolean}>, id: number, list: {}) => {
    const {fetchItems, removeItem} = ItemsSlice.actions
    const userdata = await supabase.auth.getUser();
    const uid = userdata.data.user?.id;
    if (uid) {
        dispatch(removeItem(id))
        await supabase.from('songs').delete().eq('id', id);
        await supabase.storage.from('main').remove([`songs/${uid}/${id}.mp3`]);
        for (let playlist in list){
            //@ts-ignore
            if (list[playlist].includes(id)){
                removeItemFromPlaylist(dispatch, id, playlist)
            }
        }
    }
}

export const editItem = async (dispatch: Dispatch<{type: any, payload: [number, {title: string, author: string}]}>, id: number, newTitle: string, newAuthor: string) => {
    const {editItem} = ItemsSlice.actions;
    const userdata = await supabase.auth.getUser();
    const uid = userdata.data.user?.id;
    console.log(newTitle)
    if (uid) {
        dispatch(editItem([id, {title: newTitle, author: newAuthor}]))
        await supabase.from('songs').update({
            'title': newTitle,
            'author': newAuthor
        }).eq('id', id)
    }
}
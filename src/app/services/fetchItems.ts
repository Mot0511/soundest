import {ItemsSlice} from "../store/reducers/ItemsSlice"
import { ItemsActionType } from "../types/ItemsActionTypes"
import { PlaylistsSlice } from '@/app/store/reducers/PlaylistsSlice';
import {supabase} from "./supabase";
import { Dispatch } from "@reduxjs/toolkit";
import { Exception } from "sass";
import { removeItemFromPlaylist } from "./fetchPlaylists";
import ItemType from "../types/ItemType";
import {
    extensionFromFileName,
    isAllowedAudioExtension,
    stripAudioExtension,
} from "../lib/audioFormats";
import { storage } from "./appwrite";
import { NotificationsSlice } from "../store/reducers/NotificationsSlice";

export const getURL = (id: number) => {
    return `https://fra.cloud.appwrite.io/v1/storage/buckets/6a19c43600365161ea88/files/${id}/view?project=6a19bef9002ab6c0e2e3&mode=admin`
}

export const getItems = async (dispatch: Dispatch<ItemsActionType>) => {
    const {fetchItems, fetchItemsSuccess, fetchItemsError} = ItemsSlice.actions
    dispatch(fetchItems(true))
    const userdata = await supabase.auth.getUser()
    const uid = userdata.data.user?.id;
    if (uid) {
        try {
            const {data} = await supabase.from('songs').select('id, title, author, file_ext, path').eq('uid', uid)
            if (data) {
                const normalized: ItemType[] = data.map((row) => ({
                    ...row,
                    format: row.file_ext ?? 'mp3',
                }))
                dispatch(fetchItemsSuccess(normalized))
            } else {
                dispatch(fetchItemsSuccess([]))
            }
        } catch (e) {
            dispatch(fetchItemsError(true))
        }
    }
}

export const addItem = async (files: any, dispatch: Dispatch<ItemsActionType>, folder: string) => {
    const {setUploadingCount, addItem, uploadingCountDecrement} = ItemsSlice.actions
    dispatch(setUploadingCount([folder, files.length]))
    const userdata = await supabase.auth.getUser();
    const uid = userdata.data.user?.id;
    if (uid) {
        for (let file of files){
            const ext = extensionFromFileName(file.name)
            if (!isAllowedAudioExtension(ext)) {
                console.warn('Пропуск файла: неподдерживаемый формат', file.name)
                continue
            }
            const id = Math.floor(Date.now() * Math.random() / 10000)
            const title = stripAudioExtension(file.name)
            console.log(id, title)
            await supabase.from('songs').insert({
                'id': id,
                'title': title,
                'author': '',
                'uid': uid,
                'file_ext': ext,
                'path': folder,
            })
            await storage.createFile({
                bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
                fileId: String(id),
                file: file
            })
            // await supabase.storage.from('main').upload(`songs/${uid}/${id}.${ext}`, file, {
            //     upsert: true
            // });
            dispatch(addItem({id: id, title: title, author: '', format: ext, path: folder}))
            dispatch(uploadingCountDecrement(folder))
        }
        
    }
}

export const removeItem = async (dispatch: Dispatch<{type: any, payload: number | boolean}>, id: number, playlists: PlaylistType[], format?: string) => {
    const {fetchItems, removeItem} = ItemsSlice.actions
    const userdata = await supabase.auth.getUser();
    const uid = userdata.data.user?.id;
    if (uid) {
        const ext = format ?? 'mp3'
        dispatch(removeItem(id))
        await supabase.from('songs').delete().eq('id', id);
        await storage.deleteFile({
            bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
            fileId: String(id)
        })
        // await supabase.storage.from('main').remove([`songs/${uid}/${id}.${ext}`]);
        for (let playlist in playlists){
            //@ts-ignore
            if (playlist.items.includes(id)){
            //@ts-ignore
                removeItemFromPlaylist(dispatch, id, playlist.id)
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
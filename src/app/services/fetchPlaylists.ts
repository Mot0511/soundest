import { get } from "firebase/database"
import { PlaylistsSlice } from "../store/reducers/PlaylistsSlice"
import { Dispatch } from "@reduxjs/toolkit"
import {supabase} from "./supabase"

export const getPlaylists = async (dispatch: Dispatch) => {
    const {fetchPlaylists, fetchPlaylistsSuccess} = PlaylistsSlice.actions
    dispatch(fetchPlaylists(true))
    const userdata = await supabase.auth.getUser();
    const uid = userdata.data.user?.id;
    const playlists: PlaylistType[] = []
    const {data: playlistsData} = await supabase.from('playlists').select().eq('uid', uid)
    if (playlistsData) {
        const playlistsIDs = playlistsData.map(playlist => playlist.id)
        const {data: items} = await supabase.from('playlists_songs').select().in('playlist', playlistsIDs)
        if (items) {
            for (let playlist of playlistsData) {
                playlists.push({
                    id: playlist.id,
                    name: playlist.title,
                    items: items.filter(item => item.playlist == playlist.id).map(item => item.id)
                })
            }
        }
    }
    dispatch(fetchPlaylistsSuccess(playlists))
}

export const addPlaylist = async (dispatch: Dispatch, title: string) => {
    const {addPlaylist} = PlaylistsSlice.actions
    const userdata = await supabase.auth.getUser();
    const uid = userdata.data.user?.id;
    const playlistID = Date.now()
    await supabase.from('playlists').insert([{
        id: playlistID,
        title: title,
        uid: uid
    }])
    dispatch(addPlaylist([playlistID, title]))
}

export const editPlaylist = async (dispatch: Dispatch, id: number, newTitle: string) => {
    console.log(id)
    const {editPlaylist} = PlaylistsSlice.actions
    await supabase.from('playlists').update({
        title: newTitle
    }).eq('id', id)
    dispatch(editPlaylist([id, newTitle]))
}

export const removePlaylist = async (dispatch: Dispatch, id: number) => {
    const {removePlaylist} = PlaylistsSlice.actions
    console.log(id)
    await supabase.from('playlists').delete().eq('id', id)
    dispatch(removePlaylist(id))
}

export const addItemToPlaylist = async (dispatch: Dispatch, itemID: number, playlistID: number) => {
    const {addItem} = PlaylistsSlice.actions
    await supabase.from('playlists_songs').insert({
        id: itemID,
        playlist: playlistID,
    })
    dispatch(addItem([itemID, playlistID]))
}

export const removeItemFromPlaylist = async (dispatch: Dispatch, itemID: number, playlistID: number) => {
    const {removeItem} = PlaylistsSlice.actions
    await supabase.from('playlists_songs').delete().eq('id', itemID).eq('playlist', playlistID)
    dispatch(removeItem([itemID, playlistID]))
}
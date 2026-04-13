import { get } from "firebase/database"
import { PlaylistsSlice } from "../store/reducers/PlaylistsSlice"
import { Dispatch } from "@reduxjs/toolkit"
import {supabase} from "./supabase"

export const getPlaylists = async (dispatch: Dispatch) => {
    const {fetchPlaylists, fetchPlaylistsSuccess} = PlaylistsSlice.actions
    const userdata = await supabase.auth.getUser();
    const uid = userdata.data.user?.id;
    dispatch(fetchPlaylists(true))
    const playlists: any = {}
    const {data: playlistsData} = await supabase.from('playlists').select().eq('uid', uid)
    if (playlistsData) {
        const playlistsTitles = playlistsData.map(playlist => playlist.title)
        const {data: items} = await supabase.from('playlists_songs').select().in('playlist', playlistsTitles)
        if (items) {
            for (let playlist of playlistsData) {
                playlists[playlist.title] = []
                for (let item of items) {
                    if (playlist.title == item.playlist) {
                        playlists[playlist.title].push(item.id)
                    }
                }
            }
        }
    }
    dispatch(fetchPlaylistsSuccess(playlists))
}

export const addPlaylist = async (dispatch: Dispatch, title: string) => {
    const {addPlaylist} = PlaylistsSlice.actions
    const userdata = await supabase.auth.getUser();
    const uid = userdata.data.user?.id;
    await supabase.from('playlists').insert([{
        title: title,
        uid: uid
    }])
    dispatch(addPlaylist(title))
}

export const editPlaylist = async (dispatch: Dispatch, title: string, newTitle: string) => {
    const {editPlaylist} = PlaylistsSlice.actions
    const userdata = await supabase.auth.getUser();
    const uid = userdata.data.user?.id;
    await supabase.from('playlists').update({
        title: title
    }).eq('title', title).eq('uid', uid)
    dispatch(editPlaylist([title, newTitle]))
}

export const removePlaylist = async (dispatch: Dispatch, title: string) => {
    const {removePlaylist} = PlaylistsSlice.actions
    const userdata = await supabase.auth.getUser();
    const uid = userdata.data.user?.id;
    await supabase.from('playlists').delete().eq('title', title).eq('uid', uid)
    dispatch(removePlaylist(title))
}

export const addItemToPlaylist = async (dispatch: Dispatch, id: number, playlist: string) => {
    console.log(id)
    const {addItem} = PlaylistsSlice.actions
    await supabase.from('playlists_songs').insert({
        id: id,
        playlist: playlist,
    })
    dispatch(addItem([playlist, id]))
}

export const removeItemFromPlaylist = async (dispatch: Dispatch, id: number, playlist: string) => {
    const {removeItem} = PlaylistsSlice.actions
    await supabase.from('playlists_songs').delete().eq('id', id).eq('playlist', playlist)
    dispatch(removeItem([playlist, id]))
}
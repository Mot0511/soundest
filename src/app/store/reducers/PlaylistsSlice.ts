import { auth, dbRef } from "@/app/services/firebase";
import { PlaylistsState } from "@/app/types/PlaylistsState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "firebase/database";

const initialState: PlaylistsState = {
    list: {},
    isLoading: false,
    error: false
}

export const PlaylistsSlice = createSlice({
    name: 'playlists',
    initialState,
    reducers: {
        fetchPlaylists(state, action: PayloadAction<boolean>){
            state.isLoading = action.payload
        },
        fetchPlaylistsSuccess(state, action: PayloadAction<any>){
            state.isLoading = false
            state.list = action.payload
        },
        fetchPlaylistsError(state, action: PayloadAction<boolean>){
            state.isLoading = false
            state.error = action.payload
        },
        addItem(state, action: PayloadAction<[string, number]>){
            const name = action.payload[0]
            const item = action.payload[1]
            state.list[name] = [...state.list[name], item]
            state.isLoading = false
            const uid = auth.currentUser?.uid
            set(dbRef(`users/${uid}/playlists`), state.list).then(() => {
                console.log('Item added')
        })},
        removeItem(state, action: PayloadAction<[string, number]>){
            state.isLoading = true
            const name = action.payload[0]
            const id = action.payload[1]
            state.list[name] = state.list[name].filter((el: number) => el != id)
            state.isLoading = false
            const uid = auth.currentUser?.uid
            set(dbRef(`users/${uid}/playlists`), state.list).then(() => {
                console.log('Song has removed from playlist')
        })},
        addPlaylist(state, action: PayloadAction<string>){
            const name = action.payload
            state.list[name] = [0]
            state.isLoading = false
            const uid = auth.currentUser?.uid
            set(dbRef(`users/${uid}/playlists`), state.list).then(() => {
                console.log('Playlist created')
        })},
        editPlaylist(state, action: PayloadAction<[string, string]>){
            const name = action.payload[0]
            const newName = action.payload[1]
            const playlist = state.list[name]
            delete state.list[name]
            state.list[newName] = playlist
            const uid = auth.currentUser?.uid
            set(dbRef(`users/${uid}/playlists`), state.list).then(() => {
                console.log('Playlist edited')
        })},
        removePlaylist(state, action: PayloadAction<string>){
            const name = action.payload
            delete state.list[name]
            state.isLoading = false
            const uid = auth.currentUser?.uid
            set(dbRef(`users/${uid}/playlists`), state.list).then(() => {
                console.log('Playlist removed')
        })}
}})

export default PlaylistsSlice.reducer
import { dbRef } from "@/app/services/getApp";
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
        addItem(state, action: PayloadAction<[string, string, number]>){
            const login = action.payload[0]
            const name = action.payload[1]
            const item = action.payload[2]
            state.list[name] = [...state.list[name], item]
            state.isLoading = false
            set(dbRef(`users/${login}/playlists`), state.list).then(() => {
                console.log('Item added')
        })},
        removeItem(state, action: PayloadAction<[string, string, number]>){
            const login = action.payload[0]
            const name = action.payload[1]
            const id = action.payload[2]
            for (let i in state.list){
                if (i == name){
                    state.list[i] = state.list[i].filter((el: number) => el != id)
                    break
                }
            }
            state.isLoading = false
            set(dbRef(`users/${login}/playlists`), state.list).then(() => {
                console.log('Song has removed from playlist')
        })},
        addPlaylist(state, action: PayloadAction<[string, string]>){
            const login = action.payload[0]
            const name = action.payload[1]
            state.list[name] = [0]
            state.isLoading = false
            set(dbRef(`users/${login}/playlists`), state.list).then(() => {
                console.log('Playlist created')
        })},
        editPlaylist(state, action: PayloadAction<[string, string, string]>){
            const login = action.payload[0]
            const name = action.payload[1]
            const newName = action.payload[2]
            const playlist = state.list[name]
            delete state.list[name]
            state.list[newName] = playlist
            set(dbRef(`users/${login}/playlists`), state.list).then(() => {
                console.log('Playlist edited')
        })},
        removePlaylist(state, action: PayloadAction<[string, string]>){
            const login = action.payload[0]
            const name = action.payload[1]
            delete state.list[name]
            state.isLoading = false
            set(dbRef(`users/${login}/playlists`), state.list).then(() => {
                console.log('Playlist removed')
        })}
}})

export default PlaylistsSlice.reducer
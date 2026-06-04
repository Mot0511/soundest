import { PlaylistsState } from "@/app/types/PlaylistsState";
import { generateID } from "@/app/utils/generateID";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "firebase/database";

const initialState: PlaylistsState = {
    playlists: [],
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
        fetchPlaylistsSuccess(state, action: PayloadAction<PlaylistType[]>){
            state.isLoading = false
            state.playlists = action.payload
        },
        fetchPlaylistsError(state, action: PayloadAction<boolean>){
            state.isLoading = false
            state.error = action.payload
        },
        addItem(state, action: PayloadAction<[number, number]>){
            const itemID = action.payload[0]
            const playlistID = action.payload[1]
            for (let playlist of state.playlists){
                if (playlist.id == playlistID){
                    playlist.items.push(itemID)
                    break
                }
            }
            state.isLoading = false
        },
        removeItem(state, action: PayloadAction<[number, number]>){
            const itemID = action.payload[0]
            const playlistID = action.payload[1]
            for (let playlist of state.playlists){
                if (playlist.id == playlistID){
                    playlist.items = playlist.items.filter((item: number) => item != itemID)
                }
            }
            state.isLoading = false
        },
        addPlaylist(state, action: PayloadAction<[number, string]>){
            const id = action.payload[0]
            const name = action.payload[1]
            state.playlists.push({
                id: id,
                name: name,
                items: []
            })
        },
        editPlaylist(state, action: PayloadAction<[number, string]>){
            const playlistID = action.payload[0]
            const newName = action.payload[1]
            for (let playlist of state.playlists){
                if (playlist.id == playlistID){
                    playlist.name = newName
                    break
                }
            }
        },
        removePlaylist(state, action: PayloadAction<number>){
            const playlistID = action.payload
            state.playlists = state.playlists.filter((playlist: PlaylistType) => playlist.id != playlistID)
        }
}})

export default PlaylistsSlice.reducer
import { get } from "firebase/database"
import { dbRef } from "./getApp"
import { Dispatch } from "redux"
import { PlaylistsSlice } from "../store/reducers/PlaylistsSlice"

export const getPlaylists = (login: string, dispatch: Dispatch) => {
    const {fetchPlaylists, fetchPlaylistsSuccess, fetchPlaylistsError} = PlaylistsSlice.actions
    dispatch(fetchPlaylists(true))
    get(dbRef(`users/${login}/playlists`)).then(snap => {
        if (snap.val()){
            dispatch(fetchPlaylistsSuccess(snap.val()))
        } else {
            dispatch(fetchPlaylistsSuccess({}))
        }
    }).catch(e => {
        dispatch(fetchPlaylistsError(true))
    })
}
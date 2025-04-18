import { get } from "firebase/database"
import { auth, dbRef } from "./getApp"
import { Dispatch } from "redux"
import { PlaylistsSlice } from "../store/reducers/PlaylistsSlice"

export const getPlaylists = (dispatch: Dispatch) => {
    const {fetchPlaylists, fetchPlaylistsSuccess, fetchPlaylistsError} = PlaylistsSlice.actions
    const uid = auth.currentUser?.uid
    dispatch(fetchPlaylists(true))
    get(dbRef(`users/${uid}/playlists`)).then(snap => {
        if (snap.val()){
            dispatch(fetchPlaylistsSuccess(snap.val()))
        } else {
            dispatch(fetchPlaylistsSuccess({}))
        }
    }).catch(e => {
        dispatch(fetchPlaylistsError(true))
    })
}
import { PlaylistsState } from "@/app/types/PlaylistsState";
import { generateID } from "@/app/utils/generateID";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "firebase/database";

const initialState: NotificationsState = {
    title: '',
    body: '',
    isVisible: false,
    color: '#af9a12'
}

export const NotificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        showNotification(state, action: PayloadAction<[string, string]>) {
            state.title = action.payload[0]
            state.body = action.payload[1]
            state.isVisible = true
        },
        hideNotification(state, action: PayloadAction) {
            state.isVisible = false
        }
    }
})

export default NotificationsSlice.reducer
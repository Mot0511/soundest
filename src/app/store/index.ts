import {combineReducers, configureStore} from "@reduxjs/toolkit";
import ItemsSlice from "./reducers/ItemsSlice";
import PlaylistsSlice from "./reducers/PlaylistsSlice";
import NotificationsSlice from "./reducers/NotificationsSlice";

const rootReducer = combineReducers({
    items: ItemsSlice,
    playlists: PlaylistsSlice,
    notifications: NotificationsSlice,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootReducerType = ReturnType<typeof rootReducer>
export type StoreType = ReturnType<typeof setupStore>
export type DispatchType = StoreType['dispatch']
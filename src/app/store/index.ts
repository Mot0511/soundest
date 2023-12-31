import {combineReducers, configureStore} from "@reduxjs/toolkit";
import ItemsSlice from "./reducers/ItemsSlice";
import PlaylistsSlice from "./reducers/PlaylistsSlice";

const rootReducer = combineReducers({
    items: ItemsSlice,
    playlists: PlaylistsSlice,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootReducerType = ReturnType<typeof rootReducer>
export type StoreType = ReturnType<typeof setupStore>
export type DispatchType = StoreType['dispatch']
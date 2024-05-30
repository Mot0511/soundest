import { dbRef } from "@/app/services/getApp";
import ItemType from "@/app/types/ItemType";
import { ItemsState } from "@/app/types/ItemsState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "firebase/database";

const initialState: ItemsState = {
    items: [],
    isLoading: true,
    error: false,
}

export const ItemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        fetchItems(state, action: PayloadAction<boolean>){
            state.isLoading = action.payload
        },
        fetchItemsSuccess(state, action: PayloadAction<ItemType[]>){
            state.isLoading = false
            state.items = action.payload
        },
        fetchItemsError(state, action: PayloadAction<any>){
            state.isLoading = false
            state.error = true
        },
        addItem(state, action: PayloadAction<[string, ItemType]>){
            const login = action.payload[0]
            const item = action.payload[1]
            state.items = [...state.items, item]
            state.isLoading = false            
            set(dbRef(`users/${login}/songs`), state.items).then(() => {
                console.log('Song has loaded')
            })
        },
        removeItem(state, action: PayloadAction<[string, number]>){
            const login = action.payload[0]
            const id = action.payload[1]
            state.items = state.items.filter(item => item.id != id)
            set(dbRef(`users/${login}/songs`), state.items).then(() => {
                console.log('Song has removed')
            })
        },
        editItem(state, action: PayloadAction<[string, number, {title: string, author: string}]>){
            const login = action.payload[0]
            const id = action.payload[1]
            const item = action.payload[2]
            for (let i in state.items){
                if (state.items[i].id == id){
                    state.items[i].title = item.title
                    state.items[i].author = item.author
                }
            }
            set(dbRef(`users/${login}/songs`), state.items).then(() => {
                console.log('Song edited')
            })
        }
    }
})

export default ItemsSlice.reducer
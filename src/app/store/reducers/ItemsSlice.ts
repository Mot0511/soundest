import ItemType from "@/app/types/ItemType";
import { ItemsState } from "@/app/types/ItemsState";
import buildTree from "@/app/utils/buildTree";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "firebase/database";

const initialState: ItemsState = {
    items: [],
    tree: [],
    isLoading: true,
    uploadingCount: {},
    selectedFolder: '/',
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
            state.tree = buildTree(state.items);
        },
        fetchItemsError(state, action: PayloadAction<any>){
            state.isLoading = false
            state.error = true
        },
        addItem(state, action: PayloadAction<ItemType>){
            const item = action.payload
            state.items = [...state.items, item]
            state.tree = buildTree(state.items);
        },
        removeItem(state, action: PayloadAction<number>){
            const id = action.payload
            state.items = state.items.filter(item => item.id != id)
            state.tree = buildTree(state.items);

        },
        editItem(state, action: PayloadAction<[number, {title: string, author: string}]>){
            const id = action.payload[0]
            const item = action.payload[1]
            for (let i in state.items){
                if (state.items[i].id == id){
                    state.items[i].title = item.title
                    state.items[i].author = item.author
                }
            }
            state.isLoading = false
            state.tree = buildTree(state.items);
        },
        setUploadingCount(state, action: PayloadAction<[string, number]>){
            state.uploadingCount[action.payload[0]] = action.payload[1]
        },
        uploadingCountDecrement(state, action: PayloadAction<any>){
            state.uploadingCount[action.payload] = state.uploadingCount[action.payload] - 1
        },
        setFolder(state, action: PayloadAction<string>) {
            state.selectedFolder = action.payload
        }
    }
})

export default ItemsSlice.reducer
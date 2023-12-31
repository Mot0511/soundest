import ItemType from "./ItemType";

export interface ItemsState {
    items: ItemType[]
    isLoading: boolean
    error: boolean
}
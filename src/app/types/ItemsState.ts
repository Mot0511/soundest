import EntityType from "./EntityType";
import ItemType from "./ItemType";

export interface ItemsState {
    items: ItemType[],
    tree: EntityType[],
    isLoading: boolean,
    uploadingCount: {[key: string]: number}
    selectedFolder: string,
    error: string,
}
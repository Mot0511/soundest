import { ReactNode } from "react";
import EntityType from "../types/EntityType";
import Folder from "../components/folder/folder";
import Item from "../components/item/item";

const buildReactTree = (entities: EntityType[], isCardColorForFolders: boolean, isCardColorForItems: boolean, onItemClick: (id: number) => void) => {
    const res: ReactNode[] = []
    for (let entity of entities) {
        if ('items' in entity) {
            res.push(
                <Folder
                    treeTitle={entity.title}
                    path={entity.path}
                    isCardColor={isCardColorForFolders}
                >
                    {
                        buildReactTree(entity.items, !isCardColorForFolders, !isCardColorForItems, onItemClick)
                    }
                </Folder>
            )
        } else {
            res.push(
                <Item 
                    item={entity}
                    isCardColor={isCardColorForItems}
                    onClick={onItemClick}
                    playlistID={null}
                />
            )
        }
    }
    return res
}

export default buildReactTree
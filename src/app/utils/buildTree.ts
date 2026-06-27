import EntityType from "../types/EntityType"
import ItemType from "../types/ItemType"
import FolderType from '../types/FolderType'

const buildTree = (items: ItemType[]) => {
    const root: EntityType[] = []
    const folderMap: any = {}

    for (let item of items) {
        const path = item.path
        const parts = path.split('/')
        let currentLevel: EntityType[] = root
        let currentPath = ''

        for (let i = 0; i < parts.length - 1; i++) {
            currentPath += !currentPath ? parts[i] : `/${parts[i]}`
            let folder: FolderType = folderMap[currentPath]
            if (!folder) {
                folder = {
                    title: parts[i],
                    path: `/${currentPath}/`,
                    items: []
                }
                folderMap[currentPath] = folder
                currentLevel.push(folder)
            }
            currentLevel = folder.items
        }

        currentLevel.push(item)
    }

    return (root[0] as FolderType).items
}

export default buildTree
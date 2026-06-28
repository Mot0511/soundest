import EntityType from "../types/EntityType"
import ItemType from "../types/ItemType"
import FolderType from '../types/FolderType'

const buildTree = (items: ItemType[]) => {
    console.log('buildTree input length:', items.length)
    console.log('buildTree first item path:', items[0]?.path)
    const root: EntityType[] = []
    const folderMap: any = {}

    for (let item of items) {
        const path = item.path ?? '/'

        if (path === '/') {
            root.push(item)
            continue
        }

        const parts = path.split('/').filter(Boolean)
        console.log('path:', path, 'parts:', parts, 'parts.length:', parts.length)
        let currentLevel: EntityType[] = root
        let currentPath = ''

        for (let i = 0; i < parts.length; i++) {
            currentPath += !currentPath ? parts[i] : `/${parts[i]}`
            console.log('creating folder:', currentPath)
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
    console.log('root:', root)
    return root
}

export default buildTree
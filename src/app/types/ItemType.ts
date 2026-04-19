export default interface ItemType {
    id: number
    title: string
    author: string
    /** Расширение файла в хранилище (mp3, flac, wav, m4a). Старые записи без поля считаются mp3. */
    format?: string
}
import { useRef } from "react"

export default interface PlayerType {
    data: {
        id: number
        url: string
        title: string
        author: string
    }
    leaf: (side: boolean, random: boolean) => void
    isPlaying: boolean
    setIsPlaying: any
}
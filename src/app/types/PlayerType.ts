import { useRef } from "react"

export default interface {
    data: {
        id: number
        url: string
        title: string
        author: string
    }
    leaf: (side: boolean) => void
}
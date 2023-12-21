export default interface {
    data: {
        id: number
        url: string
        title: string
        author: string
    }
    next: () => void
    previous: () => void
}
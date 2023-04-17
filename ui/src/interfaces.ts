interface Post {
    id: number
    title: string
    content: string
    coverImage: string
    createdAt: string
    updatedAt: string
    userId: number
    readTime: number
}
interface PostWithUsers extends Post {
    user: User
}
interface User {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    createdAt: string
    updatedAt: string
    userId: number
    Posts?: Post[]
}

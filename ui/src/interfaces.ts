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

interface Settings {
    id: number
    createdAt: string
    userId: number
    deletedAt: string
    updatedAt: string
    displayEmail: boolean
    websiteUrl: string
    location: string
    bio: string
    currentlyHackingOn: string
    availableFor: string
    currentlyLearning: string
    skillsLangs: string
    pronouns: string
    education: string
    work: string
    favoriteColor: string
}

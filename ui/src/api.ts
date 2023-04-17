import { APIError } from './customErrors'

const apiUrl = import.meta.env.VITE_API_URL || null
if (!apiUrl) throw new Error('API URL not set')

export const getAllPosts = async () => {
    const req = await fetch(`${apiUrl}/posts`)
    const res = await req.json()
    return res.posts
}

export const getAllPostsWithUsers = async () => {
    const req = await fetch(`${apiUrl}/posts?includeUsers=true`)
    const res = await req.json()
    return res.posts
}

export const getPost = async (slug: string) => {
    const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-_]/g, '').trim()
    const req = await fetch(`${apiUrl}/posts/slug/${sanitizedSlug}`)
    const res = await req.json()
    return res.post
}

export const doLogin = async ({
    email,
    password,
}: {
    email: string
    password: string
}) => {
    const req = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    const res = await req.json()
    return res
}

export const doRegister = async ({
    username,
    email,
    password,
    firstName,
    lastName,
}: {
    email: string
    password: string
    username: string
    firstName: string
    lastName: string
}) => {
    const req = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
            username,
            firstName,
            lastName,
        }),
    })
    if (!req.ok) {
        const { message, data } = await req.json()
        throw new APIError(message, data?.field)
    }
    const res = await req.json()
    return res
}

export const createPost = async ({
    title,
    content,
    coverImage,
    draft,
    slug,
}: {
    title: string
    content: string
    coverImage?: File
    draft: boolean
    slug: string
}) => {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('slug', slug)
    formData.append('draft', String(draft))
    if (coverImage) {
        formData.append('coverImageFile', coverImage)
    }
    const req = await fetch(`${apiUrl}/posts`, {
        method: 'POST',
        body: formData,
    })
    if (req.status === 413) {
        throw new Error()
    }
    const res = await req.json()
    return res
}

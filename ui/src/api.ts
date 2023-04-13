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

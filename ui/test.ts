interface UserResponse {
    name: string
    age: number
}

interface PostResponse {
    title: string
    content: string
}

interface PostWithUserResponse extends PostResponse {
    user: UserResponse
}

interface Req {
    query: {
        includeUser?: boolean
    }
}
function someController(
    req: Req & { query: { includeUser: true } }
): PostWithUserResponse
function someController(
    req: Req & { query: { includeUser?: false } }
): PostResponse
function someController(req: Req): PostResponse | PostWithUserResponse {
    const response = getPosts()
    if (req?.query?.includeUser === true) {
        ;(response as PostWithUserResponse).user = getUser()

        return response as PostWithUserResponse
    }
    return response as PostResponse
}

const reqWithUser: Req & { query: { includeUser: true } } = {
    query: {
        includeUser: true,
    },
}

const reqWithoutUser: Req & { query: { includeUser: false } } = {
    query: {
        includeUser: false,
    },
}

const x = someController(reqWithUser)
console.log(x)

const y = someController(reqWithoutUser)
console.log(y)

function getUser(): UserResponse {
    return {
        name: 'name',
        age: 1,
    }
}

function getPosts(): PostResponse | PostWithUserResponse {
    return {
        title: 'title',
        content: 'content',
    }
}

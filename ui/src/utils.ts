export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const formatPostDate = (dateString: string) => {
    const date = new Date(dateString)
    const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]

    const month = monthNames[date.getMonth()]
    const day = date.getDate()

    return `${month} ${day}`
}

export const toSlug = (str: string) => {
    return str
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
}

export const checkTokenExpiration = () => {
    const removeAndRedirect = () => {
        localStorage.removeItem('user')
        window.location.href = '/'
    }
    const userData = localStorage.getItem('user')
    if (!userData) {
        return
    }
    if (userData === 'undefined' || userData === 'null') {
        removeAndRedirect()
        return
    }
    const { expirationTime } = JSON.parse(userData)
    if (!expirationTime) {
        removeAndRedirect()
        return
    }

    if (new Date(expirationTime).toISOString() < new Date().toISOString()) {
        removeAndRedirect()
    }
}

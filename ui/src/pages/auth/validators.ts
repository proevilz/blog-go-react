import { hasLength, isEmail, matchesField } from '@mantine/form'

export const loginFormConfig = {
    initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    },

    validate: {
        email: (value: string) => {
            return /^\S+@\S+$/.test(value.trim()) ? null : 'Invalid email'
        },
        password: (value: string) => {
            return value.trim().length === 0 && 'Password is required'
        },
    },
}

export const registerFormConfig = {
    initialValues: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
    },

    validate: {
        username: hasLength(
            { min: 2, max: 10 },
            'Name must be 2-10 characters long'
        ),
        firstName: hasLength({ min: 2, max: 10 }, 'First name is required'),
        lastName: hasLength({ min: 2, max: 10 }, 'Last name is required'),
        email: isEmail('Invalid email'),
        password: hasLength({ min: 8, max: 36 }, 'Password is too short'),
        passwordConfirm: matchesField('password', 'Passwords do not match'),
    },
}

import {
    TextInput,
    Checkbox,
    Paper,
    Textarea,
    ColorInput,
    Skeleton,
} from '@mantine/core'
import { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import SettingsLoader from './SettingsLoader'
import { UseFormReturnType } from '@mantine/form'
import { FormValues } from './Settings'

const Profile = ({
    loading,
    form,
    userForm,
}: {
    loading: boolean
    form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>
    userForm: UseFormReturnType<
        Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'userId'>,
        (
            values: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'userId'>
        ) => Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'userId'>
    >
}) => {
    return (
        <>
            <Paper withBorder p='md' mb='md'>
                <SettingsLoader loading={loading}>
                    <h2>User</h2>
                    <TextInput
                        mb='md'
                        label='First name'
                        {...userForm.getInputProps('firstName')}
                    />
                    <TextInput
                        mb='md'
                        label='Last name'
                        {...userForm.getInputProps('lastName')}
                    />
                    <TextInput
                        mb='md'
                        label='Pronouns'
                        {...form.getInputProps('pronouns')}
                    />
                    <TextInput
                        mb='md'
                        label='Email'
                        required
                        {...userForm.getInputProps('email')}
                    />
                    <Checkbox
                        mb='md'
                        label='Display email on profile'
                        {...form.getInputProps('displayEmail')}
                    />
                    <TextInput
                        mb='md'
                        label='Username'
                        required
                        {...userForm.getInputProps('username')}
                    />
                </SettingsLoader>
            </Paper>
            <Paper withBorder p='md' mb='md'>
                <SettingsLoader loading={loading}>
                    <h2>Basic</h2>
                    <TextInput
                        mb='md'
                        label='Website URL'
                        {...form.getInputProps('websiteUrl')}
                    />
                    <TextInput
                        mb='md'
                        label='Location'
                        {...form.getInputProps('location')}
                    />
                    <Textarea
                        label='Bio'
                        placeholder='A short bio...'
                        {...form.getInputProps('bio')}
                    />
                </SettingsLoader>
            </Paper>
            <Paper withBorder p='md' mb='md'>
                <SettingsLoader loading={loading}>
                    <h2>Coding</h2>
                    <Textarea
                        mb='md'
                        label='Currently hacking on'
                        {...form.getInputProps('currentlyHackingOn')}
                    />
                    <Textarea
                        mb='md'
                        label='Available for'
                        {...form.getInputProps('availableFor')}
                    />
                    <Textarea
                        mb='md'
                        label='Currently learning'
                        placeholder=''
                        {...form.getInputProps('currentlyLearning')}
                    />
                    <Textarea
                        mb='md'
                        label='Skills/Languages'
                        placeholder=''
                        {...form.getInputProps('skillsLangs')}
                    />
                </SettingsLoader>
            </Paper>
            <Paper withBorder p='md' mb='md'>
                <SettingsLoader loading={loading}>
                    <h2>Work</h2>
                    <TextInput
                        mb='md'
                        label='Education'
                        {...form.getInputProps('education')}
                    />
                    <TextInput
                        mb='md'
                        label='Work'
                        {...form.getInputProps('work')}
                    />
                </SettingsLoader>
            </Paper>
            <Paper withBorder p='md' mb='md'>
                <SettingsLoader loading={loading}>
                    <h2>Branding</h2>
                    <ColorInput
                        placeholder='Pick color'
                        label='Your favorite color'
                        {...form.getInputProps('favoriteColor')}
                    />
                </SettingsLoader>
            </Paper>
        </>
    )
}

export default Profile

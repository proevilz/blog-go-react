import {
    Anchor,
    Button,
    Checkbox,
    Container,
    Grid,
    Paper,
    Skeleton,
    TextInput,
    Title,
} from '@mantine/core'
import Layout from '../../../components/Layout/Layout'
import { useCallback, useContext, useEffect } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Profile from './Profile'
import { isError, useQuery } from '@tanstack/react-query'
import { getSettings } from '../../../api'
import SettingsLoader from './SettingsLoader'
import { useForm } from '@mantine/form'
export interface FormValues {
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
const Settings = () => {
    const { user } = useContext(AuthContext)
    const sideMenuLinks = [
        {
            title: '🙂 Profile',
            href: '/dashboard/settings',
        },
        {
            title: '⚙️ Customisation',
            href: '/dashboard/settings/customisation',
        },
        {
            title: '📫 Notifications',
            href: '/dashboard/settings/notifications',
        },
        {
            title: '🌱 Account',
            href: '/dashboard/settings/account',
        },
        {
            title: '💳 Billing',
            href: '/dashboard/settings/billing',
        },
    ]

    const location = useLocation()
    const isCurrentPage = useCallback(
        (href: string) => {
            return location.pathname === href
        },
        [location]
    )

    const { isLoading, data, isError } = useQuery({
        queryKey: ['getSettings', user?.id],
        queryFn: () => getSettings({ userId: user?.id }),
        enabled: !!user?.id,
        onSuccess(data) {
            form.setValues(data)
            form.resetDirty(data)
        },
    })
    const userForm = useForm<
        Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'userId'>
    >({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
        },
    })
    const form = useForm<FormValues>({
        initialValues: {
            displayEmail: false,
            websiteUrl: '',
            location: '',
            bio: '',
            currentlyHackingOn: '',
            availableFor: '',
            currentlyLearning: '',
            skillsLangs: '',
            pronouns: '',
            education: '',
            work: '',
            favoriteColor: '',
        },
    })

    useEffect(() => {
        if (!user) return
        userForm.setValues(user)
        userForm.resetDirty(user)
    }, [])
    return (
        <Layout>
            <Container>
                <Title order={2} mb='lg'>
                    Settings for{' '}
                    <Anchor component={Link} to={`/${user?.username}`}>
                        @{user?.username}
                    </Anchor>
                </Title>
                <Grid>
                    <Grid.Col span={3}>
                        {sideMenuLinks.map((link) => (
                            <Button
                                key={link.href}
                                component={Link}
                                to={link.href}
                                fullWidth
                                styles={{
                                    inner: {
                                        justifyContent: 'flex-start',
                                    },
                                }}
                                variant={
                                    isCurrentPage(link.href)
                                        ? 'filled'
                                        : 'subtle'
                                }
                                mb='xs'
                            >
                                {link.title}
                            </Button>
                        ))}
                    </Grid.Col>
                    <Grid.Col span={9}>
                        {isCurrentPage('/dashboard/settings') ? (
                            !isError && user ? (
                                <Profile
                                    loading={isLoading}
                                    form={form}
                                    userForm={userForm}
                                />
                            ) : (
                                <Paper withBorder p='md' mb='md'>
                                    <Title order={3}>
                                        Something went wrong on our side 😭
                                    </Title>
                                    <p>
                                        Please try refreshing the page, or
                                        contact us for help.
                                    </p>
                                </Paper>
                            )
                        ) : (
                            <Outlet />
                        )}
                        <Paper withBorder p='md' mb='md'>
                            <Button disabled={isLoading || !!isError} fullWidth>
                                Save Profile Information
                            </Button>
                        </Paper>
                    </Grid.Col>
                </Grid>
            </Container>
        </Layout>
    )
}

export default Settings

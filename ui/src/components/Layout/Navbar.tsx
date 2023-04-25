import {
    Paper,
    Container,
    Flex,
    Group,
    TextInput,
    Button,
    Anchor,
    Avatar,
    Text,
    Menu,
} from '@mantine/core'
import {
    IconDashboard,
    IconList,
    IconLogout,
    IconPencil,
    IconSearch,
    IconSettings,
} from '@tabler/icons-react'
import { memo, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { capitalize } from '../../utils'

const Navbar = () => {
    const { user } = useContext(AuthContext)

    return (
        <Paper p='sm' withBorder mb='md'>
            <Container size='lg'>
                <Flex justify='space-between'>
                    <Group>
                        <Anchor component={Link} to={'/'}>
                            <img height={40} width={40} src='/logo.svg' />
                        </Anchor>
                        <TextInput
                            placeholder='Search'
                            w={300}
                            rightSection={<IconSearch />}
                        />
                    </Group>
                    {!user && (
                        <Group>
                            <Button
                                variant='subtle'
                                component={Link}
                                to={'/auth/login'}
                            >
                                Login
                            </Button>
                            <Button
                                variant='outline'
                                component={Link}
                                to={'/auth/register'}
                            >
                                Create account
                            </Button>
                        </Group>
                    )}
                    {user !== null && (
                        <Group>
                            <Menu shadow='md' width={200}>
                                <Menu.Target>
                                    <Avatar
                                        radius='md'
                                        sx={{ cursor: 'pointer' }}
                                    />
                                </Menu.Target>

                                <Menu.Dropdown>
                                    <Menu.Label>
                                        <Text>
                                            {capitalize(user.firstName)}{' '}
                                            {capitalize(user.lastName)}
                                        </Text>
                                        @{capitalize(user.username)}
                                    </Menu.Label>

                                    <Menu.Divider />
                                    <Menu.Item
                                        to={'/dashboard'}
                                        component={Link}
                                        icon={<IconDashboard size={14} />}
                                    >
                                        Dashboard
                                    </Menu.Item>
                                    <Menu.Item
                                        icon={<IconPencil size={14} />}
                                        to={'/dashboard/write'}
                                        component={Link}
                                    >
                                        Create post
                                    </Menu.Item>

                                    <Menu.Item icon={<IconList size={14} />}>
                                        Reading list
                                    </Menu.Item>
                                    <Menu.Item
                                        icon={<IconSettings size={14} />}
                                        to={'/dashboard/settings'}
                                        component={Link}
                                    >
                                        Settings
                                    </Menu.Item>
                                    <Menu.Item
                                        icon={<IconLogout size={14} />}
                                        to='/logout'
                                        component={Link}
                                    >
                                        Log Out
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Group>
                    )}
                </Flex>
            </Container>
        </Paper>
    )
}

export default memo(Navbar)

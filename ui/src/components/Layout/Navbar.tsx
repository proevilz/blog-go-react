import {
    Paper,
    Container,
    Image,
    Flex,
    Group,
    TextInput,
    Button,
    Anchor,
} from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { memo } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
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
                </Flex>
            </Container>
        </Paper>
    )
}

export default memo(Navbar)

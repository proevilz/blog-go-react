import {
    Paper,
    Container,
    Image,
    Flex,
    Group,
    TextInput,
    Button,
} from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

const Navbar = () => {
    return (
        <Paper p='sm' withBorder mb='md'>
            <Container size='lg'>
                <Flex justify='space-between'>
                    <Group>
                        <Image height={40} width={40} src='/logo.svg' />
                        <TextInput
                            placeholder='Search'
                            w={300}
                            rightSection={<IconSearch />}
                        />
                    </Group>
                    <Group>
                        <Button variant='subtle'>Login</Button>
                        <Button variant='outline'>Create account</Button>
                    </Group>
                </Flex>
            </Container>
        </Paper>
    )
}

export default Navbar

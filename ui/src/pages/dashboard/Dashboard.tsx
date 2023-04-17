import {
    Container,
    Paper,
    Title,
    Text,
    Group,
    Stack,
    Button,
    Image,
    Center,
} from '@mantine/core'
import Layout from '../../components/Layout/Layout'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    const boxes = [
        {
            title: 'Total post reactions',
            value: 0,
        },
        {
            title: 'Total post views',
            value: '< 500',
        },
        {
            title: 'Listings created',
            value: 0,
        },
        {
            title: 'Credits available',
            value: 0,
        },
    ]
    return (
        <Layout>
            <Container>
                <Title>Dashboard</Title>
                <Group position='center' grow mt='md'>
                    {boxes.map((box, idx) => (
                        <Paper key={idx} withBorder p='md'>
                            <Text weight='bold' size='xl'>
                                {box.value}
                            </Text>
                            <Text color='dimmed'>{box.title}</Text>
                        </Paper>
                    ))}
                </Group>
                <Text weight='bold' mt='lg'>
                    Posts
                </Text>
                <Paper withBorder p='md'>
                    <Center>
                        <Stack>
                            <Center>
                                <Image width={350} src='/undraw_write.svg' />
                            </Center>
                            <Text>
                                This is where you can manage your posts, but you
                                haven't written anything yet.
                            </Text>
                            <Button to={'/dashboard/write'} component={Link}>
                                Create your first post
                            </Button>
                        </Stack>
                    </Center>
                </Paper>
            </Container>
        </Layout>
    )
}

export default Dashboard

import Layout from '../../components/Layout/Layout'
import {
    Button,
    Center,
    Container,
    Flex,
    Group,
    Paper,
    Stack,
    Title,
} from '@mantine/core'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()
    const { setUser } = useContext(AuthContext)
    const handleLogout = () => {
        setUser(null)
        navigate('/')
    }

    return (
        <Layout>
            <Container>
                <Paper withBorder p='lg'>
                    <Flex direction='column' justify='center' align='center'>
                        <Title color='dimmed'>
                            Are you sure you want to logout?
                        </Title>
                        <Group mt='50px'>
                            <Button
                                variant='outline'
                                onClick={() => navigate(-1)}
                            >
                                No, take me back!
                            </Button>
                            <Button onClick={handleLogout}>
                                Yes, I'm sure!
                            </Button>
                        </Group>
                    </Flex>
                </Paper>
            </Container>
        </Layout>
    )
}

export default Logout

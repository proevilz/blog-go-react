import {
    Button,
    Center,
    Container,
    Flex,
    Paper,
    PasswordInput,
    Stack,
    TextInput,
    Title,
} from '@mantine/core'
import Layout from '../../components/Layout/Layout'
import { useForm } from '@mantine/form'
import { Link, useNavigate } from 'react-router-dom'
import { loginFormConfig } from './validators'
import { useMutation } from '@tanstack/react-query'
import { doLogin } from '../../api'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Login = () => {
    const { setUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const form = useForm(loginFormConfig)
    const mutation = useMutation(doLogin, {
        onSuccess: (data) => {
            console.log(data)
            setUser(data.user)
            navigate('/dashboard')
        },
    })
    return (
        <Layout>
            <Container size='sm'>
                <Paper p='lg' withBorder>
                    <Center>
                        <Title>Welcome back! 👋</Title>
                    </Center>
                    <Stack p='md'>
                        <form
                            onSubmit={form.onSubmit((values) => {
                                mutation.mutate(values)
                            })}
                        >
                            <TextInput
                                mb='sm'
                                withAsterisk
                                type='email'
                                label='Email'
                                required
                                placeholder='your@email.com'
                                {...form.getInputProps('email')}
                            />
                            <PasswordInput
                                withAsterisk
                                label='Password'
                                required
                                placeholder='********'
                                {...form.getInputProps('password')}
                            />

                            <Flex
                                justify='space-between'
                                align='center'
                                mt='md'
                            >
                                <Button
                                    variant='subtle'
                                    component={Link}
                                    to={'/auth/register'}
                                >
                                    Need an account?
                                </Button>
                                <Button type='submit' variant='outline'>
                                    Login
                                </Button>
                            </Flex>
                        </form>
                    </Stack>
                </Paper>
            </Container>
        </Layout>
    )
}

export default Login

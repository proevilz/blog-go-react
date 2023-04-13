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
import { Link } from 'react-router-dom'

const Login = () => {
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) => {
                return /^\S+@\S+$/.test(value.trim()) ? null : 'Invalid email'
            },
            password: (value) => {
                return value.trim().length === 0 && 'Password is required'
            },
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
                            onSubmit={form.onSubmit((values) =>
                                console.log(values)
                            )}
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

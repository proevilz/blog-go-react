import {
    Container,
    Paper,
    Center,
    Title,
    Stack,
    TextInput,
    PasswordInput,
    Flex,
    Button,
} from '@mantine/core'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import { hasLength, isEmail, matchesField, useForm } from '@mantine/form'

const Register = () => {
    const form = useForm({
        initialValues: {
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
            email: isEmail('Invalid email'),
            password: hasLength({ min: 8, max: 36 }, 'Password is too short'),
            passwordConfirm: matchesField('password', 'Passwords do not match'),
        },
    })
    return (
        <Layout>
            <Container size='sm'>
                <Paper p='lg' withBorder>
                    <Center>
                        <Title>Hey there! 👋</Title>
                    </Center>
                    <Stack p='md'>
                        <form
                            onSubmit={form.onSubmit((values) =>
                                console.log(values)
                            )}
                        >
                            <div className='registerInputWrapper'>
                                <TextInput
                                    mb='sm'
                                    withAsterisk
                                    type='email'
                                    label='Email'
                                    required
                                    placeholder='your@email.com'
                                    {...form.getInputProps('email')}
                                />
                                <TextInput
                                    mb='sm'
                                    withAsterisk
                                    label='Username'
                                    required
                                    placeholder='johndoe'
                                    {...form.getInputProps('username')}
                                />
                            </div>
                            <PasswordInput
                                withAsterisk
                                mb='sm'
                                label='Password'
                                required
                                placeholder='********'
                                {...form.getInputProps('password')}
                            />
                            <PasswordInput
                                withAsterisk
                                label='Confirm password'
                                required
                                placeholder='********'
                                {...form.getInputProps('passwordConfirm')}
                            />

                            <Flex
                                justify='space-between'
                                align='center'
                                mt='md'
                            >
                                <Button
                                    variant='subtle'
                                    component={Link}
                                    to={'/auth/login'}
                                >
                                    Already have an account?
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

export default Register

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
    Text,
    Notification,
} from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import { useForm } from '@mantine/form'
import { registerFormConfig } from './validators'
import { useMutation } from '@tanstack/react-query'
import { doRegister } from '../../api'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { IconAt, IconLock, IconMail, IconUser } from '@tabler/icons-react'

const Register = () => {
    const { setUser } = useContext(AuthContext)
    const form = useForm(registerFormConfig)
    const navigate = useNavigate()
    const mutation = useMutation(doRegister, {
        onSuccess: (data) => {
            setUser(data.user)
            navigate('/dashboard')
        },
    })
    const [globalError, setGlobalError] = useState<string | null>(null)
    useEffect(() => {
        setGlobalError(null)
        if (mutation.isError) {
            const error = mutation.error as { field?: string; message: string }

            if (error.field) {
                form.setFieldError(error.field, error.message)
                return
            }

            setGlobalError(error.message)
        }
    }, [mutation.isError])

    return (
        <Layout>
            <Container size='sm'>
                {globalError !== null && (
                    <Notification
                        color='red'
                        title='Oh no!'
                        withCloseButton={false}
                        mb='sm'
                        withBorder
                        sx={{ boxShadow: 'none' }}
                    >
                        We couldn't create your account as something went wrong.
                        Please refresh the page, try again later or contact us
                        if this issue persists - help@site.com
                    </Notification>
                )}
                <Paper p='lg' withBorder>
                    <Stack>
                        <Center>
                            <Title>Hey there! 👋</Title>
                        </Center>
                        <Center>
                            <Text color='dimmed'>
                                We just need a few details to get you started
                            </Text>
                        </Center>
                    </Stack>

                    <Stack p='md'>
                        <form
                            onSubmit={form.onSubmit((values) =>
                                mutation.mutate({
                                    username: values.username,
                                    email: values.email,
                                    password: values.password,
                                    firstName: values.firstName,
                                    lastName: values.lastName,
                                })
                            )}
                        >
                            <div className='registerInputWrapper'>
                                <TextInput
                                    mb='sm'
                                    withAsterisk
                                    type='text'
                                    label='First name'
                                    required
                                    placeholder='John'
                                    {...form.getInputProps('firstName')}
                                    icon={<IconUser size='0.8rem' />}
                                />
                                <TextInput
                                    mb='sm'
                                    withAsterisk
                                    label='Last name'
                                    required
                                    placeholder='doe'
                                    {...form.getInputProps('lastName')}
                                    icon={<IconUser size='0.8rem' />}
                                />
                            </div>
                            <TextInput
                                mb='sm'
                                withAsterisk
                                label='Username'
                                required
                                placeholder='johndoe'
                                {...form.getInputProps('username')}
                                icon={<IconAt size='0.8rem' />}
                            />
                            <TextInput
                                mb='sm'
                                withAsterisk
                                type='email'
                                label='Email'
                                required
                                placeholder='your@email.com'
                                {...form.getInputProps('email')}
                                icon={<IconMail size='0.8rem' />}
                            />

                            <PasswordInput
                                withAsterisk
                                mb='sm'
                                label='Password'
                                required
                                placeholder='********'
                                {...form.getInputProps('password')}
                                icon={<IconLock size='0.8rem' />}
                            />
                            <PasswordInput
                                withAsterisk
                                label='Confirm password'
                                required
                                placeholder='********'
                                {...form.getInputProps('passwordConfirm')}
                                icon={<IconLock size='0.8rem' />}
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

                                <Button
                                    type='submit'
                                    variant='outline'
                                    loading={mutation.isLoading}
                                >
                                    Register
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

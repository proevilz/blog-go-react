import {
    Text,
    Container,
    Grid,
    Paper,
    Skeleton,
    Stack,
    Button,
    Flex,
    Anchor,
    Divider,
    Center,
} from '@mantine/core'

import PostCard from '../components/PostCard'
import Layout from '../components/Layout/Layout'
import { useQuery } from '@tanstack/react-query'
import { getAllPostsWithUsers } from '../api'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

const Root = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['posts'],
        queryFn: getAllPostsWithUsers,
    })
    const { user } = useContext(AuthContext)
    return (
        <Layout>
            <Container size='lg'>
                <Grid>
                    <Grid.Col span={3}>
                        <Paper withBorder p='sm'>
                            <Text weight='bold' mb='sm'>
                                This community is a community of 1,034,321
                                amazing developers
                            </Text>
                            <Text color='dimmed'>
                                We're a place where coders share, stay
                                up-to-date and grow their careers.
                            </Text>
                            {user === null && (
                                <Stack mt='md'>
                                    <Button
                                        variant='outline'
                                        component={Link}
                                        to={'/auth/register'}
                                    >
                                        Create account
                                    </Button>
                                    <Button
                                        variant='subtle'
                                        component={Link}
                                        to={'/auth/login'}
                                    >
                                        Login
                                    </Button>
                                </Stack>
                            )}
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={7}>
                        <Stack>
                            {isLoading ? (
                                <Stack>
                                    <Skeleton height={250} />
                                    <Skeleton height={250} />
                                    <Skeleton height={250} />
                                    <Skeleton height={250} />
                                </Stack>
                            ) : data?.length === 0 || isError ? (
                                <Paper withBorder p='lg'>
                                    <Text
                                        align='center'
                                        size='xl'
                                        color='dimmed'
                                    >
                                        Looks like we have nothing to show just
                                        yet 😔
                                    </Text>
                                </Paper>
                            ) : (
                                data.map((post: PostWithUsers) => (
                                    <PostCard key={post.id} post={post} />
                                ))
                            )}
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <Paper withBorder bg='gray.0'>
                            <Flex p='sm' justify='space-between' align='center'>
                                <Text weight='bold'>Listings</Text>
                                <Anchor size='xs'>See all</Anchor>
                            </Flex>
                            <Divider color='gray.1' />
                            <Stack p='sm'>
                                <Anchor color='colors.dark'>
                                    <Text size='sm'>
                                        This is an example listing post. A post
                                        that is a listing right here.
                                    </Text>
                                </Anchor>
                                <Divider color='gray.1' />
                                <Anchor color='colors.dark'>
                                    <Text size='sm'>
                                        This is an example listing post. A post
                                        that is a listing right here.
                                    </Text>
                                </Anchor>
                            </Stack>
                            <Divider color='gray.1' my={5} />
                            <Anchor color='colors.dark' size='xs'>
                                <Center my='sm'>Create a listing</Center>
                            </Anchor>
                        </Paper>
                    </Grid.Col>
                </Grid>
            </Container>
        </Layout>
    )
}

export default Root

import {
    Avatar,
    Text,
    Flex,
    Paper,
    Container,
    Image,
    Button,
    Anchor,
} from '@mantine/core'
import { capitalize, formatPostDate, toSlug } from '../utils'
import { IconMessageCircle } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

const PostCard = ({ post }: { post: PostWithUsers }) => {
    const href = `/post/${toSlug(post.title)}`
    return (
        <Paper withBorder radius='md' sx={{ overflow: 'hidden' }}>
            {post.coverImage !== null && (
                <Anchor href={href}>
                    <Image
                        src={`${import.meta.env.VITE_API_URL}/media/${
                            post.coverImage
                        }`}
                        height={200}
                    />
                </Anchor>
            )}
            <Container pt='sm'>
                <Flex align='center'>
                    <Avatar
                        src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'
                        mr='xs'
                    />
                    <Flex direction='column'>
                        <Text weight='bold'>
                            {capitalize(post.user.username)}
                        </Text>
                        <Text mt={-5} color='dimmed' size='xs'>
                            {formatPostDate(post.createdAt)}
                        </Text>
                    </Flex>
                </Flex>

                <h3>
                    <Anchor color='dark' to={href} component={Link}>
                        {post.title}
                    </Anchor>
                </h3>
                <Flex align='center' justify='space-between'>
                    <Flex py='md'>
                        <Button variant='subtle' color='dark' compact>
                            3 reactions
                        </Button>
                        <Button
                            variant='subtle'
                            compact
                            color='dark'
                            leftIcon={<IconMessageCircle size={18} />}
                        >
                            Add Comment
                        </Button>
                    </Flex>
                    <Text size='xs'>{post.readTime} min read</Text>
                </Flex>
            </Container>
        </Paper>
    )
}

export default PostCard

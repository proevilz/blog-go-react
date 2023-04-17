import { useParams } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPost } from '../api'
import { emojisplosion } from 'emojisplosion'
import {
    Center,
    Container,
    Paper,
    Title,
    Image,
    Space,
    Avatar,
    Flex,
    Textarea,
    Button,
} from '@mantine/core'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Post = () => {
    useEffect(() => {
        emojisplosion({
            emojis: ['🎉', '👏', '🔥', '🚀', '🎊'],
        })
    }, [])

    const { slug } = useParams<{ slug: string }>()
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['post', slug],
        queryFn: () => getPost(slug!),
    })
    const editor = useEditor({
        editable: false,
        content: data ? JSON.parse(data?.content) : '',
        extensions: [StarterKit],
    })
    const [showCommentButton, setShowCommentButton] = useState(false)

    return (
        <Layout>
            <Container>
                <Paper withBorder radius='md' sx={{ overflow: 'hidden' }}>
                    {data?.coverImage && (
                        <Image
                            width='100%'
                            src={
                                import.meta.env.VITE_API_URL +
                                '/media/' +
                                data?.coverImage
                            }
                        />
                    )}
                    <Container>
                        <Center my='lg'>
                            <Title>{data?.title}</Title>
                        </Center>
                        {!isLoading && !isError && (
                            <EditorContent editor={editor} />
                        )}
                    </Container>
                </Paper>
                <Space />
                <Paper withBorder p='lg' mt='xl'>
                    <Container>
                        <Title order={2}>Join the discussion</Title>
                    </Container>
                    <Flex mt='lg'>
                        <Avatar
                            src='https://avatars.githubusercontent.com/u/14338007?v=4'
                            size='lg'
                            mr='md'
                        />
                        <Textarea
                            placeholder='Write a comment...'
                            autosize
                            sx={{ width: '100%' }}
                            minRows={2}
                            maxRows={4}
                            onFocus={() => setShowCommentButton(true)}
                        />
                    </Flex>
                    {showCommentButton && (
                        <Flex mt='md' justify='flex-end'>
                            <Button>Comment</Button>
                        </Flex>
                    )}
                </Paper>
            </Container>
        </Layout>
    )
}

export default Post

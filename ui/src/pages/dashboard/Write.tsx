import {
    Button,
    Container,
    Text,
    Flex,
    Group,
    Paper,
    TextInput,
    Image,
    FileButton,
    Notification,
    ActionIcon,
    Grid,
    Badge,
} from '@mantine/core'
import Layout from '../../components/Layout/Layout'
import { useEditor } from '@tiptap/react'
import { RichTextEditor, Link } from '@mantine/tiptap'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Superscript from '@tiptap/extension-superscript'
import SubScript from '@tiptap/extension-subscript'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import tsLanguageSyntax from 'highlight.js/lib/languages/typescript'
import { lowlight } from 'lowlight'
import { useState } from 'react'
import { IconX } from '@tabler/icons-react'
import { createPost } from '../../api'
import { useMutation } from '@tanstack/react-query'
import { toSlug } from '../../utils'
import { useNavigate } from 'react-router-dom'

const Write = () => {
    const mutation = useMutation(createPost, {
        onSuccess: (data) => {
            console.log(data)
            navigate('/post/' + data.post.slug)
        },
    })
    const [preview, setPreview] = useState<null | File>(null)
    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState(false)

    const [slug, setSlug] = useState('')
    lowlight.registerLanguage('ts', tsLanguageSyntax)
    const navigate = useNavigate()

    const savable = preview ? (preview.size < 5000000 ? true : false) : true
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            CodeBlockLowlight.configure({
                lowlight,
            }),
        ],
        content: '',
    })
    const handleSave = async (draft: boolean) => {
        setTitleError(false)
        if (mutation.isLoading) return
        if (!title) {
            setTitleError(true)
            return
        }
        const content = await editor?.getJSON()

        if (content && title) {
            mutation.mutate({
                title,
                slug,
                content: JSON.stringify(content),
                ...(preview && { coverImage: preview }),
                draft,
            })
        }
    }

    return (
        <Layout>
            <Container mb='xl' size='xl'>
                <Grid>
                    <Grid.Col span={10}>
                        <Paper withBorder p='md' mb='lg'>
                            <TextInput
                                placeholder='New post title here...'
                                variant='unstyled'
                                mb='lg'
                                required
                                size='xl'
                                styles={{
                                    input: {
                                        fontSize: '2rem',
                                        fontWeight: 700,
                                    },
                                }}
                                onChange={(e) => {
                                    setTitle(e.currentTarget.value)
                                    setSlug(
                                        toSlug(e.currentTarget.value.trim())
                                    )
                                }}
                                value={title}
                            />
                            <TextInput
                                variant='filled'
                                size='xs'
                                value={slug}
                                icon={
                                    <Badge radius='xs' ml='2px'>
                                        Post slug:
                                    </Badge>
                                }
                                iconWidth='97px'
                                onChange={(e) => setSlug(e.currentTarget.value)}
                                styles={{
                                    input: {
                                        paddingLeft: '102px!important',
                                    },
                                }}
                            />
                            {titleError && (
                                <Notification
                                    withBorder
                                    withCloseButton={false}
                                    icon={<IconX size='1.1rem' />}
                                    color='red'
                                >
                                    A title is required 👆
                                </Notification>
                            )}
                            {!savable ||
                                (mutation.isError && (
                                    <Notification
                                        my='md'
                                        withBorder
                                        sx={{ boxShadow: 'none' }}
                                        withCloseButton={false}
                                        icon={<IconX size='1.1rem' />}
                                        color='red'
                                    >
                                        Your cover image is too large! Maximum
                                        of 5mb please 😄
                                    </Notification>
                                ))}
                            <RichTextEditor
                                editor={editor}
                                styles={{
                                    root: {
                                        border: 'none',
                                    },
                                    content: {
                                        minHeight: '50vh',
                                    },
                                }}
                            >
                                <RichTextEditor.Toolbar>
                                    <RichTextEditor.ControlsGroup>
                                        <RichTextEditor.Bold />
                                        <RichTextEditor.Italic />
                                        <RichTextEditor.Underline />
                                        <RichTextEditor.Strikethrough />
                                        <RichTextEditor.ClearFormatting />
                                        <RichTextEditor.Highlight />
                                        <RichTextEditor.Code />
                                    </RichTextEditor.ControlsGroup>

                                    <RichTextEditor.ControlsGroup>
                                        <RichTextEditor.H1 />
                                        <RichTextEditor.H2 />
                                        <RichTextEditor.H3 />
                                        <RichTextEditor.H4 />
                                    </RichTextEditor.ControlsGroup>

                                    <RichTextEditor.ControlsGroup>
                                        <RichTextEditor.Blockquote />
                                        <RichTextEditor.Hr />
                                        <RichTextEditor.BulletList />
                                        <RichTextEditor.OrderedList />
                                        <RichTextEditor.Subscript />
                                        <RichTextEditor.Superscript />
                                    </RichTextEditor.ControlsGroup>

                                    <RichTextEditor.ControlsGroup>
                                        <RichTextEditor.Link />
                                        <RichTextEditor.Unlink />
                                    </RichTextEditor.ControlsGroup>

                                    <RichTextEditor.ControlsGroup>
                                        <RichTextEditor.AlignLeft />
                                        <RichTextEditor.AlignCenter />
                                        <RichTextEditor.AlignJustify />
                                        <RichTextEditor.AlignRight />
                                    </RichTextEditor.ControlsGroup>
                                </RichTextEditor.Toolbar>

                                <RichTextEditor.Content />
                            </RichTextEditor>
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <Flex
                            justify='space-between'
                            mb='xl'
                            align='flex-start'
                            direction='column'
                        >
                            <Group position='center' sx={{ width: '100%' }}>
                                {!preview && (
                                    <FileButton
                                        onChange={setPreview}
                                        accept='image/png,image/jpeg,image/webp'
                                    >
                                        {(props) => (
                                            <Button
                                                {...props}
                                                variant='white'
                                                sx={{ width: '100%' }}
                                            >
                                                Upload a cover image
                                            </Button>
                                        )}
                                    </FileButton>
                                )}
                                {preview && (
                                    <Flex direction='column'>
                                        <Text
                                            weight='bold'
                                            color='blue'
                                            mb='sm'
                                        >
                                            Cover image
                                        </Text>
                                        <Flex
                                            justify='center'
                                            align='center'
                                            pos='relative'
                                        >
                                            <Image
                                                radius='sm'
                                                width='100%'
                                                src={URL.createObjectURL(
                                                    preview
                                                )}
                                            />
                                            <ActionIcon
                                                pos='absolute'
                                                size='xl'
                                                radius='xl'
                                                variant='filled'
                                                onClick={() => setPreview(null)}
                                            >
                                                <IconX size='2.125rem' />
                                            </ActionIcon>
                                        </Flex>
                                    </Flex>
                                )}
                            </Group>
                            <Flex
                                sx={{ width: '100%' }}
                                mt={20}
                                justify='space-between'
                                direction='column'
                                align='stretch'
                            >
                                <Button
                                    disabled={!savable}
                                    mb='sm'
                                    variant='outline'
                                    onClick={() => handleSave(true)}
                                >
                                    Save as draft
                                </Button>
                                <Button
                                    disabled={!savable}
                                    variant='gradient'
                                    onClick={() => handleSave(false)}
                                >
                                    Publish ⚡️
                                </Button>
                            </Flex>
                        </Flex>
                    </Grid.Col>
                </Grid>
            </Container>
        </Layout>
    )
}

export default Write

import { Container, Grid, Stack } from '@mantine/core'

import PostCard from '../components/PostCard'
import Layout from '../components/Layout/Layout'

const Root = () => {
    return (
        <Layout>
            <Container size='lg'>
                <Grid>
                    <Grid.Col span={3}>1</Grid.Col>
                    <Grid.Col span={5}>
                        <Stack>
                            {[...Array(6)].map((_, i) => (
                                <PostCard />
                            ))}
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={4}>3</Grid.Col>
                </Grid>
            </Container>
        </Layout>
    )
}

export default Root

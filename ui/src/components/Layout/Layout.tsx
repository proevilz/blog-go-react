import {
    ColorScheme,
    ColorSchemeProvider,
    Container,
    Grid,
    MantineProvider,
    Stack,
} from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import Navbar from './Navbar'
import PostCard from '../PostCard'
import { Outlet } from 'react-router-dom'

interface LayoutProps {
    children?: React.ReactNode | React.ReactNode[]
}

const Layout = ({ children }: LayoutProps) => {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: 'mantine-color-scheme',
        defaultValue: 'light',
        getInitialValueInEffect: true,
    })

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

    useHotkeys([['mod+J', () => toggleColorScheme()]])
    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider
                theme={{ colorScheme }}
                withGlobalStyles
                withNormalizeCSS
            >
                <Navbar />
                <>{children}</>
            </MantineProvider>
        </ColorSchemeProvider>
    )
}

export default Layout

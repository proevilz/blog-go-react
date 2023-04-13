import {
    ColorScheme,
    ColorSchemeProvider,
    MantineProvider,
} from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import Navbar from './Navbar'
import { NavigationProgress } from '@mantine/nprogress'

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
                theme={{
                    colorScheme,
                    globalStyles: (theme) => ({
                        body: {
                            backgroundColor:
                                theme.colorScheme === 'dark'
                                    ? theme.colors.dark[7]
                                    : theme.colors.gray[1],
                        },
                    }),
                }}
                withNormalizeCSS
            >
                <NavigationProgress />
                <Navbar />
                <>{children}</>
            </MantineProvider>
        </ColorSchemeProvider>
    )
}

export default Layout

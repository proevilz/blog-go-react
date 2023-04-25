import { Skeleton } from '@mantine/core'
import { ReactNode } from 'react'

const SettingsLoader = ({
    children,
    loading,
}: {
    children: ReactNode | ReactNode[]
    loading: boolean
}) => {
    return loading ? (
        <>
            <Skeleton h={32} w='20%' mb='md' mt='md' />
            <Skeleton h={32} mb='md' />
            <Skeleton h={32} mb='md' />
            <Skeleton h={32} mb='md' />
            <Skeleton h={32} mb='md' />
            <Skeleton h={32} mb='md' />
            <Skeleton h={32} mb='md' />
        </>
    ) : (
        <>{children}</>
    )
}

export default SettingsLoader

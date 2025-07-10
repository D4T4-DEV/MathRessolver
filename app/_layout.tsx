import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { HistoryButton } from '@/shared/ui/molecules/ButtonHistory';

const RootLayout = () => {
    const router = useRouter();
    return (
        <Stack
            screenOptions={{
                title: '',
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen name='index'
                options={{
                    title: '',
                    headerRight: () => (
                        <HistoryButton
                            onPress={() => {
                                router.replace('/history')
                            }}
                        />
                    )
                }}
            />
            <Stack.Screen name='history'
                options={{
                    title: ''
                }}
            />
        </Stack>
    )
}

export default RootLayout
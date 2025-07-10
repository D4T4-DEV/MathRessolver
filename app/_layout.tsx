import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { HistoryButton } from '@/shared/ui/molecules/ButtonHistory';
import { StatusBar } from 'expo-status-bar';

const RootLayout = () => {
    const router = useRouter();
    return (
        <>
            <StatusBar style='dark' />
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
        </>
    )
}

export default RootLayout
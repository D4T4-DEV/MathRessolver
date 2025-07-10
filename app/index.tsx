import { EquationSolverScreen } from 'src/features/algebra/application/ui/screens/EquationSolverScreen';
import { StatusBar } from 'expo-status-bar';
import React from 'react'

const Home = () => {
    return (
        <>
            <StatusBar style='dark' />
            <EquationSolverScreen />
        </>
    )
}

export default Home
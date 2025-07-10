import React from 'react'
import HistorialScreen from '@/features/algebra/application/ui/screens/HistorialScreen'
import { StatusBar } from 'expo-status-bar';

const History = () => {
  return (
    <>
      <StatusBar style='dark' />
      <HistorialScreen />
    </>
  )
}

export default History;
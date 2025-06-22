import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { EquationSolverScreen } from '@/features/algebra/application/ui/screens/EquationSolverScreen';

// Componente para poder ser modificarlo sin 
// afectar al componente de entrada "App"
function AppContent() {
  return (
    <SafeAreaView style={styles.childContainer} edges={['top', 'bottom']}>
      <StatusBar style='inverted' />
      <EquationSolverScreen />
    </SafeAreaView>
  );
}

// Componente principal de la aplicacion
export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  childContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

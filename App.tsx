import { EquationSolverScreen } from '@/features/algebra/application/ui/screens/EquationSolverScreen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';


// Componente para poder ser modificarlo sin 
// afectar al componente de entrada "App"
function AppContent() {
  return (
    <SafeAreaView style={styles.childContainer}>
      <StatusBar style='inverted' />
      {/* <Text>Open up App.tsx to start working on your app!</Text> */}
      <EquationSolverScreen />
    </SafeAreaView>
  )
}

// Componente principal de la aplicacion
export default function App() {
  return (
    <View style={styles.dadContainer}>
      <AppContent />
    </View>
  );
}

const styles = StyleSheet.create({
  dadContainer: {
    flex: 1
  },
  childContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

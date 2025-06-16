import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useMathViewModel } from '../../viewmodels/useMathViewModel';
import MathRenderer from '@/shared/ui/atoms/MathRenderer';
import { toLatex } from '@/core/utils/astToLatex';


export default function MathScreen() {
  const { expression, setExpression } = useMathViewModel();

  return (
    <View style={styles.container}>
      <TextInput
        value={expression}
        onChangeText={setExpression}
        style={styles.input}
      />
      
      <MathRenderer math={toLatex(expression)} style={styles.container} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { borderWidth: 1, marginBottom: 16, padding: 8 },
  text: {
    width: '100%',
    height: '100%',
  }
});

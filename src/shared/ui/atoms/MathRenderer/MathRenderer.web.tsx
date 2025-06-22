import React from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { StyleProp, ViewStyle, View } from 'react-native';

interface MathRendererProps {
  math: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Componente para renderizar una expresion algebraica pasada en formato LaTex (este solo funciona en web)
 * @param math permite pasar una expresión matemática en formato LaTeX
 * @param style Permite aplicar estilos al componente, como cualquier vista de React Native `ViewStyle`
 * @returns View con un BlockMath innmerso en el view
 */

export default function MathRenderer({ math, style }: MathRendererProps) {
  return (
    <View style={style}>
      <BlockMath>{math}</BlockMath>
    </View>
  );
}

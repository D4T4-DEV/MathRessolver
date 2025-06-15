import React from 'react';
import MathView from 'react-native-math-view';
import { StyleProp, ViewStyle } from 'react-native';

interface MathRendererProps {
    math: string;
    style?: StyleProp<ViewStyle>;
}

/**
 * Componente para renderizar una expresion algebraica pasada en formato LaTex (este solo funciona en android y ios)
 * @param math permite pasar una expresión matemática en formato LaTeX
 * @param style Permite aplicar estilos al componente, como cualquier vista de React Native `ViewStyle`
 * @returns MathView
 */
const MathRenderer = ({ math, style }: MathRendererProps) => {
    return <MathView math={math} style={style} />;
};

export default MathRenderer;
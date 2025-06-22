// Este archivo sirve para declarar un módulo personalizado de TypeScript
// que no tiene tipos disponibles por defecto.

// Declaramos el módulo 'react-native-math-view' para que TypeScript lo reconozca
declare module 'react-native-math-view' {

    // Importamos React.Component, ya que el módulo exporta un componente de clase
    import { Component } from 'react';

    // Importamos tipos de estilo válidos para vistas en React Native
    import { ViewStyle, StyleProp } from 'react-native';

    // Definimos los props que acepta el componente MathView
    interface MathViewProps {
        // La propiedad 'math' permite pasar una expresión matemática en formato LaTeX
        math?: string;

        // Alternativamente, se puede usar 'mathML' si se prefiere el formato MathML
        mathML?: string;

        // Permite aplicar estilos al componente, como cualquier vista de React Native
        style?: StyleProp<ViewStyle>;
    }

    // Exportamos por defecto el componente MathView, que extiende de React.Component
    // y utiliza la interfaz de props definida anteriormente
    export default class MathView extends Component<MathViewProps> { }
}


export type EquationType = 'lineal' | 'cuadratica' | 'exponencial' | 'cubica' | 'desconocida';
import React from 'react';
import { Platform, StyleProp, ViewStyle } from 'react-native';

// Definimos una interfaz para tipar las propiedades (props) que recibirá el componente
interface MathRendererProps {
  // Expresión matemática en formato LaTeX que se desea renderizar
  math: string;

  // Estilo opcional para aplicar al componente contenedor
  style?: StyleProp<ViewStyle>;
}

// SELECCIÓN DINÁMICA DEL COMPONENTE SEGÚN LA PLATAFORMA

// Dependiendo de si estamos ejecutando la app en web o en una plataforma nativa
// (Android/iOS), importamos el componente correspondiente usando `require()`.
// Esto evita errores en tiempo de compilación y garantiza que se cargue
// el archivo correcto para cada entorno.
//
// Esto es útil cuando tenemos dos versiones del mismo componente:
// - MathRenderer.web.tsx para la versión web
// - MathRenderer.native.tsx para móviles (iOS/Android)
//
const MathRenderer = Platform.OS === 'web'
  ? require('./MathRenderer.web').default // Si es web, carga el componente web
  : require('./MathRenderer.native').default; // Si no, carga el componente nativo


// Exportamos el componente con su tipo correctamente definido.
// `as React.ComponentType<MathRendererProps>` asegura que quien lo use
// se beneficie del tipado de props.
export default MathRenderer as React.ComponentType<MathRendererProps>;

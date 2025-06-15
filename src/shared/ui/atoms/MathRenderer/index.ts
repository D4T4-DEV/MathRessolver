// Reexportamos por defecto el componente MathRenderer desde el archivo local './MathRenderer'.
// Esto permite simplificar las rutas de importación en otros archivos.
//
// Por ejemplo, en lugar de importar así:
// import MathRenderer from './components/MathRenderer/MathRenderer';
//
// Se podrá hacer así:
// import MathRenderer from './components/MathRenderer';
//
// Es una práctica común para mejorar la legibilidad y mantener una estructura limpia,
// especialmente cuando se agrupan múltiples archivos en una carpeta por feature o componente. 
// En este caso se utiliza para invocar a un componente que puede ser diferente entre plataforma

export { default } from './MathRenderer';

# Explicación del proyecto
Para poder usarlo es necesario tener lo siguiente:
- Node.js
- Java JDK v21.
- Android Studio (con un emulador inicializado)
- **Opcional:** Móvil con el modo desarrollador activo y conectado a la computadora y con los permisos aceptados de depuración.

**Nota:** Es posible que debas tener antes configurado variables de entorno como `ANDROID_HOME` Y `JAVA_HOME`, por lo cual asegúrate de cumplir con esa configuración.

Se es necesario primeramente descargar el proyecto descomprimirlo y seguidamente dentro de la carpeta del proyecto ejecutar el siguiente comando:
```Bash
npm i
```
Este comando instalará las dependencias utilizadas en el proyecto.

Una vez instaladas las dependencias del proyecto necesitaras crear un prebuild con expo, ejecutando el siguiente comando:
```Bash
npx expo prebuild
```
Este comando te generará un prebuild de la aplicación que después será usado para ejecutarse. Para que me creas en tu terminal deberá asomar algo así:
```Bash
√ Created native directory | reusing /android
√ Updated package.json | no changes
√ Finished prebuild
```
### Disclaimer de contexto
Ahora es momento de la magia, primero asegúrate de que tienes instalado y configurado el **JDK** y **Android Studio**, ya que es lo que vamos a utilizar en el siguiente comando, si no lo tienes te hago un breve resumen.

Cuando instalaste el JDK, te genero un directorio, este directorio se es necesario que lo añadas a tus variables de entorno, especificando la carpeta de la versión, ejemplo:
```Bash
C:\Program Files\Java\jdk-21 -> Usualmente se encuentra aquí en Windows
```
Este es el directorio donde se encuentra, lo que tienes que hacer es añadirlo a tus variables de entorno con lo siguiente:

```Bash
-> Nombre de la 
    -> JAVA_HOME
-> Valor de la 
    -> C:\Program Files\Java\jdk-21 
```
Con esto tendrás configurado ello para que pueda hacerse el build.

Ahora para Android Studio es el mismo cuento solo que necesitarás configurarlo así:
```Bash
-> Nombre de la 
    -> ANDROID_HOME
-> Valor de la 
    -> C:\Users\${Aqui_va_tu_usuario}\AppData\Local\Android\Sdk
```
**Nota:** Esto que enseñe de los directorios es en Windows, puede que en tu sistema operativo que uses sea diferente.

Ahora sí, el comando que sigue después de ejecutar `npx expo prebuild` se es necesario ejecutar el siguiente comando:

```Bash
npx expo run:android
```
Al ejecutarlo es probable que veas en la terminal muchas cosas, no te preocupes es que se necesita para poder hacer la build. Cuando haya terminado te dirá que se instaló en el dispositivo y te abrirá la aplicación con el APK que ha generado.

**Nota:** Los pasos anteriores fueron para que el proyecto sea ejecutado en Android en web se explicarán a continuación.

Para web, simplemente bastará que ejecutes el siguiente comando una vez instaladas las dependencias, el cual es el siguiente:

```Bash
npx expo start --web
```

Y listo, ya cuentas con el proyecto corriendo en los medios compatiblesa (●'◡'●)

### Notas:
Esta aplicación resuelve ecuaciones matematicas de los tipos:
- Lineales:
$$
ax + bx + c = 0
$$
$$
ax + b = cx + d
$$
- Cuadráticas:
$$
ax^2 + bx + c = 0
$$
- Cúbicas:
$$
ax^3 + bx^2 + cx + d = 0
$$
- Exponenciales:
$$
 a * b^x = c
$$

Las reglas están implementadas con nerdamer para el manejo simbólico.
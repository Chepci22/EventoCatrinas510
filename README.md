# Raíces Vivas — Evento de Catrinas

Aplicación de demostración para la Noche de Catrinas del CECyTEM Cuautitlán
Izcalli. Incluye convocatoria, programa propuesto, galería estudiantil,
ubicación, registro de participantes y administración. Está construida con
React y Vite.

## Iniciar el proyecto

Requiere Node.js 18 o posterior.

```bash
npm install
npm run dev
```

Para generar y revisar la compilación de producción:

```bash
npm run build
npm run preview
```

## Funciones de demostración

- La convocatoria y el programa del evento se pueden consultar sin registrarse.
- El perfil **Estudiante** solo muestra inicio, acerca del evento, programa y
  avisos. Los perfiles **Concursante** y **Administrador** también tienen las
  secciones que les corresponden.
- Las imágenes de la galería se pueden ampliar en una ventana modal.
- La aplicación web se puede agregar desde el menú de instalación del navegador
  compatible cuando se abre desde una conexión segura (HTTPS o localhost).
- El evento se realizará el 28 de octubre de 2026. El turno matutino será de
  09:00 a 13:00 h y el turno vespertino de 15:00 a 19:00 h; las actividades y
  el lugar exacto dentro del plantel siguen pendientes de confirmación.
- El formulario guarda las solicitudes de inscripción como pendientes.
- La inscripción está dirigida exclusivamente a estudiantes del plantel y
  acepta correos con dominio `@cecytem.mx` o `@soycecytem.mx`.
- La convocatoria incluye criterios sugeridos de evaluación; la ponderación
  y las reglas definitivas debe confirmarlas el comité organizador.
- El perfil **Estudiante** puede enviar una solicitud con correo institucional
  y consultar su estado desde Avisos.
- El perfil **Administrador** puede revisar solicitudes y aceptar o rechazar.
  Solo las solicitudes aceptadas permiten registrar la confirmación manual del
  pago; al confirmarlo, el estudiante pasa automáticamente al perfil
  **Concursante** al volver a esa cuenta local.
- Avisos muestra el estado de la solicitud y del pago. Con una inscripción
  aceptada y pagada, permite abrir e imprimir el boleto.
- Concursantes pueden retirarse desde Avisos; la solicitud y el pago se
  conservan, el registro cambia a **Retirada** y el perfil local vuelve a
  **Estudiante**.
- El perfil **Concursante** puede compartir una imagen de hasta 4 MB con una
  descripción escrita por la persona participante.
- Los comentarios de cada publicación se despliegan todos con un botón.
- Solo el perfil **Administrador** puede eliminar publicaciones; puede
  consultar la galería completa dentro del panel y moderarla.
- Las publicaciones, las interacciones y las solicitudes se guardan en el almacenamiento local del navegador y siguen disponibles al volver a abrir la aplicación en ese mismo navegador y dispositivo.
- El administrador puede confirmar manualmente un pago y, a partir de entonces, abrir e imprimir el boleto de la persona inscrita. El boleto incluye su folio y la fecha de confirmación del pago.
- El perfil **Concursante** puede consultar el estado de su pago con el correo institucional usado en la inscripción, incluida la fecha cuando el pago ya fue confirmado.
- La galería y el programa usan fotografías distintas; las imágenes de ejemplo existentes se actualizan sin reemplazar las publicaciones que subió el alumnado.

El selector de perfil es únicamente para explorar la interfaz: no ofrece
autenticación real ni verifica que la persona esté matriculada. La transición
a **Concursante** usa el correo de inscripción guardado localmente; no es una
sesión vinculada a una identidad verificada. El dominio del correo se valida
en el navegador y el comité debe revisar cada solicitud.
La consulta del pago también busca por correo en el almacenamiento local y no
es una autenticación de identidad; solo está disponible en el navegador
donde se guardó la inscripción.
No se conectan servicios de pago ni se envían datos a un servidor; el pago
debe coordinarse fuera de esta aplicación y el administrador registra su
confirmación aquí. Los datos solo se conservan en el navegador y dispositivo
donde se capturaron: borrar los datos del navegador o cambiar de dispositivo
puede eliminarlos o impedir el acceso a ellos.

## Créditos de fotografías

Las fotografías se descargaron de Wikimedia Commons y se usan bajo licencia
Creative Commons Atribución-CompartirIgual 4.0 (CC BY-SA 4.0):

- [Catrina en desfile de Día de Muertos](https://commons.wikimedia.org/wiki/File:A_Catrina_custome_from_Day_of_the_Dead_parade_in_Mexico_city.jpg), Rose04zr.
- [Altar de muertos en perspectiva](https://commons.wikimedia.org/wiki/File:Altar_de_muertos_en_perspectiva.jpg), Carolinadiazv.
- [Papel picado en Aguascalientes](https://commons.wikimedia.org/wiki/File:Adorno_de_papel_picado_en_la_calle_Carranza_de_Aguascalientes_09.jpg), Luis Alvaz.
- [Comparsa de Día de Muertos en Oaxaca](https://commons.wikimedia.org/wiki/File:Cascabeles.jpg), David Cabrera.
- [Danzón durante Día de Muertos en Oaxaca](https://commons.wikimedia.org/wiki/File:Dr%C3%A1cula_y_la_Fantasma.jpg), David Cabrera.
- [Altar de muertos en Tequisquiapan](https://commons.wikimedia.org/wiki/File:Altar_de_muertos_en_Tequisquiapan.jpg), A01562010 stephanie.

Las fotografías se recortaron para adaptarse al diseño; no se modificó su
contenido.

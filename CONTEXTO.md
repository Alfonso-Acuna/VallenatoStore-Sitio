# VallenatoStore — Contexto del proyecto

> **Nota para futuros desarrollos:** este archivo es la fuente de verdad sobre la página. Léelo y actualízalo cada vez que modifiques el proyecto (estructura, secciones, datos, librerías o despliegue).

---

## 1. Resumen

VallenatoStore es una **tienda virtual estática** de música vallenata: vende **álbumes, vinilos (CD / Vinilo 180g / descarga digital)**, muestra un **directorio de 44 artistas y agrupaciones** con discografías y enlaces a plataformas, incluye un **reproductor integrado de muestras de 30 s** y un **formulario de pedido** con validación.

- **Idioma:** Español (Colombia).
- **Tipo:** Sitio 100 % estático (HTML + CSS + JS vanilla). Sin framework de frontend ni backend.
- **Propósito:** exhibir catálogo, permitir escuchar muestras sin salir de la página y capturar pedidos vía formulario.
- **Público:** coleccionistas y fanáticos del vallenato (Colombia e internacional).

---

## 2. Estructura de archivos

```
VallenatoStore/
├── index.html        → Página principal (única página, una sola página con anclas)
├── styles.css        → Hoja de estilos personalizada (paleta, componentes, responsive)
├── artistas.js       → Datos de los 44 artistas + renderizado/filtros del directorio
├── reproductor.js    → Reproductor integrado de muestras de 30 s (busca pistas por nombre de tarjeta)
└── CONTEXTO.md       → Este documento
```

Cada archivo cumple un solo propósito:

| Archivo | Responsabilidad |
| --- | --- |
| `index.html` | Contenido, estructura y secciones de la página. |
| `styles.css` | Todo el diseño visual, paleta de colores, animaciones y responsive. |
| `artistas.js` | Array `ARTISTAS` con la ficha de cada artista + construcción de tarjetas y filtros de búsqueda/tipo. |
| `reproductor.js` | Mapas de pistas → URLs de audio y creación del reproductor flotante. |

---

## 3. Stack tecnológico

**Librerías externas (CDN):**

| Librería | Versión | Uso |
| --- | --- | --- |
| Bootstrap | 5.3.3 (CSS + JS bundle) | Sistema de grillas, navbar, accordion, validación de formularios. |
| Bootstrap Icons | 1.11.3 | Iconografía de toda la página. |
| AOS (Animate On Scroll) | 2.3.4 | Animaciones de entrada de secciones al hacer scroll. |
| Google Fonts | — | **Lobster** (logo), **Roboto** (texto base), **Sora** (títulos). |

**Lenguaje:** JavaScript ES5 (var, funciones anidadas, IIFEs). No usa módulos, bundlers ni transpilación. `artistas.js` y `reproductor.js` se cargan con `<script>` estáticos.

---

## 4. Paleta y diseño

Definida en `styles.css` (`:root`):

| Variable | Valor | Uso |
| --- | --- | --- |
| `--rojo-primario` | `#9C2B1E` | Color principal, fondos y gradientes. |
| `--rojo-oscuro` | `#6E1B12` | Navbar, sección contacto, títulos. |
| `--dorado` | `#C4962C` | Detalles, botones, acentos (degradados rojo→dorado). |
| `--dorado-claro` | `#E3C478` | Textos dorados sobre oscuro. |
| `--crema` | `#F7F2E7` | Fondos de botones suaves. |
| `--blanco` | `#FFFFFF` | Fondos base. |
| `--marron` | `#3A3128` | Color de texto principal. |
| `--texto-suave` | `#6F675A` | Textos secundarios. |
| `--verde` | `#2F7E50` | Precios, etiquetas CD, checks. |
| `--fondo-alt` | `#F1EAD9` | Fondo de secciones alternas. |

**Estilo clave:** degradados rojo→dorado en botones y badges, tarjetas blancas con sombras suaves, encabezados de sección con subrayado degradado, marquee (cinta) de artistas en movimiento, notas musicales flotantes en el hero.

---

## 5. Secciones de la página (con sus `id` de ancla)

El navbar incluye los enlaces → controla la navegación con scroll suave.

1. **`#inicio` — Hero:** titular, badge "Especialistas desde 2011", botones "Ver catálogo" / "Escuchar muestra", chips de beneficios y **4 estadísticas animadas** (contadores por IntersectionObserver): 25.000 álbumes vendidos, valoración 4,9/5, 120 artistas, 15 años.
2. **Cinta marquee:** nombres de artistas deslizándose (Diomedes, Celedón, Binomio, Silvestre, Hermanos Zuleta, Aniceto, Los Diablitos, Escalona).
3. **`#historia` — ¿Qué es el vallenato?:** texto sobre el género, imagen de concierto y chips de los 4 aires: **Paseo, Merengue, Son, Puya**.
4. **`#artistas` — Artistas destacados:** 11 tarjetas con foto circular, alias y redes (Spotify / Apple Music / YouTube). **Ojo:** el enlace del navbar "Directorio" apunta a `#directorio`, pero el menú también tiene un ítem "Artistas" que en realidad apunta a `#artistas` y otro en el navbar que apunta a `#directorio` (posible duplicidad de texto "Artistas").
5. **`#catalogo` — Catálogo destacado:** grilla de **15 productos** con filtros por botón (Todos / CD / Vinilo). Cada tarjeta: portada, badge de formato (`cd` o `vinilo`), título, artista, descripción, precio y botón **"Escuchar muestra"** (inyectado por `reproductor.js`).
6. **`#directorio` — Todos los artistas:** buscador por texto + filtros por tipo (Todos / Solistas / Agrupaciones) + contador "Mostrando N artistas". Las tarjetas se generan desde `artistas.js` e incluyen número, foto, alias, tipo, descripción, `<details>` con discografía y enlaces a plataformas.
7. **`#escuchar` — Escucha la muestra aquí mismo:** 14 tarjetas de canciones. El clic en la miniatura reproduce la muestra de 30 s en el **reproductor integrado** (no redirige a YouTube). Cada tarjeta también trae enlaces a YouTube / Spotify / Apple Music.
8. **`#formatos` — Elige tu formato:** 3 tarjetas: **CD**, **Vinilo 180g** (destacado, "El favorito"), **Descarga digital**.
9. **`#top` — Los clásicos más pedidos:** ranking numerado de 8 canciones con badge de formato (fondo oscuro).
10. **`#pedido` — Formulario de pedido:** campos nombre, email, teléfono, ciudad, artista/agrupación, producto (coinciden con los 15 del catálogo), cantidad, fecha de entrega, formato preferido (radio), extras (autografiado, envoltura, noticias), método de pago (tarjeta / contra entrega / Nequi-Davivienda) y comentarios. Validado con Bootstrap (`was-validated`); al enviar muestra `alert()` de confirmación.
11. **`#testimonios` — Lo que dicen nuestros clientes:** 3 tarjetas con estrellas y citas.
12. **`#faq` — Preguntas frecuentes:** acordeón Bootstrap con 5 preguntas (envíos, pagos, originalidad, envíos internacionales, devoluciones).
13. **`#boletin` — Boletín:** formulario de correo (se valida y muestra `alert()`).
14. **`#contacto` — Contacto:** dirección (Valledupar), correo, teléfonos y redes sociales.
15. **Footer:** marca, enlaces, categorías, horarios y crédito.

**Extras globales:** botón flotante "volver arriba", navbar que se encoge al hacer scroll, cierre del menú móvil al elegir una opción.

---

## 6. Datos de artistas (`artistas.js`)

- Objeto `ARTISTAS_FOTOS`: dict `id → URL` de imagen (fuente: Apple Music / iTunes cover art).
- Array `ARTISTAS` con **44 entradas**, cada una:
  ```js
  {
    id: 1,
    nombre: "Silvestre Dangond",
    alias: "...",
    descripcion: "...",
    tipo: "solista" | "agrupacion",
    albumes: [ "Disco (año, con acordeonero)", ... ],
    yt: "https://youtube.com/...",
    sp: "https://open.spotify.com/search/...",
    am: "https://music.apple.com/us/search?term=..."
  }
  ```
- **Renderizado:** IIFE que construye tarjetas en `#grillaDirectorio`, escapa HTML de los textos, aplica `onerror` en fotos (agrega clase `ficha-foto-falta` si la imagen no carga) y filtra por texto (nombre o alias) y por tipo.
- Los enlaces de plataformas usan buscadores de YouTube/Spotify y búsquedas de Apple Music por lo general.

---

## 7. Reproductor integrado (`reproductor.js`)

- Tres mapas de pistas:
  - `PRUEBAS_ESCUCHAR`: canciones del `#escuchar` (14).
  - `PRUEBAS_PRODUCTOS`: canciones del `#catalogo` (15). La clave es el `.card-title`.
  - `PRUEBAS_DESTACADOS`: artistas del `#artistas` (11). La clave es `.artista-nombre`.
- Al cargar el DOM (`DOMContentLoaded`) vincula:
  - Miniaturas `.escucha-thumb` (clic reproduce sin salir de la página — hace `preventDefault`).
  - Botón `btn-probar` "Escuchar muestra" inyectado en cada tarjeta del catálogo (antes del precio).
  - Botón `btn-probar-artista` (diamante de play) inyectado en las tarjetas de artistas.
- **Audio:** `new Audio()` con URL `audio-ssl.itunes.apple.com` (preview .m4a). Barra de progreso editable, play/pausa, cierre y etiquetas de tema/artista.
- **UI:** barra fija inferior con disco giratorio, progreso y tiempo. Se muestra con la clase `visible` y `reproduciendo`.

> **Importante:** si se agrega una canción/producto/artista nuevo, hay que añadir la entrada correspondiente en el mapa adecuado con la URL de preview; de lo contrario no tendrá botón "Escuchar muestra" (o el clic no hará nada).

---

## 8. Formularios

- `#formularioPedido` y `#formBoletin` usan `novalidate` + validación visual de Bootstrap (borde rojo/verde) mediante el script inline del final de `index.html`.
- Al ser válidos: `event.preventDefault()`, mensaje `window.alert()` y `form.reset()`.
- **Sin backend:** ningún formulario envía datos a un servidor real. Solo simulación cliente.

---

## 9. Despliegue en GitHub Pages

- El proyecto es estático, por lo que GitHub Pages sirve los archivos tal cual.
- Repositorio remoto: **github.com/Alfonso-Acuna/VallenatoStore-Sitio**.
- **URL del sitio:** `https://alfonso-acuna.github.io/VallenatoStore-Sitio/`
- Rama desplegada: `main` (source: "Deploy from a branch").
- Para actualizar el sitio: hacer `git add` / `git commit` / `git push origin main` (Pages se regenera automáticamente).
- **Ojo con rutas relativas:** el HTML usa `styles.css`, `artistas.js`, `reproductor.js` con rutas relativas, así que funciona bajo cualquier sub-ruta del dominio.

---

## 10. Notas y convenciones para seguir modificando

1. **Siempre mantener este `CONTEXTO.md` actualizado** tras cualquier cambio estructural o de datos.
2. Preservar las convenciones existentes: JS en **ES5** (sin `let`/`const`/arrow de convertirse en un problema), nombres de clases con prefijo de componente (`artista-`, `ficha-`, `rep-`, `producto-`, `escucha-`).
3. No agregar comentarios innecesarios al código.
4. Si se agrega un artista al directorio: también debe quedar su foto en `ARTISTAS_FOTOS` y, si está en destacados/catálogo/escuchar, su pista en `reproductor.js`.
5. Respetar la paleta y el sistema de diseño de `styles.css`.
6. Si se añaden productos al formulario, sincronizar con el catálogo (las opciones del `<select>` duplican los productos de la grilla).
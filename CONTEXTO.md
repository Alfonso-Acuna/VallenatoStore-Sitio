# VallenatoStore — Contexto del proyecto

> **Nota para futuros desarrollos:** este archivo es la fuente de verdad sobre la página. Léelo y actualízalo cada vez que modifiques el proyecto (estructura, secciones, datos, librerías o despliegue).

---

## 1. Resumen

VallenatoStore es una **tienda virtual estática** de música vallenata organizada como **sitio multi-página**: vende **álbumes, vinilos (CD / Vinilo 180g / descarga digital)**, muestra un **directorio de 44 artistas y agrupaciones** con discografías y enlaces a plataformas, incluye un **reproductor integrado de muestras de 30 s**, un **Ranking Top 10**, un **checkout de 2 columnas** con carrito en la página de Pedido y **formularios validados** en varias páginas.

- **Idioma:** Español (Colombia).
- **Tipo:** Sitio 100 % estático (HTML + CSS + JS vanilla). Sin framework de frontend ni backend.
- **Propósito:** exhibir catálogo, permitir escuchar muestras sin salir de la página y capturar pedidos vía formulario.
- **Público:** coleccionistas y fanáticos del vallenato (Colombia e internacional).
- **Datos oficiales:** autor **Alfonso Acuña Arrieta**, sede **Magangué, Bolívar – Colombia**, teléfono ficticio **+57 300 123 4567**, en funcionamiento «desde 2011».

---

## 2. Estructura de archivos

```
VallenatoStore/
├── index.html        → Inicio: hero + CTAs + métricas + destacadas + testimonios
├── historia.html     → Historia del vallenato + línea de tiempo
├── artistas.html     → 11 destacados + directorio de 44 (usando artistas.js)
├── catalogo.html     → Catálogo de 24 productos con filtros por formato + formatos
├── escuchar.html     → 27 muestras + Ranking Top 10 (botones [data-muestra])
├── pedido.html       → Checkout 2 columnas (formulario pasos + resumen/carrito)
├── contacto.html     → Contacto + boletín + FAQ
├── styles.css        → Hoja de estilos personalizada (paleta, componentes, responsive)
├── main.js           → Comportamiento compartido por todas las páginas
├── artistas.js       → Datos de los 44 artistas + renderizado/filtros del directorio
├── reproductor.js    → Reproductor de muestras de 30 s
└── CONTEXTO.md       → Este documento
```

| Archivo | Responsabilidad |
| --- | --- |
| `index.html`, `historia.html`, `artistas.html`, `catalogo.html`, `escuchar.html`, `pedido.html`, `contacto.html` | Una página completa cada uno. Comparten navbar/footer **duplicados estáticamente** (cada página marca el enlace activo con `aria-current="page"`). |
| `styles.css` | Todo el diseño visual, paleta, animaciones, glassmorphism y responsive. |
| `main.js` | AOS, hero escalonado, contadores, navbar compacta, volver-arriba, cierre del menú móvil y validación genérica de formularios. |
| `artistas.js` | Array `ARTISTAS` + construcción de tarjetas y filtros del directorio. |
| `reproductor.js` | Mapas de pistas → URLs de audio y creación del reproductor flotante. |

---

## 3. Stack tecnológico

**Librerías externas (CDN), cargadas en todas las páginas:**

| Librería | Versión | Uso |
| --- | --- | --- |
| Bootstrap | 5.3.3 (CSS + JS bundle) | Grillas, navbar, accordion, validación visual de formularios. |
| Bootstrap Icons | 1.11.3 | Iconografía de toda la página. |
| AOS (Animate On Scroll) | 2.3.4 | Animaciones de entrada al hacer scroll. |
| Google Fonts | — | **Lobster** (logo), **Roboto** (texto base), **Sora** (títulos). |

**Lenguaje:** JavaScript ES5 (var, funciones anidadas, IIFEs). Sin módulos ni bundlers. Orden de carga recomendado: `bootstrap.bundle.min.js` → `aos.js` → `main.js` → (`reproductor.js`) → (`artistas.js` según página).

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
| `--vidrio` | `rgba(255,255,255,0.82)` | Efecto glassmorphism de tarjetas. |

**Estilo clave (según requisitos):** fondo con **profundidad** (capas de degradados + trama sutil sobre `body`, `background-attachment: fixed`), tarjetas y paneles con **glassmorphism** (`--vidrio` + `backdrop-filter: blur`), miniaturas de productos **cuadradas 1:1** (`aspect-ratio: 1/1; object-fit: cover; object-position: center;`) con `border-radius` y `box-shadow`, secciones alternas claro/oscuro, marquee (cinta) de artistas, notas musicales flotantes en el hero.

---

## 5. Mapa de páginas y secciones

Navegación común: **Inicio · Historia · Artistas · Catálogo · Escuchar · Pedido · Contacto** + botón "Pedir ahora" (`→ pedido.html`). Cada página tiene header/footer idénticos duplicados; el ítem activo se resalta manualmente.

**`index.html`**
1. **Hero** (id `inicio`): badge, titular, **2 CTAs** ("Explorar Catálogo" → `catalogo.html` y "Hacer un Pedido" → `pedido.html`), chips de beneficios y **4 métricas animadas** (contadores `data-contador` vía IntersectionObserver): 25.000 álbumes vendidos, 4,9/5, 120 artistas, 15 años.
2. **Cinta marquee:** nombres de artistas deslizándose.
3. **Colecciones destacadas** (id `destacados`): 4 tarjetas de acceso rápido (Vinilos, Top 10, Directorio, Muestras).
4. **Testimonios** (id `testimonios`): 3 tarjetas con estrellas y citas.

**`historia.html`**
- **Historia** (id `historia`): imagen + texto sobre el vallenato y chips de los 4 aires (Paseo, Merengue, Son, Puya).
- **Línea de tiempo:** 3 hitos (origen folclórico, UNESCO 2015, VallenatoStore 2011–2026) + CTAs a catálogo/escuchar.

**`artistas.html`**
- **Destacados** (id `artistas`): 11 tarjetas `.artista-card` con foto circular, alias y redes; `reproductor.js` les inyecta el botón de play.
- **Directorio** (id `directorio`): buscador (`#buscarArtista`), filtros `[data-filtrar-tipo]`, contador (`#contadorArtistas`) y grilla `#grillaDirectorio` generada por `artistas.js`.

**`catalogo.html`**
- **Catálogo** (id `catalogo`): **24 productos** (títulos idénticos a las claves de `PRUEBAS_PRODUCTOS`). Filtros por formato (`[data-filtrar-formato]`: todos/vinilo/cd/digital) manejados por el script inline. Cada tarjeta: portada **1:1**, badge `.producto-format` (`cd`/`vinilo`/`digital`), `.card-title`, `.card-text`, `.precio` y botón **"Escuchar muestra"** inyectado por el reproductor. El botón circular de carrito (`btn-circulo`) enlaza a `pedido.html?producto=<título codificado>`.
- **Formatos** (id `formatos`): 3 tarjetas (Vinilo 180g, CD, Descarga digital) con listas de beneficios.

**`escuchar.html`**
- **Muestras** (id `escuchar`): **27 tarjetas** `.escucha-card` con `.escucha-thumb` (clic reproduce), duración 0:30 y enlaces a plataformas. Las miniaturas provienen de Apple Music (iTunes) `/300x300bb.jpg`.
- **Ranking Top 10** (id `top`, fondo oscuro): lista numerada con tema, artista, badge, duración y **botón `.top-play` con `data-muestra`** (reproduce vía `vincularMuestrasGenericas()`).

**`pedido.html`**
- **Checkout 2 columnas** (id `pedido`):
  - Izquierda: formulario `#formPedido` en **3 pasos** — (1) Datos personales (nombre, documento, correo), (2) Dirección de envío (departamento, municipio, dirección, indicaciones), (3) Método de pago (Nequi/Daviplata, tarjeta, contra entrega, consignación) con aviso dinámico según el método.
  - Derecha: **resumen de compra** estilo MercadoLibre: miniaturas **cuadradas** del producto, subtotal, envío (gratis ≥ $100.000, si no $8.000), impuestos 19 %, total en `es-CO`, botón grande "Confirmar Pedido" e insignias de confianza.
- **Carrito** gestionado por el script inline de la página: mapa `PRODUCTOS` (título → artista, precio, imagen), agregar/quitar, selector "Agregar otro producto" y carga de `?producto=` en el query string (los enlaces del catálogo la usan).

**`contacto.html`**
- **Contacto** (id `contacto`, fondo oscuro): datos (Magangué, Bolívar · +57 300 123 4567 · pedidos@vallenatostore.co · horario) + formulario `#formContacto`.
- **Boletín** (id `boletin`): formulario `#formBoletin` sobre fondo de concierto.
- **FAQ** (id `faq`): acordeón con 5 preguntas.

**Extras globales:** botón flotante volver-arriba, navbar que se encoge al hacer scroll, cierre del menú móvil al elegir opción.

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
- **Renderizado:** IIFE que construye tarjetas en `#grillaDirectorio` (clases `artista-ficha`, `ficha-foto`, `disco`...), escapa HTML, aplica `onerror` en fotos y filtra por texto (nombre o alias) y por tipo.
- Los enlaces de plataformas usan buscadores de YouTube/Spotify y búsquedas de Apple Music.

---

## 7. Reproductor integrado (`reproductor.js`)

- Tres mapas de pistas + enlace genérico:
  - `PRUEBAS_ESCUCHAR`: canciones del `#escuchar` (27) y del Top 10. Clave = nombre de la canción.
  - `PRUEBAS_PRODUCTOS`: canciones del `#catalogo` (24). Clave = `.card-title`.
  - `PRUEBAS_DESTACADOS`: artistas del `#artistas` (11). Clave = `.artista-nombre`.
- Al cargar el DOM (`DOMContentLoaded`) vincula:
  - Miniaturas `.escucha-thumb` (clic reproduce con `preventDefault`).
  - Botón `btn-probar` "Escuchar muestra" inyectado en cada tarjeta del catálogo (antes de `.precio`).
  - Botón `btn-probar-artista` inyectado en tarjetas `.artista-card`.
  - **Botones `[data-muestra]`** vía `vincularMuestrasGenericas()` (usados en el Ranking Top 10 y cualquier otro lugar). El valor del atributo debe coincidir con una clave de `PRUEBAS_ESCUCHAR`.
- **Audio:** `new Audio()` con previews `.m4a` de iTunes (`audio-ssl.itunes.apple.com`). Barra de progreso editable, play/pausa, cierre y etiquetas de tema/artista.
- **UI:** reproductor fijo inferior con disco giratorio (clases `visible` / `reproduciendo`) y nota "Muestra de 30 s".

> **Importante:** si se agrega una canción/producto/artista nuevo, hay que añadir la entrada correspondiente en el mapa adecuado con la URL de preview; de lo contrario no tendrá botón "Escuchar muestra" (o el clic no hará nada).

---

## 8. Formularios y carrito

- Todos los formularios llevan el atributo **`data-exito`** (mensaje de éxito) y `novalidate`. La validación es **genérica en `main.js`**: al enviar usa `form.checkValidity()`, activa `was-validated` de Bootstrap, y si es válido muestra `window.alert(...)` y `form.reset()`.
  Formularios: `#formPedido` (pedido.html), `#formContacto` y `#formBoletin` (contacto.html).
- **Carrito (pedido.html):** script inline ES5 con objeto `PRODUCTOS`, estado en un mapa `carrito {titulo: cantidad}`, render del resumen con miniaturas cuadradas, cálculo de subtotal/envío/impuestos/total (es-CO), selector para agregar y soporte de `?producto=<título>`.
- **Sin backend:** ningún formulario envía datos a un servidor real. Solo simulación en el cliente.

---

## 9. Despliegue en GitHub Pages

- El proyecto es estático, por lo que GitHub Pages sirve los archivos tal cual.
- Repositorio remoto: **github.com/Alfonso-Acuna/VallenatoStore-Sitio**.
- **URL del sitio:** `https://alfonso-acuna.github.io/VallenatoStore-Sitio/`
- Rama desplegada: `main` (source: "Deploy from a branch").
- Para actualizar el sitio: `git add` / `git commit` / `git push origin main` (Pages se regenera automáticamente).
- **Rutas relativas:** el HTML usa `styles.css`, `main.js`, `artistas.js`, `reproductor.js` con rutas relativas y los enlaces entre páginas también son relativos, así que funciona bajo cualquier sub-ruta del dominio.
- El repositorio antiguo `Alfonso-Acuna/vallenatostore` (versión single-page con `carrito.js`) está **intacto** y no debe tocarse.

---

## 10. Notas y convenciones para seguir modificando

1. **Siempre mantener este `CONTEXTO.md` actualizado** tras cualquier cambio estructural o de datos.
2. El navbar/footer se **duplican estáticamente** en las 7 páginas. Al cambiar un enlace del menú o un dato del footer (dirección, teléfono, redes, horario), repetirlo en **todas** las páginas y marcar el enlace activo de esa página con `aria-current="page"`.
3. JS en **ES5** (sin `const`/`let`/arrow). Nombres de clases con prefijo de componente (`artista-`, `ficha-`, `rep-`, `producto-`, `escucha-`, `top-`, `resumen-`, `paso-`).
4. Si se agrega un artista/discografía: actualizar `ARTISTAS`, `ARTISTAS_FOTOS`, y si está en destacados/catálogo/escuchar/Top 10, también su pista en `reproductor.js`.
5. Si se agrega un producto: replicar su título exacto en el catálogo (`catalogo.html`), en `PRUEBAS_PRODUCTOS` (reproductor.js) y en el mapa `PRODUCTOS` + `<select>` de `pedido.html`.
6. Respetar la paleta, el glassmorphism (`--vidrio`) y las miniaturas 1:1 definidas en `styles.css`.
7. Accesibilidad y calidad: etiquetas `alt` descriptivas, `aria-label` en botones de icono, contraste AA y JS sin errores en consola.
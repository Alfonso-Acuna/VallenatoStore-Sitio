# VallenatoStore — Contexto del proyecto

> **Nota para futuros desarrollos:** este archivo es la fuente de verdad sobre la página. Léelo y actualízalo cada vez que modifiques el proyecto (estructura, secciones, datos, librerías o despliegue).

---

## 1. Resumen

VallenatoStore es una **tienda virtual estática** de música vallenata organizada como **sitio multi-página**: vende **álbumes, vinilos (CD / Vinilo 180g / descarga digital)**, muestra un **directorio de 44 artistas y agrupaciones** con discografías y enlaces a plataformas, incluye un **reproductor integrado de muestras de 30 s**, un **Ranking Top 10**, un **checkout de 2 columnas** con **carrito persistente (`localStorage`) y contador en la navbar**, un **buscador + filtro de precio** en el catálogo, **formularios validados** y envío por **WhatsApp (pedidos)** / **EmailJS (contacto y boletín)**, más **Open Graph y JSON-LD** para compartir y SEO.

- **Idioma:** Español (Colombia).
- **Tipo:** Sitio 100 % estático (HTML + CSS + JS vanilla). Sin framework de frontend ni backend.
- **Propósito:** exhibir catálogo, permitir escuchar muestras sin salir de la página y capturar pedidos confirmándolos por WhatsApp.
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
├── carrito.js        → Carrito persistente (localStorage) + contador del navbar
├── artistas.js       → Datos de los 44 artistas + renderizado/filtros del directorio
├── reproductor.js    → Reproductor de muestras de 30 s
└── CONTEXTO.md       → Este documento
```

| Archivo | Responsabilidad |
| --- | --- |
| `index.html`, `historia.html`, `artistas.html`, `catalogo.html`, `escuchar.html`, `pedido.html`, `contacto.html` | Una página completa cada uno. Comparten navbar/footer **duplicados estáticamente** (cada página marca el enlace activo con `aria-current="page"`). Todos incluyen el bloque de **Open Graph/Twitter Cards** en el `<head>`. |
| `styles.css` | Todo el diseño visual, paleta, animaciones, glassmorphism y responsive (incluye `.carrito-contador`, `.buscador-select`, `#contadorProductos`). |
| `main.js` | AOS, hero escalonado, contadores, navbar compacta, volver-arriba, cierre del menú móvil, validación genérica de formularios y envío por **EmailJS** (`EMAILJS_CONFIG` al inicio del archivo). |
| `carrito.js` | Objeto global **`window.Carrito`** (`agregar/quitar/vaciar/items/total/cantidadDe/pintar`) con respaldo en memoria si falla `localStorage`, más la inyección del contador en la navbar. |
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
| EmailJS (`@emailjs/browser`) | 4.x | **Solo en `contacto.html`**: envío real de `#formContacto` y `#formBoletin`. Se desactiva dejando vacío `EMAILJS_CONFIG`. |

**Lenguaje:** JavaScript ES5 (var, funciones anidadas, IIFEs). Sin módulos ni bundlers. Orden de carga recomendado: `bootstrap.bundle.min.js` → `aos.js` → `main.js` → **`carrito.js`** → (`reproductor.js`) → (`artistas.js` según página) → script inline de la página. En `contacto.html` el SDK de EmailJS va antes de `main.js`.

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
- **Catálogo** (id `catalogo`): **24 productos** (títulos idénticos a las claves de `PRUEBAS_PRODUCTOS`). La grilla es `#grillaCatalogo` (`.row g-4`) y **cada producto es una columna de Bootstrap**: `<div class="col-6 col-md-4 col-lg-3 producto-item" ... data-formato="cd|vinilo|digital">` que envuelve el `article.producto.card` (portada **1:1**, badge `.producto-format`, `.card-title`, `.card-text`, `.precio` y botón **"Escuchar muestra"** inyectado por el reproductor).   El botón circular de carrito (`btn-circulo`) **agrega el producto con `window.Carrito`** (con `preventDefault()`; sin JS el enlace sigue llevando a `pedido.html?producto=<título codificado>`), muestra un check temporal (1,4 s) y actualiza el contador del navbar. Los precios `.precio` siguen el **esquema de la sección 6**.
- **Filtros por formato** (`[data-filtrar-formato]`: todos/vinilo/cd/digital), manejados por el script inline de la página: al hacer clic agrega o quita **`d-none` sobre la columna `.producto-item`** (nunca sobre la tarjeta interna `.producto`), de modo que Bootstrap colapsa el ancho de la columna y las tarjetas visibles **se reordenan continuamente desde la izquierda** sin dejar huecos. La regla `.producto-item.d-none { display: none !important; }` en `styles.css` garantiza el colapso total. Después del filtrado se llama a **`AOS.refresh()`** para recalcular posiciones/alturas de las tarjetas animadas.
- **Buscador y rango de precio:** `#buscarProducto` (`.input-group buscador-artista`), `#rangoPrecio` (todos / hasta $50.000 / $50.000–150.000 / desde $150.000) y `#contadorProductos` (`aria-live="polite"`, texto *Mostrando N de 24 álbumes*). Los tres criterios se combinan en una sola función `aplicarFiltros()` que lee `data-formato`, `data-precio` y el texto de la columna.
- **Formatos** (id `formatos`): 3 tarjetas (Vinilo 180g, CD, Descarga digital) con listas de beneficios.

**`escuchar.html`**
- **Muestras** (id `escuchar`): **27 tarjetas** `.escucha-card` con `.escucha-thumb` (clic reproduce), duración 0:30 y enlaces a plataformas. Las miniaturas provienen de Apple Music (iTunes) `/300x300bb.jpg`.
- **Ranking Top 10** (id `top`, fondo oscuro): lista numerada con tema, artista, badge, duración y **botón `.top-play` con `data-muestra`** (reproduce vía `vincularMuestrasGenericas()`).

**`pedido.html`**
- **Checkout 2 columnas** (id `pedido`):
  - Izquierda: formulario `#formPedido` en **3 pasos** — (1) Datos personales (nombre, documento, correo), (2) Dirección de envío (departamento, municipio, dirección, indicaciones), (3) Método de pago (Nequi/Daviplata, tarjeta, contra entrega, consignación) con aviso dinámico según el método.
  - Derecha: **resumen de compra** estilo MercadoLibre: miniaturas **cuadradas** del producto, subtotal, envío (gratis ≥ $100.000, si no $8.000), impuestos 19 %, total en `es-CO`, botón grande "Confirmar Pedido" e insignias de confianza.
- **Carrito gestionado por `carrito.js` + el script inline de la página:** el mapa `PRODUCTOS` (título → artista, precio, imagen) sirve para el resumen y el mensaje de pedido; el estado real vive en `localStorage` (`vallenatostore_carrito`). El selector "Agregar otro producto" y `?producto=` del query string (lo usan los enlaces del catálogo) llaman a `Carrito.agregar()`.
- **Confirmar pedido → WhatsApp:** el envío del formulario valida con `checkValidity()` + `was-validated`, y si es válido construye `https://wa.me/573001234567?text=…` con el desglose (ítems, subtotal, envío, impuestos 19 %, total, cliente, dirección, método de pago), abre la pestaña, **vacía el carrito** y muestra un solo `alert`. `#formPedido` **no** lleva `data-exito` (para evitar doble mensaje con el handler genérico de `main.js`).

**`contacto.html`**
- **Contacto** (id `contacto`, fondo oscuro): datos (Magangué, Bolívar · +57 300 123 4567 · pedidos@vallenatostore.co · horario) + formulario `#formContacto`.
- **Boletín** (id `boletin`): formulario `#formBoletin` sobre fondo de concierto.
- **FAQ** (id `faq`): acordeón con 5 preguntas.

**Extras globales:** botón flotante volver-arriba, navbar que se encoge al hacer scroll, cierre del menú móvil al elegir opción, **contador del carrito en la navbar** (`carrito.js`, oculto cuando está vacío).

---

## 6. Esquema de precios por formato y categoría

Vigente desde el **19/10/2026**. Es la **fuente de verdad** de precios: los 24 precios visibles en `catalogo.html` (`.precio`) y los 24 del mapa `PRODUCTOS` de `pedido.html` (campo `precio`, sin puntos ni símbolo) **deben coincidir siempre** con esta tabla.

| Formato (`data-formato`) | Categoría | Precio |
| --- | --- | --- |
| Vinilo 180g (`vinilo`) | Álbum legendario / clásico (Diomedes Díaz, Rafael Orozco, Jorge Oñate, Binomio de Oro, Los Hermanos Zuleta) | **$180.000** |
| Vinilo 180g (`vinilo`) | Álbum contemporáneo / reciente (Silvestre Dangond, Peter Manjarrés, Jorge Celedón, Felipe Peláez & Zabaleta) | **$150.000** |
| Vinilo 180g (`vinilo`) | Edición especial o coleccionable de edición limitada | **$210.000** |
| CD (`cd`) | Álbum estándar / lanzamiento en joyero o digipak | **$45.000** |
| CD (`cd`) | Edición doble o grabación especial en vivo | **$60.000** |
| CD (`cd`) | Catálogo clásico / reexpedición (recopilatorios y legados) | **$38.000** |
| Digital (`digital`) | Álbum completo (MP3 320 kbps / FLAC) | **$25.000** |
| Digital (`digital`) | EP o lanzamiento sencillo | **$18.000** |

**Asignación actual de los 24 productos:**

- **Vinilos (8):**
  - $180.000 (clásicos): *Experiencias Vividas*, *Título de Amor* (Diomedes Díaz), *Aniversario* (Los Hermanos Zuleta).
  - $150.000 (contemporáneos): *Llévame en Tus Sueños* (Jorge Celedón), *A Mi Manera* (Felipe Peláez & Zabaleta), *La 9ª Batalla (En Vivo)* (Silvestre Dangond), *El Caballero del Vallenato* (Peter Manjarrés).
  - $210.000 (edición especial/coleccionable): *Colección Top 50* (Jorge Oñate).
- **CDs (12):**
  - $60.000 (doble): *Los 30 Vallenatos de la Historia* (doble CD, varios artistas).
  - $45.000 (estándar): *Un Canto Celestial*, *La Hora de la Verdad*, *10 Años de Historia*, *Poncho Zuleta 45 Años*, *Pa Que Te Enamores*, *Mi Diosa Humana*.
  - $38.000 (catálogo clásico/reexpedición): *30 Mejores* (Binomio de Oro), *30 Grandes Éxitos* (Diomedes Díaz), *Siempre Gigantes*, *Grandes Éxitos de Los Chiches Vallenatos*, *Adiós a la Diosa*.
- **Digitales (4):** $25.000 (álbum completo): *Celedón Sin Fronteras*, *Imparables*, *Volver a Triunfar*, *El Invencible*. **No hay EPs ni sencillos** en el catálogo, así que la tarifa de $18.000 queda disponible pero sin uso.

> Con este esquema conviven precios por debajo y por encima del umbral de **envío gratis ($100.000)** del resumen de compra, así que el cálculo de envío/impuestos del carrito sigue siendo visible en la mayoría de los pedidos.

---

## 7. Datos de artistas (`artistas.js`)

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

## 8. Reproductor integrado (`reproductor.js`)

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

## 9. Formularios, carrito y envíos

- **Validación genérica (`main.js`):** todo formulario con **`data-exito`** y `novalidate` usa `form.checkValidity()`, activa `was-validated` de Bootstrap y, si es válido, avisa con `window.alert(data-exito)`, hace `form.reset()` y retira la clase. Formularios: `#formContacto` y `#formBoletin` (ambos con `data-emailjs`).
- **EmailJS (opcional):** si el formulario tiene `data-emailjs` y `EMAILJS_CONFIG` (inicio de `main.js`) tiene `publicKey`, `serviceId` y `templateId` **no vacíos** con el SDK cargado, el envío se hace con `emailjs.send(...)` y los campos se envían por su atributo `name` (`nombre`, `correo`, `asunto`, `mensaje`). Mientras esté vacío, se muestra el mensaje de `data-exito` más una nota de que el envío está inactivo. En caso de error: alert de reintento y botón reactivado.
- **`carrito.js` (todas las páginas):** clave `localStorage` **`vallenatostore_carrito`** con forma `{ "título del álbum": cantidad }`; si `localStorage` falla, se usa una copia en memoria. En `DOMContentLoaded` inyecta el badge `<span class="carrito-contador" data-contador-carrito>` dentro de `a[href="pedido.html"].btn-dorado` de la navbar y lo pinta (oculto con 0). Al cargar cualquier página nueva el badge refleja lo guardado.
- **Carrito (pedido.html):** el script inline replica el mapa `carrito` del `Carrito` global mediante `carritoActual()`, renderiza el resumen con miniaturas cuadradas y calcula subtotal / envío (gratis ≥ $100.000, si no $8.000) / impuestos 19 % / total en `es-CO`.
- **Teléfono y canales:** WhatsApp **`573001234567`** (`WHATSAPP` en el script de pedido.html, igual al del footer) · correo `pedidos@vallenatostore.co`.
- **Sin backend real:** el catálogo/pedidos se confirman por WhatsApp y el contacto por EmailJS; nada se guarda en un servidor propio.

---

## 10. SEO (Open Graph, Twitter Cards y datos estructurados)

- **Metas sociales en las 7 páginas** (bloque `<!-- Open Graph / Twitter Cards -->` justo después del `<title>`): `og:type`, `og:site_name`, `og:locale` (`es_CO`), `og:title`, `og:description` (reutilizan el `<title>` y la `meta description` de cada página), `og:image`, `og:url` y `twitter:card` = `summary_large_image` con título, descripción e imagen.
  - **URL base:** `https://alfonso-acuna.github.io/VallenatoStore-Sitio/<archivo>.html`
  - **Imagen única de marca/producto:** portada de *30 Grandes Éxitos* (Apple Music) en **600×600**: `https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/a4/93/49/a493492d-540c-5afa-c4c4-41842cfc05b9/886446879833.jpg/600x600bb.jpg`
- **Datos estructurados JSON-LD** (bloque `<script type="application/ld+json">` antes de `</head>`):
  - `catalogo.html` → **`ItemList`** de 24 elementos `ListItem` → `item` con `@type: ["Product","MusicAlbum"]`, `name`, `description`, `image` (600×600), `category` (Vinilo 180g/CD/Descarga digital), `brand` (artista) y `offers` (`price` = `data-precio`, `priceCurrency: COP`, `availability: InStock`, `url` = `pedido.html?producto=…`).
  - `index.html` → **`@graph`** con `WebSite` + `Store` (teléfono, correo, dirección Magangué/Bolívar, horario, métodos de pago, precios en COP).
- **Al agregar o quitar un producto** hay que regenerar/ajustar el bloque JSON-LD de `catalogo.html` (posición, `numberOfItems` y su `item`), además de `catalogo.html`, `reproductor.js` y `pedido.html` como indica la sección 12.
- Herramientas de validación recomendadas: [Rich Results Test](https://search.google.com/test/rich-results) y [Sharing Debugger de Facebook](https://developers.facebook.com/tools/debug/).

---

## 11. Despliegue en GitHub Pages

- El proyecto es estático, por lo que GitHub Pages sirve los archivos tal cual.
- Repositorio remoto: **github.com/Alfonso-Acuna/VallenatoStore-Sitio**.
- **URL del sitio:** `https://alfonso-acuna.github.io/VallenatoStore-Sitio/`
- Rama desplegada: `main` (source: "Deploy from a branch").
- Para actualizar el sitio: `git add` / `git commit` / `git push origin main` (Pages se regenera automáticamente).
- **Rutas relativas:** el HTML usa `styles.css`, `main.js`, `carrito.js`, `artistas.js`, `reproductor.js` con rutas relativas y los enlaces entre páginas también son relativos, así que funciona bajo cualquier sub-ruta del dominio.
- El repositorio antiguo `Alfonso-Acuna/vallenatostore` (versión single-page con `carrito.js`) está **intacto** y no debe tocarse.

---

## 12. Notas y convenciones para seguir modificando

1. **Siempre mantener este `CONTEXTO.md` actualizado** tras cualquier cambio estructural o de datos.
2. El navbar/footer se **duplican estáticamente** en las 7 páginas. Al cambiar un enlace del menú o un dato del footer (dirección, teléfono, redes, horario), repetirlo en **todas** las páginas y marcar el enlace activo de esa página con `aria-current="page"`. Mantener en las 7 el orden `main.js` → `carrito.js` y el bloque de Open Graph del `<head>`.
3. JS en **ES5** (sin `const`/`let`/arrow). Nombres de clases con prefijo de componente (`artista-`, `ficha-`, `rep-`, `producto-`, `escucha-`, `top-`, `resumen-`, `paso-`).
4. Si se agrega un artista/discografía: actualizar `ARTISTAS`, `ARTISTAS_FOTOS`, y si está en destacados/catálogo/escuchar/Top 10, también su pista en `reproductor.js`.
5. Si se agrega un producto: replicar su título exacto en el catálogo (`catalogo.html`, en la columna `.producto-item` **con `data-formato` y `data-precio`**), en `PRUEBAS_PRODUCTOS` (reproductor.js) y en el mapa `PRODUCTOS` + `<select>` de `pedido.html`, **asignándole su precio según el esquema de la sección 6** (formato + categoría) en `.precio` y en `precio:`. Recordar el bloque JSON-LD de `catalogo.html` (sección 10).
6. Respetar la paleta, el glassmorphism (`--vidrio`) y las miniaturas 1:1 definidas en `styles.css`.
7. Accesibilidad y calidad: etiquetas `alt` descriptivas, `aria-label` en botones de icono, contraste AA y JS sin errores en consola.
8. **Al crear una página nueva:** copiar navbar/footer de una existente, incluir `main.js` y `carrito.js`, y agregar el bloque Open Graph/Twitter Cards con su propio `title`, `description` y `url` (sección 10).
9. **Verificación:** el sitio se probó con Node + **jsdom** (fuera del repo) cubriendo: filtros y buscador del catálogo, contador y badge del carrito, persistencia en `localStorage`, resumen y desglose de `pedido.html` (incluida la URL de WhatsApp y `?producto=`), y el envío del contacto con EmailJS inactivo. Antes de publicar cambios de JS conviene revalidar esos flujos y `node --check` sobre cada archivo.
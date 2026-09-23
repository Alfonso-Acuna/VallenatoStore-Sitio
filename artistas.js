/* =========================================================
   VallenatoStore – Directorio de artistas (datos y renderizado)
   ========================================================= */

var ARTISTAS_FOTOS = {
    1: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/2c/69/a1/2c69a185-54f0-3cc6-d417-c39ecc8c8d51/196874754009.jpg/300x300bb.jpg",
    2: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2e/cb/6f/2ecb6f8e-550a-4c52-ab6a-b41986fbac04/mzi.copfhxiq.jpg/300x300bb.jpg",
    3: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/64/12/18/641218b0-3d0c-3880-c630-d27006a6d810/829410690355.png/300x300bb.jpg",
    4: "https://is1-ssl.mzstatic.com/image/thumb/Music20/v4/76/77/0a/76770af8-aa97-54f8-b7f9-e722726e09c8/mzm.edlkydau.jpg/300x300bb.jpg",
    5: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/d4/15/84/d41584be-590b-bf6d-7a71-7c5fb1659ff4/0.jpg/300x300bb.jpg",
    6: "https://is1-ssl.mzstatic.com/image/thumb/Features115/v4/ff/70/e6/ff70e654-09f7-fe46-3b28-c5db15258f0e/dj.ysmstuvn.jpg/300x300bb.jpg",
    7: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/0e/f6/60/0ef6606a-b605-81c6-ad1d-71b61d24fbc3/0.jpg/300x300bb.jpg",
    8: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/a5/33/fc/a533fcef-4fe5-f108-41d6-075ed0ab5320/886444497398.jpg/300x300bb.jpg",
    9: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/7f/d2/4d/7fd24de7-0171-5dfd-590e-ed766b8735fc/663899159367_cover.jpg/300x300bb.jpg",
    10: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/3d/b8/7e/3db87e70-7ca0-bec2-b306-d42336caf866/7703770068067.png/300x300bb.jpg",
    11: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/c6/ec/aa/c6ecaa34-106b-89e1-7ac3-93c839609f89/7703770106585.png/300x300bb.jpg",
    12: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/1e/ca/f6/1ecaf611-4309-138e-9dd3-4f2d1fde09e6/191773706500.png/300x300bb.jpg",
    13: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/43/1f/fd/431ffd34-9299-3570-23a7-d486b023c81a/829410648561.png/300x300bb.jpg",
    14: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/87/20/da/8720dadc-9eea-c74d-faba-d4f9fb8b40b1/198846416090.jpg/300x300bb.jpg",
    15: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/27/52/91/27529196-d103-a793-5601-0e588981dd99/829410988254.png/300x300bb.jpg",
    16: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/48/1e/89/481e89b4-ac1b-54ec-eb5a-2ec014cbb5ea/193483923215.png/300x300bb.jpg",
    17: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/35/c3/e0/35c3e0ee-bced-8c13-0f8d-ef6469309c71/7703770260775.png/300x300bb.jpg",
    18: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/85/06/eb/8506eb3b-553c-fddc-9afc-1b24cd2e3cb4/0.jpg/300x300bb.jpg",
    19: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/53/db/c5/53dbc503-1dae-761b-ed13-4efc27660843/0.jpg/300x300bb.jpg",
    20: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/d9/05/a7/d905a7d0-c3d2-5cda-7e64-ac42f50e4c96/D10267-1.jpg/300x300bb.jpg",
    21: "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/a4/93/49/a493492d-540c-5afa-c4c4-41842cfc05b9/886446879833.jpg/300x300bb.jpg",
    22: "https://is1-ssl.mzstatic.com/image/thumb/Music/61/8a/93/mzi.lxwtgmyr.jpg/300x300bb.jpg",
    23: "https://is1-ssl.mzstatic.com/image/thumb/Music3/v4/12/be/65/12be65c2-33f2-358e-b503-e52d6e31b3de/0.jpg/300x300bb.jpg",
    24: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/f3/02/02/f30202c3-d21a-a57c-8f2e-bdd49480ff04/886445865219.jpg/300x300bb.jpg",
    25: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/c0/e2/ff/c0e2ff48-c9a3-75d6-9964-9d9f348a7043/1200220051465.jpg/300x300bb.jpg",
    26: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/c6/d1/fa/c6d1fa4f-5751-e241-1a84-ef5488514547/198846408705.jpg/300x300bb.jpg",
    27: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/dc/6f/11/dc6f1158-2195-ce5a-3936-a94375ff350e/mzi.retdgwwj.jpg/300x300bb.jpg",
    28: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/79/b1/82/79b1826e-18b3-71a8-b88d-56c418d794df/0.jpg/300x300bb.jpg",
    29: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/61/1e/d0/611ed0b2-cd10-9b54-816a-86a1834e1823/0.jpg/300x300bb.jpg",
    30: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/90/bb/d5/90bbd5fe-3622-1aa5-58d4-f178acaea5e5/888880013514.jpg/300x300bb.jpg",
    31: "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/bb/5f/22/bb5f2227-a6d6-0817-cf6a-039c238e3f8b/5099748578426.jpg/300x300bb.jpg",
    32: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/1f/66/74/1f667452-165e-dce4-3e22-6995d738fc2b/96297905968.jpg/300x300bb.jpg",
    33: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/ab/f3/bb/abf3bb38-032a-df34-9845-238062844e5d/194491384715.png/300x300bb.jpg",
    34: "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/3d/d9/af/3dd9afb8-6ffe-3ec4-ed59-a343ebe982d1/191924254478.jpg/300x300bb.jpg",
    35: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/68/52/d8/6852d819-d5bd-d362-097f-06fff181d8bc/0.jpg/300x300bb.jpg",
    36: "https://is1-ssl.mzstatic.com/image/thumb/Music/y2004/m06/d04/h20/s05.bqqzigdv.jpg/300x300bb.jpg",
    37: "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/74/10/15/74101547-158d-e008-ae16-e5730c132dc4/191924957348.jpg/300x300bb.jpg",
    38: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/57/fe/a3/57fea357-f002-ac83-3049-cf4d8893007a/843041069465.jpg/300x300bb.jpg",
    39: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/a0/25/7f/a0257fc4-75f0-809c-d089-10d99c09c52d/0.jpg/300x300bb.jpg",
    40: "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/80/3d/c7/803dc7c7-8def-117a-73f8-fc5eac793119/0.jpg/300x300bb.jpg",
    41: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/95/94/1b/95941bb9-515a-22aa-674a-2cc519e5264c/823375166467_Cover.jpg/300x300bb.jpg",
    42: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/f0/72/8f/f0728f7a-f3a0-9ab8-03f3-8b9e046d278b/199538776768.jpg/300x300bb.jpg",
    43: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/82/19/a5/8219a594-8fd5-5809-453c-181735374ab4/198704880421_Cover.jpg/300x300bb.jpg",
    44: "https://is1-ssl.mzstatic.com/image/thumb/Music3/v4/8c/1e/c1/8c1ec12b-4ee3-52d5-000d-b5efb673b48b/0.jpg/300x300bb.jpg"
};

var ARTISTAS = [
    {
        id: 1,
        nombre: "Silvestre Dangond",
        alias: "Referente de la Nueva Ola del vallenato",
        descripcion: "Cantante y compositor de Urumita (La Guajira), máximo referente de la 'Nueva Ola' del vallenato, con múltiples Latin Grammy.",
        tipo: "solista",
        albumes: [
            "Tanto Para Ti (2002, con Ramón/Román López)",
            "Lo Mejor Para los Dos (2003, con Juancho De La Espriella)",
            "Más Unidos Que Nunca (2004, con Juancho De La Espriella)",
            "Ponte a la Moda (2005, con Juancho De La Espriella)",
            "La Fama (2006, con Juancho De La Espriella)",
            "El Original (2008, con Juancho De La Espriella)",
            "Cantinero (2010, con Juancho De La Espriella)",
            "No Me Compares Con Nadie (2011, con Juancho De La Espriella)",
            "La 9ª Batalla (2013, con Rolando Ochoa)",
            "Sigo Invicto (2014, con Álvaro López y Lucas Dangond)",
            "Gente Valiente (2017)",
            "Esto Es Vida (2018, Latin Grammy Mejor Álbum Vallenato/Cumbia)",
            "Ta Malo (2023)",
            "El Último Baile (2025, Latin Grammy y nominación al Grammy)"
        ],
        yt: "https://www.youtube.com/results?search_query=Silvestre%20Dangond%20vallenato",
        sp: "https://open.spotify.com/search/Silvestre%20Dangond",
        am: "https://music.apple.com/us/search?term=Silvestre%20Dangond"
    },
    {
        id: 2,
        nombre: "Kaleth Morales",
        alias: "El Rey de la Nueva Ola",
        descripcion: "Cantautor de Valledupar, hijo de Miguel Morales, fallecido en 2005. Autor de más de 110 composiciones.",
        tipo: "solista",
        albumes: [
            "La Hora de la Verdad (2005)",
            "Único (2005/2006, póstumo)",
            "Kaleth Morales en la Guitarra / Guitarras (2006, póstumo)"
        ],
        yt: "https://www.youtube.com/results?search_query=Kaleth%20Morales%20vallenato",
        sp: "https://open.spotify.com/search/Kaleth%20Morales",
        am: "https://music.apple.com/us/search?term=Kaleth%20Morales"
    },
    {
        id: 3,
        nombre: "Miguel Morales",
        alias: "La Voz",
        descripcion: "Cofundador de Los Diablitos junto a Omar Geles (1983-1991); padre de Kaleth Morales. Extensa carrera como solista.",
        tipo: "solista",
        albumes: [
            "Con Los Diablitos: Día Tras Día (1987), Romántico y Enamorado (1990) y otros (7 álbumes en total, 1985-1991)",
            "Dos álbumes con el acordeonero Víctor Reyes (desde 1992) y un tercero en 2000",
            "Cinco álbumes con Juan David 'El Pollito' Herrera",
            "Cuatro álbumes con Gabriel 'El Chiche' Maestre",
            "Desde 2011, varios álbumes con Saúl David 'Pepín' Soto",
            "Éxitos destacados: 'Mi Diosa Humana', 'Sirena Encantada', 'Retrato de Amor'"
        ],
        yt: "https://www.youtube.com/results?search_query=Miguel%20Morales%20vallenato",
        sp: "https://open.spotify.com/search/Miguel%20Morales",
        am: "https://music.apple.com/us/search?term=Miguel%20Morales"
    },
    {
        id: 4,
        nombre: "Martín Elías",
        alias: "El Terremoto del Vallenato",
        descripcion: "Hijo de Diomedes Díaz, nacido en Valledupar en 1990, fallecido en accidente de tránsito en 2017.",
        tipo: "solista",
        albumes: [
            "Una Nueva Historia (2007, con Rolando Ochoa)",
            "El Terremoto (2011, con Rolando Ochoa)",
            "Dos álbumes con Juancho De La Espriella (2012-2015)",
            "R8 (2015)",
            "Imparables (2016)",
            "Homenaje a los Más Grandes Vol. 1 y 2",
            "Sin Límites (2017, álbum póstumo)"
        ],
        yt: "https://www.youtube.com/results?search_query=Mart%C3%ADn%20El%C3%ADas%20vallenato",
        sp: "https://open.spotify.com/search/Mart%C3%ADn%20El%C3%ADas",
        am: "https://music.apple.com/us/search?term=Mart%C3%ADn%20El%C3%ADas"
    },
    {
        id: 5,
        nombre: "Churo Díaz",
        alias: "Acordeonero y compositor cesarense",
        descripcion: "Uno de los más premiados del Festival de la Leyenda Vallenata; ha acompañado a Jorge Celedón y Sergio Luis Rodríguez, entre otros.",
        tipo: "solista",
        albumes: [
            "Numerosas producciones junto a Jorge Celedón en los años 2000",
            "Trabajos junto a Sergio Luis Rodríguez",
            "Producciones como solista y con distintos cantantes invitados"
        ],
        yt: "https://www.youtube.com/results?search_query=Churo%20D%C3%ADaz%20vallenato",
        sp: "https://open.spotify.com/search/Churo%20D%C3%ADaz",
        am: "https://music.apple.com/us/search?term=Churo%20D%C3%ADaz"
    },
    {
        id: 6,
        nombre: "Los Betos",
        alias: "Vallenato romántico de los 90 y 2000",
        descripcion: "Agrupación vallenata romántica colombiana, popular en las décadas de 1990 y 2000.",
        tipo: "agrupacion",
        albumes: [
            "Catálogo de álbumes disponible en sus perfiles oficiales de streaming (discografía extensa, ver enlaces)"
        ],
        yt: "https://www.youtube.com/results?search_query=Los%20Betos%20vallenato",
        sp: "https://open.spotify.com/search/Los%20Betos",
        am: "https://music.apple.com/us/search?term=Los%20Betos"
    },
    {
        id: 7,
        nombre: "Beto Zabaleta",
        alias: "Acordeonero y cantante, hijo de Alfredo Gutiérrez",
        descripcion: "Extensa carrera junto a distintos cantantes del vallenato romántico.",
        tipo: "solista",
        albumes: [
            "Amplia discografía como acordeonero acompañante y solista (ver catálogo completo en las plataformas)"
        ],
        yt: "https://www.youtube.com/results?search_query=Beto%20Zabaleta%20vallenato",
        sp: "https://open.spotify.com/search/Beto%20Zabaleta",
        am: "https://music.apple.com/us/search?term=Beto%20Zabaleta"
    },
    {
        id: 8,
        nombre: "Felipe Peláez",
        alias: "Referente del vallenato pop/romántico moderno",
        descripcion: "Cantautor de Sincelejo (Sucre), referente del vallenato pop/romántico moderno.",
        tipo: "solista",
        albumes: [
            "Felipe Viene Llegando",
            "A Mi Manera",
            "Enamorado, Loco y Herido",
            "Discografía completa y sencillos recientes en sus perfiles oficiales"
        ],
        yt: "https://www.youtube.com/results?search_query=Felipe%20Pel%C3%A1ez%20vallenato",
        sp: "https://open.spotify.com/search/Felipe%20Pel%C3%A1ez",
        am: "https://music.apple.com/us/search?term=Felipe%20Pel%C3%A1ez"
    },
    {
        id: 9,
        nombre: "Peter Manjarrés",
        alias: "El Rey del Despecho",
        descripcion: "Cantante de Fonseca (La Guajira), uno de los vallenatos más premiados en el Festival de la Leyenda Vallenata.",
        tipo: "solista",
        albumes: [
            "Sentimiento Vallenato",
            "Amor y Control (con Sergio Luis Rodríguez)",
            "Amores que Matan",
            "Varias producciones adicionales con distintos acordeoneros (ver catálogo completo en plataformas)"
        ],
        yt: "https://www.youtube.com/results?search_query=Peter%20Manjarr%C3%A9s%20vallenato",
        sp: "https://open.spotify.com/search/Peter%20Manjarr%C3%A9s",
        am: "https://music.apple.com/us/search?term=Peter%20Manjarr%C3%A9s"
    },
    {
        id: 10,
        nombre: "Farid Ortiz",
        alias: "El Muchacho Consentido",
        descripcion: "Cantante de Ovejas (Sucre), figura destacada del vallenato sabanero.",
        tipo: "solista",
        albumes: [
            "Catálogo con varios álbumes y sencillos junto a distintos acordeoneros (ver discografía completa en plataformas)"
        ],
        yt: "https://www.youtube.com/results?search_query=Farid%20Ortiz%20vallenato",
        sp: "https://open.spotify.com/search/Farid%20Ortiz",
        am: "https://music.apple.com/us/search?term=Farid%20Ortiz"
    },
    {
        id: 11,
        nombre: "Los Gigantes del Vallenato",
        alias: "Fundados en 1984 por Iván Calderón",
        descripcion: "Agrupación fundada en 1984 en Medellín por Iván Calderón, referentes del vallenato romántico. Hoy liderada por Daniel Calderón.",
        tipo: "agrupacion",
        albumes: [
            "Con Altura (1996)",
            "Pisando Fuerte (1997)",
            "Por Buen Camino (1998)",
            "Siempre Gigantes (1999)",
            "Únicos (2000)",
            "Aire Fresco (2005)",
            "Así Somos (2007)",
            "Vía Libre (2009)",
            "Alto Voltaje (2011)",
            "De Sur a Norte (2015)",
            "Peligroso (2017)",
            "Más Gigantes Que Nunca (2022)",
            "Dos Épocas (2023, dos ediciones)"
        ],
        yt: "https://www.youtube.com/results?search_query=Los%20Gigantes%20del%20Vallenato%20vallenato",
        sp: "https://open.spotify.com/search/Los%20Gigantes%20del%20Vallenato",
        am: "https://music.apple.com/us/search?term=Los%20Gigantes%20del%20Vallenato"
    },
    {
        id: 12,
        nombre: "Patricia Teherán",
        alias: "Voz femenina del vallenato",
        descripcion: "Una de las voces femeninas más reconocidas del vallenato, oriunda de Sincelejo (Sucre).",
        tipo: "solista",
        albumes: [
            "Amplia discografía como solista y en colaboración con distintos acordeoneros (ver catálogo completo en plataformas)"
        ],
        yt: "https://www.youtube.com/results?search_query=Patricia%20Teher%C3%A1n%20vallenato",
        sp: "https://open.spotify.com/search/Patricia%20Teher%C3%A1n",
        am: "https://music.apple.com/us/search?term=Patricia%20Teher%C3%A1n"
    },
    {
        id: 13,
        nombre: "Binomio de Oro",
        alias: "Fundado en 1976 por Rafael Orozco e Israel Romero",
        descripcion: "Una de las agrupaciones más influyentes de la historia del vallenato.",
        tipo: "agrupacion",
        albumes: [
            "Numerosos álbumes con Rafael Orozco (1976-1992)",
            "Continuación con distintos cantantes tras 1992: Juan Piña, Jean Carlos Centeno, Jorge Celedón, Junior Santiago, Alejandro Palacio, entre otros",
            "Discografía extensa disponible en sus perfiles oficiales de streaming"
        ],
        yt: "https://www.youtube.com/results?search_query=Binomio%20de%20Oro%20vallenato",
        sp: "https://open.spotify.com/search/Binomio%20de%20Oro",
        am: "https://music.apple.com/us/search?term=Binomio%20de%20Oro"
    },
    {
        id: 14,
        nombre: "Los Inquietos del Vallenato",
        alias: "Más de 25 años de trayectoria",
        descripcion: "Fundados a inicios de los años 90 por Nelson Velásquez y el acordeonero Emerson Plata; hoy dirigidos por Jair López.",
        tipo: "agrupacion",
        albumes: [
            "Volver a Triunfar (1996)",
            "Discografía extensa a lo largo de más de 25 años de trayectoria",
            "Internacionales (2024)"
        ],
        yt: "https://www.youtube.com/results?search_query=Los%20Inquietos%20del%20Vallenato%20vallenato",
        sp: "https://open.spotify.com/search/Los%20Inquietos%20del%20Vallenato",
        am: "https://music.apple.com/us/search?term=Los%20Inquietos%20del%20Vallenato"
    },
    {
        id: 15,
        nombre: "Los Diablitos",
        alias: "Fundados en 1983 por Omar Geles y Miguel Morales",
        descripcion: "Desde 2004 también conocidos como 'La Gente de Omar Geles'.",
        tipo: "agrupacion",
        albumes: [
            "De Verdad Verdad (1985)",
            "Día Tras Día (1987)",
            "Romántico y Enamorado (1990)",
            "Más de 20 álbumes adicionales con distintas voces (Jesús Manuel Estrada, Alex Manga, Junior Rangel y otros) hasta la actualidad"
        ],
        yt: "https://www.youtube.com/results?search_query=Los%20Diablitos%20vallenato",
        sp: "https://open.spotify.com/search/Los%20Diablitos",
        am: "https://music.apple.com/us/search?term=Los%20Diablitos"
    },
    {
        id: 16,
        nombre: "La Combinación Vallenata",
        alias: "Varias décadas en el género romántico",
        descripcion: "Agrupación vallenata colombiana con varias décadas de trayectoria en el género romántico.",
        tipo: "agrupacion",
        albumes: [
            "Discografía disponible en sus perfiles oficiales de streaming (ver enlaces)"
        ],
        yt: "https://www.youtube.com/results?search_query=La%20Combinaci%C3%B3n%20Vallenata%20vallenato",
        sp: "https://open.spotify.com/search/La%20Combinaci%C3%B3n%20Vallenata",
        am: "https://music.apple.com/us/search?term=La%20Combinaci%C3%B3n%20Vallenata"
    },
    {
        id: 17,
        nombre: "Daniel Calderón",
        alias: "Voz principal de Los Gigantes del Vallenato",
        descripcion: "Hijo del productor Iván Calderón; voz principal de Los Gigantes del Vallenato desde inicios de los 2000.",
        tipo: "solista",
        albumes: [
            "Los Gigantes Son los Gigantes (2003)",
            "Aire Fresco (2005)",
            "Así Somos (2007)",
            "Vía Libre (2009)",
            "Alto Voltaje (2011)",
            "De Sur a Norte (2015)",
            "Peligroso (2017)",
            "Más Gigantes Que Nunca (2022)",
            "Dos Épocas (2023, dos ediciones)"
        ],
        yt: "https://www.youtube.com/results?search_query=Daniel%20Calder%C3%B3n%20vallenato",
        sp: "https://open.spotify.com/search/Daniel%20Calder%C3%B3n",
        am: "https://music.apple.com/us/search?term=Daniel%20Calder%C3%B3n"
    },
    {
        id: 18,
        nombre: "Jorge Pabuena",
        alias: "Cantante con trayectoria junto a distintos acordeoneros",
        descripcion: "Cantante vallenato colombiano con trayectoria junto a distintos acordeoneros.",
        tipo: "solista",
        albumes: [
            "Discografía disponible en sus perfiles oficiales de streaming (ver enlaces)"
        ],
        yt: "https://www.youtube.com/results?search_query=Jorge%20Pabuena%20vallenato",
        sp: "https://open.spotify.com/search/Jorge%20Pabuena",
        am: "https://music.apple.com/us/search?term=Jorge%20Pabuena"
    },
    {
        id: 19,
        nombre: "Rafa Pérez",
        alias: "Producciones del vallenato romántico",
        descripcion: "Cantante vallenato colombiano, con producciones dentro del género romántico.",
        tipo: "solista",
        albumes: [
            "Discografía disponible en sus perfiles oficiales de streaming (ver enlaces)"
        ],
        yt: "https://www.youtube.com/results?search_query=Rafa%20P%C3%A9rez%20vallenato",
        sp: "https://open.spotify.com/search/Rafa%20P%C3%A9rez",
        am: "https://music.apple.com/us/search?term=Rafa%20P%C3%A9rez"
    },
    {
        id: 20,
        nombre: "Los Embajadores Vallenatos",
        alias: "Trayectoria en el género romántico",
        descripcion: "Agrupación vallenata colombiana de trayectoria en el género romántico.",
        tipo: "agrupacion",
        albumes: [
            "Discografía disponible en sus perfiles oficiales de streaming (ver enlaces)"
        ],
        yt: "https://www.youtube.com/results?search_query=Los%20Embajadores%20Vallenatos%20vallenato",
        sp: "https://open.spotify.com/search/Los%20Embajadores%20Vallenatos",
        am: "https://music.apple.com/us/search?term=Los%20Embajadores%20Vallenatos"
    },
    {
        id: 21,
        nombre: "Diomedes Díaz",
        alias: "El Cacique de La Junta",
        descripcion: "Uno de los cantautores más importantes de la historia del vallenato (1957-2013); ganador del Latin Grammy 2010.",
        tipo: "solista",
        albumes: [
            "Tres Canciones (1976, con Nafer Durán)",
            "De Frente (1977, con Nafer Durán)",
            "Dos Grandes (1979, con Colacho Mendoza)",
            "Los Profesionales (1979, con Colacho Mendoza)",
            "Tu Serenata (1980, con Colacho Mendoza)",
            "Para Mi Fanaticada (1980, con Colacho Mendoza)",
            "Con Mucho Estilo (1981, con Colacho Mendoza)",
            "Todo Es Para Ti (1982, con Colacho Mendoza)",
            "Cantando (1983, con Colacho Mendoza)",
            "El Mundo (1984, con Colacho Mendoza)",
            "Más de 20 álbumes adicionales entre 1985 y 2009 (con Colacho Mendoza, Iván Zuleta, Juan Humberto Rois, Álvaro López, entre otros)",
            "Listo Pa' La Foto (2009, Latin Grammy Mejor Álbum de Cumbia/Vallenato)"
        ],
        yt: "https://www.youtube.com/results?search_query=Diomedes%20D%C3%ADaz%20vallenato",
        sp: "https://open.spotify.com/search/Diomedes%20D%C3%ADaz",
        am: "https://music.apple.com/us/search?term=Diomedes%20D%C3%ADaz"
    },
    {
        id: 22,
        nombre: "Jorge Celedón",
        alias: "Voz del Binomio, hoy solista con Jimmy Zambrano",
        descripcion: "Cantante de La Paz (Cesar); fue voz del Binomio de Oro y desarrolló una exitosa carrera solista junto al acordeonero Jimmy Zambrano.",
        tipo: "solista",
        albumes: [
            "Amplia discografía como solista junto a Jimmy Zambrano desde inicios de los 2000 (ver catálogo completo en plataformas)"
        ],
        yt: "https://www.youtube.com/results?search_query=Jorge%20Celed%C3%B3n%20vallenato",
        sp: "https://open.spotify.com/search/Jorge%20Celed%C3%B3n",
        am: "https://music.apple.com/us/search?term=Jorge%20Celed%C3%B3n"
    },
    {
        id: 23,
        nombre: "Iván Villazón",
        alias: "Voz samaria del vallenato tradicional",
        descripcion: "Una de las voces más reconocidas del vallenato tradicional, con larga trayectoria junto al acordeonero Saúl Lallemand.",
        tipo: "solista",
        albumes: [
            "Extensa discografía junto a Saúl Lallemand (ver catálogo completo en plataformas)"
        ],
        yt: "https://www.youtube.com/results?search_query=Iv%C3%A1n%20Villaz%C3%B3n%20vallenato",
        sp: "https://open.spotify.com/search/Iv%C3%A1n%20Villaz%C3%B3n",
        am: "https://music.apple.com/us/search?term=Iv%C3%A1n%20Villaz%C3%B3n"
    },
    {
        id: 24,
        nombre: "Poncho Zuleta",
        alias: "El Pollo Vallenato",
        descripcion: "Cantante de Villanueva (La Guajira), miembro de la dinastía Zuleta y una de las voces más longevas del vallenato tradicional.",
        tipo: "solista",
        albumes: [
            "Amplia discografía junto a distintos acordeoneros a lo largo de más de 40 años de trayectoria (ver catálogo completo en plataformas)"
        ],
        yt: "https://www.youtube.com/results?search_query=Poncho%20Zuleta%20vallenato",
        sp: "https://open.spotify.com/search/Poncho%20Zuleta",
        am: "https://music.apple.com/us/search?term=Poncho%20Zuleta"
    },
    {
        id: 25,
        nombre: "Elder Dayán Díaz",
        alias: "Hijo de Diomedes Díaz",
        descripcion: "Continúa el legado familiar en el vallenato.",
        tipo: "solista",
        albumes: [
            "Discografía disponible en sus perfiles oficiales de streaming (ver enlaces)"
        ],
        yt: "https://www.youtube.com/results?search_query=Elder%20Day%C3%A1n%20D%C3%ADaz%20vallenato",
        sp: "https://open.spotify.com/search/Elder%20Day%C3%A1n%20D%C3%ADaz",
        am: "https://music.apple.com/us/search?term=Elder%20Day%C3%A1n%20D%C3%ADaz"
    },
    {
        id: 26,
        nombre: "Nelson Velásquez",
        alias: "Cofundador de Los Inquietos",
        descripcion: "Cofundador de Los Inquietos del Vallenato; posteriormente desarrolló una destacada carrera como solista.",
        tipo: "solista",
        albumes: [
            "Discografía con Los Inquietos del Vallenato desde 1996",
            "Discografía como solista (ver catálogo completo en plataformas)"
        ],
        yt: "https://www.youtube.com/results?search_query=Nelson%20Vel%C3%A1squez%20vallenato",
        sp: "https://open.spotify.com/search/Nelson%20Vel%C3%A1squez",
        am: "https://music.apple.com/us/search?term=Nelson%20Vel%C3%A1squez"
    },
    {
        id: 27,
        nombre: "Jean Carlos Centeno",
        alias: "Voz del Binomio de Oro y solista",
        descripcion: "Cantante que hizo parte del Binomio de Oro y posteriormente desarrolló carrera como solista.",
        tipo: "solista",
        albumes: [
            "Discografía con el Binomio de Oro y como solista (ver catálogo completo en plataformas)"
        ],
        yt: "https://www.youtube.com/results?search_query=Jean%20Carlos%20Centeno%20vallenato",
        sp: "https://open.spotify.com/search/Jean%20Carlos%20Centeno",
        am: "https://music.apple.com/us/search?term=Jean%20Carlos%20Centeno"
    },
    {
        id: 28,
        nombre: "Alex Manga",
        alias: "Voz de Los Diablitos (1995-2009)",
        descripcion: "Cantante que fue voz de Los Diablitos entre 1995 y 2009, y también ha desarrollado carrera como solista.",
        tipo: "solista",
        albumes: [
            "Discografía con Los Diablitos (1995-2009) y como solista (ver catálogo completo en plataformas)"
        ],
        yt: "https://www.youtube.com/results?search_query=Alex%20Manga%20vallenato",
        sp: "https://open.spotify.com/search/Alex%20Manga",
        am: "https://music.apple.com/us/search?term=Alex%20Manga"
    },
    {
        id: 29,
        nombre: "Hebert Vargas",
        alias: "Exvocalista de Los Gigantes del Vallenato",
        descripcion: "Vocalista que acompañó a Los Gigantes del Vallenato durante seis años en sus inicios; luego desarrolló carrera propia.",
        tipo: "solista",
        albumes: [
            "Discografía con Los Gigantes del Vallenato y como solista (ver catálogo completo en plataformas)"
        ],
        yt: "https://www.youtube.com/results?search_query=Hebert%20Vargas%20vallenato",
        sp: "https://open.spotify.com/search/Hebert%20Vargas",
        am: "https://music.apple.com/us/search?term=Hebert%20Vargas"
    },
    {
        id: 30,
        nombre: "Jorge Oñate",
        alias: "El Ruiseñor del Cesar",
        descripcion: "Cantante de Urumita (La Guajira), uno de los máximos representantes del vallenato tradicional (1949-2019).",
        tipo: "solista",
        albumes: [
            "Extensa discografía a lo largo de más de 50 años de trayectoria, con distintos acordeoneros (ver catálogo completo en plataformas)"
        ],
        yt: "https://www.youtube.com/results?search_query=Jorge%20O%C3%B1ate%20vallenato",
        sp: "https://open.spotify.com/search/Jorge%20O%C3%B1ate",
        am: "https://music.apple.com/us/search?term=Jorge%20O%C3%B1ate"
    },
    {
        id: 31,
        nombre: "Los Hermanos Zuleta",
        alias: "Dinastía Zuleta del vallenato tradicional",
        descripcion: "Dúo formado por Emiliano Zuleta Díaz y Poncho Zuleta, hijos del compositor Emiliano Zuleta Baquero; referentes del vallenato tradicional.",
        tipo: "agrupacion",
        albumes: [
            "Extensa discografía conjunta a lo largo de varias décadas (ver catálogo completo en plataformas)"
        ],
        yt: "https://www.youtube.com/results?search_query=Los%20Hermanos%20Zuleta%20vallenato",
        sp: "https://open.spotify.com/search/Los%20Hermanos%20Zuleta",
        am: "https://music.apple.com/us/search?term=Los%20Hermanos%20Zuleta"
    },
    {
        id: 32,
        nombre: "Beto Villa",
        alias: "Vallenato romántico y tradicional",
        descripcion: "Cantante vallenato colombiano con trayectoria en el género romántico y tradicional.",
        tipo: "solista",
        albumes: [
            "Discografía disponible en sus perfiles oficiales de streaming (ver enlaces)"
        ],
        yt: "https://www.youtube.com/results?search_query=Beto%20Villa%20vallenato",
        sp: "https://open.spotify.com/search/Beto%20Villa",
        am: "https://music.apple.com/us/search?term=Beto%20Villa"
    },
    {
        id: 33,
        nombre: "Israel Romero",
        alias: "Cofundador del Binomio de Oro",
        descripcion: "Acordeonero y cofundador del Binomio de Oro junto a Rafael Orozco en 1976; figura clave en la historia del vallenato.",
        tipo: "solista",
        albumes: [
            "Discografía completa del Binomio de Oro desde 1976 hasta la actualidad (ver catálogo completo en plataformas)"
        ],
        yt: "https://www.youtube.com/results?search_query=Israel%20Romero%20vallenato",
        sp: "https://open.spotify.com/search/Israel%20Romero",
        am: "https://music.apple.com/us/search?term=Israel%20Romero"
    },
    {
        id: 34,
        nombre: "Iván Ovalle",
        alias: "Cantante con trayectoria junto a distintos acordeoneros",
        descripcion: "Cantante vallenato colombiano con trayectoria junto a distintos acordeoneros.",
        tipo: "solista",
        albumes: [
            "Discografía disponible en sus perfiles oficiales de streaming (ver enlaces)"
        ],
        yt: "https://www.youtube.com/results?search_query=Iv%C3%A1n%20Ovalle%20vallenato",
        sp: "https://open.spotify.com/search/Iv%C3%A1n%20Ovalle",
        am: "https://music.apple.com/us/search?term=Iv%C3%A1n%20Ovalle"
    },
    {
        id: 35,
        nombre: "Emiliano Zuleta",
        alias: "Integrante de Los Hermanos Zuleta",
        descripcion: "Emiliano Zuleta Díaz, hermano de Poncho; su padre, el compositor Emiliano Zuleta Baquero, fue autor de 'La Gota Fría'.",
        tipo: "solista",
        albumes: [
            "Discografía junto a Los Hermanos Zuleta (ver catálogo completo en plataformas)"
        ],
        yt: "https://www.youtube.com/results?search_query=Emiliano%20Zuleta%20vallenato",
        sp: "https://open.spotify.com/search/Emiliano%20Zuleta",
        am: "https://music.apple.com/us/search?term=Emiliano%20Zuleta"
    },
    {
        id: 36,
        nombre: "Los Chiches Vallenatos",
        alias: "Trayectoria en el género romántico",
        descripcion: "Agrupación vallenata colombiana de trayectoria en el género romántico.",
        tipo: "agrupacion",
        albumes: [
            "Discografía disponible en sus perfiles oficiales de streaming (ver enlaces)"
        ],
        yt: "https://www.youtube.com/results?search_query=Los%20Chiches%20Vallenatos%20vallenato",
        sp: "https://open.spotify.com/search/Los%20Chiches%20Vallenatos",
        am: "https://music.apple.com/us/search?term=Los%20Chiches%20Vallenatos"
    },
    {
        id: 37,
        nombre: "Miguel Herrera",
        alias: "Cantante con trayectoria junto a distintos acordeoneros",
        descripcion: "Cantante vallenato colombiano con trayectoria junto a distintos acordeoneros.",
        tipo: "solista",
        albumes: [
            "Discografía disponible en sus perfiles oficiales de streaming (ver enlaces)"
        ],
        yt: "https://www.youtube.com/results?search_query=Miguel%20Herrera%20vallenato",
        sp: "https://open.spotify.com/search/Miguel%20Herrera",
        am: "https://music.apple.com/us/search?term=Miguel%20Herrera"
    },
    {
        id: 38,
        nombre: "Luis Mateus",
        alias: "Influenciado por Iván Calderón",
        descripcion: "Cantante vallenato colombiano, influenciado por el legado de Iván Calderón y Los Gigantes del Vallenato.",
        tipo: "solista",
        albumes: [
            "Discografía disponible en sus perfiles oficiales de streaming (ver enlaces)"
        ],
        yt: "https://www.youtube.com/results?search_query=Luis%20Mateus%20vallenato",
        sp: "https://open.spotify.com/search/Luis%20Mateus",
        am: "https://music.apple.com/us/search?term=Luis%20Mateus"
    },
    {
        id: 39,
        nombre: "Los K Morales",
        alias: "Hermanos de Kaleth Morales",
        descripcion: "Dúo conformado por Keyner y Kanner Morales, hermanos de Kaleth Morales, hijos de Miguel Morales.",
        tipo: "agrupacion",
        albumes: [
            "Discografía disponible en sus perfiles oficiales de streaming (ver enlaces)"
        ],
        yt: "https://www.youtube.com/results?search_query=Los%20K%20Morales%20vallenato",
        sp: "https://open.spotify.com/search/Los%20K%20Morales",
        am: "https://music.apple.com/us/search?term=Los%20K%20Morales"
    },
    {
        id: 40,
        nombre: "Karen Lizarazo",
        alias: "Vallenato y música popular",
        descripcion: "Cantante colombiana del género vallenato/popular.",
        tipo: "solista",
        albumes: [
            "Discografía disponible en sus perfiles oficiales de streaming (ver enlaces)"
        ],
        yt: "https://www.youtube.com/results?search_query=Karen%20Lizarazo%20vallenato",
        sp: "https://open.spotify.com/search/Karen%20Lizarazo",
        am: "https://music.apple.com/us/search?term=Karen%20Lizarazo"
    },
    {
        id: 41,
        nombre: "Ana del Castillo",
        alias: "Popularidad en años recientes",
        descripcion: "Cantante colombiana de música popular y vallenata, con gran popularidad en años recientes.",
        tipo: "solista",
        albumes: [
            "Discografía y sencillos recientes disponibles en sus perfiles oficiales de streaming (ver enlaces)"
        ],
        yt: "https://www.youtube.com/results?search_query=Ana%20del%20Castillo%20vallenato",
        sp: "https://open.spotify.com/search/Ana%20del%20Castillo",
        am: "https://music.apple.com/us/search?term=Ana%20del%20Castillo"
    },
    {
        id: 42,
        nombre: "Diego Daza",
        alias: "Cantautor, homenaje a Martín Elías",
        descripcion: "Cantautor vallenato colombiano; su primer álbum fue un homenaje a Martín Elías.",
        tipo: "solista",
        albumes: [
            "Discografía disponible en sus perfiles oficiales de streaming (ver enlaces)"
        ],
        yt: "https://www.youtube.com/results?search_query=Diego%20Daza%20vallenato",
        sp: "https://open.spotify.com/search/Diego%20Daza",
        am: "https://music.apple.com/us/search?term=Diego%20Daza"
    },
    {
        id: 43,
        nombre: "Mono Zabaleta",
        alias: "Cantante con trayectoria junto a distintos acordeoneros",
        descripcion: "Cantante vallenato colombiano con trayectoria junto a distintos acordeoneros.",
        tipo: "solista",
        albumes: [
            "Discografía disponible en sus perfiles oficiales de streaming (ver enlaces)"
        ],
        yt: "https://www.youtube.com/results?search_query=Mono%20Zabaleta%20vallenato",
        sp: "https://open.spotify.com/search/Mono%20Zabaleta",
        am: "https://music.apple.com/us/search?term=Mono%20Zabaleta"
    },
    {
        id: 44,
        nombre: "Iván Villazón & Saúl Lallemand",
        alias: "Dupla histórica del vallenato tradicional",
        descripcion: "La voz de Iván Villazón junto al acordeón de Saúl Lallemand.",
        tipo: "agrupacion",
        albumes: [
            "Extensa discografía conjunta a lo largo de varias décadas (ver catálogo completo en plataformas)"
        ],
        yt: "https://www.youtube.com/results?search_query=Iv%C3%A1n%20Villaz%C3%B3n%20y%20Sa%C3%BAl%20Lallemand%20vallenato",
        sp: "https://open.spotify.com/search/Iv%C3%A1n%20Villaz%C3%B3n%20y%20Sa%C3%BAl%20Lallemand",
        am: "https://music.apple.com/us/search?term=Iv%C3%A1n%20Villaz%C3%B3n%20y%20Sa%C3%BAl%20Lallemand"
    }
];

/* ================= Renderizado y filtros del directorio ================= */
(function () {
    'use strict';

    var contenedor = document.getElementById('grillaDirectorio');
    var buscador = document.getElementById('buscarArtista');
    var contador = document.getElementById('contadorArtistas');
    var botonesTipo = document.querySelectorAll('[data-filtrar-tipo]');

    function escapar(texto) {
        return String(texto).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function construirTarjetas() {
        contenedor.innerHTML = ARTISTAS.map(function (artista) {
            var listaDiscos = artista.albumes.map(function (disco) {
                return '<li>' + escapar(disco) + '</li>';
            }).join('');
            var tipoEtiqueta = artista.tipo === 'agrupacion' ? 'Agrupación' : 'Solista';

            return [
                '<article class="col-12 col-md-6 col-lg-4" data-aos="fade-up">',
                '<div class="card artista-ficha h-100">',
                '<div class="ficha-foto-wrap">',
                '<img class="ficha-foto" src="' + (ARTISTAS_FOTOS[artista.id] || '') + '" alt="Portada representativa de ' + escapar(artista.nombre) + '" loading="lazy" onerror="this.parentNode.classList.add(\'ficha-foto-falta\')">',
                '<span class="ficha-num">' + artista.id + '</span>',
                '</div>',
                '<div class="ficha-cabecera">',
                '<div class="ficha-titulo">',
                '<h4>' + escapar(artista.nombre) + '</h4>',
                '<span class="ficha-alias">' + escapar(artista.alias) + '</span>',
                '</div>',
                '<span class="ficha-tipo">' + tipoEtiqueta + '</span>',
                '</div>',
                '<p class="ficha-desc">' + escapar(artista.descripcion) + '</p>',
                '<details class="disco"><summary>Discografía destacada<i class="bi bi-chevron-down"></i></summary>',
                '<ul>' + listaDiscos + '</ul>',
                '</details>',
                '<div class="ficha-links">',
                '<a class="pl-detail" href="' + artista.yt + '" target="_blank" rel="noopener"><i class="bi bi-youtube"></i> YouTube</a>',
                '<a class="pl-detail" href="' + artista.sp + '" target="_blank" rel="noopener"><i class="bi bi-spotify"></i> Spotify</a>',
                '<a class="pl-detail" href="' + artista.am + '" target="_blank" rel="noopener"><i class="bi bi-apple"></i> Apple Music</a>',
                '</div>',
                '</div>',
                '</article>'
            ].join('');
        }).join('');
    }

    function aplicarFiltro() {
        var termino = (buscador.value || '').toLowerCase().trim();
        var botonActivo = document.querySelector('[data-filtrar-tipo].active');
        var tipoSel = botonActivo ? botonActivo.dataset.filtrarTipo : 'todos';
        var visibles = 0;
        var tarjetas = contenedor.children;

        ARTISTAS.forEach(function (artista, i) {
            var coincideTexto = !termino ||
                artista.nombre.toLowerCase().indexOf(termino) !== -1 ||
                (artista.alias || '').toLowerCase().indexOf(termino) !== -1;
            var coincideTipo = tipoSel === 'todos' || artista.tipo === tipoSel;
            var visible = coincideTexto && coincideTipo;

            tarjetas[i].classList.toggle('d-none', !visible);
            if (visible) {
                visibles++;
                tarjetas[i].classList.remove('ficha-entrante');
                void tarjetas[i].offsetWidth;
                tarjetas[i].classList.add('ficha-entrante');
            }
        });

        contador.textContent = visibles;
    }

    botonesTipo.forEach(function (boton) {
        boton.addEventListener('click', function () {
            botonesTipo.forEach(function (b) { b.classList.remove('active'); });
            boton.classList.add('active');
            aplicarFiltro();
        });
    });

    buscador.addEventListener('input', aplicarFiltro);

    if (!contenedor) { return; }
    construirTarjetas();
    contador.textContent = ARTISTAS.length;
})();
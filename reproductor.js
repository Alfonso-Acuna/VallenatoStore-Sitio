/* =========================================================
   VallenatoStore – Reproductor de muestras (30 s) integrado
   Reproduce en la página sin redirigir a plataformas externas.
   ========================================================= */

(function () {
    'use strict';

    var PRUEBAS_ESCUCHAR = {
        'Oye Bonita': {
            tema: 'Oye Bonita',
            artista: 'Diomedes Díaz & Colacho Mendoza',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/dc/55/0c/dc550c5c-b7d9-42dd-1e58-9532c092f9bb/mzaf_6185375024852760655.plus.aac.p.m4a'
        },
        'Cuatro Rosas': {
            tema: 'Cuatro Rosas',
            artista: 'Jorge Celedón & Jimmy Zambrano',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/fa/a4/1f/faa41f46-12df-28ab-0afc-fa2a8c73714e/mzaf_5033967283831182612.plus.aac.p.m4a'
        },
        'Mi Biografía': {
            tema: 'Mi Biografía',
            artista: 'Diomedes Díaz & Iván Zuleta',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3e/48/c2/3e48c2d1-71fb-4c7f-e0eb-ce5d2d30cd84/mzaf_10954095397242965130.plus.aac.p.m4a'
        },
        'La Indiferencia': {
            tema: 'La Indiferencia',
            artista: 'Silvestre Dangond & Juancho De la Espriella',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/7e/3b/b3/7e3bb34a-c1c1-cc34-e7dd-cb4cad838270/mzaf_17265088629597069582.plus.aac.p.m4a'
        },
        'La Suerte Está Echada': {
            tema: 'La Suerte Está Echada',
            artista: 'Diomedes Díaz & Iván Zuleta',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/44/78/91/447891d6-de02-1319-38ea-94cfc83709ca/mzaf_3669313012679606294.plus.aac.p.m4a'
        },
        'En Buenas Manos': {
            tema: 'En Buenas Manos',
            artista: 'Diomedes Díaz',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/0d/63/18/0d63183d-5de7-1c01-439c-394dab165a34/mzaf_1189226187526308658.plus.aac.p.m4a'
        },
        'Vivo en el Limbo': {
            tema: 'Vivo en el Limbo',
            artista: 'Kaleth Morales & Andrés Herrera',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/3f/08/54/3f0854fb-1d10-2c61-da93-ae31c26c5ede/mzaf_3882192781925306871.plus.aac.p.m4a'
        },
        'Niña Bonita': {
            tema: 'Niña Bonita (En Vivo)',
            artista: 'Binomio de Oro de América',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/19/fb/a8/19fba803-d2d4-60af-377c-ecfff1a7b842/mzaf_17244786120963546552.plus.aac.p.m4a'
        },
        'El Cantor de Fonseca': {
            tema: 'El Cantor de Fonseca',
            artista: 'Carlos Vives',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/31/28/b4/3128b445-126b-1468-3f9e-1212ecdbc381/mzaf_8867407022022092088.plus.aac.p.m4a'
        },
        'Loco Paranoico': {
            tema: 'Loco Paranoico',
            artista: 'Silvestre Dangond & Rolando Ochoa',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/e0/40/d7/e040d747-2cec-e117-0a38-f15ca349478e/mzaf_2671974465389465345.plus.aac.p.m4a'
        },
        'El Amor Más Grande del Planeta': {
            tema: 'El Amor Más Grande del Planeta',
            artista: 'Felipe Peláez & Zabaleta',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/33/99/0d/33990d32-d107-34b7-af8d-942a197536d7/mzaf_14447997026745451971.plus.aac.p.m4a'
        },
        'Casualidad': {
            tema: 'Casualidad',
            artista: 'Nelson Velásquez',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b1/1c/b7/b11cb7df-5949-1c42-ae9f-dc908f49a65b/mzaf_11872733959838952452.plus.aac.p.m4a'
        },
        'Los Caminos de la Vida': {
            tema: 'Los Caminos de la Vida',
            artista: 'Los Diablitos',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/03/a6/9e/03a69eae-9906-b7ee-5d26-4a0ccbaeb744/mzaf_4831620038838676612.plus.aac.p.m4a'
        },
        'Mañanita de Invierno': {
            tema: 'Mañanita de Invierno',
            artista: 'Poncho Zuleta',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d4/9e/54/d49e5468-1594-1418-48b6-69317c7bbc8d/mzaf_5616346879516115220.plus.aac.p.m4a'
        },
        'Así Fue Mi Querer': {
            tema: 'Así Fue Mi Querer',
            artista: 'Los Hermanos Zuleta',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/4d/2e/f1/4d2ef16d-7a08-ef64-caf2-e98a2b68ae3b/mzaf_9070786284455171302.plus.aac.p.m4a'
        },
        'Mi Hermano y Yo': {
            tema: 'Mi Hermano y Yo',
            artista: 'Los Hermanos Zuleta',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/1b/3d/e1/1b3de188-97c4-bd70-0ad6-91f2647fc605/mzaf_2403724812487545640.plus.aac.p.m4a'
        },
        'Eres Todo': {
            tema: 'Eres Todo',
            artista: 'Iván Villazón & Iván Zuleta',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/42/fb/54/42fb5419-94d4-e4a3-e9a7-f15eaae21366/mzaf_9199818784169515505.plus.aac.p.m4a'
        },
        'No Me Pidas Que Te Olvide': {
            tema: 'No Me Pidas Que Te Olvide',
            artista: 'Iván Villazón & Saúl Lallemand',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/42/69/1b/42691be1-d773-de57-abd5-a45928eee6c0/mzaf_1704619357083582411.plus.aac.p.m4a'
        },
        'Nunca Niegues Que Te Amo': {
            tema: 'Nunca Niegues Que Te Amo',
            artista: 'Los Inquietos del Vallenato',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d2/2f/85/d22f856d-f908-f054-62e7-5027bb6c495c/mzaf_1987241821316245909.plus.aac.p.m4a'
        },
        'Cuéntame de Ti': {
            tema: 'Cuéntame de Ti',
            artista: 'Los Gigantes del Vallenato',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c9/f2/f5/c9f2f520-2a71-e40b-9358-fa1d0e80873b/mzaf_15338822747920582311.plus.aac.p.m4a'
        },
        "Traga'o de Ti": {
            tema: "Traga'o de Ti",
            artista: 'Peter Manjarrés & Sergio Luis Rodríguez',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/63/d6/8d/63d68da1-7a05-afea-3d51-8b53a466e338/mzaf_16021758721536556145.plus.aac.p.m4a'
        },
        'Mi Diosa Humana': {
            tema: 'Mi Diosa Humana',
            artista: 'Miguel Morales & Juan David Herrera',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/fc/b3/07/fcb3071b-d61f-5cd7-cc65-b150671dcebd/mzaf_4587106585037253580.plus.aac.p.m4a'
        },
        'Tarde Lo Conocí': {
            tema: 'Tarde Lo Conocí',
            artista: 'Patricia Teherán',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d9/32/09/d93209f4-5d02-74ed-3754-a01a318f18c3/mzaf_17253794552264662941.plus.aac.p.m4a'
        },
        'Ceniza Fría': {
            tema: 'Ceniza Fría',
            artista: 'Los Chiches Vallenatos',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d0/31/cd/d031cd90-4240-c36f-2c0d-1a4f13d93e3a/mzaf_15264273848863491836.plus.aac.p.m4a'
        },
        'Nido de Amor': {
            tema: 'Nido de Amor',
            artista: 'Jorge Oñate',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/98/41/9a/98419a84-a228-d96f-0481-987468d2395c/mzaf_1802132741362451762.plus.aac.p.m4a'
        },
        'Si Tu Amor No Vuelve': {
            tema: 'Si Tu Amor No Vuelve',
            artista: 'Binomio de Oro de América',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ab/7c/40/ab7c40f5-c01f-34ab-7353-e8d71aba5a1d/mzaf_5935213397155319939.plus.aac.p.m4a'
        },
        'Prisionero de Amor': {
            tema: 'Prisionero de Amor',
            artista: 'Farid Ortiz & Emilio Oviedo',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/af/5b/29/af5b29c2-bafd-59cd-be99-13f504a6c958/mzaf_12637783577151379744.plus.aac.p.m4a'
        }
    };

    var PRUEBAS_PRODUCTOS = {
        '30 Mejores': {
            tema: 'Niña Bonita (En Vivo)',
            artista: 'Binomio de Oro de América',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/19/fb/a8/19fba803-d2d4-60af-377c-ecfff1a7b842/mzaf_17244786120963546552.plus.aac.p.m4a'
        },
        '30 Grandes Éxitos': {
            tema: 'Caracoles de Colores',
            artista: 'Diomedes Díaz',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/0f/d7/a3/0fd7a34e-a9d7-fb45-e4d1-76ba8313fde4/mzaf_9771647780351579856.plus.aac.p.m4a'
        },
        'Experiencias Vividas': {
            tema: 'Matilde Lina',
            artista: 'Diomedes Díaz',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ee/ca/da/eecada0d-f01c-8450-3d5d-27a534ba574f/mzaf_8485999243269147003.plus.aac.p.m4a'
        },
        'Un Canto Celestial': {
            tema: 'Un Canto Celestial',
            artista: 'Diomedes Díaz & Iván Zuleta',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/00/1e/23/001e233b-b54b-36fc-2eef-b86a770535a4/mzaf_5586266583857042247.plus.aac.p.m4a'
        },
        'Título de Amor': {
            tema: 'Título de Amor',
            artista: 'Diomedes Díaz & Juancho Rois',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/f7/ac/bd/f7acbd1d-abd4-ed99-8b6a-b93782d866d8/mzaf_3860489584300417449.plus.aac.p.m4a'
        },
        'Celedón Sin Fronteras': {
            tema: 'Sin Fronteras',
            artista: 'Jorge Celedón',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/88/0d/8b/880d8bc1-d11f-d03b-12b4-f2999390525d/mzaf_11419292162230770094.plus.aac.p.m4a'
        },
        'Llévame en Tus Sueños': {
            tema: 'Cuatro Rosas',
            artista: 'Jorge Celedón & Jimmy Zambrano',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/fa/a4/1f/faa41f46-12df-28ab-0afc-fa2a8c73714e/mzaf_5033967283831182612.plus.aac.p.m4a'
        },
        'Los 30 Vallenatos de la Historia': {
            tema: 'La Gota Fría',
            artista: 'Carlos Vives',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/25/1c/64/251c64df-1fd9-824b-e0cf-43dd5c1a49c8/mzaf_9425335053053873695.plus.aac.p.m4a'
        },
        'La Hora de la Verdad': {
            tema: 'Vivo en el Limbo',
            artista: 'Kaleth Morales & Andrés Herrera',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/3f/08/54/3f0854fb-1d10-2c61-da93-ae31c26c5ede/mzaf_3882192781925306871.plus.aac.p.m4a'
        },
        'Imparables': {
            tema: 'El Látigo',
            artista: 'El Gran Martín Elías',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/fd/12/85/fd1285cf-79d4-37b4-61e5-5c7b1a91e730/mzaf_8780802253536579180.plus.aac.p.m4a'
        },
        'A Mi Manera': {
            tema: 'El Amor Más Grande del Planeta',
            artista: 'Felipe Peláez & Zabaleta',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/33/99/0d/33990d32-d107-34b7-af8d-942a197536d7/mzaf_14447997026745451971.plus.aac.p.m4a'
        },
        '10 Años de Historia': {
            tema: 'No Voy a Llorar',
            artista: 'Los Diablitos',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/fd/bd/14/fdbd14b5-636a-6749-93eb-25c48bd0922b/mzaf_16966829921371405799.plus.aac.p.m4a'
        },
        'Poncho Zuleta 45 Años': {
            tema: 'Mañanita de Invierno',
            artista: 'Poncho Zuleta (con Silvestre Dangond)',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d4/9e/54/d49e5468-1594-1418-48b6-69317c7bbc8d/mzaf_5616346879516115220.plus.aac.p.m4a'
        },
        'La 9ª Batalla (En Vivo)': {
            tema: 'Loco Paranoico',
            artista: 'Silvestre Dangond & Rolando Ochoa',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/e0/40/d7/e040d747-2cec-e117-0a38-f15ca349478e/mzaf_2671974465389465345.plus.aac.p.m4a'
        },
        'Colección Top 50': {
            tema: 'No Comprendí Tu Amor',
            artista: 'Jorge Oñate & Álvaro López',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/9b/1e/74/9b1e74d3-17a8-21a2-34ff-f904067fd68f/mzaf_6345034557586251887.plus.aac.p.m4a'
        },
        'Aniversario': {
            tema: 'Mi Hermano y Yo',
            artista: 'Los Hermanos Zuleta',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/1b/3d/e1/1b3de188-97c4-bd70-0ad6-91f2647fc605/mzaf_2403724812487545640.plus.aac.p.m4a'
        },
        'Pa Que Te Enamores': {
            tema: 'Eres Todo',
            artista: 'Iván Villazón & Iván Zuleta',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/42/fb/54/42fb5419-94d4-e4a3-e9a7-f15eaae21366/mzaf_9199818784169515505.plus.aac.p.m4a'
        },
        'Siempre Gigantes': {
            tema: 'Cuéntame de Ti',
            artista: 'Los Gigantes del Vallenato',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c9/f2/f5/c9f2f520-2a71-e40b-9358-fa1d0e80873b/mzaf_15338822747920582311.plus.aac.p.m4a'
        },
        'El Caballero del Vallenato': {
            tema: "Traga'o de Ti",
            artista: 'Peter Manjarrés & Sergio Luis Rodríguez',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/63/d6/8d/63d68da1-7a05-afea-3d51-8b53a466e338/mzaf_16021758721536556145.plus.aac.p.m4a'
        },
        'Grandes Éxitos de Los Chiches Vallenatos': {
            tema: 'Ceniza Fría',
            artista: 'Los Chiches Vallenatos',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d0/31/cd/d031cd90-4240-c36f-2c0d-1a4f13d93e3a/mzaf_15264273848863491836.plus.aac.p.m4a'
        },
        'Adiós a la Diosa': {
            tema: 'Tarde Lo Conocí',
            artista: 'Patricia Teherán',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d9/32/09/d93209f4-5d02-74ed-3754-a01a318f18c3/mzaf_17253794552264662941.plus.aac.p.m4a'
        },
        'Mi Diosa Humana': {
            tema: 'Mi Diosa Humana',
            artista: 'Miguel Morales & Juan David Herrera',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/fc/b3/07/fcb3071b-d61f-5cd7-cc65-b150671dcebd/mzaf_4587106585037253580.plus.aac.p.m4a'
        },
        'Volver a Triunfar': {
            tema: 'Quiero Saber de Ti',
            artista: 'Los Inquietos del Vallenato',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/64/75/e7/6475e70f-25f7-5766-35ab-c27deaa3ecae/mzaf_7413372623321251256.plus.aac.p.m4a'
        },
        'El Invencible': {
            tema: 'Se Te Fueron las Luces',
            artista: 'Jorge Oñate',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/a2/e9/0d/a2e90d02-f263-b004-a897-7434d8d8e9b7/mzaf_942794864993505369.plus.aac.p.m4a'
        }
    };

    var PRUEBAS_DESTACADOS = {
        'Diomedes Díaz': {
            tema: 'Oye Bonita',
            artista: 'Diomedes Díaz & Colacho Mendoza',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/dc/55/0c/dc550c5c-b7d9-42dd-1e58-9532c092f9bb/mzaf_6185375024852760655.plus.aac.p.m4a'
        },
        'Jorge Celedón': {
            tema: 'Cuatro Rosas',
            artista: 'Jorge Celedón & Jimmy Zambrano',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/fa/a4/1f/faa41f46-12df-28ab-0afc-fa2a8c73714e/mzaf_5033967283831182612.plus.aac.p.m4a'
        },
        'Binomio de Oro': {
            tema: 'Niña Bonita (En Vivo)',
            artista: 'Binomio de Oro de América',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/19/fb/a8/19fba803-d2d4-60af-377c-ecfff1a7b842/mzaf_17244786120963546552.plus.aac.p.m4a'
        },
        'Silvestre Dangond': {
            tema: 'La Indiferencia (En Vivo)',
            artista: 'Silvestre Dangond & Juancho De la Espriella',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/7e/3b/b3/7e3bb34a-c1c1-cc34-e7dd-cb4cad838270/mzaf_17265088629597069582.plus.aac.p.m4a'
        },
        'Aniceto Molina': {
            tema: 'Cumbia Sampuesana',
            artista: 'Aniceto Molina',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/49/1c/ab/491cab51-f004-4535-99dc-14266f720417/mzaf_11507326225774296191.plus.aac.p.m4a'
        },
        'Kaleth Morales': {
            tema: 'Vivo en el Limbo',
            artista: 'Kaleth Morales & Andrés Herrera',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/3f/08/54/3f0854fb-1d10-2c61-da93-ae31c26c5ede/mzaf_3882192781925306871.plus.aac.p.m4a'
        },
        'Martín Elías': {
            tema: 'El Látigo',
            artista: 'El Gran Martín Elías',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/fd/12/85/fd1285cf-79d4-37b4-61e5-5c7b1a91e730/mzaf_8780802253536579180.plus.aac.p.m4a'
        },
        'Felipe Peláez': {
            tema: 'El Amor Más Grande del Planeta',
            artista: 'Felipe Peláez & Zabaleta',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/33/99/0d/33990d32-d107-34b7-af8d-942a197536d7/mzaf_14447997026745451971.plus.aac.p.m4a'
        },
        'Jean Carlos Centeno': {
            tema: 'Ayer y Hoy',
            artista: 'La Combinación Vallenata & Jean Carlos Centeno',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/56/37/cf/5637cf71-4c9b-497e-988b-08b9ecd2cdc1/mzaf_18390747945493637201.plus.aac.p.m4a'
        },
        'Nelson Velásquez': {
            tema: 'Casualidad',
            artista: 'Nelson Velásquez',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b1/1c/b7/b11cb7df-5949-1c42-ae9f-dc908f49a65b/mzaf_11872733959838952452.plus.aac.p.m4a'
        },
        'Los Diablitos': {
            tema: 'No Voy a Llorar',
            artista: 'Los Diablitos',
            url: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/fd/bd/14/fdbd14b5-636a-6749-93eb-25c48bd0922b/mzaf_16966829921371405799.plus.aac.p.m4a'
        }
    };

    var audio = new Audio();

    function formatearSeg(seg) {
        var m = Math.floor(seg / 60);
        var s = Math.floor(seg % 60);
        return m + ':' + (s < 10 ? '0' + s : s);
    }

    function crearReproductor() {
        var cont = document.createElement('div');
        cont.id = 'reproductor';

        var secuencia = [
            '<div class="rep-disco"><i class="bi bi-disc-fill"></i></div>',
            '<div class="rep-cuerpo">',
            '<p class="rep-tema" id="repTema">—</p>',
            '<p class="rep-artista" id="repArtista">—</p>',
            '<div class="rep-bar">',
            '<input type="range" id="repBarra" min="0" max="100" value="0" step="0.1" aria-label="Avance de la muestra">',
            '<span class="rep-tiempo" id="repTiempo">0:00 / 0:00</span>',
            '</div>',
            '</div>',
            '<div class="rep-acciones">',
            '<button type="button" id="repPlay" class="rep-play" aria-label="Reproducir o pausar"><i class="bi bi-play-fill"></i></button>',
            '<button type="button" id="repCerrar" class="rep-cerrar" aria-label="Cerrar reproductor"><i class="bi bi-x-lg"></i></button>',
            '</div>',
            '<span class="rep-nota">Muestra de 30 s</span>'
        ].join('');

        cont.innerHTML = secuencia;
        document.body.appendChild(cont);
    }

    function sincronizarPlayUI() {
        var icono = contRepPlay.querySelector('i');
        icono.className = audio.paused ? 'bi bi-play-fill' : 'bi bi-pause-fill';
        contRep.classList.toggle('reproduciendo', !audio.paused);
    }

    var contRep, contRepPlay, contRepCerrar, etiquetaTema, etiquetaArtista, barraAvance, etiquetaTiempo;

    function reproducir(tema, artista, url) {
        if (!contRep) { crearReproductor(); }

        etiquetaTema.textContent = tema;
        etiquetaArtista.textContent = artista;
        audio.src = url;
        audio.play().catch(function () { });
        contRep.classList.add('visible');
        sincronizarPlayUI();
    }

    function detenerYCerrar() {
        audio.pause();
        audio.removeAttribute('src');
        audio.load();
        barraAvance.value = 0;
        etiquetaTiempo.textContent = '0:00 / 0:00';
        contRep.classList.remove('visible');
    }

    audio.addEventListener('timeupdate', function () {
        if (!audio.duration) { return; }
        var progreso = (audio.currentTime / audio.duration) * 100;
        barraAvance.value = progreso;
        etiquetaTiempo.textContent = formatearSeg(audio.currentTime) + ' / ' + formatearSeg(audio.duration);
    });

    audio.addEventListener('ended', function () {
        sincronizarPlayUI();
    });

    audio.addEventListener('pause', sincronizarPlayUI);
    audio.addEventListener('play', sincronizarPlayUI);

    /* ---------- Vinculación de botones ---------- */
    function vincularSi (soloEscuchar) {
        var selector = soloEscuchar ? '.escucha-card' : '.producto';
        document.querySelectorAll(selector).forEach(function (card) {
            var tituloCard = card.querySelector('.card-title');
            if (!tituloCard) { return; }
            var pista = soloEscuchar ?
                PRUEBAS_ESCUCHAR[tituloCard.textContent.trim()] :
                PRUEBAS_PRODUCTOS[tituloCard.textContent.trim()];
            if (!pista) { return; }

            if (soloEscuchar) {
                var a = card.querySelector('.escucha-thumb');
                if (a) {
                    a.addEventListener('click', function (e) {
                        e.preventDefault();
                        reproducir(pista.tema, pista.artista, pista.url);
                    });
                }
            } else {
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'btn btn-probar';
                btn.innerHTML = '<i class="bi bi-play-circle-fill me-1"></i> Escuchar muestra';
                btn.setAttribute('aria-label', 'Escuchar muestra de ' + pista.tema);
                btn.addEventListener('click', function () {
                    reproducir(pista.tema, pista.artista, pista.url);
                });
                var precio = card.querySelector('.precio');
                if (precio) {
                    card.insertBefore(btn, precio);
                }
            }
        });
    }

    function vincularArtistas() {
        document.querySelectorAll('.artista-card').forEach(function (card) {
            var nombre = card.querySelector('.artista-nombre');
            if (!nombre) { return; }
            var pista = PRUEBAS_DESTACADOS[nombre.textContent.trim()];
            if (!pista) { return; }

            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'btn-probar-artista';
            btn.innerHTML = '<i class="bi bi-play-fill"></i>';
            btn.setAttribute('aria-label', 'Escuchar muestra de ' + pista.tema + ' de ' + pista.artista);
            btn.setAttribute('title', 'Escuchar muestra');
            btn.addEventListener('click', function () {
                reproducir(pista.tema, pista.artista, pista.url);
            });

            var redes = card.querySelector('.artista-redes');
            if (redes) {
                redes.insertBefore(btn, redes.firstChild);
            } else {
                card.appendChild(btn);
            }
        });
    }

    /* ---------- Botones [data-muestra] (Ranking Top 10, etc.) ---------- */
    function vincularMuestrasGenericas() {
        document.querySelectorAll('[data-muestra]').forEach(function (elemento) {
            var pista = PRUEBAS_ESCUCHAR[elemento.getAttribute('data-muestra')];
            if (!pista) { return; }
            elemento.addEventListener('click', function () {
                reproducir(pista.tema, pista.artista, pista.url);
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        if (document.getElementById('reproductor')) {
            contRep = document.getElementById('reproductor');
        } else {
            crearReproductor();
        }
        contRep = document.getElementById('reproductor');
        contRepPlay = document.getElementById('repPlay');
        contRepCerrar = document.getElementById('repCerrar');
        etiquetaTema = document.getElementById('repTema');
        etiquetaArtista = document.getElementById('repArtista');
        barraAvance = document.getElementById('repBarra');
        etiquetaTiempo = document.getElementById('repTiempo');

        contRepPlay.addEventListener('click', function () {
            if (audio.paused) { audio.play().catch(function () { }); }
            else { audio.pause(); }
        });

        contRepCerrar.addEventListener('click', detenerYCerrar);

        barraAvance.addEventListener('input', function () {
            if (audio.duration) {
                audio.currentTime = (barraAvance.value / 100) * audio.duration;
            }
        });

        vincularSi(true);
        vincularSi(false);
        vincularArtistas();
        vincularMuestrasGenericas();
    });
})();
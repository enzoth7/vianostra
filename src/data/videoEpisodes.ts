import type { VideoEpisode } from '../types';

export const VIDEO_EPISODES: VideoEpisode[] = [
  {
    id: 'niza-ep-1',
    episodeNumber: 1,
    title: 'Niza como Base Estratégica: A 30 minutos de la frontera italiana',
    subtitle: 'Por qué instalarse en la Costa Azul para investigar el norte italiano y la Liguria',
    duration: '14:20 min',
    location: 'Niza, Francia & Ventimiglia, Italia',
    category: 'italia',
    summary: 'Desde la Promenade des Anglais y la estación de Nice-Ville hasta la frontera con Liguria. Enzo explica la cercanía geopolítica, cómo la historia compartida de Niza (antigua provincia de Saboya/Cerdeña) se conecta con los puertos de emigración hacia el Río de la Plata y las primeras lecciones de búsqueda en terreno.',
    coverImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    topics: ['Geografía histórica', 'Frontera Ventimiglia', 'Logística de viaje', 'Archivos de la Liguria'],
    keyTakeaways: [
      'Niza está a solo 40 minutos en tren regional (TER) de Ventimiglia y a 2 horas de Génova.',
      'Muchos emigrantes ligures y piamonteses cruzaban por esta zona antes de embarcarse en Génova o Marsella.',
      'Estar en el huso horario europeo agiliza el contacto telefónico directo con las comunas en sus breves ventanas de atención (de 9:00 a 12:00 CET).'
    ],
    documentsMentioned: ['Pasaportes del Reino de Cerdeña', 'Listas de embarque del Puerto de Génova'],
    platform: 'youtube',
    videoType: 'masterclass',
    youtubeUrl: 'https://www.youtube.com/@ViaNostraBo',
    date: 'Enero 2026'
  },
  {
    id: 'niza-ep-2',
    episodeNumber: 2,
    title: 'El Quiebre de 1866: Parroquias vs. Registro Civil Italiano',
    subtitle: 'La regla de oro para no perder meses pidiéndole al organismo equivocado',
    duration: '18:45 min',
    location: 'Archivio di Stato / Diocesi',
    category: 'genealogia',
    summary: 'El error más común de los descendientes uruguayos y latinoamericanos: pedir al Comune un nacimiento anterior a septiembre de 1866. Enzo detalla la división entre los Registros Parroquiales (Archivio Diocesano) y el Stato Civile post-unificación italiana.',
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    topics: ['Unificación Italiana', 'Archivos Diocesanos', 'Registros Parroquiales', 'Stato Civile 1866'],
    keyTakeaways: [
      'Antes del 1 de septiembre de 1866 (en la mayoría de las regiones del norte): el registro civil NO existía; los nacimientos se registraban en la Parroquia.',
      'Si tu avo nació antes de 1866, debés solicitar el Certificato di Battesimo legalizado por la Curia Vescovile (Diócesis correspondiente).',
      'Excepción del Sur: En el antiguo Reino de las Dos Sicilias el registro civil comenzó en 1809 o 1820.'
    ],
    documentsMentioned: ['Certificato di Battesimo', 'Visto della Curia Vescovile', 'Estratto per riassunto'],
    platform: 'youtube',
    videoType: 'masterclass',
    youtubeUrl: 'https://www.youtube.com/@ViaNostraBo',
    date: 'Febrero 2026'
  },
  {
    id: 'niza-ep-3',
    episodeNumber: 3,
    title: 'La Mina de Oro en Uruguay: Corte Electoral y Registro Civil',
    subtitle: 'Desbloqueando los datos del avo sin salir de Montevideo o el interior',
    duration: '21:10 min',
    location: 'Montevideo, Uruguay & Niza',
    category: 'uruguay',
    summary: 'Cómo armar la base documental en Uruguay antes de gastar un euro en Europa. El valor de la Credencial Cívica, el Certificado de No Ciudadano Legal en la Corte Electoral uruguaya y las pistas ocultas en las partidas de defunción de la DGREC.',
    coverImage: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80',
    topics: ['Corte Electoral URU', 'Partida de Defunción', 'DGREC Uruguay', 'No-Naturalización'],
    keyTakeaways: [
      'El Certificado de No Naturalización (Corte Electoral de Uruguay) es el documento más decisivo: prueba que el avo nunca renunció a la ciudadanía italiana.',
      'En las actas de matrimonio y defunción uruguayas de fines del s. XIX solía constar el pueblo exacto o la provincia ("oriundo de Novi Ligure / Génova").',
      'El registro del Cementerio Central o de La Teja en Montevideo preserva libros con la procedencia exacta.'
    ],
    documentsMentioned: ['Certificado de No Naturalización (Corte Electoral)', 'Partida de Defunción DGREC', 'Expedientes Matrimoniales'],
    platform: 'ambos',
    videoType: 'masterclass',
    youtubeUrl: 'https://www.youtube.com/@ViaNostraBo',
    tiktokUrl: 'https://www.tiktok.com/@vianostrabo',
    date: 'Febrero 2026'
  },
  {
    id: 'niza-ep-4',
    episodeNumber: 4,
    title: 'Distorsión de Nombres en el Río de la Plata: Sin pánico',
    subtitle: 'Giuseppe a José, Giovanni a Juan: Rectificaciones y criterios judiciales',
    duration: '16:30 min',
    location: 'Niza, Francia',
    category: 'estrategia',
    summary: 'Cuando el oficial de aduanas o del registro civil uruguayo castellanizó el nombre del inmigrante. Enzo analiza la circular consular vigente y la jurisprudencia de los tribunales italianos sobre discrepancias menores en los nombres.',
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    topics: ['Castellanización', 'Rectificaciones', 'Criterios Consulares', 'Traducciones Públicas'],
    keyTakeaways: [
      'La traducción al español (ej. Luigi -> Luis) es una práctica histórica reconocida por la Circular K28 y no invalida por sí misma la línea.',
      'Los errores graves son en fechas de nacimiento dispares por más de 5 años o nombres de padres invertidos.',
      'En Uruguay, las rectificaciones de partidas se realizan por vía administrativa en la DGREC o judicialmente según el tipo de discrepancia.'
    ],
    documentsMentioned: ['Circular K28/1991', 'Información Sumaria', 'Rectificación de Partida'],
    platform: 'ambos',
    videoType: 'masterclass',
    youtubeUrl: 'https://www.youtube.com/@ViaNostraBo',
    tiktokUrl: 'https://www.tiktok.com/@vianostrabo',
    date: 'Febrero 2026'
  },
  {
    id: 'tiktok-tip-1',
    episodeNumber: 5,
    title: 'El truco del Expediente Matrimonial en Uruguay',
    subtitle: 'Por qué la partida de matrimonio sola no alcanza y qué pedir en la DGREC',
    duration: '1:45 min',
    location: 'Montevideo, Uruguay',
    category: 'uruguay',
    summary: 'En 90 segundos: la diferencia crucial entre pedir la "partida simple" y solicitar el "expediente matrimonial completo con testimonios de testigos". Ahí es donde el tano decía de qué comune venía.',
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    topics: ['DGREC', 'Expediente Matrimonial', 'Testigos', 'Truco Rápido'],
    keyTakeaways: [
      'Pedí el expediente matrimonial, no solo el acta anotada.',
      'Los testigos solían ser paisanos del mismo pueblo italiano.',
      'Trámite en Montevideo se pide con la fecha y sección judicial.'
    ],
    platform: 'tiktok',
    videoType: 'reel_tip',
    tiktokUrl: 'https://www.tiktok.com/@vianostrabo',
    date: 'Marzo 2026'
  },
  {
    id: 'tiktok-tip-2',
    episodeNumber: 6,
    title: 'Cómo buscar en Antenati sin saber la comuna',
    subtitle: 'El filtro por Archivio di Stato provincial para no volverte loco',
    duration: '2:15 min',
    location: 'Niza, Francia',
    category: 'genealogia',
    summary: 'Paso a paso en pantalla: cómo usar el buscador del Ministero della Cultura italiano filtrando por provincia cuando solo sabés que tu bisabuelo era de "Génova" o "Cosenza".',
    coverImage: 'https://images.unsplash.com/photo-1507842229451-79731d71a56f?auto=format&fit=crop&w=800&q=80',
    topics: ['Portale Antenati', 'Búsqueda por Apellido', 'Archivio di Stato'],
    keyTakeaways: [
      'Usá la búsqueda por personas de Antenati con comodines.',
      'Si el apellido es poco común, encontrás la comuna en 5 minutos.',
      'Los libros de leva militar (leva militare) son la clave del éxito.'
    ],
    platform: 'tiktok',
    videoType: 'reel_tip',
    tiktokUrl: 'https://www.tiktok.com/@vianostrabo',
    date: 'Marzo 2026'
  }
];

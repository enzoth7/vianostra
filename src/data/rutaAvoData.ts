import type { RutaStep } from '../types';

export const RUTA_AVO_STEPS: RutaStep[] = [
  {
    stepNumber: 1,
    title: 'Excavación Documental en Uruguay',
    tagline: 'Recolectar las huellas del inmigrante en el Río de la Plata',
    institution: 'Corte Electoral & DGREC (Montevideo / Interior)',
    country: 'uruguay',
    iconName: 'FileSearch',
    description: 'Antes de contactar con Italia, la clave reside en exprimir los registros uruguayos. En Uruguay, todo inmigrante que falleció o se casó en el país dejó rastros escritos con nombres de sus padres y a menudo su provincia o localidad natal.',
    actionItems: [
      'Solicitar la Partida de Defunción del Avo en la DGREC (Dirección General de Registro de Estado Civil). Muchas veces incluye "fallecido a los 72 años, natural de Génova / Potenza / Lucca".',
      'Solicitar el Expediente Matrimonial de la Iglesia o Registro Civil: incluye declaraciones juradas de testigos con el pueblo específico.',
      'Tramitar el Certificado de No Ciudadano Naturalizado en la Corte Electoral (calle 25 de Mayo o mediante trámite web oficial de la Corte Electoral de Uruguay).',
      'Revisar el archivo del Centro de Estudios Migratorios Latinoamericanos (CEMLA) o listas de barcos al Puerto de Montevideo.'
    ],
    insiderTip: 'Atención con la credencial cívica y los certificados de defunción: si el certificado de defunción dice solo "nacido en Italia", pedí la partida de defunción parroquial previa a 1879, que solía ser mucho más detallada.',
    resourceLinks: [
      { label: 'Corte Electoral de Uruguay', url: 'https://www.corteelectoral.gub.uy', badge: 'Oficial' },
      { label: 'DGREC - Trámites de Partidas gub.uy', url: 'https://www.gub.uy/tramites/partidas-estado-civil', badge: 'Registro Civil' },
      { label: 'Buscador CEMLA Inmigrantes', url: 'https://cemla.com/consulta/', badge: 'Barcos' }
    ]
  },
  {
    stepNumber: 2,
    title: 'Rastreo Digital: Antenati y FamilySearch',
    tagline: 'Exploración de microfilms y archivos de estado digitalizados',
    institution: 'Portale Antenati (MiC) & FamilySearch',
    country: 'digital',
    iconName: 'Database',
    description: 'El Estado italiano digitalizó decenas de millones de actas en el Portal Antenati del Ministero della Cultura. Combinado con el catálogo no indexado de FamilySearch, te permite revisar libro por libro sin pagar un peso.',
    actionItems: [
      'Entrar a Portale Antenati y seleccionar "Esplora gli archivi" filtrando por la provincia italiana identificada.',
      'Comprender la cronología: Estado Civil Napoleónico (1806-1815), Restauración (1815-1865 en el sur) e Italiano Unitario (desde 1866 en el norte y centro).',
      'En FamilySearch, no te limites al buscador por nombre (muchos libros no están transcriptos por IA aún); ingresá a "Catálogo", buscá la comuna y navegá imagen por imagen los libros parroquiales.',
      'Revisar los índices decenales ("Indici Decennali"): listas alfabéticas al final de cada década de nacimientos.'
    ],
    insiderTip: 'Los índices decenales son tu mejor atajo: en vez de ver 1.000 páginas año a año, vas directo al índice alfabético del período de 10 años donde figura el apellido y el número de acta.',
    resourceLinks: [
      { label: 'Portale Antenati (Ministero della Cultura)', url: 'https://antenati.cultura.gov.it', badge: 'Archivo Oficial' },
      { label: 'Catálogo de FamilySearch (Registros)', url: 'https://www.familysearch.org/search/catalog', badge: 'Microfilms' },
      { label: 'Cognomix - Mapa de Apellidos Italianos', url: 'https://www.cognomix.it', badge: 'Herramienta' }
    ]
  },
  {
    stepNumber: 3,
    title: 'Fijar la Comuna o Parroquia Exacta',
    tagline: 'Cerrar el círculo geográfico con precisión cartográfica',
    institution: 'Comune di Nascita o Diocesi Vescovile',
    country: 'italia',
    iconName: 'MapPin',
    description: 'En Italia existen cerca de 7.900 comunas y más de 25.000 parroquias. Ningún funcionario italiano buscará "en toda Italia" si no indicás la comuna exacta y una ventana temporal reducida (máximo 3 a 5 años).',
    actionItems: [
      'Mapear la concentración del apellido en Cognomix o PagineBianche Storiche para aislar la provincia de origen en casos de apellidos infrecuentes.',
      'Verificar si la comuna histórica cambió de nombre, se fusionó o fue absorbida por un municipio mayor durante las reformas administrativas.',
      'Localizar la dirección oficial del "Ufficio di Stato Civile - Anagrafe" de la comuna o el "Archivio Storico Diocesano" si el nacimiento fue antes de 1866.',
      'Obtener la dirección de correo ordinaria y la casilla PEC (Posta Elettronica Certificata) oficial de la comuna mediante el portal indicepa.gov.it.'
    ],
    insiderTip: 'Usá el portal IndicePA (Índice de Domicilios Digitales de la Administración Pública Italiana) para encontrar la casilla PEC y los emails directos de los funcionarios de Stato Civile de esa comuna.',
    resourceLinks: [
      { label: 'IndicePA - Correos Oficiales de Comunas', url: 'https://www.indicepa.gov.it', badge: 'Directorio Gob' },
      { label: 'Comuni Italiani Info', url: 'https://www.comuni-italiani.it', badge: 'Datos Comunas' }
    ]
  },
  {
    stepNumber: 4,
    title: 'La Solicitud Formal a la Comuna',
    tagline: 'Redacción correcta, cortesía y seguimiento sin fricciones',
    institution: 'Ufficio di Stato Civile / Archivio di Stato',
    country: 'italia',
    iconName: 'Send',
    description: 'Una solicitud mal redactada en español o mediante traducción automática precaria suele quedar al fondo del escritorio del funcionario. Es indispensable redactar en el formato legal italiano citando el artículo 450 del Código Civil y especificando la finalidad del trámite.',
    actionItems: [
      'Generar la carta formal en italiano solicitando el "Estratto dell\'atto di nascita con indicazione della paternità e maternità" (utilizá nuestro generador interactivo abajo).',
      'Adjuntar siempre copia clara y a color de tu documento de identidad o pasaporte vigente.',
      'Si se envía por correo postal tradicional, incluir una "busta preaffrancata" (sobre con franqueo de retorno) o cupón de respuesta internacional si el municipio lo requiere.',
      'Si contás con casilla PEC o gestor con PEC, el acuse de recibo legal tiene valor de carta documento certificada.'
    ],
    insiderTip: 'Siempre solicitá el extracto con indicación expresa de paternidad y maternidad. Un certificado simple sin los nombres de los progenitores no es aceptado por el Consulado ni por los tribunales.',
    resourceLinks: [
      { label: 'Generador de Solicitud Via Nostra', url: '#solicitud', badge: 'Herramienta' },
      { label: 'Ministero dell\'Interno - Guida Cittadinanza', url: 'https://www.interno.gov.it/it/temi/cittadinanza-e-altri-diritti-civili/cittadinanza', badge: 'Normativa' }
    ]
  }
];

import type { ChecklistItem } from '../types';

export const DEFAULT_CHECKLIST_ITEMS: ChecklistItem[] = [
  // Rama Avo Italiano
  {
    id: 'avo-nascita',
    category: 'avo',
    title: 'Acta de Nacimiento Italiana del Avo (Estratto con paternità e maternità)',
    description: 'Emitida por la comuna de nacimiento o certificado de bautismo parroquial con legalización de la curia si nació antes de 1866.',
    whereToGet: 'Comune di nascita (Ufficio Stato Civile) o Archivio Diocesano',
    status: 'pendiente',
    notes: 'Solicitar con nombres completos de los padres.'
  },
  {
    id: 'avo-corte-electoral',
    category: 'avo',
    title: 'Certificado de No Naturalización (Corte Electoral de Uruguay)',
    description: 'Documento expedido por la Corte Electoral uruguaya que acredita que el avo nunca adquirió la ciudadanía legal uruguaya o la fecha exacta si lo hizo.',
    whereToGet: 'Corte Electoral de Uruguay (Oficina Central Montevideo o web)',
    status: 'pendiente',
    notes: 'Incluir todas las variantes de nombres y apellidos usadas en Uruguay.'
  },
  {
    id: 'avo-matrimonio',
    category: 'avo',
    title: 'Acta de Matrimonio del Avo',
    description: 'Si se casó en Italia: solicitar en la comuna italiana. Si se casó en Uruguay: solicitar en la DGREC.',
    whereToGet: 'DGREC (Uruguay) o Comune italiana',
    status: 'pendiente',
    notes: 'Revisar datos de filiación y lugar de nacimiento anotados por los contrayentes.'
  },
  {
    id: 'avo-defuncion',
    category: 'avo',
    title: 'Acta de Defunción del Avo en Uruguay',
    description: 'Partida emitida por el Registro de Estado Civil uruguayo donde consta fecha y lugar de fallecimiento.',
    whereToGet: 'DGREC - Registro de Estado Civil (Uruguay)',
    status: 'pendiente',
    notes: 'Prestar atención a la edad consignada y el estado civil al morir.'
  },

  // Rama Intermedia (Abuelo / Padre)
  {
    id: 'intermedia-nascita',
    category: 'intermedia',
    title: 'Partida de Nacimiento de la generación intermedia',
    description: 'Nacimiento de tu padre/madre o abuelo/abuela que continúa la línea de transmisión del apellido o sangre.',
    whereToGet: 'DGREC / Intendencia Departamental (Uruguay)',
    status: 'pendiente',
    notes: 'Verificar que figure el vínculo con el Avo italiano.'
  },
  {
    id: 'intermedia-matrimonio',
    category: 'intermedia',
    title: 'Partida de Matrimonio de la generación intermedia',
    description: 'Prueba de filiación matrimonial de la generación intermedia.',
    whereToGet: 'DGREC (Uruguay)',
    status: 'pendiente',
    notes: 'Confirmar concordancia en nombres de padres y cónyuges.'
  },
  {
    id: 'intermedia-defuncion',
    category: 'intermedia',
    title: 'Partida de Defunción de la generación intermedia (si aplica)',
    description: 'Necesaria si la persona ya falleció.',
    whereToGet: 'DGREC (Uruguay)',
    status: 'pendiente',
    notes: 'Solo si la persona de la línea intermedia ha fallecido.'
  },

  // Generación Solicitante (Vos)
  {
    id: 'solicitante-nascita',
    category: 'solicitante',
    title: 'Tu Partida de Nacimiento en Uruguay',
    description: 'Tu partida oficial de nacimiento expedida por la DGREC en formato para el exterior.',
    whereToGet: 'DGREC (Uruguay) vía gub.uy o presencial',
    status: 'pendiente',
    notes: 'Pedir copia para trámite en el exterior.'
  },
  {
    id: 'solicitante-matrimonio',
    category: 'solicitante',
    title: 'Tu Partida de Matrimonio (si estás casado/a)',
    description: 'Para inscribir simultáneamente a tu cónyuge o registrar tu estado civil actual.',
    whereToGet: 'DGREC (Uruguay)',
    status: 'pendiente',
    notes: 'Si sos soltero/a, no aplica.'
  },
  {
    id: 'solicitante-hijos',
    category: 'solicitante',
    title: 'Partidas de Nacimiento de Hijos Menores de 18 años',
    description: 'Los hijos menores adquieren la ciudadanía italiana automáticamente junto con el solicitante.',
    whereToGet: 'DGREC (Uruguay)',
    status: 'pendiente',
    notes: 'Fundamental adjuntarlos para que queden inscriptos sin costo adicional.'
  },
  {
    id: 'solicitante-id',
    category: 'solicitante',
    title: 'Cédula de Identidad y Pasaporte Uruguayo Vigente',
    description: 'Copia certificada y comprobante de residencia habitual (factura de servicios públicos a tu nombre en Uruguay).',
    whereToGet: 'DNIC (Uruguay) / Factura UTE, Antel u OSE',
    status: 'pendiente',
    notes: 'Comprueba jurisdicción consular para Montevideo.'
  },

  // Legalizaciones y Traducciones
  {
    id: 'leg-apostilla-uruguay',
    category: 'legalizaciones',
    title: 'Apostilla de La Haya en Cancillería (MRREE Uruguay)',
    description: 'Todas las actas emitidas en Uruguay deben llevar la Apostilla de La Haya del Ministerio de Relaciones Exteriores.',
    whereToGet: 'MRREE (Cancillería de Uruguay - Cuareim 1384 o trámite digital)',
    status: 'pendiente',
    notes: 'Primero legalizar en DGREC / MEC según corresponda y luego apostillar en Cancillería.'
  },
  {
    id: 'leg-traduccion-italiano',
    category: 'legalizaciones',
    title: 'Traducción Pública Jurada al Italiano',
    description: 'Realizada por Traductor Público egresado de la Udelar e inscripto en el Colegio de Traductores Públicos del Uruguay.',
    whereToGet: 'Colegio de Traductores Públicos del Uruguay (CTPU)',
    status: 'pendiente',
    notes: 'Traducir íntegramente las partidas y las notas marginales.'
  },
  {
    id: 'leg-apostilla-traduccion',
    category: 'legalizaciones',
    title: 'Apostilla o Legalización de la Traducción',
    description: 'Apostillar también la firma del traductor público para que tenga validez plena ante las autoridades judiciales o consulares italianas.',
    whereToGet: 'MRREE (Cancillería de Uruguay)',
    status: 'pendiente',
    notes: 'Verificar si el tribunal o consulado requiere doble apostilla.'
  },
  {
    id: 'leg-cotejo-nombres',
    category: 'legalizaciones',
    title: 'Auditoría y Concordancia de la Cadena Documental',
    description: 'Revisión minuciosa de que no existan discrepancias insalvables en fechas de nacimiento, años de edad, o nombres entre partidas.',
    whereToGet: 'Autocotejo exhaustivo / Profesional genealogista',
    status: 'pendiente',
    notes: 'Detectar a tiempo si se requiere rectificación de partida judicial en Uruguay.'
  }
];

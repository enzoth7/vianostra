export interface TajaniPillar {
  title: string;
  badge: string;
  explanation: string;
  impact: string;
}

export interface MythVsFact {
  myth: string;
  fact: string;
  advice: string;
}

export const TAJANI_SUMMARY = {
  lastUpdated: 'Febrero 2026',
  headline: 'La verdad jurídica sobre el Decreto Tajani y el futuro del Iure Sanguinis',
  lead: 'Sin sensacionalismos ni promesas de agencias: analizamos qué se discutió en el Parlamento Italiano, qué sigue vigente y por qué la búsqueda genealógica es hoy tu único activo seguro.',
};

export const TAJANI_PILLARS: TajaniPillar[] = [
  {
    title: '1. El debate de las generaciones (Límites al bisabuelo / tatarabuelo)',
    badge: 'En debate legislativo',
    explanation: 'El viceprimer ministro Antonio Tajani y sectores del gobierno plantearon limitar la transmisión automática a hijos y nietos (1ª y 2ª generación), exigiendo un vínculo lingüístico (B1) o residencia efectiva para generaciones posteriores.',
    impact: 'La Ley 91 de 1992 sigue plenamente vigente hoy en los tribunales y consulados. Cualquier modificación sustancial requiere aprobación bicameral y reglamentación, lo que suele demorar meses o años.',
  },
  {
    title: '2. El colapso del consulado en Montevideo y Prenot@mi',
    badge: 'Realidad Operativa',
    explanation: 'Conseguir turno en la Embajada / Consulado General de Italia en Montevideo sigue siendo un embudo crítico debido a la saturación de solicitudes y la escasez de personal consular.',
    impact: 'Esto impulsó la vía judicial en Italia por "falta de turnos consular" ante los tribunales regionales (como Venecia, Roma, Nápoles, Génova), donde los jueces exigen rigurosidad documental absoluta.',
  },
  {
    title: '3. El Acta de Nacimiento: El único activo que nunca vence',
    badge: 'Pilar Fundamental',
    explanation: 'Cualquier vía (consular en Montevideo, judicial por falta de turno, vía materna 1948 o residencia en comune en Italia) exige de forma no negociable el Estratto dell\'Atto di Nascita emitido por la comuna o parroquia italiana.',
    impact: 'Tener localizada la comuna, el tomo, el año y los nombres de los padres te da control total sobre tu caso, independientemente de qué reformas legales o políticas ocurran.',
  },
];

export const MYTHS_VS_FACTS: MythVsFact[] = [
  {
    myth: '"La ciudadanía italiana ya se cerró para bisnietos y tataranietos con el Decreto Tajani."',
    fact: 'Falso. Un anuncio de prensa o un proyecto de ley no deroga de inmediato la Ley 91/1992. Los tribunales ordinarios italianos continúan dictando sentencias favorables de reconocimiento iure sanguinis basadas en la jurisprudencia consolidada de la Corte de Casación.',
    advice: 'No te paralices por noticias alarmistas. El reloj corre para tener la carpeta lista antes de eventuales cambios definitivos.',
  },
  {
    myth: '"Pagué 4.000 USD a un gestor y me prometió un turno consular en Montevideo en 60 días."',
    fact: 'Falso y de alto riesgo. El sistema Prenot@mi es gratuito, personal e intransferible. Los gestores que usan granjas de IP o bots son bloqueados por la Farnesina y exponen a los solicitantes a denuncias o cancelaciones de turno.',
    advice: 'Ninguna entidad seria garantiza plazos consulares. Gestioná tu propio turno o evaluá la vía judicial con un abogado colegiado en Italia.',
  },
  {
    myth: '"Si no sé de qué pueblo vino mi avo, es imposible encontrar su partida italiana."',
    fact: 'Falso. En Uruguay existen fuentes cruzadas valiosísimas: las actas de matrimonio y defunción de la DGREC, los registros de la Corte Electoral, los censos de 1908 y los archivos de inmigración en Montevideo.',
    advice: 'El 85% de los orígenes se descubren rastreando la documentación uruguaya de defunción o matrimonio donde el escribano o sacerdote anotó la provincia de origen.',
  },
  {
    myth: '"Las actas italianas caducan a los 6 meses."',
    fact: 'Las actas de nacimiento y matrimonio emitidas en Italia que certifican hechos inmutables (nacimiento y muerte) NO tienen fecha de caducidad ante la justicia italiana, salvo que el consulado específico solicite una expedición menor a 1 año al momento de ingresar la carpeta.',
    advice: 'Pedir el acta a la comuna hoy no es un gasto en vano: es el cimiento permanente de tu expediente.',
  },
];

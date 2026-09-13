import React from 'react';
import { 
  ArrowUpRight, 
  Landmark, 
  Building2, 
  Ship, 
  Scale, 
  CheckCircle2 
} from 'lucide-react';
import type { EndpointType } from './Navbar';

interface ResourceItem {
  id: string;
  name: string;
  agency: string;
  badge: string;
  description: string;
  url: string;
  callout?: string;
}

interface ResourceCategory {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  items: ResourceItem[];
}

const CATEGORIES: ResourceCategory[] = [
  {
    id: 'italia',
    number: '01',
    title: 'Archivos Oficiales en Italia',
    subtitle: 'Registros de estado civil unificado, censos militares y archivos eclesiásticos pre-unitarios.',
    icon: Landmark,
    items: [
      {
        id: 'antenati',
        name: 'Portale Antenati',
        agency: 'Ministero della Cultura · Direzione Generale Archivi',
        badge: 'Italia · Digital',
        description: 'Portal nacional de digitalización de registros de estado civil conservados en los Archivi di Stato italianos. Permite consultar actas de nacimiento, matrimonio y defunción de los períodos napoleónico (1806–1815), de la restauración (1815–1865) e italiano post-unitario (1866 en adelante).',
        url: 'https://antenati.cultura.gov.it',
        callout: 'Búsqueda por nombres e inspección de libros digitalizados folio por folio.'
      },
      {
        id: 'indicepa',
        name: 'IndicePA',
        agency: 'Agenzia per l’Italia Digitale (AgID)',
        badge: 'Italia · Directorio Oficial',
        description: 'Buscador oficial de domicilios digitales, correos electrónicos ordinarios y casillas PEC (Posta Elettronica Certificata) de las 7.904 comunas italianas. Esencial para obtener el buzón oficial exacto del Ufficio dello Stato Civile al solicitar partidas de nacimiento.',
        url: 'https://www.indicepa.gov.it',
        callout: 'Base actualizada de casillas PEC y Uffici di Stato Civile comunales.'
      },
      {
        id: 'san',
        name: 'Sistema Archivistico Nazionale (SAN)',
        agency: 'Istituto Centrale per gli Archivi (ICAR)',
        badge: 'Italia · Archivo Estatal',
        description: 'Guía unificada de fondos y censos en los Archivos de Estado provinciales. Fundamental para rastrear los registros militares de conscripción (Liste di Leva) y enrolamiento (Ruoli Matricolari), clave para ubicar la comuna de nacimiento exacta del avo varón cuando solo se conoce la provincia de partida.',
        url: 'https://san.cultura.gov.it',
        callout: 'Localización de fondos de Leva Militar y expedientes provinciales.'
      },
      {
        id: 'diocesi',
        name: 'Diocesi Italiane',
        agency: 'Conferenza Episcopale Italiana (CEI)',
        badge: 'Italia · Parroquias / Curias',
        description: 'Guía y directorio para localizar archivos parroquiales y curias episcopales en todas las diócesis de Italia. Imprescindible para antepasados nacidos antes del 1 de septiembre de 1866 (o 1871 en Roma y Véneto), donde el único registro válido es el acta de bautismo eclesiástica.',
        url: 'https://www.chiesacattolica.it/diocesi-italiane/',
        callout: 'Esencial para búsquedas pre-1866 sin registro civil municipal.'
      }
    ]
  },
  {
    id: 'uruguay',
    number: '02',
    title: 'Organismos y Archivos en Uruguay',
    subtitle: 'Sedes registrales, certificados electorales y fondos municipales de defunción en Uruguay.',
    icon: Building2,
    items: [
      {
        id: 'corte-electoral',
        name: 'Corte Electoral de Uruguay',
        agency: 'Corte Electoral · Sede Central Montevideo',
        badge: 'Uruguay · Presencial / Web',
        description: 'Tramitación oficial del Certificado de No Ciudadano Legal (Certificado de No Naturalización). Documento legal insustituible exigido por consulados y tribunales italianos que acredita que el inmigrante no adquirió la ciudadanía legal uruguaya antes del nacimiento de sus descendientes.',
        url: 'https://www.corteelectoral.gub.uy',
        callout: 'Expedición en Montevideo (calle 25 de Mayo) o gestión online.'
      },
      {
        id: 'dgrec',
        name: 'DGREC — Registro Civil Uruguayo',
        agency: 'Dirección General de Registro de Estado Civil (MEC)',
        badge: 'Uruguay · Trámite Digital',
        description: 'Solicitud de partidas digitalizadas de nacimiento, matrimonio y defunción ocurridas en Uruguay. Fundamental tramitar el Expediente Matrimonial completo: las declaraciones de los testigos con frecuencia asientan la comuna o aldea de origen natal del avo en Italia.',
        url: 'https://www.gub.uy/tramites/partidas-estado-civil',
        callout: 'Solicitar copia fiel del Expediente Matrimonial con testimonios de testigos.'
      },
      {
        id: 'cementerios-mvd',
        name: 'Intendencia de Montevideo / Cementerios',
        agency: 'Servicio Fúnebre y Necrópolis (CdM)',
        badge: 'Uruguay · Archivo Municipal',
        description: 'Registros de inhumaciones y traslados del Cementerio Central, Cementerio del Buceo, Cementerio de La Teja y del Norte. Los libros de entrada registran la edad, nacionalidad, fecha de fallecimiento y pueblo o procedencia exacta del sepultado.',
        url: 'https://montevideo.gub.uy/areas-tematicas/salud-y-cementerios/inhumaciones-y-cremaciones',
        callout: 'Libros de inhumación del siglo XIX y XX con constancia de procedencia.'
      }
    ]
  },
  {
    id: 'genealogia-puertos',
    number: '03',
    title: 'Bases Genealógicas y Puertos de Emigración',
    subtitle: 'Manifiestos marítimos, registros de embarque de barcos a vapor y catálogos de microfilms.',
    icon: Ship,
    items: [
      {
        id: 'familysearch',
        name: 'FamilySearch (Buscador y Catálogo)',
        agency: 'Genealogical Society of Utah',
        badge: 'Internacional · Digital',
        description: 'Acceso a la mayor base de microfilms parroquiales y comunales del mundo. Su catálogo por localidad permite inspeccionar libros completos de nacimientos, matrimonios y bautismos no indexados por nombres en los motores automáticos de búsqueda.',
        url: 'https://www.familysearch.org/search/catalog',
        callout: 'Usar la sección Catálogo buscando por la comuna italiana específica.'
      },
      {
        id: 'cisei',
        name: 'CISEI (Emigrazione Italiana)',
        agency: 'Centro Internazionale Studi Emigrazione Italiana · Génova',
        badge: 'Emigración · Salidas Génova',
        description: 'Registros de pasajeros y salidas marítimas desde el puerto de Génova hacia el Río de la Plata (Montevideo y Buenos Aires). Permite comprobar el vapor de travesía, fecha de partida y comuna o provincia declarada antes de subir a bordo.',
        url: 'https://www.cisei.info',
        callout: 'Manifiestos de embarque de vapores que zarparon rumbo al Plata.'
      },
      {
        id: 'cemla',
        name: 'CEMLA',
        agency: 'Centro de Estudios Migratorios Latinoamericanos',
        badge: 'Río de la Plata · Arribos',
        description: 'Base de arribos marítimos al Río de la Plata. Facilita la localización de la fecha de llegada, edad declarada al descender, oficio y miembros del grupo familiar que acompañaban al inmigrante al arribar a los puertos de Montevideo o Buenos Aires.',
        url: 'https://cemla.com/consulta/',
        callout: 'Consulta de desembarcos marítimos de 1882 a 1960.'
      }
    ]
  },
  {
    id: 'legal',
    number: '04',
    title: 'Circulares y Documentación Legal',
    subtitle: 'Marco normativo vigente y doctrina administrativa vinculante para el reconocimiento iure sanguinis.',
    icon: Scale,
    items: [
      {
        id: 'circular-k28',
        name: 'Circular K.28/1991',
        agency: 'Ministero dell’Interno (Italia)',
        badge: 'Doctrina · Normativa K.28',
        description: 'Circular matriz del Ministerio del Interior italiano sobre la transmisión ininterrumpida de la ciudadanía iure sanguinis. Fija los criterios consulares y comunales sobre la prueba de no naturalización y la admisibilidad de leves discrepancias u oscilaciones ortográficas en nombres y apellidos.',
        url: 'https://dait.interno.gov.it/servizi-demografici/circolari/circolare-k28-del-8-aprile-1991',
        callout: 'Principio de continuidad y validez de actas con variaciones menores.'
      },
      {
        id: 'ley-91-1992',
        name: 'Ley 91/1992 (Legge 5 febbraio 1992, n. 91)',
        agency: 'Parlamento Italiano · Normattiva',
        badge: 'Ley · Marco Vigente',
        description: 'Marco normativo vigente publicado en Normattiva (Gazzetta Ufficiale) que regula la ciudadanía italiana por descendencia. Su artículo 1 consagra el derecho originario por nacimiento (iure sanguinis) sin límite de generaciones, y el artículo 7 la conservación de la nacionalidad salvo renuncia expresa.',
        url: 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:1992-02-05;91',
        callout: 'Texto íntegro oficial de la ley orgánica de ciudadanía italiana.'
      }
    ]
  }
];

interface RecursosSectionProps {
  onNavigate?: (endpoint: EndpointType) => void;
}

export const RecursosSection: React.FC<RecursosSectionProps> = ({ onNavigate }) => {
  const handleNav = (endpoint: EndpointType) => {
    if (onNavigate) {
      onNavigate(endpoint);
    }
  };

  const categoryAccent = (id: string) => {
    if (id === 'italia') return 'border-t-[#076525]';
    if (id === 'uruguay') return 'border-t-[#07214e]';
    return 'border-t-[#07214e]';
  };

  return (
    <section id="recursos" className="bg-transparent border-b border-[#07214e]/15">
      <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 py-16 md:py-24">
        
        {/* Header Principal */}
        <div className="max-w-4xl mb-16 border-l-4 border-[#07214e] pl-6 md:pl-8">
          <h1 className="text-3xl sm:text-5xl font-serif font-normal text-neutral-900 leading-tight">
            Recursos y Archivos Oficiales
          </h1>
          <p className="mt-5 text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
            Directorio riguroso y minimalista de fuentes, repositorios públicos y herramientas normativas para descendientes uruguayos. Todas las plataformas corresponden a organismos oficiales de Italia, Uruguay o instituciones archivísticas acreditadas.
          </p>
        </div>

        {/* Resumen de Categorías / Accesos Rápidos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-20">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <a
                key={cat.id}
                href={`#cat-${cat.id}`}
                className={`rounded-lg p-4 sm:p-5 border border-[#07214e]/15 border-t-2 ${categoryAccent(cat.id)} bg-white hover:border-[#07214e] transition-colors group flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-neutral-400 group-hover:text-[#07214e] transition-colors">
                    {cat.number}
                  </span>
                  <Icon className="w-4 h-4 text-neutral-400 group-hover:text-[#07214e] transition-colors" />
                </div>
                <div>
                  <div className="font-serif text-sm sm:text-base text-neutral-900 group-hover:text-[#07214e] transition-colors leading-snug">
                    {cat.title}
                  </div>
                  <div className="text-[11px] font-mono text-neutral-400 mt-1">
                    {cat.items.length} fuentes
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Bloques de Categorías */}
        <div className="space-y-20">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-28">
                
                {/* Cabecera de Categoría */}
                <div className="border-b border-neutral-200 pb-5 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="max-w-3xl">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono text-neutral-400 font-semibold tracking-wider">
                        CATEGORÍA {cat.number}
                      </span>
                      <span className="text-neutral-300">/</span>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-600">
                        <Icon className="w-3.5 h-3.5 text-[#07214e]" />
                        <span>{cat.title}</span>
                      </div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-normal text-neutral-900">
                      {cat.title}
                    </h2>
                    <p className="text-sm text-neutral-500 font-light mt-1.5 leading-relaxed">
                      {cat.subtitle}
                    </p>
                  </div>

                  <span className="text-xs font-mono text-neutral-400 shrink-0">
                    {cat.items.length} fuentes disponibles
                  </span>
                </div>

                {/* Grid de Tarjetas */}
                <div className={`grid grid-cols-1 md:grid-cols-2 ${cat.items.length >= 4 ? 'lg:grid-cols-4' : cat.items.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-6`}>
                  {cat.items.map((item) => (
                    <article
                      key={item.id}
                      className={`rounded-lg border border-[#07214e]/15 border-t-2 ${categoryAccent(cat.id)} bg-white p-6 sm:p-7 flex flex-col justify-between hover:border-[#07214e]/40 transition-colors group`}
                    >
                      <div>
                        {/* Insignia y Organismo */}
                        <div className="flex items-start justify-between gap-2 mb-4">
                          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase bg-white border border-neutral-200 text-neutral-700 font-medium shrink-0">
                            {item.badge}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-400 text-right truncate" title={item.agency}>
                            {item.agency.split('·')[0].trim()}
                          </span>
                        </div>

                        {/* Nombre de la fuente */}
                        <h3 className="text-lg sm:text-xl font-serif text-neutral-900 font-normal leading-snug mb-2 group-hover:text-[#07214e] transition-colors">
                          {item.name}
                        </h3>

                        {/* Organismo completo en font-mono discreto */}
                        <div className="text-[11px] font-mono text-neutral-400 mb-4 pb-3 border-b border-neutral-200/60">
                          {item.agency}
                        </div>

                        {/* Explicación práctica */}
                        <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed mb-4">
                          {item.description}
                        </p>

                        {/* Callout práctico */}
                        {item.callout && (
                          <div className="mb-6 p-2.5 bg-white border-l-2 border-[#07214e] text-[11px] font-mono text-neutral-600 leading-normal">
                            <span className="text-[#07214e] font-semibold">Utilidad: </span>
                            {item.callout}
                          </div>
                        )}
                      </div>

                      {/* Footer de Tarjeta con Enlace Oficial */}
                      <div className="pt-4 border-t border-neutral-200/80 flex items-center justify-between mt-auto">
                        <span className="text-[11px] font-mono text-neutral-400">
                          Acceso oficial
                        </span>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-[#07214e] group-hover:underline underline-offset-4 inline-flex items-center gap-1 font-medium transition-colors"
                        >
                          <span>Visitar portal</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* Banner Inferior Informativo de Metodología */}
        <div className="mt-20 p-8 border border-neutral-200 bg-[#FBFBFA] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#07214e] uppercase tracking-wider font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#07214e]" />
              <span>Metodología de Documentación Rigurosa</span>
            </div>
            <h4 className="text-lg font-serif text-neutral-900 font-normal">
              ¿No sabés por cuál de estas fuentes comenzar tu búsqueda?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              Seguí los 4 pasos de la <strong>Ruta del Avo</strong> para ordenar las partidas en Uruguay antes de requerir extractos en Italia, o utilizá el <strong>Generador de Carta a la Comuna</strong> para redactar la solicitud formal en italiano.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => handleNav('ruta-avo')}
              className="px-4 py-2 text-xs font-mono uppercase tracking-wider bg-[#07214e] text-white hover:bg-[#07214e]/90 transition-colors cursor-pointer"
            >
              Ver Ruta del Avo →
            </button>
            <button
              onClick={() => handleNav('carta-comuna')}
              className="px-4 py-2 text-xs font-mono uppercase tracking-wider border border-neutral-300 hover:border-neutral-800 text-neutral-800 transition-colors cursor-pointer"
            >
              Generador de Carta
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

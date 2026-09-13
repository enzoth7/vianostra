import React from 'react';
import type { EndpointType } from './Navbar';

interface ResourceItem {
  id: string;
  name: string;
  description: string;
  url: string;
  image: string;
}

interface ResourceCategory {
  id: string;
  title: string;
  subtitle: string;
  items: ResourceItem[];
}

const CATEGORIES: ResourceCategory[] = [
  {
    id: 'italia',
    title: 'Archivos Oficiales en Italia',
    subtitle: 'Registros de estado civil unificado, censos militares y archivos eclesiásticos pre-unitarios.',
    items: [
      {
        id: 'antenati',
        name: 'Portale Antenati',
        description: 'Portal nacional de digitalización de registros de estado civil conservados en los Archivi di Stato italianos. Permite consultar actas de nacimiento, matrimonio y defunción de los períodos napoleónico (1806–1815), de la restauración (1815–1865) e italiano post-unitario (1866 en adelante).',
        url: 'https://antenati.cultura.gov.it',
        image: '/recursos/archivi_stato.jpg'
      },
      {
        id: 'indicepa',
        name: 'IndicePA',
        description: 'Buscador oficial de domicilios digitales, correos electrónicos ordinarios y casillas PEC (Posta Elettronica Certificata) de las 7.904 comunas italianas. Esencial para obtener el buzón oficial exacto del Ufficio dello Stato Civile al solicitar partidas de nacimiento.',
        url: 'https://www.indicepa.gov.it',
        image: '/recursos/agid_edificio.jpg'
      },
      {
        id: 'san',
        name: 'Sistema Archivistico Nazionale (SAN)',
        description: 'Guía unificada de fondos y censos en los Archivos de Estado provinciales. Fundamental para rastrear los registros militares de conscripción (Liste di Leva) y enrolamiento (Ruoli Matricolari), clave para ubicar la comuna de nacimiento exacta del avo varón cuando solo se conoce la provincia de partida.',
        url: 'https://san.cultura.gov.it',
        image: '/recursos/san_archivio.jpg'
      },
      {
        id: 'diocesi',
        name: 'Diocesi Italiane',
        description: 'Guía y directorio para localizar archivos parroquiales y curias episcopales en todas las diócesis de Italia. Imprescindible para antepasados nacidos antes del 1 de septiembre de 1866 (o 1871 en Roma y Véneto), donde el único registro válido es el acta de bautismo eclesiástica.',
        url: 'https://www.chiesacattolica.it/diocesi-italiane/',
        image: '/recursos/curia_diocesi.jpg'
      }
    ]
  },
  {
    id: 'uruguay',
    title: 'Organismos y Archivos en Uruguay',
    subtitle: 'Sedes registrales, certificados electorales y fondos municipales de defunción en Uruguay.',
    items: [
      {
        id: 'corte-electoral',
        name: 'Corte Electoral de Uruguay',
        description: 'Tramitación oficial del Certificado de No Ciudadano Legal (Certificado de No Naturalización). Documento legal insustituible exigido por consulados y tribunales italianos que acredita que el inmigrante no adquirió la ciudadanía legal uruguaya antes del nacimiento de sus descendientes.',
        url: 'https://www.corteelectoral.gub.uy',
        image: '/recursos/corte_electoral.jpg'
      },
      {
        id: 'dgrec',
        name: 'DGREC — Registro Civil Uruguayo',
        description: 'Solicitud de partidas digitalizadas de nacimiento, matrimonio y defunción ocurridas en Uruguay. Fundamental tramitar el Expediente Matrimonial completo: las declaraciones de los testigos con frecuencia asientan la comuna o aldea de origen natal del avo en Italia.',
        url: 'https://www.gub.uy/tramites/partidas-estado-civil',
        image: '/recursos/mec_edificio_08.jpg'
      },
      {
        id: 'cementerios-mvd',
        name: 'Intendencia de Montevideo / Cementerios',
        description: 'Registros de inhumaciones y traslados del Cementerio Central, Cementerio del Buceo, Cementerio de La Teja y del Norte. Los libros de entrada registran la edad, nacionalidad, fecha de fallecimiento y pueblo o procedencia exacta del sepultado.',
        url: 'https://montevideo.gub.uy/areas-tematicas/salud-y-cementerios/inhumaciones-y-cremaciones',
        image: '/recursos/cementerio_central.jpg'
      }
    ]
  },
  {
    id: 'genealogia-puertos',
    title: 'Bases Genealógicas y Puertos de Emigración',
    subtitle: 'Manifiestos marítimos, registros de embarque de barcos a vapor y catálogos de microfilms.',
    items: [
      {
        id: 'familysearch',
        name: 'FamilySearch (Buscador y Catálogo)',
        description: 'Acceso a la mayor base de microfilms parroquiales y comunales del mundo. Su catálogo por localidad permite inspeccionar libros completos de nacimientos, matrimonios y bautismos no indexados por nombres en los motores automáticos de búsqueda.',
        url: 'https://www.familysearch.org/search/catalog',
        image: '/recursos/familysearch_building.jpg'
      },
      {
        id: 'cisei',
        name: 'CISEI (Emigrazione Italiana)',
        description: 'Registros de pasajeros y salidas marítimas desde el puerto de Génova hacia el Río de la Plata (Montevideo y Buenos Aires). Permite comprobar el vapor de travesía, fecha de partida y comuna o provincia declarada antes de subir a bordo.',
        url: 'https://www.cisei.info',
        image: '/recursos/cisei_commenda.jpg'
      },
      {
        id: 'cemla',
        name: 'CEMLA',
        description: 'Base de arribos marítimos al Río de la Plata. Facilita la localización de la fecha de llegada, edad declarada al descender, oficio y miembros del grupo familiar que acompañaban al inmigrante al arribar a los puertos de Montevideo o Buenos Aires.',
        url: 'https://cemla.com/consulta/',
        image: '/recursos/cemla_hotel_inmigrantes.jpg'
      }
    ]
  },
  {
    id: 'legal',
    title: 'Circulares y Documentación Legal',
    subtitle: 'Marco normativo vigente y doctrina administrativa vinculante para el reconocimiento iure sanguinis.',
    items: [
      {
        id: 'circular-k28',
        name: 'Circular K.28/1991',
        description: 'Circular matriz del Ministerio del Interior italiano sobre la transmisión ininterrumpida de la ciudadanía iure sanguinis. Fija los criterios consulares y comunales sobre la prueba de no naturalización y la admisibilidad de leves discrepancias u oscilaciones ortográficas en nombres y apellidos.',
        url: 'https://dait.interno.gov.it/servizi-demografici/circolari/circolare-k28-del-8-aprile-1991',
        image: '/recursos/viminale.jpg'
      },
      {
        id: 'ley-91-1992',
        name: 'Ley 91/1992 (Legge 5 febbraio 1992, n. 91)',
        description: 'Marco normativo vigente publicado en Normattiva (Gazzetta Ufficiale) que regula la ciudadanía italiana por descendencia. Su artículo 1 consagra el derecho originario por nacimiento (iure sanguinis) sin límite de generaciones, y el artículo 7 la conservación de la nacionalidad salvo renuncia expresa.',
        url: 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:1992-02-05;91',
        image: '/recursos/montecitorio.jpg'
      }
    ]
  }
];

interface RecursosSectionProps {
  onNavigate?: (endpoint: EndpointType) => void;
}

export const RecursosSection: React.FC<RecursosSectionProps> = () => {
  const getGridCols = (count: number) => {
    if (count >= 4) return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6';
    if (count === 3) return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
    return 'grid grid-cols-1 sm:grid-cols-2 gap-6';
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

        {/* Bloques de Categorías */}
        <div className="space-y-20">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-28">
              
              {/* Cabecera de Categoría */}
              <div className="border-b border-neutral-200 pb-5 mb-8">
                <h2 className="text-2xl sm:text-3xl font-serif font-normal text-neutral-900">
                  {cat.title}
                </h2>
                <p className="text-sm text-neutral-500 font-light mt-1.5 leading-relaxed">
                  {cat.subtitle}
                </p>
              </div>

              {/* Grid de Tarjetas */}
              <div className={getGridCols(cat.items.length)}>
                {cat.items.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block border border-[#07214e]/15 bg-white overflow-hidden rounded-none hover:border-[#07214e] transition-colors flex flex-col shadow-xs"
                  >
                    <div className="aspect-[16/10] w-full overflow-hidden bg-neutral-100 border-b border-[#07214e]/15">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <h3 className="font-serif text-lg sm:text-xl text-neutral-900 group-hover:text-[#07214e] transition-colors font-medium leading-snug mb-2">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

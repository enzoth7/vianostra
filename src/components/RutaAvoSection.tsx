import React from 'react';
import type { EndpointType } from './Navbar';

interface StepLink {
  name: string;
  url: string;
}

interface StepImage {
  src: string;
  alt: string;
}

interface StepItem {
  num: string;
  title: string;
  desc: string;
  image: StepImage;
  links: StepLink[];
}

const STEPS: StepItem[] = [
  {
    num: '01',
    title: 'Recolección de Partidas en Uruguay',
    desc: 'Antes de contactar a Italia, se debe solicitar en la Dirección General de Registro de Estado Civil (DGREC) de Uruguay las partidas de defunción y matrimonio del antepasado. El expediente matrimonial y las actas de defunción de finales del s. XIX son los documentos donde los inmigrantes solían declarar su pueblo o provincia natal.',
    image: {
      src: 'https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?auto=format&fit=crop&w=1200&q=80',
      alt: 'Arquitectura clásica de Montevideo y Ciudad Vieja'
    },
    links: [
      { name: 'DGREC Trámites de Partidas', url: 'https://www.gub.uy/tramites/partidas-estado-civil' },
      { name: 'Centro de Estudios Migratorios (CEMLA)', url: 'https://cemla.com/consulta/' },
      { name: 'FamilySearch Genealogía', url: 'https://www.familysearch.org/' }
    ]
  },
  {
    num: '02',
    title: 'Certificado de No Naturalización (Corte Electoral)',
    desc: 'Es el documento legal indispensable que acredita ante el consulado o tribunal italiano que el ciudadano italiano no adquirió la ciudadanía legal uruguaya antes de tener a sus hijos. Se tramita en la sede central de la Corte Electoral de Uruguay (calle 25 de Mayo) o a través de su plataforma oficial.',
    image: {
      src: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
      alt: 'Edificio institucional histórico de corte y archivos'
    },
    links: [
      { name: 'Corte Electoral de Uruguay', url: 'https://www.corteelectoral.gub.uy' }
    ]
  },
  {
    num: '03',
    title: 'Localización del Pueblo o Parroquia en Italia',
    desc: 'Con el nombre y año aproximado, se investiga en el Portale Antenati (Ministerio de la Cultura de Italia) y FamilySearch. Si el antepasado nació antes del 1 de septiembre de 1866, no existía el registro civil municipal y el acta es un Certificato di Battesimo conservado en el archivo parroquial o diocesano.',
    image: {
      src: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
      alt: 'Pueblo italiano tradicional con iglesia y comune histórico'
    },
    links: [
      { name: 'Portale Antenati (Italia)', url: 'https://antenati.cultura.gov.it' },
      { name: 'FamilySearch Genealogía', url: 'https://www.familysearch.org' }
    ]
  },
  {
    num: '04',
    title: 'Solicitud Oficial del Extracto a la Comuna',
    desc: 'Se remite una solicitud formal escrita en italiano al Ufficio dello Stato Civile de la comuna correspondiente, requiriendo el Estratto per riassunto dell\'atto di nascita con indicación de paternidad y maternidad. Las comunas tienen la obligación legal de expedirlo gratuitamente.',
    image: {
      src: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
      alt: 'Pluma estilográfica, correspondencia formal y cartas oficiales'
    },
    links: [
      { name: 'IndicePA (Buscador oficial de PEC y correos de comunas)', url: 'https://www.indicepa.gov.it' }
    ]
  }
];

interface RutaAvoProps {
  onNavigate?: (endpoint: EndpointType) => void;
}

export const RutaAvoSection: React.FC<RutaAvoProps> = ({ onNavigate }) => {
  return (
    <section id="ruta-avo" className="py-16 md:py-24 border-b border-[#07214e]/15 bg-transparent">
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Header Principal */}
        <div className="max-w-4xl mb-12 md:mb-16 border-l-4 border-[#07214e] pl-6 md:pl-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-neutral-900 leading-tight">
            La Ruta del Avo: 4 Pasos Metódicos
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
            El método ordenado para no perder meses ni dinero en gestiones innecesarias. Primero se agota la documentación en territorio uruguayo y luego se contacta a Italia con datos firmes.
          </p>
        </div>

        {/* Flujo Abierto sin Cajas Blancas (Diagramación Zigzag) */}
        <div className="space-y-0">
          {STEPS.map((s, index) => {
            const isEvenStep = index % 2 === 1;

            return (
              <article
                key={s.num}
                className="border-b border-[#07214e]/15 py-12 md:py-16 first:pt-0 last:border-b-0"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
                  
                  {/* Imagen Fotográfica (Móvil: Arriba | Desktop: Alternado según zigzag) */}
                  <div className={`w-full md:col-span-5 ${isEvenStep ? 'md:order-2' : 'md:order-1'}`}>
                    <div className="relative overflow-hidden rounded-none border border-[#07214e]/15 bg-neutral-100 group aspect-[16/10]">
                      <img
                        src={s.image.src}
                        alt={s.image.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>

                  {/* Bloque Editorial de Texto */}
                  <div className={`w-full md:col-span-7 space-y-4 ${isEvenStep ? 'md:order-1' : 'md:order-2'}`}>
                    <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900 leading-snug font-normal">
                      {s.title}
                    </h3>

                    <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                      {s.desc}
                    </p>

                    {s.links.length > 0 && (
                      <div className="pt-3 border-t border-[#07214e]/10 space-y-2">
                        <span className="block font-mono text-xs text-neutral-400">
                          Recursos:
                        </span>
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                          {s.links.map((link, idx) => (
                            <a
                              key={idx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline underline-offset-4 text-[#07214e] font-mono text-xs"
                            >
                              {link.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </article>
            );
          })}
        </div>

        {/* Acceso Directo / CTA */}
        <div className="mt-12 pt-8 border-t border-[#07214e]/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-sm sm:text-base text-neutral-600 font-light">
            ¿Identificaste el municipio italiano de tu antepasado? Generá el pedido oficial del acta.
          </div>
          <a
            href="/carta-comuna"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('carta-comuna');
              }
            }}
            className="rounded-none px-8 py-3.5 bg-[#07214e] hover:bg-[#07214e]/90 text-white text-xs font-medium tracking-wide transition-colors cursor-pointer text-center"
          >
            Redactar Carta a la Comuna
          </a>
        </div>

      </div>
    </section>
  );
};

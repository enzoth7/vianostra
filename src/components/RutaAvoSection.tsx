import React from 'react';
import type { EndpointType } from './Navbar';

const STEPS = [
  {
    num: '01',
    accent: 'border-l-[#07214e]',
    title: 'Recolección de Partidas en Uruguay',
    desc: 'Antes de contactar a Italia, se debe solicitar en la Dirección General de Registro de Estado Civil (DGREC) de Uruguay las partidas de defunción y matrimonio del antepasado. El expediente matrimonial y las actas de defunción de finales del s. XIX son los documentos donde los inmigrantes solían declarar su pueblo o provincia natal.',
    links: [
      { name: 'DGREC Trámites de Partidas', url: 'https://www.gub.uy/tramites/partidas-estado-civil' },
      { name: 'Centro de Estudios Migratorios (CEMLA)', url: 'https://cemla.com/consulta/' }
    ]
  },
  {
    num: '02',
    accent: 'border-l-[#07214e]',
    title: 'Certificado de No Naturalización (Corte Electoral)',
    desc: 'Es el documento legal indispensable que acredita ante el consulado o tribunal italiano que el ciudadano italiano no adquirió la ciudadanía legal uruguaya antes de tener a sus hijos. Se tramita en la sede central de la Corte Electoral de Uruguay (calle 25 de Mayo) o a través de su plataforma oficial.',
    links: [
      { name: 'Corte Electoral de Uruguay', url: 'https://www.corteelectoral.gub.uy' }
    ]
  },
  {
    num: '03',
    accent: 'border-l-[#076525]',
    title: 'Localización del Pueblo o Parroquia en Italia',
    desc: 'Con el nombre y año aproximado, se investiga en el Portale Antenati (Ministerio de la Cultura de Italia) y FamilySearch. Si el antepasado nació antes del 1 de septiembre de 1866, no existía el registro civil municipal y el acta es un Certificato di Battesimo conservado en el archivo parroquial o diocesano.',
    links: [
      { name: 'Portale Antenati (Italia)', url: 'https://antenati.cultura.gov.it' },
      { name: 'FamilySearch Genealogía', url: 'https://www.familysearch.org' }
    ]
  },
  {
    num: '04',
    accent: 'border-l-[#076525]',
    title: 'Solicitud Oficial del Extracto a la Comuna',
    desc: 'Se remite una solicitud formal escrita en italiano al Ufficio dello Stato Civile de la comuna correspondiente, requiriendo el Estratto per riassunto dell\'atto di nascita con indicación de paternidad y maternidad. Las comunas tienen la obligación legal de expedirlo gratuitamente.',
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
        
        <div className="max-w-4xl mb-16 border-l-4 border-[#07214e] pl-6 md:pl-8">
          <h2 className="text-3xl sm:text-4xl font-normal text-neutral-900 leading-tight">
            La Ruta del Avo: 4 Pasos Metódicos
          </h2>
          <div className="mt-4 text-base text-neutral-600 font-light leading-relaxed">
            El método ordenado para no perder meses ni dinero en gestiones innecesarias. Primero se agota la documentación en territorio uruguayo y luego se contacta a Italia con datos firmes.
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-12">
          {STEPS.map((s) => (
            <div key={s.num} className={`rounded-lg border border-[#07214e]/15 border-l-4 ${s.accent} bg-white p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6`}>
              <div className="md:col-span-2 text-xs font-mono text-neutral-400">
                Paso {s.num}
              </div>
              <div className="md:col-span-6 space-y-2">
                <h3 className="text-xl font-serif text-neutral-900 font-normal">
                  {s.title}
                </h3>
                <div className="text-sm text-neutral-600 font-light leading-relaxed">
                  {s.desc}
                </div>
              </div>
              <div className="md:col-span-4 space-y-2 text-xs font-mono">
                <div className="text-neutral-400">Recursos:</div>
                <div className="space-y-1">
                  {s.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-neutral-800 hover:underline underline-offset-4"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-neutral-600 font-light">
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
            className="rounded-md px-6 py-2.5 bg-[#07214e] hover:bg-[#07214e]/90 text-white text-xs font-medium tracking-wide transition-colors cursor-pointer"
          >
            Redactar Carta a la Comuna
          </a>
        </div>

      </div>
    </section>
  );
};

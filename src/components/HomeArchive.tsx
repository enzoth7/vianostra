import React from 'react';
import { Archive, BookOpen, Search } from 'lucide-react';
import type { EndpointType } from './Navbar';
import { VideoCarousel } from './VideoCarousel';

interface HomeArchiveProps {
  onNavigate: (endpoint: EndpointType) => void;
}

interface StartPoint {
  title: string;
  description: string;
  endpoint: EndpointType;
  icon: React.ComponentType<{ className?: string }>;
  bgClass: string;
  titleClass: string;
  descClass: string;
  iconClass: string;
}

const START_POINTS: StartPoint[] = [
  {
    title: 'Reconstruí la línea familiar',
    description: 'Ordená nombres, fechas y lugares antes de pedir una sola partida.',
    endpoint: 'mi-arbol',
    icon: BookOpen,
    bgClass: 'bg-[#076525]',
    titleClass: 'text-white',
    descClass: 'text-white/85',
    iconClass: 'border-white/30 text-white group-hover:bg-white group-hover:text-[#076525]',
  },
  {
    title: 'Encontrá el lugar de origen',
    description: 'Seguí una ruta documental entre archivos uruguayos e italianos.',
    endpoint: 'ruta-avo',
    icon: Search,
    bgClass: 'bg-white',
    titleClass: 'text-[#07214e]',
    descClass: 'text-[#525252]',
    iconClass: 'border-[#07214e]/20 text-[#07214e] group-hover:bg-[#07214e] group-hover:text-white',
  },
  {
    title: 'Consultá las fuentes',
    description: 'Accedé a registros, portales y organismos sin intermediarios.',
    endpoint: 'recursos',
    icon: Archive,
    bgClass: 'bg-[#D20911]',
    titleClass: 'text-white',
    descClass: 'text-white/85',
    iconClass: 'border-white/30 text-white group-hover:bg-white group-hover:text-[#D20911]',
  },
];

export const HomeArchive: React.FC<HomeArchiveProps> = ({ onNavigate }) => {
  const handleNav = (event: React.MouseEvent<HTMLAnchorElement>, endpoint: EndpointType) => {
    event.preventDefault();
    onNavigate(endpoint);
  };

  return (
    <>
      <section className="bg-[#07214e] text-white border-b border-white/15">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 py-14 md:py-20 grid lg:grid-cols-[1.45fr_0.55fr] gap-12 lg:gap-20">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.08] max-w-4xl">
              Un archivo abierto sobre genealogía italiana, hecho desde la experiencia uruguaya.
            </h2>
          </div>
          <div className="lg:border-l lg:border-white/20 lg:pl-10 self-end">
            <p className="text-sm md:text-base text-white/75 font-light leading-7">
              Via Nostra reúne investigación, métodos de búsqueda y material audiovisual producido por Enzo. El proyecto se actualiza sin una frecuencia fija: importa más preservar el trabajo y documentar bien cada hallazgo.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F1EFE9] border-b border-[#07214e]/15" aria-labelledby="cuaderno-audiovisual">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 md:mb-14">
            <div className="max-w-3xl">
              <h2 id="cuaderno-audiovisual" className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#07214e] leading-tight">
                Genealogía explicada en pocos minutos
              </h2>
              <p className="mt-4 max-w-2xl text-sm md:text-base text-[#525252] font-light leading-7">
                Videos breves sobre partidas, apellidos, archivos y decisiones prácticas. Las piezas grabadas antes de los cambios legales se conservan como material de archivo y se identifican cuando requieren revisión.
              </p>
            </div>
            <a
              href="/videos"
              onClick={(event) => handleNav(event, 'videos')}
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#07214e] px-6 py-3 text-xs font-medium uppercase tracking-wider text-[#07214e] hover:bg-[#07214e] hover:text-white transition-colors self-start lg:self-auto"
            >
              Ver toda la videoteca
            </a>
          </div>

          <VideoCarousel />
        </div>
      </section>

      <section className="bg-[#FBFBFA] border-b border-[#07214e]/15" aria-labelledby="punto-partida">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-10 lg:gap-20">
            <div>
              <h2 id="punto-partida" className="font-serif text-3xl md:text-4xl text-[#07214e] leading-tight">Un punto de partida, aunque hoy no hagas el trámite.</h2>
              <p className="mt-4 text-sm md:text-base text-[#525252] font-light leading-7 max-w-xl">
                Investigar una familia también sirve para recuperar nombres, pueblos y relatos. El valor del archivo no depende de que la ciudadanía termine en un pasaporte.
              </p>
            </div>

            <div className="border border-[#07214e]/15 divide-y divide-[#07214e]/15 overflow-hidden rounded-sm shadow-sm">
              {START_POINTS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.endpoint}
                    href={`/${item.endpoint}`}
                    onClick={(event) => handleNav(event, item.endpoint)}
                    className={`group flex items-center justify-between gap-4 md:gap-6 px-6 md:px-8 py-6 md:py-7 transition-all ${item.bgClass}`}
                  >
                    <div>
                      <h3 className={`font-serif text-xl md:text-2xl leading-snug ${item.titleClass}`}>
                        {item.title}
                      </h3>
                      <p className={`text-xs md:text-sm font-light leading-relaxed mt-1 ${item.descClass}`}>
                        {item.description}
                      </p>
                    </div>
                    <span className={`w-11 h-11 rounded-md border flex items-center justify-center shrink-0 transition-colors ${item.iconClass}`}>
                      <Icon className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

import React from 'react';
import { Archive, ArrowUpRight, BookOpen, Clock3, Play, Search } from 'lucide-react';
import type { EndpointType } from './Navbar';

interface HomeArchiveProps {
  onNavigate: (endpoint: EndpointType) => void;
}

interface HomeVideo {
  id: string;
  number: string;
  title: string;
  duration: string;
  status: 'Publicado' | 'En edición';
  videoUrl?: string;
}

const HOME_VIDEOS: HomeVideo[] = [
  {
    id: 'guia-cero',
    number: '01',
    title: 'Ciudadanía italiana: guía paso a paso desde cero',
    duration: '1:34',
    status: 'Publicado',
    videoUrl: 'https://www.youtube.com/watch?v=uh3R1tiv_Xk',
  },
  {
    id: 'sin-gestores',
    number: '02',
    title: 'El paso a paso desde Uruguay, sin gestores',
    duration: '0:19',
    status: 'En edición',
  },
  {
    id: 'apellido',
    number: '03',
    title: '¿Tu apellido suena italiano? La primera pista',
    duration: '0:27',
    status: 'En edición',
  },
  {
    id: 'costos',
    number: '04',
    title: 'Ciudadanía y costos: Uruguay frente a Italia',
    duration: '0:23',
    status: 'En edición',
  },
];

const START_POINTS: Array<{
  number: string;
  title: string;
  description: string;
  endpoint: EndpointType;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    number: '01',
    title: 'Reconstruí la línea familiar',
    description: 'Ordená nombres, fechas y lugares antes de pedir una sola partida.',
    endpoint: 'mi-arbol',
    icon: BookOpen,
  },
  {
    number: '02',
    title: 'Encontrá el lugar de origen',
    description: 'Seguí una ruta documental entre archivos uruguayos e italianos.',
    endpoint: 'ruta-avo',
    icon: Search,
  },
  {
    number: '03',
    title: 'Consultá las fuentes',
    description: 'Accedé a registros, portales y organismos sin intermediarios.',
    endpoint: 'recursos',
    icon: Archive,
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
            <div className="mt-6 pt-5 border-t border-white/15 grid grid-cols-2 gap-5 font-mono text-[11px] uppercase tracking-wider text-white/55">
              <span>Montevideo, Uruguay</span>
              <span>Uruguay ↔ Italia</span>
            </div>
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
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[#07214e] px-6 py-3 text-xs font-medium uppercase tracking-wider text-[#07214e] hover:bg-[#07214e] hover:text-white transition-colors self-start lg:self-auto"
            >
              Ver toda la videoteca
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-7">
            {HOME_VIDEOS.map((video) => (
              <article key={video.id} className="min-w-0">
                <div className="aspect-[9/16] rounded-lg border border-[#07214e]/15 bg-white overflow-hidden relative">
                  {video.videoUrl ? (
                    <a
                      href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver video: ${video.title}`}
                      className="absolute inset-0 bg-[#07214e] text-white flex flex-col justify-between p-4 md:p-6 hover:bg-[#07214e] transition-colors"
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-white/55">
                        <span>Via Nostra</span>
                        <span>{video.number}</span>
                      </div>
                      <div>
                        <span className="w-11 h-11 rounded-md bg-[#D20911] flex items-center justify-center mb-4">
                          <Play className="w-5 h-5 fill-white stroke-white" aria-hidden="true" />
                        </span>
                        <div className="h-px bg-white/25 mb-4" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">Ver en YouTube</span>
                      </div>
                    </a>
                  ) : (
                    <div className="absolute inset-0 bg-[#07214e] text-white flex flex-col justify-between p-4 md:p-6">
                      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-white/55">
                        <span>Via Nostra</span>
                        <span>{video.number}</span>
                      </div>
                      <div>
                        <Play className="w-8 h-8 md:w-10 md:h-10 stroke-[1.25] mb-4 text-white/85" aria-hidden="true" />
                        <div className="h-px bg-white/25 mb-4" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">Próxima pieza</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex items-center justify-between gap-3 font-mono text-[10px] md:text-[11px] uppercase tracking-wider text-[#525252]">
                  <span className={video.status === 'Publicado' ? 'text-[#076525]' : ''}>{video.status}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock3 className="w-3 h-3" aria-hidden="true" />{video.duration}</span>
                </div>
                <h3 className="mt-2 font-serif text-lg md:text-xl leading-snug text-[#07214e]">{video.title}</h3>
              </article>
            ))}
          </div>
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

            <div className="border-t border-[#07214e]/20">
              {START_POINTS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.number}
                    href={`/${item.endpoint}`}
                    onClick={(event) => handleNav(event, item.endpoint)}
                    className="group grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-[4rem_1fr_auto] gap-3 md:gap-6 items-center border-b border-[#07214e]/20 py-6 md:py-8 hover:bg-white transition-colors"
                  >
                    <span className="font-mono text-xs text-[#07214e]/45">{item.number}</span>
                    <span>
                      <span className="block font-serif text-xl md:text-2xl text-[#07214e]">{item.title}</span>
                      <span className="block mt-1 text-xs md:text-sm text-[#525252] font-light leading-6">{item.description}</span>
                    </span>
                    <span className="w-11 h-11 rounded-md border border-[#07214e]/25 flex items-center justify-center text-[#07214e] group-hover:bg-[#07214e] group-hover:text-white transition-colors">
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

import React from 'react';
import { ArrowUpRight, Clock3, Play } from 'lucide-react';

interface VideoItem {
  id: string;
  number: string;
  title: string;
  description: string;
  duration: string;
  recorded: string;
  status: 'Publicado' | 'En edición';
  videoUrl?: string;
  topics: string[];
}

const VIDEOS: VideoItem[] = [
  {
    id: 'guia-cero',
    number: '01',
    title: 'Ciudadanía italiana: guía paso a paso desde cero',
    description: 'El mapa general del proceso: reconstruir la línea, localizar el nacimiento italiano y ordenar las partidas antes de tomar decisiones.',
    duration: '1:34',
    recorded: 'Archivo 2024',
    status: 'Publicado',
    videoUrl: 'https://www.youtube.com/watch?v=uh3R1tiv_Xk',
    topics: ['Línea familiar', 'Partidas', 'Comuna'],
  },
  {
    id: 'sin-gestores',
    number: '02',
    title: 'El paso a paso desde Uruguay, sin gestores',
    description: 'Qué podés investigar por tu cuenta y cómo evitar gastos antes de saber si la documentación básica existe.',
    duration: '0:19',
    recorded: 'Archivo 2024',
    status: 'En edición',
    topics: ['Uruguay', 'Método', 'Primeros pasos'],
  },
  {
    id: 'apellido',
    number: '03',
    title: '¿Tu apellido suena italiano? La primera pista',
    description: 'Cómo usar la distribución de un apellido como indicio sin confundir una pista genealógica con una prueba documental.',
    duration: '0:27',
    recorded: 'Archivo 2024',
    status: 'En edición',
    topics: ['Apellidos', 'Origen', 'Fuentes'],
  },
  {
    id: 'costos',
    number: '04',
    title: 'Ciudadanía y costos: Uruguay frente a Italia',
    description: 'Una comparación breve de los gastos que intervenían en cada vía al momento de grabar el material.',
    duration: '0:23',
    recorded: 'Archivo 2024 · revisar vigencia',
    status: 'En edición',
    topics: ['Costos', 'Uruguay', 'Italia'],
  },
  {
    id: 'expediente-matrimonial',
    number: '05',
    title: 'La pista escondida en el expediente matrimonial',
    description: 'Por qué el expediente completo puede revelar el pueblo italiano cuando la partida simple solo dice “Italia”.',
    duration: '1:45',
    recorded: 'Archivo 2024',
    status: 'En edición',
    topics: ['DGREC', 'Matrimonios', 'Testigos'],
  },
  {
    id: 'antenati',
    number: '06',
    title: 'Cómo buscar en Antenati sin saber la comuna',
    description: 'Una estrategia de búsqueda por provincia, apellido y series documentales para reducir el universo de resultados.',
    duration: '2:15',
    recorded: 'Archivo 2024 · revisar interfaz',
    status: 'En edición',
    topics: ['Antenati', 'Archivos italianos', 'Comuna'],
  },
];

export const VideosSection: React.FC = () => {
  return (
    <section id="videos" className="border-b border-[#07214e]/15 bg-[#F1EFE9]">
      <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12 pt-10 pb-20 md:pt-16 md:pb-28">
        <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-10 lg:gap-20 items-end pb-12 md:pb-16 border-b border-[#07214e]/20 border-l-4 border-l-[#07214e] pl-6 md:pl-8">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#07214e] leading-[1.02]">Videos breves para investigar mejor.</h1>
            <p className="mt-6 max-w-3xl text-base md:text-lg text-[#525252] font-light leading-8">
              Apuntes de entre 1:30 y 3 minutos sobre búsquedas, partidas y errores frecuentes. El canal se completa a medida que termina la edición del material original.
            </p>
          </div>

          <aside className="border-l-2 border-[#D20911] pl-6 py-1">
            <div className="font-mono text-[11px] uppercase tracking-wider text-[#07214e] mb-2">Criterio editorial</div>
            <p className="text-sm text-[#525252] leading-6 font-light">
              Algunas piezas fueron grabadas en 2024. Los métodos de búsqueda siguen siendo útiles; los datos jurídicos, costos e interfaces se marcan cuando pueden haber cambiado.
            </p>
          </aside>
        </div>

        <div className="mt-10 md:mt-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#525252]">06 piezas · publicación gradual</p>
          <a
            href="https://www.youtube.com/@ViaNostraBo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#D20911] px-5 py-3 text-xs font-medium uppercase tracking-wider text-white hover:bg-[#ad0710] transition-colors self-start sm:self-auto"
          >
            <Play className="w-4 h-4" aria-hidden="true" />
            Abrir canal de YouTube
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-y-16">
          {VIDEOS.map((video) => (
            <article key={video.id} className="min-w-0">
              <div className="aspect-[9/16] max-h-[620px] rounded-lg border border-[#07214e]/15 bg-white overflow-hidden relative">
                {video.videoUrl ? (
                  <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver video: ${video.title}`}
                    className="absolute inset-0 bg-[#07214e] text-white flex flex-col justify-between p-6 md:p-8 hover:bg-[#07214e] transition-colors"
                  >
                    <div className="flex items-start justify-between border-b border-white/20 pb-5">
                      <span className="font-serif text-xl">Via Nostra</span>
                      <span className="font-mono text-xs text-white/55">{video.number}</span>
                    </div>
                    <div>
                      <span className="w-14 h-14 rounded-md bg-[#D20911] flex items-center justify-center">
                        <Play className="w-6 h-6 fill-white stroke-white" aria-hidden="true" />
                      </span>
                      <div className="mt-6 mb-5 h-px bg-white/25" />
                      <p className="font-serif text-2xl md:text-3xl leading-tight max-w-xs">{video.title}</p>
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">Publicado · ver en YouTube</div>
                  </a>
                ) : (
                  <div className="absolute inset-0 bg-[#07214e] text-white flex flex-col justify-between p-6 md:p-8">
                    <div className="flex items-start justify-between border-b border-white/20 pb-5">
                      <span className="font-serif text-xl">Via Nostra</span>
                      <span className="font-mono text-xs text-white/55">{video.number}</span>
                    </div>
                    <div>
                      <Play className="w-11 h-11 stroke-[1.15] text-white/85" aria-hidden="true" />
                      <div className="mt-6 mb-5 h-px bg-white/25" />
                      <p className="font-serif text-2xl md:text-3xl leading-tight max-w-xs">{video.title}</p>
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">En proceso de edición</div>
                  </div>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-wider">
                <span className={video.status === 'Publicado' ? 'text-[#076525]' : 'text-[#525252]'}>{video.status}</span>
                <span className="inline-flex items-center gap-1.5 text-[#525252]"><Clock3 className="w-3 h-3" aria-hidden="true" />{video.duration}</span>
              </div>
              <h2 className="mt-2 font-serif text-2xl text-[#07214e] leading-tight">{video.title}</h2>
              <p className="mt-3 text-sm text-[#525252] font-light leading-6">{video.description}</p>
              <div className="mt-5 pt-4 border-t border-[#07214e]/15 font-mono text-[10px] uppercase tracking-wider text-[#07214e]/55">
                <div>{video.recorded}</div>
                <div className="mt-2 normal-case tracking-normal leading-5">{video.topics.join(' · ')}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

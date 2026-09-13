import { Play } from 'lucide-react';

interface VideoItem {
  id: string;
  number: string;
  title: string;
  description: string;
  duration: string;
  recorded: string;
  status: 'Publicado' | 'En edición';
  videoId?: string;
  topics: string[];
}

const VIDEOS: VideoItem[] = [
  {
    id: 'sin-gestores',
    number: '01',
    title: 'Ciudadanía italiana para uruguayos sin gestor',
    description: 'Qué podés investigar por tu cuenta y cómo evitar gastos antes de saber si la documentación básica existe.',
    duration: 'Short',
    recorded: 'Publicado · 2025',
    status: 'Publicado',
    videoId: 'ir3WJ1JJnGk',
    topics: ['Uruguay', 'Método', 'Primeros pasos'],
  },
  {
    id: 'apellido',
    number: '02',
    title: '¿Cómo saber si tu apellido es italiano?',
    description: 'Cómo usar la distribución de un apellido como indicio sin confundir una pista genealógica con una prueba documental.',
    duration: 'Short',
    recorded: 'Publicado · 2025',
    status: 'Publicado',
    videoId: 'xHpkHWpSghI',
    topics: ['Apellidos', 'Origen', 'Fuentes'],
  },
  {
    id: 'costos',
    number: '03',
    title: '¿Cuánto cuesta la ciudadanía italiana?',
    description: 'Una comparación breve de los gastos que intervenían en cada vía al momento de grabar el material.',
    duration: 'Short',
    recorded: 'Publicado · 2025',
    status: 'Publicado',
    videoId: 'cSHWaGQjqHU',
    topics: ['Costos', 'Uruguay', 'Italia'],
  },
  {
    id: 'empezar-sin-gestor',
    number: '04',
    title: 'Cómo empezar tu ciudadanía italiana sin gestor',
    description: 'El mapa general del proceso: reconstruir la línea, localizar el nacimiento italiano y ordenar las partidas antes de tomar decisiones.',
    duration: 'Short',
    recorded: 'Publicado · 2026',
    status: 'Publicado',
    videoId: 'MFOIDY931F0',
    topics: ['Línea familiar', 'Partidas', 'Comuna'],
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
            href="https://www.youtube.com/@vianostrauy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#D20911] px-5 py-3 text-xs font-medium uppercase tracking-wider text-white hover:bg-[#ad0710] transition-colors self-start sm:self-auto"
          >
            <Play className="w-4 h-4" aria-hidden="true" />
            Abrir canal de YouTube
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-y-16">
          {VIDEOS.map((video) => (
            <article key={video.id} className="min-w-0">
              <div className="aspect-[9/16] max-h-[620px] rounded-lg border border-[#07214e]/15 bg-black overflow-hidden relative shadow-sm">
                {video.videoId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#07214e] text-white flex flex-col justify-between p-6 md:p-8">
                    <div className="border-b border-white/20 pb-5">
                      <span className="font-serif text-xl">Via Nostra</span>
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

              <h2 className="mt-3 font-serif text-xl md:text-2xl text-[#07214e] leading-snug">{video.title}</h2>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

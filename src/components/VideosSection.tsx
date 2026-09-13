import React from 'react';
import { Play } from 'lucide-react';
import { VIDEOS } from '../data/videos';

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

          <aside className="border-l-2 border-[#D20911] pl-6 py-1 flex flex-col items-start">
            <p className="text-sm text-[#525252] leading-6 font-light">
              Algunas piezas fueron grabadas en 2024. Los métodos de búsqueda siguen siendo útiles; los datos jurídicos, costos e interfaces se marcan cuando pueden haber cambiado.
            </p>
            <a
              href="https://www.youtube.com/@vianostrauy"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#D20911] px-5 py-3 text-xs font-medium uppercase tracking-wider text-white hover:bg-[#ad0710] transition-colors"
            >
              <Play className="w-4 h-4" aria-hidden="true" />
              Abrir canal de YouTube
            </a>
          </aside>
        </div>

        <div className="mt-12 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-y-16">
          {VIDEOS.map((video) => (
            <article key={video.id} className="min-w-0">
              <div className="aspect-[9/16] rounded-lg border border-[#07214e]/15 bg-black overflow-hidden relative shadow-sm">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              <h2 className="mt-3 font-serif text-xl md:text-2xl text-[#07214e] leading-snug">{video.title}</h2>
              <p className="mt-2 text-sm text-[#525252] font-light leading-relaxed">{video.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

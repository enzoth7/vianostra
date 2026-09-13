import React, { useState } from 'react';
import { VIDEO_EPISODES } from '../data/videoEpisodes';
import type { VideoEpisode } from '../types';
import { Play, MapPin, Clock, CheckCircle, FileText, ChevronRight, X, Sparkles, ExternalLink, Video } from 'lucide-react';

export const BitacoraNiza: React.FC = () => {
  const [selectedEpisode, setSelectedEpisode] = useState<VideoEpisode>(VIDEO_EPISODES[0]);
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [modalEpisode, setModalEpisode] = useState<VideoEpisode | null>(null);
  const [isPlayingSimulated, setIsPlayingSimulated] = useState<boolean>(false);

  const categories = [
    { id: 'todos', label: 'Todos los Capítulos' },
    { id: 'italia', label: 'En Terreno (Italia/Niza)' },
    { id: 'uruguay', label: 'Archivos en Uruguay' },
    { id: 'genealogia', label: 'Archivos Diocesanos' },
    { id: 'estrategia', label: 'Criterios Legales' },
  ];

  const filteredEpisodes = activeCategory === 'todos'
    ? VIDEO_EPISODES
    : VIDEO_EPISODES.filter(ep => ep.category === activeCategory);

  return (
    <section id="bitacora" className="py-20 bg-[#0A192F] text-[#FAF9F6] border-b border-[#1E293B] relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D97706]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#15803D]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E293B] border border-[#D97706]/40 text-[#F59E0B] text-xs font-mono mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Bitácora Audiovisual • Niza, Costa Azul</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF9F6]">
            Bitácora desde Niza
          </h2>

          <p className="text-base text-[#94A3B8] mt-3 leading-relaxed">
            Desde el sur de Francia y a escasos kilómetros de la frontera ligur en Ventimiglia. Enzo documenta el proceso de rastreo, los archivos parroquiales olvidados y la estrategia real para no tropezar con la burocracia.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-[#D97706] text-[#0A192F] font-bold'
                    : 'bg-[#1E293B] text-[#CBD5E1] hover:bg-[#334155]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Hub Grid: Big Player on Left, Playlist on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Featured Video / Player representation (Col 7) */}
          <div className="lg:col-span-7 bg-[#132746] rounded-2xl border border-[#334155] p-6 shadow-2xl space-y-6">
            
            {/* Screen / Video Frame */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-[#1E293B] group shadow-inner">
              <img
                src={selectedEpisode.coverImage}
                alt={selectedEpisode.title}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isPlayingSimulated ? 'scale-105 opacity-90' : 'group-hover:scale-105 opacity-75'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Badges on video frame */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-2.5 py-1 rounded bg-[#0A192F]/80 backdrop-blur-md text-[#F59E0B] text-[11px] font-mono font-bold border border-[#D97706]/40">
                  Capítulo 0{selectedEpisode.episodeNumber}
                </span>
                <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-[#FAF9F6] text-[11px] font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#38BDF8]" /> {selectedEpisode.duration}
                </span>
              </div>

              <div className="absolute top-4 right-4">
                <span className="px-2.5 py-1 rounded-full bg-[#15803D]/90 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  En Terreno
                </span>
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlayingSimulated(!isPlayingSimulated)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#D97706] hover:bg-[#B45309] text-[#0A192F] hover:text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110"
                  aria-label="Reproducir episodio"
                >
                  <Play className={`w-8 h-8 ${isPlayingSimulated ? 'animate-pulse' : 'ml-1'}`} />
                </button>
              </div>

              {/* Bottom bar of video */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#CBD5E1]">
                <span className="flex items-center gap-1.5 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                  {selectedEpisode.location}
                </span>
                <span className="font-mono text-[11px] text-[#94A3B8]">
                  {selectedEpisode.date}
                </span>
              </div>
            </div>

            {/* Episode Meta & Summary */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF9F6]">
                  {selectedEpisode.title}
                </h3>
                <button
                  onClick={() => setModalEpisode(selectedEpisode)}
                  className="inline-flex items-center gap-1 text-xs font-mono text-[#F59E0B] hover:text-[#FBBF24] underline underline-offset-4"
                >
                  <span>Ver notas completas y marcas de tiempo</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-sm text-[#38BDF8] font-mono">
                {selectedEpisode.subtitle}
              </p>

              <p className="text-sm text-[#CBD5E1] leading-relaxed">
                {selectedEpisode.summary}
              </p>

              {/* YouTube & TikTok Platforms Links */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {selectedEpisode.youtubeUrl && (
                  <a
                    href={selectedEpisode.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold transition-all shadow-md hover:scale-105"
                  >
                    <Video className="w-4 h-4" />
                    <span>Ver Masterclass en YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                )}
                {selectedEpisode.tiktokUrl && (
                  <a
                    href={selectedEpisode.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#000000] hover:bg-[#111827] text-white border border-[#38BDF8]/40 hover:border-[#F43F5E] text-xs font-bold transition-all shadow-md hover:scale-105"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-pulse"></span>
                    <span>Ver Tip Rápido en TikTok</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                )}
                <button
                  onClick={() => setIsPlayingSimulated(!isPlayingSimulated)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1E293B] hover:bg-[#334155] text-[#FAF9F6] border border-[#475569] text-xs font-semibold transition-all"
                >
                  <Play className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Previsualizar en la web</span>
                </button>
              </div>

              {/* Key Takeaways Preview */}
              <div className="p-4 rounded-xl bg-[#0A192F]/80 border border-[#1E293B] space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D97706] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Conclusiones clave del episodio:
                </span>
                <ul className="space-y-1.5">
                  {selectedEpisode.keyTakeaways.slice(0, 2).map((takeaway, i) => (
                    <li key={i} className="text-xs text-[#E2E8F0] flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#15803D] shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Topics tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedEpisode.topics.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-[#1E293B] text-[11px] font-mono text-[#94A3B8] border border-[#334155]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Playlist / Episode Selector Column (Col 5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#1E293B]">
              <span className="font-serif text-lg font-bold text-[#FAF9F6]">
                Lista de Capítulos ({filteredEpisodes.length})
              </span>
              <span className="text-xs font-mono text-[#94A3B8]">
                Temporada 1
              </span>
            </div>

            <div className="space-y-3">
              {filteredEpisodes.map((ep) => {
                const isSelected = selectedEpisode.id === ep.id;
                return (
                  <div
                    key={ep.id}
                    onClick={() => {
                      setSelectedEpisode(ep);
                      setIsPlayingSimulated(false);
                    }}
                    className={`cursor-pointer rounded-xl p-4 transition-all duration-200 border ${
                      isSelected
                        ? 'bg-[#1E3A5F]/60 border-[#D97706] shadow-lg translate-x-1'
                        : 'bg-[#132746]/50 border-[#1E293B] hover:bg-[#132746] hover:border-[#334155]'
                    }`}
                  >
                    <div className="flex gap-4">
                      {/* Thumbnail with overlay */}
                      <div className="relative w-24 sm:w-28 aspect-video rounded-lg overflow-hidden shrink-0 bg-black">
                        <img
                          src={ep.coverImage}
                          alt={ep.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play className={`w-5 h-5 ${isSelected ? 'text-[#F59E0B]' : 'text-white'}`} />
                        </div>
                        <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/80 text-[9px] font-mono text-white">
                          {ep.duration}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex flex-col justify-between flex-1 min-w-0">
                        <div>
                          <div className="flex items-center justify-between gap-1 text-[11px] font-mono text-[#D97706] mb-1">
                            <span>Episodio 0{ep.episodeNumber}</span>
                            <span className="text-[#94A3B8]">{ep.date}</span>
                          </div>
                          <h4 className={`text-sm font-semibold truncate ${isSelected ? 'text-[#FAF9F6]' : 'text-[#CBD5E1]'}`}>
                            {ep.title}
                          </h4>
                          <p className="text-xs text-[#94A3B8] line-clamp-1 mt-0.5">
                            {ep.subtitle}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 text-[10px] font-mono text-[#64748B]">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#38BDF8]" />
                            {ep.location.split(',')[0]}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalEpisode(ep);
                            }}
                            className="text-[#D97706] hover:underline"
                          >
                            Detalles
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Exploration Banner */}
            <div className="p-4 rounded-xl bg-[#1E293B]/70 border border-[#334155] text-xs space-y-2">
              <span className="font-serif font-bold text-[#FAF9F6] block">
                ¿Buscás un pueblo en particular?
              </span>
              <p className="text-[#94A3B8]">
                En los próximos episodios Enzo recorrerá Génova, Novi Ligure y las comunas de Campania. Podés armar tu carta formal para pedir el extracto directamente a la comuna abajo.
              </p>
              <a
                href="#solicitud"
                className="inline-flex items-center gap-1.5 text-[#F59E0B] font-semibold hover:underline pt-1"
              >
                <span>Ir al Generador de Solicitud</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* Episode Details Modal */}
      {modalEpisode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0A192F] border border-[#334155] rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto text-[#FAF9F6] shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#1E293B] pb-4">
              <div>
                <span className="text-xs font-mono text-[#D97706] font-bold">
                  Episodio 0{modalEpisode.episodeNumber} • {modalEpisode.location}
                </span>
                <h3 className="font-serif text-2xl font-bold mt-1 text-[#FAF9F6]">
                  {modalEpisode.title}
                </h3>
              </div>
              <button
                onClick={() => setModalEpisode(null)}
                className="p-1 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1E293B]"
                aria-label="Cerrar modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-sm text-[#CBD5E1]">
              <p className="font-mono text-xs text-[#38BDF8]">
                {modalEpisode.subtitle}
              </p>
              <p className="leading-relaxed">
                {modalEpisode.summary}
              </p>

              <div className="p-4 rounded-xl bg-[#132746] border border-[#1E293B] space-y-3">
                <span className="font-mono font-bold text-xs uppercase text-[#F59E0B] block">
                  Puntos Clave y Consejos Prácticos:
                </span>
                <ul className="space-y-2">
                  {modalEpisode.keyTakeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#E2E8F0]">
                      <CheckCircle className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {modalEpisode.documentsMentioned && (
                <div>
                  <span className="font-mono text-xs uppercase text-[#94A3B8] block mb-2">
                    Documentos e instituciones citadas:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {modalEpisode.documentsMentioned.map((doc, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-[#1E293B] text-xs font-medium text-[#FAF9F6] border border-[#334155] flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#D97706]" />
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-[#1E293B] flex justify-end gap-3">
              <button
                onClick={() => {
                  setSelectedEpisode(modalEpisode);
                  setModalEpisode(null);
                  setIsPlayingSimulated(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#D97706] text-[#0A192F] font-bold text-xs uppercase tracking-wider hover:bg-[#B45309] transition-colors"
              >
                Cargar en el Reproductor
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

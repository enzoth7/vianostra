import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export interface ActualidadGalleryItem {
  image: string;
  title: string;
  summary: string;
  detail: string;
}

export interface GalleryImageItem {
  url: string;
  title?: string;
  caption?: string;
  alt?: string;
}

export type GalleryImageInput = string | GalleryImageItem | ActualidadGalleryItem;

export interface ExpandableGalleryProps {
  images?: GalleryImageInput[];
  items?: GalleryImageInput[];
  className?: string;
  heightClass?: string;
}

interface NormalizedItem {
  url: string;
  title?: string;
  summary?: string;
  detail?: string;
  caption?: string;
  alt: string;
  isActualidad: boolean;
}

export const ExpandableGallery: React.FC<ExpandableGalleryProps> = ({
  images,
  items,
  className = '',
  heightClass = 'h-[400px] md:h-[460px]',
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedModalIndex, setSelectedModalIndex] = useState<number | null>(null);

  const normalizedImages: NormalizedItem[] = useMemo(() => {
    const rawList = items || images || [];
    return rawList.map((item, idx) => {
      if (typeof item === 'string') {
        return {
          url: item,
          alt: `Registro documental ${idx + 1}`,
          isActualidad: false,
        };
      }
      if ('image' in item) {
        return {
          url: item.image,
          title: item.title,
          summary: item.summary,
          detail: item.detail,
          caption: item.summary,
          alt: item.title || `Noticia ${idx + 1}`,
          isActualidad: true,
        };
      }
      if ('summary' in item) {
        const act = item as unknown as ActualidadGalleryItem;
        return {
          url: act.image || (item as GalleryImageItem).url,
          title: act.title,
          summary: act.summary,
          detail: act.detail,
          caption: act.summary,
          alt: act.title || `Noticia ${idx + 1}`,
          isActualidad: true,
        };
      }
      return {
        url: item.url,
        title: item.title,
        caption: item.caption,
        alt: item.alt || item.title || `Registro documental ${idx + 1}`,
        isActualidad: false,
      };
    });
  }, [items, images]);

  const total = normalizedImages.length;

  const openModal = useCallback((index: number) => {
    setSelectedModalIndex(index);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedModalIndex(null);
  }, []);

  const prevImage = useCallback(() => {
    setSelectedModalIndex((prev) => (prev !== null ? (prev - 1 + total) % total : 0));
  }, [total]);

  const nextImage = useCallback(() => {
    setSelectedModalIndex((prev) => (prev !== null ? (prev + 1) % total : 0));
  }, [total]);

  // Teclado y bloqueo de scroll para el modal
  useEffect(() => {
    if (selectedModalIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedModalIndex, closeModal, prevImage, nextImage]);

  if (total === 0) return null;

  const currentModalImage = selectedModalIndex !== null ? normalizedImages[selectedModalIndex] : null;

  return (
    <div className={`w-full ${className}`}>
      {/* Contenedor de tira animada expandible */}
      <div className={`relative w-full flex gap-2 sm:gap-2.5 ${heightClass} overflow-hidden select-none`}>
        {normalizedImages.map((img, index) => {
          const isHovered = hoveredIndex === index;
          const isAnyHovered = hoveredIndex !== null;

          return (
            <motion.div
              key={`${img.url}-${index}`}
              layout
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => openModal(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openModal(index);
                }
              }}
              style={{ flex: isHovered ? 2 : isAnyHovered ? 0.5 : 1 }}
              aria-label={`Ver noticia ${index + 1}: ${img.title || img.alt}`}
              className={`relative h-full min-w-0 overflow-hidden cursor-pointer border border-[#07214e]/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#07214e] ${
                isHovered
                  ? 'border-[#07214e]/60 shadow-lg'
                  : isAnyHovered
                  ? 'opacity-80'
                  : 'opacity-100 hover:opacity-100'
              }`}
            >
              {/* Imagen con zoom suave */}
              <img
                src={img.url}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Degradado oscuro institucional */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07214e]/90 via-[#07214e]/30 to-transparent pointer-events-none" />

              {/* Icono de zoom / expandir en hover */}
              <div
                className={`absolute top-3 right-3 pointer-events-none z-10 transition-opacity duration-200 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="p-1.5 bg-[#07214e]/90 text-white border border-white/20">
                  <Maximize2 className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

              {/* Base del panel: Título EB Garamond y Resumen sintético */}
              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 md:p-6 z-10 pointer-events-none flex flex-col justify-end">
                {/* Título en EB Garamond */}
                {img.title && (
                  <h3 className="font-serif text-base sm:text-lg md:text-xl text-white font-normal leading-snug drop-shadow-sm line-clamp-2">
                    {img.title}
                  </h3>
                )}

                {/* Resumen sintético de 1-2 líneas */}
                {img.summary ? (
                  <p
                    className={`text-xs sm:text-sm text-neutral-200 font-light leading-relaxed mt-1.5 drop-shadow-sm transition-all duration-300 ${
                      isHovered
                        ? 'opacity-100 line-clamp-3'
                        : isAnyHovered
                        ? 'opacity-0 max-h-0 overflow-hidden mt-0'
                        : 'opacity-90 line-clamp-2'
                    }`}
                  >
                    {img.summary}
                  </p>
                ) : img.caption && isHovered ? (
                  <p className="hidden sm:block font-mono text-[11px] text-neutral-300 line-clamp-1 mt-1">
                    {img.caption}
                  </p>
                ) : null}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal / Visor a Pantalla Completa */}
      <AnimatePresence>
        {selectedModalIndex !== null && currentModalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/90 md:bg-[#07214e]/95 backdrop-blur-md p-4 sm:p-6 select-none overflow-y-auto"
          >
            {/* Barra superior */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl flex items-center justify-between py-2.5 border-b border-white/15 shrink-0"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-neutral-400 tracking-wider">
                  [ {String(selectedModalIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} ]
                </span>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Cerrar visor"
                className="p-1.5 sm:p-2 text-neutral-300 hover:text-white bg-white/5 hover:bg-white/15 border border-white/20 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido Central: Imagen + Ficha Editorial */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl flex-1 flex flex-col items-center justify-center my-auto py-4 px-2"
            >
              {/* Flecha anterior */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                aria-label="Imagen anterior"
                className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 text-white bg-black/60 hover:bg-black/85 border border-white/20 hover:border-white/40 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Flecha siguiente */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                aria-label="Siguiente imagen"
                className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 text-white bg-black/60 hover:bg-black/85 border border-white/20 hover:border-white/40 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Contenedor con animación */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedModalIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="w-full flex flex-col items-center max-w-3xl"
                >
                  <div className="w-full max-h-[44vh] sm:max-h-[48vh] flex items-center justify-center overflow-hidden border border-white/20 shadow-2xl bg-black/40 mb-4">
                    <img
                      src={currentModalImage.url}
                      alt={currentModalImage.alt}
                      className="max-h-[44vh] sm:max-h-[48vh] w-full object-cover"
                    />
                  </div>

                  {/* Ficha Explicativa Editorial Minimalista */}
                  <div className="w-full bg-white/5 border border-white/15 p-5 sm:p-6 text-left">
                    {currentModalImage.title && (
                      <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-normal leading-snug mb-3">
                        {currentModalImage.title}
                      </h3>
                    )}
                    {currentModalImage.summary && (
                      <p className="text-sm sm:text-base text-neutral-200 font-light leading-relaxed mb-3">
                        {currentModalImage.summary}
                      </p>
                    )}
                    {currentModalImage.detail && (
                      <div className="border-l-2 border-[#FEBF02] bg-white/[0.04] p-3.5 text-xs sm:text-sm font-mono text-neutral-200 leading-relaxed">
                        {currentModalImage.detail}
                      </div>
                    )}
                    {!currentModalImage.detail && currentModalImage.caption && (
                      <p className="font-mono text-xs text-neutral-300 mt-2">
                        {currentModalImage.caption}
                      </p>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Barra inferior */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl flex items-center justify-center pt-3 border-t border-white/15 shrink-0"
            >
              {/* Indicadores de diapositiva */}
              <div className="flex items-center gap-2">
                {normalizedImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedModalIndex(idx)}
                    aria-label={`Ver registro ${idx + 1}`}
                    className={`h-1.5 transition-all cursor-pointer ${
                      selectedModalIndex === idx
                        ? 'w-8 bg-[#FEBF02]'
                        : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpandableGallery;

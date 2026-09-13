import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { VIDEOS } from '../data/videos';

export const VideoCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAccumulatorRef = useRef(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const isPlayingRef = useRef(true);
  const isHoveredRef = useRef(false);
  const isTemporarilyPausedRef = useRef(false);
  const resumeTimeoutRef = useRef<number | null>(null);

  const DOUBLED_VIDEOS = [...VIDEOS, ...VIDEOS];

  const togglePlayPause = () => {
    setIsPlaying((prev) => {
      const nextState = !prev;
      isPlayingRef.current = nextState;
      if (nextState && containerRef.current) {
        scrollAccumulatorRef.current = containerRef.current.scrollLeft;
      }
      return nextState;
    });
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
  };

  const handleTouchStart = () => {
    isTemporarilyPausedRef.current = true;
  };

  const handleTouchEnd = () => {
    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = window.setTimeout(() => {
      if (containerRef.current) {
        scrollAccumulatorRef.current = containerRef.current.scrollLeft;
      }
      isTemporarilyPausedRef.current = false;
    }, 600);
  };

  const handleManualScroll = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;

    isTemporarilyPausedRef.current = true;
    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }

    const scrollAmount = 320;
    const halfWidth = container.scrollWidth / 2;

    if (direction === 'left') {
      if (halfWidth > 0 && container.scrollLeft < scrollAmount) {
        container.scrollLeft += halfWidth;
        scrollAccumulatorRef.current += halfWidth;
      }
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      if (halfWidth > 0 && container.scrollLeft >= halfWidth) {
        container.scrollLeft -= halfWidth;
        scrollAccumulatorRef.current -= halfWidth;
      }
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }

    resumeTimeoutRef.current = window.setTimeout(() => {
      if (containerRef.current) {
        scrollAccumulatorRef.current = containerRef.current.scrollLeft;
      }
      isTemporarilyPausedRef.current = false;
    }, 700);
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const halfWidth = container.scrollWidth / 2;
    if (halfWidth > 0 && container.scrollLeft >= halfWidth) {
      container.scrollLeft -= halfWidth;
      scrollAccumulatorRef.current = container.scrollLeft;
      return;
    }

    // Resincronizar si el usuario realiza scroll manual o interactivo (> 4px)
    if (Math.abs(container.scrollLeft - scrollAccumulatorRef.current) > 4) {
      scrollAccumulatorRef.current = container.scrollLeft;
    }
  };

  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp: number | null = null;
    const NORMAL_SPEED = 45; // ~45 px/s: giro visible y constante
    const HOVER_SPEED = 15;  // ~15 px/s: ritmo ultra lento en hover sin detenerse por completo

    if (containerRef.current) {
      scrollAccumulatorRef.current = containerRef.current.scrollLeft;
    }

    const step = (timestamp: number) => {
      if (lastTimestamp === null) {
        lastTimestamp = timestamp;
      }
      const elapsed = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      const delta = Math.min(elapsed, 0.1);

      if (containerRef.current && isPlayingRef.current && !isTemporarilyPausedRef.current) {
        const container = containerRef.current;
        const currentSpeed = isHoveredRef.current ? HOVER_SPEED : NORMAL_SPEED;
        const halfWidth = container.scrollWidth / 2;

        scrollAccumulatorRef.current += currentSpeed * delta;

        if (halfWidth > 0 && scrollAccumulatorRef.current >= halfWidth) {
          scrollAccumulatorRef.current -= halfWidth;
        }

        container.scrollLeft = scrollAccumulatorRef.current;
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resumeTimeoutRef.current) {
        window.clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full">
      {/* Controles manuales y botón de play/pausa */}
      <div className="flex items-center justify-end gap-2 mb-6">
        <button
          type="button"
          onClick={togglePlayPause}
          aria-label={isPlaying ? 'Pausar carrusel' : 'Reanudar carrusel'}
          title={isPlaying ? 'Pausar carrusel' : 'Reanudar carrusel'}
          className="inline-flex items-center justify-center w-9 h-9 rounded-sm border border-[#07214e]/20 bg-white/80 text-[#07214e] hover:bg-[#07214e] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#07214e]"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
        <button
          type="button"
          onClick={() => handleManualScroll('left')}
          aria-label="Video anterior"
          title="Video anterior"
          className="inline-flex items-center justify-center w-9 h-9 rounded-sm border border-[#07214e]/20 bg-white/80 text-[#07214e] hover:bg-[#07214e] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#07214e]"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => handleManualScroll('right')}
          aria-label="Siguiente video"
          title="Siguiente video"
          className="inline-flex items-center justify-center w-9 h-9 rounded-sm border border-[#07214e]/20 bg-white/80 text-[#07214e] hover:bg-[#07214e] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#07214e]"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Contenedor del carrusel con gradientes laterales */}
      <div className="relative before:content-[''] before:pointer-events-none before:absolute before:left-0 before:top-0 before:bottom-0 before:w-12 sm:before:w-24 before:bg-gradient-to-r before:from-[#F1EFE9] before:to-transparent before:z-10 after:content-[''] after:pointer-events-none after:absolute after:right-0 after:top-0 after:bottom-0 after:w-12 sm:after:w-24 after:bg-gradient-to-l after:from-[#F1EFE9] after:to-transparent after:z-10">
        <div
          ref={containerRef}
          onScroll={handleScroll}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex gap-5 sm:gap-6 overflow-x-auto py-2 pr-5 sm:pr-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {DOUBLED_VIDEOS.map((video, index) => (
            <article
              key={`${video.id}-${index}`}
              className="w-[240px] sm:w-[270px] md:w-[290px] shrink-0"
            >
              <div className="aspect-[9/16] rounded-sm border border-[#07214e]/15 bg-black overflow-hidden relative shadow-sm">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <h3 className="mt-3 font-serif text-base md:text-lg leading-snug text-[#07214e] line-clamp-2">
                {video.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

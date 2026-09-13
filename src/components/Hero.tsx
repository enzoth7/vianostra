import React from 'react';
import type { EndpointType } from './Navbar';

interface HeroProps {
  onNavigate?: (endpoint: EndpointType) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-[620px] md:min-h-[700px] flex items-end overflow-hidden border-b border-[#07214e] bg-[#07214e]">
      <img
        src="/home.JPG"
        alt="Florencia al atardecer"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-65"
      />
      <div className="absolute inset-0 bg-[#07214e]/62" />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-5xl">
          <h1 className="text-white font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-normal leading-[0.95] max-w-5xl">
            Tu historia familiar merece quedar documentada.
          </h1>
          <p className="mt-7 text-base sm:text-lg text-white/78 font-light leading-7 max-w-2xl">
            Una guía independiente para rastrear partidas, identificar la comuna de origen y reconstruir el recorrido de tus antepasados entre Uruguay e Italia.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <a
            href="/ruta-avo"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('ruta-avo');
              else window.location.assign('/ruta-avo');
            }}
            className="min-h-12 rounded-md px-8 py-3.5 bg-white hover:bg-[#F1EFE9] text-[#07214e] text-sm font-medium tracking-wide transition-colors text-center cursor-pointer"
          >
            Empezar por la Ruta del Avo
          </a>
          <a
            href="/videos"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('videos');
              else window.location.assign('/videos');
            }}
            className="min-h-12 rounded-md px-8 py-3.5 border border-white/55 hover:border-white hover:bg-white/10 text-white text-sm font-medium tracking-wide transition-colors text-center cursor-pointer"
          >
            Explorar los videos
          </a>
        </div>
      </div>
    </section>
  );
};

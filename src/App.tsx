import React, { useEffect, useState } from 'react';
import { ActualidadSection } from './components/ActualidadSection';
import { ComunaGenerator } from './components/ComunaGenerator';
import { EndpointShell } from './components/EndpointShell';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { HomeArchive } from './components/HomeArchive';
import { MiArbol } from './components/MiArbol';
import { Navbar, type EndpointType } from './components/Navbar';
import { RecursosSection } from './components/RecursosSection';
import { RutaAvoSection } from './components/RutaAvoSection';
import { UruguayTest } from './components/UruguayTest';
import { VideosSection } from './components/VideosSection';

const ENDPOINT_ALIASES: Record<string, EndpointType> = {
  actualidad: 'actualidad',
  'decreto-tajani': 'actualidad',
  tajani: 'actualidad',
  'ruta-avo': 'ruta-avo',
  ruta: 'ruta-avo',
  'ruta-del-avo': 'ruta-avo',
  recursos: 'recursos',
  recurso: 'recursos',
  diagnostico: 'diagnostico',
  evaluador: 'diagnostico',
  test: 'diagnostico',
  videos: 'videos',
  video: 'videos',
  'carta-comuna': 'carta-comuna',
  carta: 'carta-comuna',
  solicitud: 'carta-comuna',
  'mi-arbol': 'mi-arbol',
  arbol: 'mi-arbol',
  'arbol-genealogico': 'mi-arbol',
};

const cleanRoute = (value: string) => value.toLowerCase().replace(/^#?\/?/, '').replace(/\/+$/, '').trim();

const parseEndpoint = (): EndpointType => {
  const pathEndpoint = ENDPOINT_ALIASES[cleanRoute(window.location.pathname)];
  if (pathEndpoint) return pathEndpoint;

  const hashEndpoint = ENDPOINT_ALIASES[cleanRoute(window.location.hash)];
  return hashEndpoint ?? 'inicio';
};

const scrollToTop = () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
};

export const App: React.FC = () => {
  const [activeEndpoint, setActiveEndpoint] = useState<EndpointType>(parseEndpoint);

  useEffect(() => {
    const syncWithUrl = () => {
      const endpoint = parseEndpoint();
      setActiveEndpoint(endpoint);

      const route = cleanRoute(window.location.pathname);
      const usesLegacyTajaniPath = route === 'decreto-tajani' || route === 'tajani';
      if (usesLegacyTajaniPath || window.location.hash) {
        const cleanPath = endpoint === 'inicio' ? '/' : `/${endpoint}`;
        window.history.replaceState(null, '', cleanPath);
      }

      scrollToTop();
    };

    syncWithUrl();
    window.addEventListener('popstate', syncWithUrl);
    window.addEventListener('hashchange', syncWithUrl);

    return () => {
      window.removeEventListener('popstate', syncWithUrl);
      window.removeEventListener('hashchange', syncWithUrl);
    };
  }, []);

  const navigateTo = (endpoint: EndpointType) => {
    setActiveEndpoint(endpoint);
    const targetPath = endpoint === 'inicio' ? '/' : `/${endpoint}`;

    if (window.location.pathname !== targetPath || window.location.hash) {
      window.history.pushState(null, '', targetPath);
    }

    scrollToTop();
  };

  const renderEndpoint = () => {
    switch (activeEndpoint) {
      case 'actualidad':
        return <ActualidadSection onNavigate={navigateTo} />;
      case 'ruta-avo':
        return <RutaAvoSection onNavigate={navigateTo} />;
      case 'recursos':
        return <RecursosSection onNavigate={navigateTo} />;
      case 'diagnostico':
        return <UruguayTest onNavigate={navigateTo} />;
      case 'videos':
        return <VideosSection />;
      case 'carta-comuna':
        return <ComunaGenerator />;
      case 'mi-arbol':
        return <MiArbol onNavigate={navigateTo} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-[#1A1A1A]">
      <Navbar currentEndpoint={activeEndpoint} onNavigate={navigateTo} />

      <main className="flex-grow pt-18">
        {activeEndpoint === 'inicio' ? (
          <>
            <Hero onNavigate={navigateTo} />
            <HomeArchive onNavigate={navigateTo} />
          </>
        ) : (
          <EndpointShell onNavigate={navigateTo}>{renderEndpoint()}</EndpointShell>
        )}
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;

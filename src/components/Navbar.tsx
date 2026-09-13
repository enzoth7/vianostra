import React, { useState } from 'react';

export type EndpointType =
  | 'inicio'
  | 'actualidad'
  | 'ruta-avo'
  | 'diagnostico'
  | 'videos'
  | 'carta-comuna'
  | 'mi-arbol'
  | 'recursos';

export type ViewType = EndpointType;

interface NavbarProps {
  currentEndpoint: EndpointType;
  onNavigate: (endpoint: EndpointType) => void;
}

const NAV_ITEMS: Array<{ endpoint: EndpointType; label: string }> = [
  { endpoint: 'inicio', label: 'Inicio' },
  { endpoint: 'actualidad', label: 'Actualidad' },
  { endpoint: 'ruta-avo', label: 'Ruta del Avo' },
  { endpoint: 'recursos', label: 'Recursos' },
  { endpoint: 'diagnostico', label: 'Diagnóstico' },
  { endpoint: 'videos', label: 'Videos' },
  { endpoint: 'carta-comuna', label: 'Carta a la Comuna' },
  { endpoint: 'mi-arbol', label: 'Mi Árbol' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentEndpoint, onNavigate }) => {
  const [open, setOpen] = useState(false);

  const handleNav = (endpoint: EndpointType) => {
    onNavigate(endpoint);
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#07214e] text-white border-b border-white/15">
      <div className="max-w-[1500px] mx-auto h-18 px-5 md:px-8 xl:px-10 flex items-center justify-between gap-7">
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            handleNav('inicio');
          }}
          className="flex shrink-0 items-center gap-3 rounded-md focus-visible:outline-offset-4"
          aria-label="Via Nostra, ir al inicio"
        >
          <img
            src="/apple-touch-icon.png"
            alt="Via Nostra"
            width="44"
            height="44"
            className="h-11 w-11 rounded-md bg-white object-cover"
          />
          <span className="whitespace-nowrap font-serif text-xl tracking-wide">Via Nostra</span>
        </a>

        <nav className="hidden xl:flex items-center justify-end gap-5 2xl:gap-7 text-[13px] 2xl:text-sm" aria-label="Navegación principal">
          {NAV_ITEMS.map((item) => {
            const isActive = currentEndpoint === item.endpoint;
            return (
              <a
                key={item.endpoint}
                href={item.endpoint === 'inicio' ? '/' : `/${item.endpoint}`}
                onClick={(event) => {
                  event.preventDefault();
                  handleNav(item.endpoint);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`relative flex min-h-11 items-center whitespace-nowrap rounded-md px-1.5 transition-colors ${
                  isActive ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && <span className="absolute inset-x-1.5 bottom-1 h-0.5 rounded-full bg-[#FEBF02]" aria-hidden="true" />}
              </a>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="xl:hidden min-h-11 rounded-md px-3 text-sm hover:bg-white/10 transition-colors"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
        >
          {open ? 'Cerrar' : 'Menú'}
        </button>
      </div>

      {open && (
        <nav id="mobile-navigation" className="xl:hidden border-t border-white/15 bg-[#07214e] px-5 py-5" aria-label="Navegación móvil">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 max-w-[720px] mx-auto">
            {NAV_ITEMS.map((item) => {
              const isActive = currentEndpoint === item.endpoint;
              return (
                <a
                  key={item.endpoint}
                  href={item.endpoint === 'inicio' ? '/' : `/${item.endpoint}`}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNav(item.endpoint);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-11 items-center rounded-md px-3 text-sm transition-colors ${
                    isActive ? 'bg-white text-[#07214e] font-medium' : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
};

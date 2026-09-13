import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { FaTiktok, FaWhatsapp, FaYoutube } from 'react-icons/fa6';
import type { EndpointType } from './Navbar';

interface FooterProps {
  onNavigate?: (endpoint: EndpointType) => void;
}

type CopyStatus = 'idle' | 'copied' | 'error';

const EMAIL = 'enzothome1@gmail.com';

const PRIMARY_LINKS: Array<{ endpoint: EndpointType; label: string }> = [
  { endpoint: 'inicio', label: 'Inicio' },
  { endpoint: 'actualidad', label: 'Actualidad' },
  { endpoint: 'ruta-avo', label: 'Ruta del Avo' },
  { endpoint: 'recursos', label: 'Recursos' },
  { endpoint: 'videos', label: 'Videos' },
];

const TOOL_LINKS: Array<{ endpoint: EndpointType; label: string }> = [
  { endpoint: 'diagnostico', label: 'Diagnóstico' },
  { endpoint: 'carta-comuna', label: 'Carta a la Comuna' },
  { endpoint: 'mi-arbol', label: 'Mi Árbol' },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');

  const handleNav = (event: React.MouseEvent<HTMLAnchorElement>, endpoint: EndpointType) => {
    event.preventDefault();
    onNavigate?.(endpoint);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }
    window.setTimeout(() => setCopyStatus('idle'), 2500);
  };

  return (
    <>
      <footer className="bg-[#07214e] text-white border-t border-white/15">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_0.8fr_1.2fr] gap-10 lg:gap-12">
            <div>
              <a href="/" onClick={(event) => handleNav(event, 'inicio')} className="inline-flex items-center gap-3 rounded-md">
                <img src="/apple-touch-icon.png" alt="" width="48" height="48" className="h-12 w-12 rounded-md bg-white object-cover" />
                <span className="font-serif text-2xl">Via Nostra</span>
              </a>
              <div className="mt-5 h-0.5 w-20 rounded-full bg-[#FEBF02]" aria-hidden="true" />
            </div>

            <nav aria-label="Explorar">
              <h2 className="font-sans text-sm font-medium text-white mb-4">Explorar</h2>
              <div className="flex flex-col items-start gap-2.5 text-sm text-white/65">
                {PRIMARY_LINKS.map((item) => (
                  <a key={item.endpoint} href={item.endpoint === 'inicio' ? '/' : `/${item.endpoint}`} onClick={(event) => handleNav(event, item.endpoint)} className="inline-flex min-h-11 items-center rounded-md hover:text-white transition-colors">
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>

            <nav aria-label="Herramientas">
              <h2 className="font-sans text-sm font-medium text-white mb-4">Herramientas</h2>
              <div className="flex flex-col items-start gap-2.5 text-sm text-white/65">
                {TOOL_LINKS.map((item) => (
                  <a key={item.endpoint} href={`/${item.endpoint}`} onClick={(event) => handleNav(event, item.endpoint)} className="inline-flex min-h-11 items-center rounded-md hover:text-white transition-colors">
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>

            <div>
              <h2 className="font-sans text-sm font-medium text-white mb-4">Contacto</h2>
              <div className="flex items-center gap-2">
                <a href={`mailto:${EMAIL}`} className="min-w-0 inline-flex min-h-11 items-center rounded-md text-sm text-white/75 hover:text-white transition-colors">
                  <span className="truncate">{EMAIL}</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="min-h-11 w-11 shrink-0 inline-flex items-center justify-center rounded-md border border-white/25 text-white hover:bg-white hover:text-[#07214e] transition-colors"
                  aria-label={copyStatus === 'copied' ? 'Correo copiado' : 'Copiar dirección de correo'}
                >
                  {copyStatus === 'copied' ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
                </button>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <a href="https://www.youtube.com/@ViaNostraBo" target="_blank" rel="noopener noreferrer" aria-label="Via Nostra en YouTube" className="w-11 h-11 rounded-md border border-white/20 flex items-center justify-center text-white/70 hover:bg-[#D20911] hover:text-white hover:border-[#D20911] transition-colors">
                  <FaYoutube className="w-4 h-4" aria-hidden="true" />
                </a>
                <a href="https://www.tiktok.com/@vianostrabo" target="_blank" rel="noopener noreferrer" aria-label="Via Nostra en TikTok" className="w-11 h-11 rounded-md border border-white/20 flex items-center justify-center text-white/70 hover:bg-white hover:text-[#07214e] transition-colors">
                  <FaTiktok className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
              <p className="sr-only" role="status" aria-live="polite">
                {copyStatus === 'copied' ? 'Correo copiado al portapapeles' : copyStatus === 'error' ? 'No se pudo copiar el correo' : ''}
              </p>
            </div>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/59898633186"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar a Via Nostra por WhatsApp"
        className="fixed left-4 bottom-4 md:left-6 md:bottom-6 z-40 w-14 h-14 rounded-full bg-[#076525] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(7,33,78,0.24)] hover:bg-[#05551e] transition-colors"
      >
        <FaWhatsapp className="w-7 h-7" aria-hidden="true" />
      </a>
    </>
  );
};

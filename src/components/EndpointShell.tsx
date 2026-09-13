import React from 'react';
import { ArrowLeft } from 'lucide-react';
import type { EndpointType } from './Navbar';

interface EndpointShellProps {
  children: React.ReactNode;
  onNavigate: (endpoint: EndpointType) => void;
}

export const EndpointShell: React.FC<EndpointShellProps> = ({ children, onNavigate }) => (
  <div className="endpoint-shell bg-[#F1EFE9] pb-16">
    <div className="max-w-[1500px] mx-auto px-6 md:px-12 pt-7 md:pt-9 mb-1">
      <a
        href="/"
        onClick={(event) => {
          event.preventDefault();
          onNavigate('inicio');
        }}
        className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 -ml-3 text-sm text-[#525252] hover:bg-white hover:text-[#07214e] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Volver al inicio
      </a>
    </div>
    {children}
  </div>
);

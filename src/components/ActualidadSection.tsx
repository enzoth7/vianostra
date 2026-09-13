import React from 'react';
import { ShieldCheck, Scale, AlertCircle, FileCheck, CheckCircle2, XCircle, GitFork, Compass } from 'lucide-react';
import type { EndpointType } from './Navbar';

interface ActualidadProps {
  onNavigate?: (endpoint: EndpointType) => void;
}

export const ActualidadSection: React.FC<ActualidadProps> = ({ onNavigate }) => {
  const handleNav = (endpoint: EndpointType) => {
    if (onNavigate) {
      onNavigate(endpoint);
    }
  };

  return (
    <section id="actualidad" className="py-12 md:py-20 bg-transparent border-b border-[#07214e]/15">
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Header Principal */}
        <div className="max-w-4xl mb-16 border-l-4 border-[#07214e] pl-6 md:pl-8">
          <h1 className="text-3xl sm:text-5xl font-serif font-normal text-neutral-900 leading-tight">
            Actualidad: Ciudadanía Italiana y Reformas
          </h1>
          <p className="mt-5 text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
            Lo que realmente está en debate en Italia, la situación consular en Montevideo y qué acciones son las únicas que cuentan hoy.
          </p>
        </div>

        {/* 4 Bloques Clave de lo más importante */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-20">
          
          {/* Bloque 1 */}
          <div className="p-8 border border-[#07214e]/15 bg-white flex flex-col justify-between hover:border-[#07214e]/35 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-neutral-400 font-semibold tracking-wider">01 · REFORMA VS. LEY VIGENTE</span>
                <Scale className="w-5 h-5 text-neutral-600 stroke-[1.5]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-neutral-900 mb-4 font-normal">
                Límites generacionales y reformas
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed space-y-2">
                El proyecto de ley impulsado por Antonio Tajani y sectores del gobierno italiano busca restringir la transmisión automática del <em>iure sanguinis</em> a las primeras dos generaciones (hijos y nietos), o exigir certificación de idioma italiano nivel B1 y períodos de residencia efectiva para bisnietos y tataranietos.
              </p>
              <div className="mt-4 p-3.5 bg-white border-l-2 border-[#07214e] text-xs font-mono text-neutral-700 leading-relaxed">
                <strong>Realidad normativa:</strong> La Ley 91/1992 sigue plenamente vigente sin límite generacional. Ninguna reforma rige hasta ser aprobada por ambas cámaras parlamentarias y reglamentada.
              </div>
            </div>
          </div>

          {/* Bloque 2 */}
          <div className="p-8 border border-[#07214e]/15 bg-white flex flex-col justify-between hover:border-[#07214e]/35 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-neutral-400 font-semibold tracking-wider">02 · MONTEVIDEO Y PRENOT@MI</span>
                <AlertCircle className="w-5 h-5 text-neutral-600 stroke-[1.5]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-neutral-900 mb-4 font-normal">
                El cuello de botella en Montevideo
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                Para los descendientes en Uruguay, el obstáculo real no es la ley sustantiva sino el colapso absoluto del sistema de turnos Prenot@mi en la Embajada de Italia en Montevideo. Obtener cita para reconstrucción puede demorar años o resultar materialmente imposible.
              </p>
              <div className="mt-4 p-3.5 bg-white border-l-2 border-[#07214e] text-xs font-mono text-neutral-700 leading-relaxed">
                <strong>La alternativa legal:</strong> Ante la denegación de justicia comprobada (plazos superiores a 730 días), la vía judicial ante los Tribunales Regionales en Italia permite obtener el reconocimiento sin viajar, a través de abogado apoderado.
              </div>
            </div>
          </div>

          {/* Bloque 3 */}
          <div className="p-8 border border-[#07214e]/15 bg-white flex flex-col justify-between hover:border-[#07214e]/35 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-neutral-400 font-semibold tracking-wider">03 · DERECHO CONSTITUCIONAL</span>
                <ShieldCheck className="w-5 h-5 text-neutral-600 stroke-[1.5]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-neutral-900 mb-4 font-normal">
                Línea materna pre-1948
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                Antes del 1 de enero de 1948 (fecha en que entró en vigor la Constitución de la República Italiana), la legislación discriminaba a las mujeres impidiéndoles transmitir la nacionalidad a sus hijos. Quienes tengan en su árbol una mujer cuyo hijo/a nació antes de 1948 no pueden recurrir a la vía consular administrativa.
              </p>
              <div className="mt-4 p-3.5 bg-white border-l-2 border-[#07214e] text-xs font-mono text-neutral-700 leading-relaxed">
                <strong>Amparo de la Corte:</strong> La Corte Constitucional declaró nula esa discriminación. Estos casos se resuelven de forma pacífica y favorable exclusivamente por juicio ordinario en Italia.
              </div>
            </div>
          </div>

          {/* Bloque 4 */}
          <div className="p-8 border border-[#07214e]/15 bg-white flex flex-col justify-between hover:border-[#07214e]/35 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-neutral-400 font-semibold tracking-wider">04 · EL ACTIVO INALTERABLE</span>
                <FileCheck className="w-5 h-5 text-neutral-600 stroke-[1.5]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-neutral-900 mb-4 font-normal">
                El acta del Avo es el activo inalterable
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                Independientemente de reformas futuras, vías consulares o juicios en Roma o tribunales regionales, el trámite se sostiene sobre dos pilares definitivos: el acta de nacimiento emitida por la comuna italiana o parroquia y el Certificado de No Naturalización expedido por la Corte Electoral de Uruguay.
              </p>
              <div className="mt-4 p-3.5 bg-white border-l-2 border-[#07214e] text-xs font-mono text-neutral-700 leading-relaxed">
                <strong>Blindaje del caso:</strong> Encontrar el municipio exacto y tener las actas archivadas representa el 80% del trámite y te blinda ante cualquier cambio regulatorio.
              </div>
            </div>
          </div>

        </div>

        {/* Cuadro Síntesis 'Mito vs. Hecho' (30 segundos) */}
        <div className="border border-[#07214e]/15 bg-[#E9EEF5] p-8 md:p-12 mb-16">
          <div className="max-w-3xl mb-10">
            <h3 className="text-2xl sm:text-3xl font-serif text-neutral-900 font-normal">
              Mito vs. Hecho: Lo que debés saber sin filtros
            </h3>
            <p className="mt-2 text-sm text-neutral-600 font-light">
              Tres verdades documentales frente a las afirmaciones erróneas o alarmistas que circulan en redes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            
            {/* Punto 1 */}
            <div className="bg-white p-6 border border-neutral-200 flex flex-col justify-between">
              <div>
                <div className="flex items-start gap-2.5 text-rose-700 font-mono text-xs uppercase tracking-wider mb-2">
                  <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                  <span>Mito</span>
                </div>
                <p className="text-sm font-medium text-neutral-900 mb-4">
                  «Con las noticias de Tajani ya cerraron la ciudadanía para bisnietos y tataranietos.»
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-100">
                <div className="flex items-start gap-2.5 text-emerald-800 font-mono text-xs uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                  <span>Hecho</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">
                  <strong>La ley vigente sigue intacta.</strong> La Ley 91/1992 no tiene límite generacional. Los proyectos en debate aún no son ley ni tienen fecha de aprobación.
                </p>
              </div>
            </div>

            {/* Punto 2 */}
            <div className="bg-white p-6 border border-neutral-200 flex flex-col justify-between">
              <div>
                <div className="flex items-start gap-2.5 text-rose-700 font-mono text-xs uppercase tracking-wider mb-2">
                  <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                  <span>Mito</span>
                </div>
                <p className="text-sm font-medium text-neutral-900 mb-4">
                  «Para hacer el trámite por vía judicial o saltar el consulado es obligatorio viajar a Italia.»
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-100">
                <div className="flex items-start gap-2.5 text-emerald-800 font-mono text-xs uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                  <span>Hecho</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">
                  <strong>Juicio regional sin viajar.</strong> Se gestiona mediante poder ante escribano uruguayo legalizado con Apostilla de La Haya para un abogado italiano colegiado.
                </p>
              </div>
            </div>

            {/* Punto 3 */}
            <div className="bg-white p-6 border border-neutral-200 flex flex-col justify-between">
              <div>
                <div className="flex items-start gap-2.5 text-rose-700 font-mono text-xs uppercase tracking-wider mb-2">
                  <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                  <span>Mito</span>
                </div>
                <p className="text-sm font-medium text-neutral-900 mb-4">
                  «Si en Uruguay le cambiaron el nombre a mi Avo (ej. Giuseppe por José), el trámite se cae.»
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-100">
                <div className="flex items-start gap-2.5 text-emerald-800 font-mono text-xs uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                  <span>Hecho</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">
                  <strong>Rectificaciones administrativas.</strong> Las diferencias se subsanan por la vía de rectificación de partidas ante la DGREC uruguaya o sumaria judicial.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Enlaces de Acción Claros */}
        <div className="border-t border-neutral-200 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-base font-serif text-neutral-900">
              Comenzá a armar tu expediente con datos concretos y metodología probada.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <a
              href="/mi-arbol"
              onClick={(e) => {
                e.preventDefault();
                handleNav('mi-arbol');
              }}
              className="px-6 py-3 bg-[#07214e] hover:bg-[#07214e]/90 text-white text-xs font-medium tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>Cargar mi línea en Mi Árbol</span>
            </a>

            <a
              href="/ruta-avo"
              onClick={(e) => {
                e.preventDefault();
                handleNav('ruta-avo');
              }}
              className="px-6 py-3 border border-[#07214e] text-[#07214e] hover:bg-neutral-50 text-xs font-medium tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Ver la Ruta del Avo</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

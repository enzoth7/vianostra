import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { ExpandableGallery, type ActualidadGalleryItem } from './ui/gallery-animation';

const ACTUALIDAD_NOTICIAS: ActualidadGalleryItem[] = [
  {
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    title: 'Freno judicial a los límites del Decreto Tajani',
    summary: 'La Corte Constitucional y tribunales italianos ratifican el ius sanguinis sin límite generacional y rechazan la retroactividad de la Ley 74/2025.',
    detail: 'Frente a las iniciativas parlamentarias impulsadas por Antonio Tajani para restringir la ciudadanía a dos generaciones, pronunciamientos de la Corte Constitucional y tribunales ordinarios (Campobasso) confirmaron que el derecho de sangre de la Ley 91/1992 se transmite sin interrupción.',
  },
  {
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
    title: 'Desconcierto por suspensión y bloqueo de citas en Montevideo',
    summary: 'La Embajada en Uruguay interrumpe y reprograma turnos Prenot@Mi por saturación informática y nuevas medidas de control.',
    detail: 'La prensa uruguaya (El País) reporta desconcierto generalizado entre cientos de familias por la falta de turnos en Montevideo, donde la demora para reconstrucción supera los dos años, consolidando la vía judicial directa como alternativa real.',
  },
  {
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    title: 'Entra en vigor la nueva tasa de 600 € por solicitante',
    summary: 'La Ley de Presupuesto italiana duplicó el arancel consular y judicial para el reconocimiento de ciudadanía iure sanguinis.',
    detail: 'A partir del ejercicio 2025, el gobierno italiano fijó en 600 euros la tasa administrativa por cada solicitante mayor de edad, aplicable tanto en ventanilla consular como en el contributo unificato para litigios ante tribunales italianos.',
  },
  {
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    title: 'Tribunales regionales destraban expedientes rioplatenses',
    summary: 'Cortes de apelación y tribunales provinciales en Italia dictan sentencias favorables para uruguayos por denegación de turno consular.',
    detail: 'Ante la denegación de justicia comprobada por la saturación consular en el Río de la Plata, los tribunales provinciales de origen del avo reconocen la ciudadanía por vía civil en Italia con abogado apoderado y sin necesidad de viajar.',
  },
  {
    image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1200&q=80',
    title: 'Horizonte 2026: el Parlamento define el tratamiento de las reformas',
    summary: 'La Comisión de Asuntos Constitucionales en Roma programa el debate final del ius sanguinis ante el rechazo de las comunidades en el exterior.',
    detail: 'En el calendario legislativo de 2026, los legisladores electos por Sudamérica mantienen el bloqueo parlamentario contra el tope de dos generaciones, demandando en su lugar mayor dotación presupuestaria y digitalización para los consulados en América Latina.',
  },
  {
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80',
    title: 'Digitalización integral ANPR y agilización de transcripciones',
    summary: 'La interconexión total del registro de población residente en las comunas optimiza la transcripción de actas extranjeras.',
    detail: 'Con el despliegue del sistema nacional ANPR en 2026, los municipios italianos pueden verificar y transcribir partidas de nacimiento y matrimonio de Uruguay con mayor celeridad, reduciendo los meses de espera tras obtener sentencia judicial o turno consular.',
  },
];

export const ActualidadSection: React.FC = () => {

  return (
    <section id="actualidad" className="py-12 md:py-20 bg-transparent border-b border-[#07214e]/15">
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Header Principal */}
        <div className="max-w-4xl mb-12 border-l-4 border-[#07214e] pl-6 md:pl-8">
          <h1 className="text-3xl sm:text-5xl font-serif font-normal text-neutral-900 leading-tight">
            Actualidad: Noticias y Estado Legal
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
            Crónica documental y novedades jurídicas recientes sobre la ciudadanía italiana para uruguayos.
          </p>
        </div>

        {/* Galería Interactiva Expandible (6 Ejes Fundamentales Sin Cajas Blancas) */}
        <div className="mb-20">
          <ExpandableGallery
            items={ACTUALIDAD_NOTICIAS}
            heightClass="h-[400px] md:h-[460px]"
          />
        </div>

        {/* Cuadro Síntesis 'Mito vs. Hecho' (30 segundos) */}
        <div className="border border-[#07214e]/15 bg-[#E9EEF5] p-8 md:p-12">
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

      </div>
    </section>
  );
};

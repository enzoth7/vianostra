import React, { useState } from 'react';
import type { EndpointType } from './Navbar';

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: '¿Quién fue el antepasado italiano en tu línea directa?',
    subtitle: 'El "avo" es el último nacido en Italia de tu árbol.',
    options: [
      {
        label: '👨👧 Padre o Madre (1ª generación)',
        description: 'Hijo directo de ciudadano nacido en Italia.'
      },
      {
        label: '👴 Abuelo o Abuela (2ª generación)',
        description: 'Nieto directo, caso más frecuente en Uruguay.'
      },
      {
        label: '🚢 Bisabuelo o Tatarabuelo',
        description: 'Llegaron a puertos del Río de la Plata entre 1870 y 1920.'
      },
      {
        label: '🔍 Hay tradición o apellido italiano, pero no sé los datos',
        description: 'Se sabe que vinieron en barco, pero faltan nombres o pueblos.'
      }
    ]
  },
  {
    id: 2,
    title: 'En la línea de descendencia, ¿hay alguna mujer?',
    subtitle: 'La Constitución italiana de 1948 reconoció la igualdad de transmisión materna.',
    options: [
      {
        label: '👨👦 Línea de varón a varón (Padre -> Abuelo -> Bisabuelo)',
        description: 'Transmisión paterna continua sin cortes por fecha.'
      },
      {
        label: '👩👧 Hay una mujer y su hijo/a nació después del 1 de enero de 1948',
        description: 'Se transmite por vía administrativa normalmente.'
      },
      {
        label: '⚖️ Hay una mujer y su hijo/a nació antes del 1 de enero de 1948',
        description: 'Requiere reconocimiento por vía judicial (Vía Materna 1948).'
      },
      {
        label: '📅 No tengo clara la fecha de nacimiento de esa generación',
        description: 'Requiere revisar las partidas de nacimiento en Uruguay.'
      }
    ]
  },
  {
    id: 3,
    title: '¿El italiano adquirió la ciudadanía legal uruguaya (se naturalizó)?',
    subtitle: 'Si sacó carta de ciudadanía uruguaya antes de que naciera su hijo, se interrumpió la transmisión.',
    options: [
      {
        label: '🇮🇹 No, conservó siempre su nacionalidad italiana hasta fallecer',
        description: 'Murió como ciudadano italiano en Uruguay.'
      },
      {
        label: '🇺🇾 Se naturalizó, pero después del nacimiento de su hijo/a',
        description: 'Al momento de nacer el descendiente, seguía siendo italiano.'
      },
      {
        label: '🏛️ No lo sé todavía',
        description: 'Se averigua mediante el Certificado de la Corte Electoral en Montevideo.'
      }
    ]
  }
];

interface UruguayTestProps {
  onNavigate?: (endpoint: EndpointType) => void;
}

export const UruguayTest: React.FC<UruguayTestProps> = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const handleSelect = (idx: number) => {
    const next = [...answers, idx];
    setAnswers(next);
    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const handleReset = () => {
    setCurrent(0);
    setAnswers([]);
    setFinished(false);
  };

  const isMaterna1948 = answers[1] === 2;
  const isPendingInvestigation = answers[0] === 3 || answers[2] === 2;

  return (
    <section id="evaluador" className="py-16 md:py-24 border-b border-[#07214e]/15 bg-transparent">
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12">
        
        <div className="text-left mb-12 border-l-4 border-[#07214e] pl-6 md:pl-8">
          <h2 className="text-3xl sm:text-4xl font-normal text-neutral-900 leading-tight">
            Diagnóstico para Uruguayos
          </h2>
          <div className="mt-3 text-base text-neutral-600 font-light">
            Respondé 3 preguntas para saber en qué situación está tu línea familiar y qué pedir primero en Montevideo o el interior.
          </div>
        </div>

        <div className="border border-white/20 bg-[#07214e] text-white p-8 md:p-12 shadow-[0_16px_36px_rgba(7,33,78,0.18)]">
          {!finished ? (
            <div>
              <div className="mb-7">
                <div className="flex items-center justify-between text-xs font-mono text-white/70 mb-2">
                  <span>Pregunta {current + 1} de {QUESTIONS.length}</span>
                  <span>{Math.round(((current + 1) / QUESTIONS.length) * 100)}%</span>
                </div>
                <div
                  className="h-1.5 overflow-hidden rounded-full bg-white/15"
                  role="progressbar"
                  aria-label="Avance del diagnóstico"
                  aria-valuemin={1}
                  aria-valuemax={QUESTIONS.length}
                  aria-valuenow={current + 1}
                >
                  <div
                    className="h-full rounded-full bg-[#FEBF02] transition-[width] duration-300"
                    style={{ width: `${((current + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              <h3 className="text-2xl font-serif text-white font-normal">
                {QUESTIONS[current].title}
              </h3>
              <div className="text-sm text-white/75 font-light mt-1 mb-8">
                {QUESTIONS[current].subtitle}
              </div>

              <div className="space-y-3">
                {QUESTIONS[current].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className="w-full text-left p-5 bg-white hover:bg-neutral-50 text-[#1A1A1A] border border-neutral-200 hover:border-[#FEBF02] transition-colors group flex flex-col gap-1 focus:outline-none cursor-pointer shadow-xs"
                  >
                    <div className="text-base font-medium text-[#07214e]">
                      {opt.label}
                    </div>
                    <div className="text-xs text-neutral-600 font-light">
                      {opt.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-serif text-white font-normal">
                  {isMaterna1948
                    ? '⚖️ Línea con Vía Materna Previa a 1948'
                    : isPendingInvestigation
                    ? '🔍 Etapa de Investigación Documental en Uruguay'
                    : '✅ Línea de Transmisión Directa'}
                </h3>
              </div>

              <div className="text-sm text-white/85 font-light leading-relaxed space-y-4">
                {isMaterna1948 ? (
                  <div>
                    Al haber una mujer en la línea de transmisión cuyo hijo/a nació antes del 1 de enero de 1948, el consulado en Montevideo no puede procesar el trámite por vía administrativa debido a la legislación histórica. No obstante, desde 2009 la jurisprudencia de la Corte de Casación en Italia reconoce plenamente estos derechos ante los Tribunales Regionales ordinarios en Italia, sin necesidad de viajar.
                  </div>
                ) : isPendingInvestigation ? (
                  <div>
                    Tu prioridad inmediata no está en Italia sino en los archivos de Uruguay. Antes de encargar partidas en Europa o contactar gestores, solicitá en Montevideo:
                    <ul className="list-disc pl-5 mt-3 space-y-1 text-white/80">
                      <li>Partida de defunción del antepasado en la DGREC (calle Uruguay).</li>
                      <li>Expediente matrimonial en la iglesia o registro civil donde se casó (suele mencionar la localidad o provincia de origen).</li>
                      <li>Certificado de No Ciudadano Legal en la Corte Electoral (calle 25 de Mayo).</li>
                    </ul>
                  </div>
                ) : (
                  <div>
                    Tu línea no tiene impedimentos normativos conocidos. Podés tramitar por vía consular en Montevideo (solicitando turno en Prenot@mi) o mediante juicio en Italia ante el tribunal regional competente alegando la falta de turnos consulares, si tenés todas las partidas legalizadas y traducidas.
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-white/15 flex justify-start items-center">
                <button
                  onClick={handleReset}
                  className="text-xs font-mono text-white/70 hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  Volver a empezar
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

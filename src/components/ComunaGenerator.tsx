import React, { useState } from 'react';
import type { ComuneRequestData } from '../types';

const INITIAL_FORM_DATA: ComuneRequestData = {
  applicantName: '',
  applicantBirthDate: '',
  applicantBirthPlace: 'Montevideo, Uruguay',
  applicantAddress: 'Calle Colonia 1234, Apto 502',
  applicantCityCountry: 'Montevideo, Uruguay',
  applicantEmail: '',
  applicantPhone: '+598 99 000 000',
  applicantIdNumber: '',
  
  avoName: '',
  avoAlternativeNames: '',
  avoBirthDate: '',
  avoBirthDateIsApprox: false,
  avoFatherName: '',
  avoMotherName: '',
  avoComune: '',
  avoProvince: '',
  
  documentType: 'estratto_nascita_plurilingue',
  deliveryMethod: 'pec_email',
  hasIdAttached: true,
  notes: ''
};

const SAMPLE_FORM_DATA: ComuneRequestData = {
  applicantName: 'Enzo Ferrari Silva',
  applicantBirthDate: '1992-05-14',
  applicantBirthPlace: 'Montevideo, Uruguay',
  applicantAddress: 'Bulevar Artigas 1420',
  applicantCityCountry: 'Montevideo, Uruguay (C.P. 11300)',
  applicantEmail: 'enzo.genealogia@ejemplo.com',
  applicantPhone: '+598 94 123 456',
  applicantIdNumber: 'CI 4.876.543-2',
  
  avoName: 'Giuseppe Giovanni Rossi',
  avoAlternativeNames: 'José Rossi / Juan Rossi',
  avoBirthDate: '1878-11-22',
  avoBirthDateIsApprox: false,
  avoFatherName: 'Antonio Rossi',
  avoMotherName: 'Maria Caterina Bianchi',
  avoComune: 'Chiavari',
  avoProvince: 'Genova (GE)',
  
  documentType: 'estratto_nascita_plurilingue',
  deliveryMethod: 'pec_email',
  hasIdAttached: true,
  notes: 'Emigrato in Uruguay verso il 1898.'
};

export const ComunaGenerator: React.FC = () => {
  const [formData, setFormData] = useState<ComuneRequestData>(INITIAL_FORM_DATA);
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLoadSample = () => {
    setFormData(SAMPLE_FORM_DATA);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
  };

  const generateItalianLetter = (): string => {
    const comuneName = formData.avoComune.trim() || '[NOME DEL COMUNE]';
    const comuneProv = formData.avoProvince.trim() ? `(${formData.avoProvince.trim()})` : '';
    
    const appName = formData.applicantName.trim() || '[IL TUO NOME E COGNOME]';
    const appBirthPlace = formData.applicantBirthPlace.trim() || '[LUOGO DI NASCITA]';
    const appBirthDate = formData.applicantBirthDate || '[DATA DI NASCITA]';
    const appAddress = formData.applicantAddress.trim() || '[IL TUO INDIRIZZO]';
    const appCityCountry = formData.applicantCityCountry.trim() || '[CITTÀ E STATO]';
    const appEmail = formData.applicantEmail.trim() || '[LA TUA EMAIL]';
    const appPhone = formData.applicantPhone.trim() || '[IL TUO TELEFONO]';
    const appId = formData.applicantIdNumber.trim() || '[DOCUMENTO / PASSAPORTO]';

    const avoName = formData.avoName.trim() || '[NOME E COGNOME DEL DANTE CAUSA]';
    const avoDate = formData.avoBirthDate || '[ANNO O DATA DI NASCITA]';
    const datePrefix = formData.avoBirthDateIsApprox ? 'avvenuta all\'incirca nell\'anno' : 'nato/a il';
    const avoFather = formData.avoFatherName.trim() || '[NOME DEL PADRE]';
    const avoMother = formData.avoMotherName.trim() || '[NOME E COGNOME DELLA MADRE]';

    let docTypeLabel = 'ESTRATTO DELL\'ATTO DI NASCITA su modello plurilingue (Convenzione di Vienna dell\'8 settembre 1976) con l\'indicazione della paternità e maternità';
    if (formData.documentType === 'estratto_nascita_completo') {
      docTypeLabel = 'ESTRATTO DELL\'ATTO DI NASCITA con indicazione espressa della paternità e maternità (art. 3 D.P.R. 432/1957)';
    } else if (formData.documentType === 'copia_integrale') {
      docTypeLabel = 'COPIA INTEGRALE DELL\'ATTO DI NASCITA (conforme all\'originale)';
    } else if (formData.documentType === 'certificato_matrimonio') {
      docTypeLabel = 'ESTRATTO DELL\'ATTO DI MATRIMONIO su modello internazionale / plurilingue';
    }

    const todayStr = new Date().toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    return `All'Ufficio dello Stato Civile
del Comune di ${comuneName} ${comuneProv}
Stato Italiano

OGGETTO: Richiesta ${docTypeLabel.split('(')[0].trim()} ai fini del riconoscimento della cittadinanza italiana jure sanguinis (Circolare K.28.1/1991).

Il/La sottoscritto/a:
Cognome e Nome: ${appName}
Nato/a a: ${appBirthPlace} il ${appBirthDate}
Residente in: ${appAddress}, ${appCityCountry}
Documento d'identità: ${appId}
Recapito e-mail: ${appEmail}
Telefono: ${appPhone}

in qualità di discendente in linea retta di:
${avoName} (${formData.avoAlternativeNames ? `noto in Uruguay anche come: ${formData.avoAlternativeNames}` : ''})
${datePrefix} ${avoDate}
nel Comune di: ${comuneName} ${comuneProv}
Figlio/a di: ${avoFather} e di ${avoMother}

CHIEDE IL RILASCIO DI:
${docTypeLabel}

La presente richiesta è motivata dalla necessità di allegare il suddetto documento alla pratica per la ricostruzione della cittadinanza italiana jure sanguinis ai sensi della Legge n. 91/1992.

MODALITÀ DI TRASMISSIONE:
${formData.deliveryMethod === 'pec_email'
  ? `Si prega cortesemente di inviare copia scansionata del documento timbrato e firmato all'indirizzo e-mail: ${appEmail}. Qualora sia necessaria la spedizione dell'originale cartaceo, resto a disposizione per sostenere i relativi costi.`
  : `Si richiede la spedizione dell'originale cartaceo al domicilio sopra indicato (${appAddress}, ${appCityCountry}).`
}

${formData.hasIdAttached ? 'Allegato: Copia del documento d\'identità del richiedente.' : ''}

In attesa di un cortese riscontro, porgo distinti saluti.

Data: ${todayStr}
Firma: _____________________________________
(${appName})`;
  };

  const letterText = generateItalianLetter();

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([letterText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    const fileNameComune = formData.avoComune.trim().toLowerCase().replace(/\s+/g, '_') || 'comune';
    element.download = `richiesta_estratto_nascita_${fileNameComune}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="solicitud" className="py-16 md:py-24 bg-transparent border-b border-[#07214e]/15">
      <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-12 border-l-4 border-[#076525] pl-6 md:pl-8">
          <h2 className="text-3xl sm:text-4xl font-normal text-neutral-900 leading-tight">
            Generador de Carta a la Comuna
          </h2>
          <div className="mt-4 text-base text-neutral-600 font-light leading-relaxed">
            Completá los datos de tu antepasado y obtené el texto formal en italiano con las citas legales requeridas (Circolare K28 y D.P.R. 432/1957) para enviar al Ufficio dello Stato Civile.
          </div>

          <div className="flex items-center gap-4 pt-6 text-xs font-mono">
            <button
              onClick={handleLoadSample}
              className="px-3 py-1.5 border border-neutral-300 hover:border-neutral-900 text-neutral-800 transition-colors"
            >
              Cargar datos de ejemplo
            </button>
            <button
              onClick={handleReset}
              className="text-neutral-500 hover:text-neutral-900 underline underline-offset-4"
            >
              Limpiar campos
            </button>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Inputs Column */}
          <div className="lg:col-span-5 space-y-8 rounded-lg border border-[#07214e]/15 bg-white p-6 md:p-8 shadow-[0_12px_30px_rgba(7,33,78,0.05)]">
            
            {/* Step 1 */}
            <div className="space-y-3 text-xs">
              <div className="text-xs font-mono text-neutral-400">01. Datos del Solicitante</div>
              
              <div>
                <label className="block text-neutral-600 mb-1">Nombre y Apellido Completo</label>
                <input
                  type="text"
                  name="applicantName"
                  placeholder="Ej. Enzo Silva"
                  value={formData.applicantName}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-neutral-300 focus:border-neutral-900 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-600 mb-1">Fecha de Nacimiento</label>
                  <input
                    type="date"
                    name="applicantBirthDate"
                    value={formData.applicantBirthDate}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-neutral-300 focus:border-neutral-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 mb-1">Lugar de Nacimiento</label>
                  <input
                    type="text"
                    name="applicantBirthPlace"
                    placeholder="Montevideo, Uruguay"
                    value={formData.applicantBirthPlace}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-neutral-300 focus:border-neutral-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-600 mb-1">Dirección en Uruguay</label>
                <input
                  type="text"
                  name="applicantAddress"
                  placeholder="Calle, Número"
                  value={formData.applicantAddress}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-neutral-300 focus:border-neutral-900 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-600 mb-1">Email</label>
                  <input
                    type="email"
                    name="applicantEmail"
                    placeholder="tu@email.com"
                    value={formData.applicantEmail}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-neutral-300 focus:border-neutral-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 mb-1">Cédula</label>
                  <input
                    type="text"
                    name="applicantIdNumber"
                    placeholder="CI 4.123.456-7"
                    value={formData.applicantIdNumber}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-neutral-300 focus:border-neutral-900 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-3 text-xs pt-6 border-t border-neutral-200">
              <div className="text-xs font-mono text-neutral-400">02. Datos del Antepasado (Avo)</div>

              <div>
                <label className="block text-neutral-600 mb-1">Nombre Italiano Original</label>
                <input
                  type="text"
                  name="avoName"
                  placeholder="Ej. Giuseppe Rossi"
                  value={formData.avoName}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-neutral-300 focus:border-neutral-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-600 mb-1">Variantes en Uruguay</label>
                <input
                  type="text"
                  name="avoAlternativeNames"
                  placeholder="Ej. José Rossi"
                  value={formData.avoAlternativeNames}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-neutral-300 focus:border-neutral-900 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-600 mb-1">Comuna Italiana</label>
                  <input
                    type="text"
                    name="avoComune"
                    placeholder="Ej. Chiavari"
                    value={formData.avoComune}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-neutral-300 focus:border-neutral-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 mb-1">Provincia</label>
                  <input
                    type="text"
                    name="avoProvince"
                    placeholder="Ej. Genova (GE)"
                    value={formData.avoProvince}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-neutral-300 focus:border-neutral-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-600 mb-1">Año o Fecha de Nacimiento</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    name="avoBirthDate"
                    placeholder="Ej. 1878"
                    value={formData.avoBirthDate}
                    onChange={handleChange}
                    className="flex-1 p-2.5 border border-neutral-300 focus:border-neutral-900 outline-none"
                  />
                  <label className="flex items-center gap-1.5 text-neutral-500 text-[11px] shrink-0 cursor-pointer">
                    <input
                      type="checkbox"
                      name="avoBirthDateIsApprox"
                      checked={formData.avoBirthDateIsApprox}
                      onChange={handleChange}
                    />
                    <span>Aproximado</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-600 mb-1">Padre del Avo</label>
                  <input
                    type="text"
                    name="avoFatherName"
                    placeholder="Ej. Antonio Rossi"
                    value={formData.avoFatherName}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-neutral-300 focus:border-neutral-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 mb-1">Madre del Avo</label>
                  <input
                    type="text"
                    name="avoMotherName"
                    placeholder="Ej. Maria Bianchi"
                    value={formData.avoMotherName}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-neutral-300 focus:border-neutral-900 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Document options */}
            <div className="space-y-3 text-xs pt-6 border-t border-neutral-200">
              <div className="text-xs font-mono text-neutral-400">03. Opciones de Solicitud</div>

              <div>
                <label className="block text-neutral-600 mb-1">Tipo de Acta Requerida</label>
                <select
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-neutral-300 focus:border-neutral-900 outline-none bg-white"
                >
                  <option value="estratto_nascita_plurilingue">
                    Estratto di Nascita Plurilingue (Convenzione di Vienna)
                  </option>
                  <option value="estratto_nascita_completo">
                    Estratto di Nascita con Paternità e Maternità (D.P.R. 432/1957)
                  </option>
                  <option value="copia_integrale">
                    Copia Integrale dell'Atto di Nascita
                  </option>
                  <option value="certificato_matrimonio">
                    Estratto di Matrimonio Plurilingue
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-600 mb-1">Vía de Envío</label>
                <select
                  name="deliveryMethod"
                  value={formData.deliveryMethod}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-neutral-300 focus:border-neutral-900 outline-none bg-white"
                >
                  <option value="pec_email">Por Email / PEC (Escaneado Oficial)</option>
                  <option value="posta_ordinaria">Por Correo Postal Internacional</option>
                </select>
              </div>
            </div>

          </div>

          {/* Letter Output Column */}
          <div className="lg:col-span-7 space-y-4 rounded-lg border border-[#07214e]/15 bg-white p-6 md:p-8 shadow-[0_12px_30px_rgba(7,33,78,0.05)]">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div className="text-xs font-mono text-neutral-400">
                Texto en Italiano Administrativo
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCopy}
                  className="text-xs font-mono px-4 py-1.5 text-white transition-colors cursor-pointer bg-[#076525] hover:bg-[#054F1D]"
                >
                  {copied ? '✓ Copiado al Portapapeles' : 'Copiar Texto'}
                </button>
                <button
                  onClick={handleDownloadTxt}
                  className="text-xs font-mono px-3 py-1.5 border border-neutral-300 hover:border-[#07214e] text-neutral-800 transition-colors cursor-pointer"
                >
                  Descargar .txt
                </button>
              </div>
            </div>

            <pre className="rounded-lg p-6 border border-[#07214e]/15 bg-[#FBFBFA] text-xs font-mono text-neutral-800 whitespace-pre-wrap leading-relaxed overflow-x-auto select-all">
              {letterText}
            </pre>
          </div>

        </div>

      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Copy, 
  RotateCcw, 
  Check, 
  Save,
  FileText, 
  AlertCircle, 
  User, 
  ShieldCheck,
  Info,
  Heart,
  HeartPulse,
  Users,
  Globe2
} from 'lucide-react';
import { AR, ES, IT, UY } from 'country-flag-icons/react/3x2';
import type { EndpointType } from './Navbar';

export type EstadoCorteElectoral = 
  | 'no_solicitado' 
  | 'en_tramite' 
  | 'conseguido_negativo' 
  | 'conseguido_naturalizado';

export type PaisTipo = 'uruguay' | 'italia' | 'argentina' | 'espana' | 'otro';

export interface CountryInfo {
  code: PaisTipo;
  label: string;
  defaultPlace: string;
}

const COUNTRIES: CountryInfo[] = [
  { code: 'uruguay', label: 'Uruguay', defaultPlace: 'Montevideo, Uruguay' },
  { code: 'italia', label: 'Italia', defaultPlace: 'Italia' },
  { code: 'argentina', label: 'Argentina', defaultPlace: 'Buenos Aires, Argentina' },
  { code: 'espana', label: 'España', defaultPlace: 'España' },
  { code: 'otro', label: 'Otro', defaultPlace: '' },
];

const FLAG_COMPONENTS = {
  uruguay: UY,
  italia: IT,
  argentina: AR,
  espana: ES,
};

export interface PersonaFamiliar {
  id: string;
  generationIndex: number;
  parentesco: string;
  parentescoConyuge?: string;
  esAvo: boolean;

  // Datos del antepasado directo (línea transmisora)
  nombreCompleto: string;
  variantes?: string;
  paisNacimiento: PaisTipo | string;
  fechaNacimiento: string;
  lugarNacimiento: string;
  viveActualmente: boolean;
  fechaDefuncion: string;
  lugarDefuncion: string;

  // Datos de la Esposa / Cónyuge
  nombreConyuge: string;
  paisConyuge: PaisTipo | string;
  fechaNacimientoConyuge: string;
  lugarNacimientoConyuge: string;
  viveConyuge: boolean;
  fechaDefuncionConyuge: string;
  lugarDefuncionConyuge: string;

  // Datos del matrimonio
  fechaMatrimonio: string;
  lugarMatrimonio: string;

  // Datos específicos del Avo italiano
  comunaOProvinciaItalia?: string;
  fechaLlegadaRioDeLaPlata?: string;
  estadoCorteElectoral?: EstadoCorteElectoral;

  // Checklist de actas
  actaNacimiento: boolean;
  actaMatrimonio: boolean;
  actaDefuncion: boolean;
  actaNacimientoConyuge?: boolean;
  actaDefuncionConyuge?: boolean;
  certificadoNoNaturalizacion: boolean;

  notas?: string;
}

const STORAGE_KEY = 'via_nostra_arbol_genealogico_v2';
const LEGACY_STORAGE_KEY = 'via_nostra_arbol_genealogico_v1';
const STORAGE_SELECTED_ID_KEY = 'via_nostra_arbol_selected_id_v2';
const STORAGE_ACTIVE_TAB_KEY = 'via_nostra_arbol_active_tab_v2';

const normalizeCountryCode = (val?: string): PaisTipo => {
  if (!val) return 'uruguay';
  const lower = val.toLowerCase().trim();
  if (lower === 'uy' || lower === 'uruguay') return 'uruguay';
  if (lower === 'it' || lower === 'italia' || lower === 'italy') return 'italia';
  if (lower === 'ar' || lower === 'argentina') return 'argentina';
  if (lower === 'es' || lower === 'espana' || lower === 'españa' || lower === 'spain') return 'espana';
  return 'otro';
};

const getCountryData = (code?: string): CountryInfo => {
  const normalized = normalizeCountryCode(code);
  return COUNTRIES.find(c => c.code === normalized) || COUNTRIES[0];
};

interface CountryFlagProps {
  country?: string;
  className?: string;
}

const CountryFlag: React.FC<CountryFlagProps> = ({ country, className = 'w-5 h-auto' }) => {
  const normalized = normalizeCountryCode(country);
  const label = getCountryData(normalized).label;

  if (normalized === 'otro') {
    return <Globe2 className={className} aria-label={label} />;
  }

  const Flag = FLAG_COMPONENTS[normalized];
  return <Flag className={className} aria-label={`Bandera de ${label}`} />;
};

const getDefaultParentesco = (index: number): { direct: string; conyuge: string } => {
  switch (index) {
    case 0:
      return { direct: 'Yo (Solicitante)', conyuge: 'Cónyuge / Pareja' };
    case 1:
      return { direct: 'Padre', conyuge: 'Madre' };
    case 2:
      return { direct: 'Abuelo', conyuge: 'Abuela' };
    case 3:
      return { direct: 'Bisabuelo (Avo)', conyuge: 'Bisabuela' };
    case 4:
      return { direct: 'Tatarabuelo', conyuge: 'Tatarabuela' };
    case 5:
      return { direct: 'Trastatarabuelo', conyuge: 'Trastatarabuela' };
    case 6:
      return { direct: 'Pentabuelo', conyuge: 'Pentabuela' };
    default:
      return { direct: `Generación +${index}`, conyuge: `Cónyuge Gen +${index}` };
  }
};

const getYearFromDate = (dateStr?: string): string => {
  if (!dateStr) return '';
  const match = dateStr.match(/\b(18\d{2}|19\d{2}|20\d{2})\b/);
  if (match) return match[1];
  if (/^\d{4}$/.test(dateStr.trim())) return dateStr.trim();
  return '';
};

const DEFAULT_LINE: PersonaFamiliar[] = [
  {
    id: 'gen-0',
    generationIndex: 0,
    parentesco: 'Yo (Solicitante)',
    parentescoConyuge: 'Cónyuge / Pareja',
    esAvo: false,
    nombreCompleto: '',
    variantes: '',
    viveActualmente: true,
    paisNacimiento: 'uruguay',
    fechaNacimiento: '',
    lugarNacimiento: 'Montevideo, Uruguay',
    fechaDefuncion: '',
    lugarDefuncion: '',
    nombreConyuge: '',
    paisConyuge: 'uruguay',
    fechaNacimientoConyuge: '',
    lugarNacimientoConyuge: '',
    viveConyuge: true,
    fechaDefuncionConyuge: '',
    lugarDefuncionConyuge: '',
    fechaMatrimonio: '',
    lugarMatrimonio: '',
    actaNacimiento: false,
    actaMatrimonio: false,
    actaDefuncion: false,
    actaNacimientoConyuge: false,
    actaDefuncionConyuge: false,
    certificadoNoNaturalizacion: false,
    notas: 'Solicitante de la reconstrucción de ciudadanía iure sanguinis.'
  },
  {
    id: 'gen-1',
    generationIndex: 1,
    parentesco: 'Padre',
    parentescoConyuge: 'Madre',
    esAvo: false,
    nombreCompleto: '',
    variantes: '',
    viveActualmente: true,
    paisNacimiento: 'uruguay',
    fechaNacimiento: '',
    lugarNacimiento: 'Uruguay',
    fechaDefuncion: '',
    lugarDefuncion: '',
    nombreConyuge: '',
    paisConyuge: 'uruguay',
    fechaNacimientoConyuge: '',
    lugarNacimientoConyuge: '',
    viveConyuge: true,
    fechaDefuncionConyuge: '',
    lugarDefuncionConyuge: '',
    fechaMatrimonio: '',
    lugarMatrimonio: '',
    actaNacimiento: false,
    actaMatrimonio: false,
    actaDefuncion: false,
    actaNacimientoConyuge: false,
    actaDefuncionConyuge: false,
    certificadoNoNaturalizacion: false,
    notas: 'Eslabón intermedio en la línea de transmisión.'
  },
  {
    id: 'gen-2',
    generationIndex: 2,
    parentesco: 'Abuelo',
    parentescoConyuge: 'Abuela',
    esAvo: false,
    nombreCompleto: '',
    variantes: '',
    viveActualmente: false,
    paisNacimiento: 'uruguay',
    fechaNacimiento: '',
    lugarNacimiento: 'Uruguay',
    fechaDefuncion: '',
    lugarDefuncion: '',
    nombreConyuge: '',
    paisConyuge: 'uruguay',
    fechaNacimientoConyuge: '',
    lugarNacimientoConyuge: '',
    viveConyuge: false,
    fechaDefuncionConyuge: '',
    lugarDefuncionConyuge: '',
    fechaMatrimonio: '',
    lugarMatrimonio: '',
    actaNacimiento: false,
    actaMatrimonio: false,
    actaDefuncion: false,
    actaNacimientoConyuge: false,
    actaDefuncionConyuge: false,
    certificadoNoNaturalizacion: false,
    notas: ''
  },
  {
    id: 'gen-3',
    generationIndex: 3,
    parentesco: 'Bisabuelo (Avo)',
    parentescoConyuge: 'Bisabuela',
    esAvo: true,
    nombreCompleto: '',
    variantes: '',
    viveActualmente: false,
    paisNacimiento: 'italia',
    fechaNacimiento: '',
    lugarNacimiento: 'Italia',
    fechaDefuncion: '',
    lugarDefuncion: '',
    nombreConyuge: '',
    paisConyuge: 'italia',
    fechaNacimientoConyuge: '',
    lugarNacimientoConyuge: '',
    viveConyuge: false,
    fechaDefuncionConyuge: '',
    lugarDefuncionConyuge: '',
    fechaMatrimonio: '',
    lugarMatrimonio: '',
    comunaOProvinciaItalia: '',
    fechaLlegadaRioDeLaPlata: '',
    estadoCorteElectoral: 'no_solicitado',
    actaNacimiento: false,
    actaMatrimonio: false,
    actaDefuncion: false,
    actaNacimientoConyuge: false,
    actaDefuncionConyuge: false,
    certificadoNoNaturalizacion: false,
    notas: 'Emigrante italiano original de quien deriva el derecho iure sanguinis.'
  }
];

const migratePersona = (p: Partial<PersonaFamiliar>, index: number): PersonaFamiliar => {
  const defaults = getDefaultParentesco(p.generationIndex ?? index);
  return {
    id: p.id || `gen-${index}`,
    generationIndex: p.generationIndex ?? index,
    parentesco: p.parentesco !== undefined && p.parentesco !== '' ? p.parentesco : defaults.direct,
    parentescoConyuge: p.parentescoConyuge !== undefined && p.parentescoConyuge !== '' ? p.parentescoConyuge : defaults.conyuge,
    esAvo: Boolean(p.esAvo),
    nombreCompleto: p.nombreCompleto !== undefined ? p.nombreCompleto : '',
    variantes: p.variantes !== undefined ? p.variantes : '',
    paisNacimiento: normalizeCountryCode(p.paisNacimiento !== undefined ? p.paisNacimiento : (p.esAvo ? 'italia' : 'uruguay')),
    fechaNacimiento: p.fechaNacimiento !== undefined ? p.fechaNacimiento : '',
    lugarNacimiento: p.lugarNacimiento !== undefined ? p.lugarNacimiento : (p.esAvo ? 'Italia' : 'Montevideo, Uruguay'),
    viveActualmente: p.viveActualmente ?? (index < 2),
    fechaDefuncion: p.fechaDefuncion !== undefined ? p.fechaDefuncion : '',
    lugarDefuncion: p.lugarDefuncion !== undefined ? p.lugarDefuncion : '',
    
    // Esposa / Cónyuge
    nombreConyuge: p.nombreConyuge !== undefined ? p.nombreConyuge : '',
    paisConyuge: normalizeCountryCode(p.paisConyuge !== undefined ? p.paisConyuge : (p.esAvo ? 'italia' : 'uruguay')),
    fechaNacimientoConyuge: p.fechaNacimientoConyuge !== undefined ? p.fechaNacimientoConyuge : '',
    lugarNacimientoConyuge: p.lugarNacimientoConyuge !== undefined ? p.lugarNacimientoConyuge : '',
    viveConyuge: p.viveConyuge ?? (index < 2),
    fechaDefuncionConyuge: p.fechaDefuncionConyuge !== undefined ? p.fechaDefuncionConyuge : '',
    lugarDefuncionConyuge: p.lugarDefuncionConyuge !== undefined ? p.lugarDefuncionConyuge : '',

    // Matrimonio
    fechaMatrimonio: p.fechaMatrimonio !== undefined ? p.fechaMatrimonio : '',
    lugarMatrimonio: p.lugarMatrimonio !== undefined ? p.lugarMatrimonio : '',

    // Avo
    comunaOProvinciaItalia: p.comunaOProvinciaItalia !== undefined ? p.comunaOProvinciaItalia : '',
    fechaLlegadaRioDeLaPlata: p.fechaLlegadaRioDeLaPlata !== undefined ? p.fechaLlegadaRioDeLaPlata : '',
    estadoCorteElectoral: p.estadoCorteElectoral || 'no_solicitado',

    // Actas
    actaNacimiento: Boolean(p.actaNacimiento),
    actaMatrimonio: Boolean(p.actaMatrimonio),
    actaDefuncion: Boolean(p.actaDefuncion),
    actaNacimientoConyuge: Boolean(p.actaNacimientoConyuge),
    actaDefuncionConyuge: Boolean(p.actaDefuncionConyuge),
    certificadoNoNaturalizacion: Boolean(p.certificadoNoNaturalizacion),

    notas: p.notas !== undefined ? p.notas : ''
  };
};

interface MiArbolProps {
  onNavigate?: (endpoint: EndpointType) => void;
}

export const MiArbol: React.FC<MiArbolProps> = ({ onNavigate }) => {
  const [personas, setPersonas] = useState<PersonaFamiliar[]>(() => {
    try {
      const savedV2 = localStorage.getItem(STORAGE_KEY);
      if (savedV2) {
        const parsed = JSON.parse(savedV2);
        if (Array.isArray(parsed) && parsed.length >= 2) {
          return parsed.map(migratePersona);
        }
      }
      const savedV1 = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (savedV1) {
        const parsed = JSON.parse(savedV1);
        if (Array.isArray(parsed) && parsed.length >= 2) {
          return parsed.map(migratePersona);
        }
      }
    } catch (e) {
      console.warn('Error al cargar datos del árbol genealógico', e);
    }
    return DEFAULT_LINE;
  });

  const [selectedId, setSelectedId] = useState<string>(() => {
    try {
      const savedSelectedId = localStorage.getItem(STORAGE_SELECTED_ID_KEY);
      if (savedSelectedId && personas.some(p => p.id === savedSelectedId)) {
        return savedSelectedId;
      }
    } catch (e) {
      console.warn('Error al cargar selectedId de localStorage', e);
    }
    const avo = personas.find(p => p.esAvo);
    return avo ? avo.id : (personas[personas.length - 1]?.id || DEFAULT_LINE[DEFAULT_LINE.length - 1].id);
  });

  // Pestaña activa dentro de la generación seleccionada: Antepasado | Cónyuge | Matrimonio
  const [activeTab, setActiveTab] = useState<'antepasado' | 'conyuge' | 'matrimonio'>(() => {
    try {
      const savedTab = localStorage.getItem(STORAGE_ACTIVE_TAB_KEY);
      if (savedTab === 'antepasado' || savedTab === 'conyuge' || savedTab === 'matrimonio') {
        return savedTab;
      }
    } catch (e) {
      console.warn('Error al cargar activeTab de localStorage', e);
    }
    return 'antepasado';
  });

  const [copied, setCopied] = useState(false);
  const [savedManually, setSavedManually] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Auto-guardar personas en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(personas));
    } catch (e) {
      console.error('Error al guardar en localStorage', e);
    }
  }, [personas]);

  // Auto-guardar selectedId en localStorage
  useEffect(() => {
    try {
      if (selectedId) {
        localStorage.setItem(STORAGE_SELECTED_ID_KEY, selectedId);
      }
    } catch (e) {
      console.error('Error al guardar selectedId en localStorage', e);
    }
  }, [selectedId]);

  // Auto-guardar activeTab en localStorage
  useEffect(() => {
    try {
      if (activeTab) {
        localStorage.setItem(STORAGE_ACTIVE_TAB_KEY, activeTab);
      }
    } catch (e) {
      console.error('Error al guardar activeTab en localStorage', e);
    }
  }, [activeTab]);


  const handleManualSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(personas));
      localStorage.setItem(STORAGE_SELECTED_ID_KEY, selectedId);
      localStorage.setItem(STORAGE_ACTIVE_TAB_KEY, activeTab);
      setSavedManually(true);
      setTimeout(() => setSavedManually(false), 2200);
    } catch (e) {
      console.error('Error al guardar manualmente en localStorage', e);
    }
  };

  const selectedPersona = personas.find(p => p.id === selectedId) || personas[personas.length - 1] || personas[0];

  const updatePersona = (id: string, updates: Partial<PersonaFamiliar>) => {
    setPersonas(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, ...updates };
      }
      return p;
    }));
  };

  const toggleEsAvo = (id: string) => {
    setPersonas(prev => prev.map(p => {
      if (p.id === id) {
        const willBeAvo = !p.esAvo;
        return { 
          ...p, 
          esAvo: willBeAvo,
          paisNacimiento: willBeAvo ? 'italia' : p.paisNacimiento,
          estadoCorteElectoral: p.estadoCorteElectoral || 'no_solicitado'
        };
      }
      return { ...p, esAvo: false };
    }));
  };

  const handleCountrySelect = (c: CountryInfo, target: 'antepasado' | 'conyuge') => {
    if (target === 'antepasado') {
      const updates: Partial<PersonaFamiliar> = { paisNacimiento: c.code };
      const currentPlace = (selectedPersona.lugarNacimiento || '').trim();
      const isGenericPlace = !currentPlace || COUNTRIES.some(country => currentPlace === country.defaultPlace || currentPlace === country.label);
      if (isGenericPlace && c.defaultPlace) {
        updates.lugarNacimiento = c.defaultPlace;
      }
      updatePersona(selectedPersona.id, updates);
    } else {
      const updates: Partial<PersonaFamiliar> = { paisConyuge: c.code };
      const currentPlace = (selectedPersona.lugarNacimientoConyuge || '').trim();
      const isGenericPlace = !currentPlace || COUNTRIES.some(country => currentPlace === country.defaultPlace || currentPlace === country.label);
      if (isGenericPlace && c.defaultPlace) {
        updates.lugarNacimientoConyuge = c.defaultPlace;
      }
      updatePersona(selectedPersona.id, updates);
    }
  };

  const handleAddGeneration = () => {
    const nextIndex = personas.length;
    const newId = `gen-${nextIndex}-${Date.now()}`;
    const defaults = getDefaultParentesco(nextIndex);

    setPersonas(prev => {
      const updatedPrev = prev.map(p => ({ ...p, esAvo: false }));
      const newPersona: PersonaFamiliar = {
        id: newId,
        generationIndex: nextIndex,
        parentesco: defaults.direct,
        parentescoConyuge: defaults.conyuge,
        esAvo: true,
        nombreCompleto: '',
        variantes: '',
        viveActualmente: false,
        paisNacimiento: 'italia',
        fechaNacimiento: '',
        lugarNacimiento: 'Italia',
        fechaDefuncion: '',
        lugarDefuncion: '',
        nombreConyuge: '',
        paisConyuge: 'italia',
        fechaNacimientoConyuge: '',
        lugarNacimientoConyuge: '',
        viveConyuge: false,
        fechaDefuncionConyuge: '',
        lugarDefuncionConyuge: '',
        fechaMatrimonio: '',
        lugarMatrimonio: '',
        comunaOProvinciaItalia: '',
        fechaLlegadaRioDeLaPlata: '',
        estadoCorteElectoral: 'no_solicitado',
        actaNacimiento: false,
        actaMatrimonio: false,
        actaDefuncion: false,
        actaNacimientoConyuge: false,
        actaDefuncionConyuge: false,
        certificadoNoNaturalizacion: false,
        notas: 'Generación añadida en la línea de ascendencia.'
      };
      return [...updatedPrev, newPersona];
    });

    setSelectedId(newId);
    setActiveTab('antepasado');
  };

  const handleRemoveTopGeneration = () => {
    if (personas.length <= 2) {
      alert('La línea debe contener al menos el Solicitante y un progenitor.');
      return;
    }

    const removedPerson = personas[personas.length - 1];
    const confirmDelete = window.confirm(
      `¿Deseas quitar la generación más alta (${removedPerson.parentesco})?`
    );
    if (!confirmDelete) return;

    if (selectedId === removedPerson.id) {
      setSelectedId(personas[personas.length - 2].id);
    }

    setPersonas(prev => {
      const newArr = prev.slice(0, prev.length - 1);
      if (!newArr.some(p => p.esAvo)) {
        newArr[newArr.length - 1] = {
          ...newArr[newArr.length - 1],
          esAvo: true,
          paisNacimiento: 'italia',
          estadoCorteElectoral: newArr[newArr.length - 1].estadoCorteElectoral || 'no_solicitado'
        };
      }
      return newArr;
    });
  };

  const handleReset = () => {
    setPersonas(DEFAULT_LINE);
    setSelectedId(DEFAULT_LINE[DEFAULT_LINE.length - 1].id);
    setActiveTab('antepasado');
    setShowResetConfirm(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
      localStorage.removeItem(STORAGE_SELECTED_ID_KEY);
      localStorage.removeItem(STORAGE_ACTIVE_TAB_KEY);
    } catch {
      // ignore
    }
  };

  // Estadísticas consulares
  let totalActasRequeridas = 0;
  let totalActasConseguidas = 0;

  personas.forEach(p => {
    totalActasRequeridas += 1; // Nacimiento antepasado
    if (p.actaNacimiento) totalActasConseguidas += 1;

    totalActasRequeridas += 1; // Matrimonio
    if (p.actaMatrimonio) totalActasConseguidas += 1;

    if (!p.viveActualmente) {
      totalActasRequeridas += 1; // Defunción antepasado
      if (p.actaDefuncion) totalActasConseguidas += 1;
    }

    if (p.esAvo) {
      totalActasRequeridas += 1; // Corte Electoral
      if (p.certificadoNoNaturalizacion) totalActasConseguidas += 1;
    }
  });

  const porcentajeCompletado = totalActasRequeridas > 0 
    ? Math.round((totalActasConseguidas / totalActasRequeridas) * 100)
    : 0;

  const handleCopySummary = () => {
    const lines: string[] = [];
    lines.push('===============================================================');
    lines.push('VIA NOSTRA — EXPEDIENTE DE TRANSMISIÓN IUS SANGUINIS');
    lines.push('LÍNEA GENEALÓGICA CON CÓNYUGES Y ESTADO DE ACTAS CONSULARES');
    lines.push(`Fecha de emisión: ${new Date().toLocaleDateString('es-UY')}`);
    lines.push(`Progreso documental: ${totalActasConseguidas} de ${totalActasRequeridas} actas reunidas (${porcentajeCompletado}%)`);
    lines.push('===============================================================\n');

    const reversed = [...personas].reverse();

    reversed.forEach(p => {
      const tagAvo = p.esAvo ? ' [AVO ITALIANO EMIGRANTE]' : '';
      const paisAntepasado = getCountryData(p.paisNacimiento);
      const paisConyuge = getCountryData(p.paisConyuge);

      lines.push(`---------------------------------------------------------------`);
      lines.push(`[GEN ${p.generationIndex}] ${p.parentesco.toUpperCase()}${tagAvo} & ${(p.parentescoConyuge || 'CÓNYUGE').toUpperCase()}`);
      lines.push(`ANTEPASADO DIRECTO:`);
      lines.push(`  Nombre: ${p.nombreCompleto || '(Sin nombre registrado)'}`);
      if (p.variantes) {
        lines.push(`  Variantes/Castellanizaciones: ${p.variantes}`);
      }
      lines.push(`  País: ${paisAntepasado.label}`);
      lines.push(`  Estado vital: ${p.viveActualmente ? 'Vivo/a actualmente' : 'Fallecido/a'}`);
      lines.push(`  Nacimiento: ${p.fechaNacimiento || 'Fecha s/d'} en ${p.lugarNacimiento || 'Lugar s/d'}`);
      if (!p.viveActualmente && (p.fechaDefuncion || p.lugarDefuncion)) {
        lines.push(`  Defunción: ${p.fechaDefuncion || 'Fecha s/d'} en ${p.lugarDefuncion || 'Lugar s/d'}`);
      }

      lines.push(`ESPOSA / CÓNYUGE:`);
      lines.push(`  Nombre: ${p.nombreConyuge || '(Sin nombre registrado)'}`);
      lines.push(`  País: ${paisConyuge.label}`);
      lines.push(`  Estado vital: ${p.viveConyuge ? 'Viva actualmente' : 'Fallecida'}`);
      if (p.fechaNacimientoConyuge || p.lugarNacimientoConyuge) {
        lines.push(`  Nacimiento cónyuge: ${p.fechaNacimientoConyuge || 'Fecha s/d'} en ${p.lugarNacimientoConyuge || 'Lugar s/d'}`);
      }
      if (!p.viveConyuge && (p.fechaDefuncionConyuge || p.lugarDefuncionConyuge)) {
        lines.push(`  Defunción cónyuge: ${p.fechaDefuncionConyuge || 'Fecha s/d'} en ${p.lugarDefuncionConyuge || 'Lugar s/d'}`);
      }

      if (p.fechaMatrimonio || p.lugarMatrimonio) {
        lines.push(`MATRIMONIO:`);
        lines.push(`  Fecha/Lugar: ${p.fechaMatrimonio || 'Fecha s/d'} en ${p.lugarMatrimonio || 'Lugar s/d'}`);
      }

      if (p.esAvo) {
        lines.push(`DATOS AVO ITALIANO:`);
        lines.push(`  Comuna/Provincia Italia: ${p.comunaOProvinciaItalia || 'A determinar'}`);
        if (p.fechaLlegadaRioDeLaPlata) {
          lines.push(`  Llegada estimada Río de la Plata: ${p.fechaLlegadaRioDeLaPlata}`);
        }
        const labelsCorte: Record<EstadoCorteElectoral, string> = {
          no_solicitado: 'No solicitado aún',
          en_tramite: 'En trámite ante la Corte Electoral',
          conseguido_negativo: 'Conseguido: Ciudadano NO naturalizado uruguayo (Línea intacta)',
          conseguido_naturalizado: 'Conseguido: Se naturalizó uruguayo (Revisar fecha vs nacimiento del descendiente)'
        };
        lines.push(`  Certificado Corte Electoral UY: ${labelsCorte[p.estadoCorteElectoral || 'no_solicitado']}`);
      }

      const actasStatus = [
        `Nacimiento Antepasado: ${p.actaNacimiento ? '[CONSEGUIDA]' : '[PENDIENTE]'}`,
        `Matrimonio: ${p.actaMatrimonio ? '[CONSEGUIDA]' : '[PENDIENTE]'}`
      ];
      if (!p.viveActualmente) {
        actasStatus.push(`Defunción Antepasado: ${p.actaDefuncion ? '[CONSEGUIDA]' : '[PENDIENTE]'}`);
      }
      if (p.esAvo) {
        actasStatus.push(`No Naturalización: ${p.certificadoNoNaturalizacion ? '[CONSEGUIDA]' : '[PENDIENTE]'}`);
      }
      lines.push(`ACTAS: ${actasStatus.join(' | ')}`);
      if (p.notas) {
        lines.push(`Observaciones: ${p.notas}`);
      }
      lines.push('');
    });

    lines.push('===============================================================');
    lines.push('Generado con la herramienta "Mi Árbol" de Via Nostra (Montevideo, Uruguay)');
    lines.push('https://vianostra.uy / Documento para control consular y legal.');
    lines.push('===============================================================');

    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(err => {
      console.error('Error al copiar al portapapeles', err);
    });
  };

  const descendingPersonas = [...personas].reverse();
  const avoPersona = personas.find(p => p.esAvo);

  return (
    <div className="w-full bg-transparent min-h-screen py-6 md:py-10">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 md:px-12 space-y-8">
        
        {/* Header Consular */}
        <div className="border-b border-[#07214e]/20 pb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="border-l-4 border-[#076525] pl-6 md:pl-8 space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#07214e] tracking-tight">
                Línea de Transmisión del Avo
              </h1>
              {/* Badge sutil y sobrio de guardado */}
              <div 
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#076525]/10 border border-[#076525]/30 text-[#076525] text-xs font-mono tracking-tight select-none"
                title="Tus datos se guardan de forma privada en el almacenamiento local de tu navegador (localStorage). Nadie más tiene acceso."
              >
                <Check className="w-3.5 h-3.5 text-[#076525] stroke-[2.5]" />
                <span className="font-semibold">✓ Guardado en este navegador</span>
              </div>
            </div>

            <p className="text-sm md:text-base text-neutral-600 max-w-3xl font-light">
              Mapeá tu cadena ininterrumpida de ciudadanía desde el antepasado italiano hasta vos.
              Estructura con soporte de parejas lado a lado, escala compacta y actualización visual en tiempo real.
            </p>

            {/* Mensaje aclaratorio de privacidad / almacenamiento local */}
            <div 
              className="pt-1 flex items-center gap-2 text-xs text-neutral-500 font-mono"
              title="Tus datos se guardan de forma privada en el almacenamiento local de tu navegador (localStorage). Nadie más tiene acceso."
            >
              <ShieldCheck className="w-4 h-4 text-[#076525] shrink-0" />
              <span>Tus datos se guardan de forma privada en el almacenamiento local de tu navegador (localStorage). Nadie más tiene acceso.</span>
            </div>
          </div>

          {/* Barra de Herramientas Global */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Botón Guardar Explícito */}
            <button
              onClick={handleManualSave}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 border text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer shadow-2xs ${
                savedManually 
                  ? 'bg-[#076525] text-white border-[#076525]' 
                  : 'bg-white hover:bg-neutral-50 text-[#07214e] border-neutral-300 hover:border-[#07214e]'
              }`}
              title="Guardar cambios manualmente en el almacenamiento local de tu navegador (localStorage)"
            >
              {savedManually ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                  <span>✓ Guardado</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 text-[#07214e]" />
                  <span>Guardar</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopySummary}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#07214e] hover:bg-[#07214e] text-white text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer shadow-sm"
              title="Copiar resumen estructurado para trámites o email"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>¡Línea Copiada!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-300" />
                  <span>Copiar Resumen</span>
                </>
              )}
            </button>

            <button
              onClick={handleAddGeneration}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 border border-neutral-300 hover:border-neutral-900 bg-white text-[#07214e] text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer shadow-2xs"
              title="Añadir una generación ascendente más (Bisabuelo, Tatarabuelo...)"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir Salto</span>
            </button>

            {personas.length > 2 && (
              <button
                onClick={handleRemoveTopGeneration}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 border border-neutral-200 hover:border-red-300 hover:text-red-700 bg-white text-neutral-500 text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer"
                title="Quitar la última generación añadida"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Quitar Gen</span>
              </button>
            )}

            <button
              onClick={() => setShowResetConfirm(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 border border-neutral-200 hover:border-neutral-400 bg-white text-neutral-500 hover:text-neutral-900 text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer"
              title="Restablecer a valores iniciales"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer</span>
            </button>
          </div>
        </div>

        {/* Modal de confirmación de restablecimiento */}
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-2xs">
            <div className="bg-white border border-[#07214e] max-w-md w-full p-6 shadow-xl space-y-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-serif text-lg text-neutral-900">¿Restablecer el árbol genealógico?</h3>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    Esta acción devolverá la línea a las 4 generaciones predeterminadas (Avo, Bisabuelo, Abuelo, Solicitante) y borrará los datos cargados en este dispositivo.
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 text-xs font-mono uppercase text-neutral-600 hover:text-neutral-900 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-xs font-mono uppercase bg-red-700 hover:bg-red-800 text-white cursor-pointer"
                >
                  Sí, Restablecer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Banner de Estado Documental Consular */}
        <div className="bg-white border border-neutral-200 p-5 md:p-6 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-12 h-12 bg-[#07214e] text-white flex items-center justify-center shrink-0 border border-[#07214e]">
              <FileText className="w-6 h-6 text-[#FEBF02]" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Carpeta Consular
              </div>
              <div className="font-serif text-xl text-[#07214e]">
                {totalActasConseguidas} de {totalActasRequeridas} actas reunidas ({porcentajeCompletado}%)
              </div>
            </div>
          </div>

          {/* Barra de progreso visual */}
          <div className="w-full md:max-w-md space-y-2">
            <div className="flex justify-between text-xs font-mono text-neutral-500">
              <span>Transmisión documental</span>
              <span>{porcentajeCompletado === 100 ? '✓ Línea completa' : `${totalActasRequeridas - totalActasConseguidas} pendientes`}</span>
            </div>
            <div className="h-2 w-full bg-neutral-100 overflow-hidden border border-neutral-200">
              <div 
                className="h-full bg-[#076525] transition-all duration-500 ease-out"
                style={{ width: `${porcentajeCompletado}%` }}
              />
            </div>
          </div>

          <div className="text-xs font-mono text-neutral-500 bg-[#FBFBFA] px-3 py-2 border border-neutral-200 text-center md:text-right shrink-0">
            {personas.length} Generaciones · {avoPersona?.nombreCompleto ? `Avo: ${avoPersona.nombreCompleto}` : 'Avo italiano por definir'}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LAYOUT DE DOS PANELES (SPLIT-SCREEN): FORMULARIO (IZQ) / ÁRBOL (DER)      */}
        {/* ========================================================================= */}
        <div className="lg:grid lg:grid-cols-12 gap-8 items-start">

          {/* ===================================================================== */}
          {/* PANEL IZQUIERDO: FORMULARIO Y CONTROLES (col-span-5)                  */}
          {/* ===================================================================== */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-6">

            {/* Selector rápido de Generación */}
            <div className="bg-white border border-neutral-200 p-3 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-neutral-500 px-1">
                <span>Generación activa:</span>
                <span className="text-neutral-400 font-normal">{personas.length} niveles</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2">
                {descendingPersonas.map((p) => {
                  const isSelected = p.id === selectedPersona.id;
                  const isAvo = p.esAvo;
                  const shortName = p.nombreCompleto.trim().split(' ')[0] || p.parentesco.split(' ')[0];

                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedId(p.id)}
                      className={`p-2.5 text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#07214e] text-white border-[#07214e] shadow-2xs'
                          : 'bg-[#FBFBFA] text-neutral-700 border-neutral-200 hover:border-neutral-400 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 w-full text-[10px] font-mono">
                        <span className={isSelected ? 'text-[#FEBF02] font-semibold' : 'text-neutral-400'}>
                          G{p.generationIndex}
                        </span>
                        <CountryFlag country={p.paisNacimiento} className="w-5 h-auto rounded-[2px]" />
                      </div>
                      
                      <div className="font-serif text-sm truncate mt-1 leading-tight font-medium">
                        {shortName}
                      </div>

                      <div className={`text-[10px] font-mono truncate mt-0.5 ${
                        isSelected 
                          ? 'text-neutral-300' 
                          : isAvo 
                            ? 'text-[#076525] font-semibold' 
                            : 'text-neutral-500'
                      }`}>
                        {isAvo ? 'Avo italiano' : p.generationIndex === 0 ? 'Yo' : p.parentesco.split(' ')[0]}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selector de Sub-pestañas: [Antepasado] | [Esposa / Cónyuge] | [Matrimonio] */}
            <div className="bg-white border border-[#07214e] shadow-2xs">
              
              {/* Cabecera con selector de integrante */}
              <div className="bg-[#07214e] text-white px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-white/10 border border-white/20 flex items-center justify-center text-xs font-mono font-bold">
                    G{selectedPersona.generationIndex}
                  </div>
                  <div>
                    <h3 className="font-serif text-base leading-tight">
                      {selectedPersona.parentesco}
                    </h3>
                    <div className="text-[11px] font-mono text-neutral-300">
                      {selectedPersona.esAvo ? 'Transmisor Iure Sanguinis' : 'Cadena de transmisión'}
                    </div>
                  </div>
                </div>

                {/* Botón para marcar/desmarcar como Avo */}
                <button
                  type="button"
                  onClick={() => toggleEsAvo(selectedPersona.id)}
                  className={`px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer border shrink-0 ${
                    selectedPersona.esAvo 
                      ? 'bg-[#076525] border-emerald-400 text-white font-medium' 
                      : 'bg-white/5 border-white/30 text-neutral-300 hover:bg-white/10 hover:text-white'
                  }`}
                  title="Designar como el antepasado italiano que transmite la ciudadanía"
                >
                  <CountryFlag country="italia" className="w-5 h-auto rounded-[2px]" />
                  <span>{selectedPersona.esAvo ? 'Avo Italiano ✓' : 'Marcar Avo'}</span>
                </button>
              </div>

              {/* 3 Pestañas del Formulario */}
              <div className="grid grid-cols-3 border-b border-neutral-200 bg-neutral-100 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveTab('antepasado')}
                  className={`py-3 px-2 text-center transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 border-b-2 ${
                    activeTab === 'antepasado'
                      ? 'bg-white border-[#07214e] text-[#07214e] font-semibold shadow-2xs'
                      : 'border-transparent text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50'
                  }`}
                >
                  <User className="w-4 h-4" aria-hidden="true" />
                  <span className="truncate">Antepasado</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('conyuge')}
                  className={`py-3 px-2 text-center transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 border-b-2 ${
                    activeTab === 'conyuge'
                      ? 'bg-white border-[#07214e] text-[#07214e] font-semibold shadow-2xs'
                      : 'border-transparent text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50'
                  }`}
                >
                  <Users className="w-4 h-4" aria-hidden="true" />
                  <span className="truncate">Esposa / Pareja</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('matrimonio')}
                  className={`py-3 px-2 text-center transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 border-b-2 ${
                    activeTab === 'matrimonio'
                      ? 'bg-white border-[#07214e] text-[#07214e] font-semibold shadow-2xs'
                      : 'border-transparent text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50'
                  }`}
                >
                  <Heart className="w-4 h-4" aria-hidden="true" />
                  <span className="truncate">Matrimonio</span>
                </button>
              </div>

              {/* Cuerpo Dinámico según Pestaña */}
              <div className="p-5 md:p-6 space-y-6">

                {/* ============================================================== */}
                {/* PESTAÑA 1: ANTEPASADO DIRECTO                                 */}
                {/* ============================================================== */}
                {activeTab === 'antepasado' && (
                  <div className="space-y-5">
                    
                    {/* Identificación */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 pb-1 border-b border-neutral-100 flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-[#07214e]" />
                        1. Identificación del Antepasado de la Línea
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-xs font-mono text-neutral-700 block">
                            Parentesco en la Línea
                          </label>
                          <input
                            type="text"
                            value={selectedPersona.parentesco}
                            onChange={(e) => updatePersona(selectedPersona.id, { parentesco: e.target.value })}
                            placeholder="Ej: Bisabuelo Paterno"
                            className="w-full px-3 py-2 bg-[#FBFBFA] border border-neutral-300 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#07214e]"
                          />
                        </div>

                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-xs font-mono text-neutral-700 block">
                            Nombre y Apellido Completo
                          </label>
                          <input
                            type="text"
                            value={selectedPersona.nombreCompleto}
                            onChange={(e) => updatePersona(selectedPersona.id, { nombreCompleto: e.target.value })}
                            placeholder="Ej: Giuseppe Giovanni Rossi"
                            className="w-full px-3 py-2 bg-[#FBFBFA] border border-neutral-300 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#07214e]"
                          />
                        </div>

                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-xs font-mono text-neutral-700 block">
                            Variantes o Castellanizaciones en Actas
                          </label>
                          <input
                            type="text"
                            value={selectedPersona.variantes || ''}
                            onChange={(e) => updatePersona(selectedPersona.id, { variantes: e.target.value })}
                            placeholder="Ej: José Rossi, Giuseppe Roso"
                            className="w-full px-3 py-2 bg-[#FBFBFA] border border-neutral-300 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#07214e]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Nacimiento y País */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 pb-1 border-b border-neutral-100 flex items-center gap-2">
                        <Globe2 className="w-4 h-4 text-[#07214e]" aria-hidden="true" />
                        2. Nacimiento y Origen
                      </h4>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-neutral-700 block">
                          País de Nacimiento
                        </label>
                        <div className="grid grid-cols-5 gap-1.5">
                          {COUNTRIES.map(c => {
                            const isCurrent = normalizeCountryCode(selectedPersona.paisNacimiento) === c.code;
                            return (
                              <button
                                key={c.code}
                                type="button"
                                onClick={() => handleCountrySelect(c, 'antepasado')}
                                className={`py-2 px-1 text-center border text-xs font-mono transition-colors cursor-pointer flex flex-col items-center justify-center gap-1 ${
                                  isCurrent
                                    ? 'bg-[#07214e] text-white border-[#07214e] shadow-2xs'
                                    : 'bg-[#FBFBFA] text-neutral-600 border-neutral-200 hover:border-neutral-400 hover:bg-white'
                                }`}
                              >
                                <CountryFlag country={c.code} className="w-7 h-auto rounded-[2px]" />
                                <span className="text-[10px] truncate max-w-full">{c.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-neutral-700 block">
                            Fecha de Nacimiento
                          </label>
                          <input
                            type="text"
                            value={selectedPersona.fechaNacimiento}
                            onChange={(e) => updatePersona(selectedPersona.id, { fechaNacimiento: e.target.value })}
                            placeholder="Ej: 14/05/1884 o 1884"
                            className="w-full px-3 py-2 bg-[#FBFBFA] border border-neutral-300 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#07214e]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono text-neutral-700 block">
                            Lugar de Nacimiento
                          </label>
                          <input
                            type="text"
                            value={selectedPersona.lugarNacimiento}
                            onChange={(e) => updatePersona(selectedPersona.id, { lugarNacimiento: e.target.value })}
                            placeholder="Ej: Chiavari, Génova, Italia"
                            className="w-full px-3 py-2 bg-[#FBFBFA] border border-neutral-300 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#07214e]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Estado Vital */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 pb-1 border-b border-neutral-100 flex items-center gap-2">
                        <HeartPulse className="h-4 w-4 text-[#07214e]" aria-hidden="true" />
                        3. Estado Vital
                      </h4>

                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`vive-${selectedPersona.id}`}
                            checked={selectedPersona.viveActualmente}
                            onChange={() => updatePersona(selectedPersona.id, { viveActualmente: true })}
                            className="accent-[#07214e]"
                          />
                          <span className="text-xs font-mono text-neutral-800">Vive actualmente</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`vive-${selectedPersona.id}`}
                            checked={!selectedPersona.viveActualmente}
                            onChange={() => updatePersona(selectedPersona.id, { viveActualmente: false })}
                            className="accent-[#07214e]"
                          />
                          <span className="text-xs font-mono text-neutral-800">Fallecido/a</span>
                        </label>
                      </div>

                      {!selectedPersona.viveActualmente && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <div className="space-y-1">
                            <label className="text-xs font-mono text-neutral-700 block">
                              Fecha de Defunción
                            </label>
                            <input
                              type="text"
                              value={selectedPersona.fechaDefuncion}
                              onChange={(e) => updatePersona(selectedPersona.id, { fechaDefuncion: e.target.value })}
                              placeholder="Ej: 10/11/1952 o 1952"
                              className="w-full px-3 py-2 bg-[#FBFBFA] border border-neutral-300 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#07214e]"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-mono text-neutral-700 block">
                              Lugar de Defunción
                            </label>
                            <input
                              type="text"
                              value={selectedPersona.lugarDefuncion}
                              onChange={(e) => updatePersona(selectedPersona.id, { lugarDefuncion: e.target.value })}
                              placeholder="Ej: Montevideo, Uruguay"
                              className="w-full px-3 py-2 bg-[#FBFBFA] border border-neutral-300 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#07214e]"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Datos del Avo (Si está marcado como Avo) */}
                    {selectedPersona.esAvo && (
                      <div className="p-4 bg-emerald-50/50 border border-[#076525]/30 space-y-4">
                        <div className="flex items-center gap-2 text-[#076525]">
                          <CountryFlag country="italia" className="w-6 h-auto rounded-[2px]" />
                          <h4 className="text-xs font-mono uppercase font-bold tracking-wider">
                            Control Consular Específico del Avo Italiano
                          </h4>
                        </div>

                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="text-xs font-mono text-neutral-800 block font-medium">
                              Comuna y Provincia de Origen en Italia
                            </label>
                            <input
                              type="text"
                              value={selectedPersona.comunaOProvinciaItalia || ''}
                              onChange={(e) => updatePersona(selectedPersona.id, { comunaOProvinciaItalia: e.target.value })}
                              placeholder="Ej: Chiavari, Genova (GE) o Lucca"
                              className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs font-sans focus:outline-none focus:border-[#076525]"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-mono text-neutral-800 block font-medium">
                              Año / Fecha de Llegada a Uruguay (Río de la Plata)
                            </label>
                            <input
                              type="text"
                              value={selectedPersona.fechaLlegadaRioDeLaPlata || ''}
                              onChange={(e) => updatePersona(selectedPersona.id, { fechaLlegadaRioDeLaPlata: e.target.value })}
                              placeholder="Ej: 1898 en vapor a Montevideo"
                              className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs font-sans focus:outline-none focus:border-[#076525]"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-mono text-neutral-800 block font-medium">
                              Certificado Corte Electoral de Uruguay (No Naturalización)
                            </label>
                            <select
                              value={selectedPersona.estadoCorteElectoral || 'no_solicitado'}
                              onChange={(e) => updatePersona(selectedPersona.id, { 
                                estadoCorteElectoral: e.target.value as EstadoCorteElectoral,
                                certificadoNoNaturalizacion: e.target.value === 'conseguido_negativo'
                              })}
                              className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs font-mono focus:outline-none focus:border-[#076525]"
                            >
                              <option value="no_solicitado">No solicitado aún</option>
                              <option value="en_tramite">En trámite ante la Corte Electoral</option>
                              <option value="conseguido_negativo">Conseguido: NO Naturalizado (Línea Intacta ✓)</option>
                              <option value="conseguido_naturalizado">Conseguido: Naturalizado UY (Verificar fechas ⚠️)</option>
                            </select>
                          </div>
                        </div>

                        <div className="bg-white/90 p-3 border border-[#076525]/20 flex items-start gap-2 text-xs text-neutral-700">
                          <Info className="w-4 h-4 text-[#076525] shrink-0 mt-0.5" />
                          <div className="leading-relaxed">
                            <strong>Regla de oro consular en Uruguay:</strong> Si el Avo se naturalizó legalmente uruguayo antes del nacimiento de su hijo en la línea de transmisión, la ciudadanía no se transmitió. Por eso el certificado de la Corte Electoral es el descarte obligatorio inicial.
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Checklist de Actas del Antepasado */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 pb-1 border-b border-neutral-100 flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#07214e]" />
                        4. Actas Físicas del Antepasado
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <label className={`p-3 border cursor-pointer transition-colors flex items-start gap-2.5 ${
                          selectedPersona.actaNacimiento
                            ? 'bg-emerald-50/50 border-[#076525] text-neutral-900'
                            : 'bg-[#FBFBFA] border-neutral-200 text-neutral-600 hover:border-neutral-400'
                        }`}>
                          <input
                            type="checkbox"
                            checked={selectedPersona.actaNacimiento}
                            onChange={(e) => updatePersona(selectedPersona.id, { actaNacimiento: e.target.checked })}
                            className="mt-0.5 accent-[#076525] w-4 h-4 cursor-pointer"
                          />
                          <div>
                            <span className="text-xs font-mono uppercase font-semibold block">
                              Acta de Nacimiento
                            </span>
                            <span className="text-[10px] text-neutral-500">
                              {selectedPersona.esAvo ? 'Estratto di nascita de comuna italiana' : 'Partida literal uruguaya'}
                            </span>
                          </div>
                        </label>

                        <label className={`p-3 border transition-colors flex items-start gap-2.5 ${
                          selectedPersona.viveActualmente
                            ? 'bg-neutral-50 border-neutral-200 text-neutral-400 opacity-60 cursor-not-allowed'
                            : selectedPersona.actaDefuncion
                              ? 'bg-emerald-50/50 border-[#076525] text-neutral-900 cursor-pointer'
                              : 'bg-[#FBFBFA] border-neutral-200 text-neutral-600 hover:border-neutral-400 cursor-pointer'
                        }`}>
                          <input
                            type="checkbox"
                            disabled={selectedPersona.viveActualmente}
                            checked={selectedPersona.actaDefuncion && !selectedPersona.viveActualmente}
                            onChange={(e) => updatePersona(selectedPersona.id, { actaDefuncion: e.target.checked })}
                            className="mt-0.5 accent-[#076525] w-4 h-4 disabled:cursor-not-allowed"
                          />
                          <div>
                            <span className="text-xs font-mono uppercase font-semibold block">
                              Acta de Defunción
                            </span>
                            <span className="text-[10px] text-neutral-500">
                              {selectedPersona.viveActualmente ? 'No aplica (persona viva)' : 'Partida literal de defunción'}
                            </span>
                          </div>
                        </label>

                        {selectedPersona.esAvo && (
                          <label className={`p-3 border cursor-pointer transition-colors flex items-start gap-2.5 sm:col-span-2 ${
                            selectedPersona.certificadoNoNaturalizacion
                              ? 'bg-[#07214e]/5 border-[#07214e] text-neutral-900'
                              : 'bg-[#FBFBFA] border-neutral-200 text-neutral-600 hover:border-neutral-400'
                          }`}>
                            <input
                              type="checkbox"
                              checked={selectedPersona.certificadoNoNaturalizacion}
                              onChange={(e) => updatePersona(selectedPersona.id, { 
                                certificadoNoNaturalizacion: e.target.checked,
                                estadoCorteElectoral: e.target.checked ? 'conseguido_negativo' : selectedPersona.estadoCorteElectoral
                              })}
                              className="mt-0.5 accent-[#07214e] w-4 h-4 cursor-pointer"
                            />
                            <div>
                              <span className="text-xs font-mono uppercase font-semibold block text-[#07214e]">
                                No Naturalización (Corte Electoral UY)
                              </span>
                              <span className="text-[10px] text-neutral-500">
                                Certificado negativo que prueba que no renunció a su ciudadanía de origen
                              </span>
                            </div>
                          </label>
                        )}
                      </div>
                    </div>

                    {/* Observaciones */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-neutral-700 block font-medium">
                        Observaciones del Expediente / Legajo
                      </label>
                      <textarea
                        rows={2}
                        value={selectedPersona.notas || ''}
                        onChange={(e) => updatePersona(selectedPersona.id, { notas: e.target.value })}
                        placeholder="Ej: Partida ubicada en parroquia de Chiavari. Pendiente apostillar."
                        className="w-full px-3 py-2 bg-[#FBFBFA] border border-neutral-300 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#07214e]"
                      />
                    </div>

                  </div>
                )}

                {/* ============================================================== */}
                {/* PESTAÑA 2: ESPOSA / CÓNYUGE                                    */}
                {/* ============================================================== */}
                {activeTab === 'conyuge' && (
                  <div className="space-y-5">
                    
                    {/* Identificación de la Esposa */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 pb-1 border-b border-neutral-100 flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-[#07214e]" />
                        1. Identificación de la Esposa / Pareja
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-xs font-mono text-neutral-700 block">
                            Parentesco o Rol
                          </label>
                          <input
                            type="text"
                            value={selectedPersona.parentescoConyuge || ''}
                            onChange={(e) => updatePersona(selectedPersona.id, { parentescoConyuge: e.target.value })}
                            placeholder="Ej: Bisabuela, Esposa del Avo, Madre"
                            className="w-full px-3 py-2 bg-[#FBFBFA] border border-neutral-300 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#07214e]"
                          />
                        </div>

                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-xs font-mono text-neutral-700 block">
                            Nombre y Apellido Completo de la Esposa
                          </label>
                          <input
                            type="text"
                            value={selectedPersona.nombreConyuge}
                            onChange={(e) => updatePersona(selectedPersona.id, { nombreConyuge: e.target.value })}
                            placeholder="Ej: Maria Bianchi"
                            className="w-full px-3 py-2 bg-[#FBFBFA] border border-neutral-300 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#07214e]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Nacimiento y País de la Esposa */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 pb-1 border-b border-neutral-100 flex items-center gap-2">
                        <Globe2 className="w-4 h-4 text-[#07214e]" aria-hidden="true" />
                        2. Nacimiento y Origen de la Esposa
                      </h4>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-neutral-700 block">
                          País de Nacimiento
                        </label>
                        <div className="grid grid-cols-5 gap-1.5">
                          {COUNTRIES.map(c => {
                            const isCurrent = normalizeCountryCode(selectedPersona.paisConyuge) === c.code;
                            return (
                              <button
                                key={c.code}
                                type="button"
                                onClick={() => handleCountrySelect(c, 'conyuge')}
                                className={`py-2 px-1 text-center border text-xs font-mono transition-colors cursor-pointer flex flex-col items-center justify-center gap-1 ${
                                  isCurrent
                                    ? 'bg-[#07214e] text-white border-[#07214e] shadow-2xs'
                                    : 'bg-[#FBFBFA] text-neutral-600 border-neutral-200 hover:border-neutral-400 hover:bg-white'
                                }`}
                              >
                                <CountryFlag country={c.code} className="w-7 h-auto rounded-[2px]" />
                                <span className="text-[10px] truncate max-w-full">{c.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-neutral-700 block">
                            Fecha de Nacimiento de la Esposa
                          </label>
                          <input
                            type="text"
                            value={selectedPersona.fechaNacimientoConyuge}
                            onChange={(e) => updatePersona(selectedPersona.id, { fechaNacimientoConyuge: e.target.value })}
                            placeholder="Ej: 1888"
                            className="w-full px-3 py-2 bg-[#FBFBFA] border border-neutral-300 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#07214e]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono text-neutral-700 block">
                            Lugar de Nacimiento de la Esposa
                          </label>
                          <input
                            type="text"
                            value={selectedPersona.lugarNacimientoConyuge}
                            onChange={(e) => updatePersona(selectedPersona.id, { lugarNacimientoConyuge: e.target.value })}
                            placeholder="Ej: Montevideo, Uruguay"
                            className="w-full px-3 py-2 bg-[#FBFBFA] border border-neutral-300 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#07214e]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Estado Vital de la Esposa */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 pb-1 border-b border-neutral-100 flex items-center gap-2">
                        <HeartPulse className="h-4 w-4 text-[#07214e]" aria-hidden="true" />
                        3. Estado Vital de la Esposa
                      </h4>

                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`vive-conyuge-${selectedPersona.id}`}
                            checked={selectedPersona.viveConyuge}
                            onChange={() => updatePersona(selectedPersona.id, { viveConyuge: true })}
                            className="accent-[#07214e]"
                          />
                          <span className="text-xs font-mono text-neutral-800">Vive actualmente</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`vive-conyuge-${selectedPersona.id}`}
                            checked={!selectedPersona.viveConyuge}
                            onChange={() => updatePersona(selectedPersona.id, { viveConyuge: false })}
                            className="accent-[#07214e]"
                          />
                          <span className="text-xs font-mono text-neutral-800">Fallecida</span>
                        </label>
                      </div>

                      {!selectedPersona.viveConyuge && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <div className="space-y-1">
                            <label className="text-xs font-mono text-neutral-700 block">
                              Fecha de Defunción de la Esposa
                            </label>
                            <input
                              type="text"
                              value={selectedPersona.fechaDefuncionConyuge}
                              onChange={(e) => updatePersona(selectedPersona.id, { fechaDefuncionConyuge: e.target.value })}
                              placeholder="Ej: 1960"
                              className="w-full px-3 py-2 bg-[#FBFBFA] border border-neutral-300 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#07214e]"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-mono text-neutral-700 block">
                              Lugar de Defunción de la Esposa
                            </label>
                            <input
                              type="text"
                              value={selectedPersona.lugarDefuncionConyuge}
                              onChange={(e) => updatePersona(selectedPersona.id, { lugarDefuncionConyuge: e.target.value })}
                              placeholder="Ej: Montevideo, Uruguay"
                              className="w-full px-3 py-2 bg-[#FBFBFA] border border-neutral-300 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#07214e]"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actas de la Esposa */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 pb-1 border-b border-neutral-100 flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#07214e]" />
                        4. Actas Físicas de la Esposa
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <label className={`p-3 border cursor-pointer transition-colors flex items-start gap-2.5 ${
                          selectedPersona.actaNacimientoConyuge
                            ? 'bg-emerald-50/50 border-[#076525] text-neutral-900'
                            : 'bg-[#FBFBFA] border-neutral-200 text-neutral-600 hover:border-neutral-400'
                        }`}>
                          <input
                            type="checkbox"
                            checked={Boolean(selectedPersona.actaNacimientoConyuge)}
                            onChange={(e) => updatePersona(selectedPersona.id, { actaNacimientoConyuge: e.target.checked })}
                            className="mt-0.5 accent-[#076525] w-4 h-4 cursor-pointer"
                          />
                          <div>
                            <span className="text-xs font-mono uppercase font-semibold block">
                              Acta de Nacimiento
                            </span>
                            <span className="text-[10px] text-neutral-500">
                              Partida de nacimiento de la cónyuge
                            </span>
                          </div>
                        </label>

                        <label className={`p-3 border transition-colors flex items-start gap-2.5 ${
                          selectedPersona.viveConyuge
                            ? 'bg-neutral-50 border-neutral-200 text-neutral-400 opacity-60 cursor-not-allowed'
                            : selectedPersona.actaDefuncionConyuge
                              ? 'bg-emerald-50/50 border-[#076525] text-neutral-900 cursor-pointer'
                              : 'bg-[#FBFBFA] border-neutral-200 text-neutral-600 hover:border-neutral-400 cursor-pointer'
                        }`}>
                          <input
                            type="checkbox"
                            disabled={selectedPersona.viveConyuge}
                            checked={Boolean(selectedPersona.actaDefuncionConyuge) && !selectedPersona.viveConyuge}
                            onChange={(e) => updatePersona(selectedPersona.id, { actaDefuncionConyuge: e.target.checked })}
                            className="mt-0.5 accent-[#076525] w-4 h-4 disabled:cursor-not-allowed"
                          />
                          <div>
                            <span className="text-xs font-mono uppercase font-semibold block">
                              Acta de Defunción
                            </span>
                            <span className="text-[10px] text-neutral-500">
                              {selectedPersona.viveConyuge ? 'No aplica (persona viva)' : 'Partida de defunción'}
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>

                  </div>
                )}

                {/* ============================================================== */}
                {/* PESTAÑA 3: MATRIMONIO                                          */}
                {/* ============================================================== */}
                {activeTab === 'matrimonio' && (
                  <div className="space-y-5">
                    
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 pb-1 border-b border-neutral-100 flex items-center gap-2">
                        <Heart className="w-3.5 h-3.5 text-[#07214e]" />
                        1. Datos del Matrimonio de esta Generación
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-neutral-700 block">
                            Fecha del Matrimonio
                          </label>
                          <input
                            type="text"
                            value={selectedPersona.fechaMatrimonio}
                            onChange={(e) => updatePersona(selectedPersona.id, { fechaMatrimonio: e.target.value })}
                            placeholder="Ej: 20/09/1912 o 1912"
                            className="w-full px-3 py-2 bg-[#FBFBFA] border border-neutral-300 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#07214e]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono text-neutral-700 block">
                            Lugar del Matrimonio
                          </label>
                          <input
                            type="text"
                            value={selectedPersona.lugarMatrimonio}
                            onChange={(e) => updatePersona(selectedPersona.id, { lugarMatrimonio: e.target.value })}
                            placeholder="Ej: Parroquia San Francisco, Montevideo"
                            className="w-full px-3 py-2 bg-[#FBFBFA] border border-neutral-300 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#07214e]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 pb-1 border-b border-neutral-100 flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#07214e]" />
                        2. Acta de Matrimonio
                      </h4>

                      <label className={`p-3 border cursor-pointer transition-colors flex items-start gap-2.5 ${
                        selectedPersona.actaMatrimonio
                          ? 'bg-emerald-50/50 border-[#076525] text-neutral-900'
                          : 'bg-[#FBFBFA] border-neutral-200 text-neutral-600 hover:border-neutral-400'
                      }`}>
                        <input
                          type="checkbox"
                          checked={selectedPersona.actaMatrimonio}
                          onChange={(e) => updatePersona(selectedPersona.id, { actaMatrimonio: e.target.checked })}
                          className="mt-0.5 accent-[#076525] w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <span className="text-xs font-mono uppercase font-semibold block">
                            Acta de Matrimonio Conseguida
                          </span>
                          <span className="text-[10px] text-neutral-500">
                            Partida literal de matrimonio (Registro Civil o eclesiástica parroquial)
                          </span>
                        </div>
                      </label>
                    </div>

                    <div className="p-3.5 bg-neutral-50 border border-neutral-200 flex items-start gap-2 text-xs text-neutral-600 leading-relaxed font-light">
                      <Info className="w-4 h-4 text-[#07214e] shrink-0 mt-0.5" />
                      <div>
                        <strong>Importancia Consular del Matrimonio:</strong> En Uruguay, el acta de matrimonio es frecuentemente el documento con mayor riqueza genealógica, pues suele registrar los nombres y lugares de origen de los cuatro progenitores y verificar que la filiación del hijo fue legítima según el código civil italiano.
                      </div>
                    </div>

                  </div>
                )}

              </div>
            </div>

            {/* Acciones Rápidas Inferiores */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-white border border-neutral-200 text-xs font-mono">
              <button
                type="button"
                onClick={handleAddGeneration}
                className="inline-flex items-center gap-1.5 text-[#07214e] hover:underline cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir Generación Arriba</span>
              </button>

              {personas.length > 2 && (
                <button
                  type="button"
                  onClick={handleRemoveTopGeneration}
                  className="inline-flex items-center gap-1.5 text-neutral-500 hover:text-red-700 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Quitar Eslabón Superior</span>
                </button>
              )}
            </div>

          </div>

          {/* ===================================================================== */}
          {/* PANEL DERECHO: ÁRBOL GENEALÓGICO COMPACTO CON PAREJAS (col-span-7)     */}
          {/* ===================================================================== */}
          <div className="lg:col-span-7 xl:col-span-7 lg:sticky lg:top-24 space-y-4">
            
            {/* Header del Panel Derecho */}
            <div className="bg-white border border-neutral-200 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#076525]" />
                  <h2 className="font-serif text-lg md:text-xl text-[#07214e] font-medium leading-tight">
                    Estructura Genealógica del Expediente
                  </h2>
                </div>
                <p className="text-xs text-neutral-500 font-light mt-0.5">
                  Visualización compacta en tiempo real · Hacé clic en cualquier integrante o matrimonio para editarlo.
                </p>
              </div>

              <div className="text-[11px] font-mono text-neutral-500 bg-[#FBFBFA] px-2.5 py-1 border border-neutral-200 shrink-0">
                Línea descendente (Avo ➔ Yo)
              </div>
            </div>

            {/* Contenedor del Árbol Genealógico Editorial */}
            <div className="bg-white border border-neutral-200 p-4 sm:p-6 shadow-2xs overflow-x-auto">
              <div className="flex flex-col items-center min-w-[340px] py-2 select-none">
                
                {descendingPersonas.map((persona, index) => {
                  const isAvo = persona.esAvo;
                  const isSelectedGen = persona.id === selectedPersona.id;
                  const isSelectedAntepasado = isSelectedGen && activeTab === 'antepasado';
                  const isSelectedConyuge = isSelectedGen && activeTab === 'conyuge';
                  const isSelectedMatrimonio = isSelectedGen && activeTab === 'matrimonio';

                  const birthYearAntepasado = getYearFromDate(persona.fechaNacimiento);
                  const deathYearAntepasado = !persona.viveActualmente ? getYearFromDate(persona.fechaDefuncion) : '';

                  const birthYearConyuge = getYearFromDate(persona.fechaNacimientoConyuge);
                  const deathYearConyuge = !persona.viveConyuge ? getYearFromDate(persona.fechaDefuncionConyuge) : '';

                  const marriageYear = getYearFromDate(persona.fechaMatrimonio);

                  return (
                    <React.Fragment key={persona.id}>
                      
                      {/* Generación: Cabecera pequeña */}
                      <div className="w-[338px] flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-1.5 px-1">
                        <span className="tracking-widest uppercase font-semibold">
                          GEN {persona.generationIndex} · {isAvo ? 'AVO ITALIANO' : persona.generationIndex === 0 ? 'SOLICITANTE' : 'TRANSMISIÓN'}
                        </span>
                        {isAvo && (
                          <span className="text-[#076525] font-bold uppercase tracking-wider text-[9px] bg-emerald-50 px-1.5 py-0.2 border border-emerald-200">
                            Raíz del Derecho
                          </span>
                        )}
                      </div>

                      {/* Pareja: Fila de dos nodos lado a lado con conector central de matrimonio */}
                      <div className="flex items-center justify-center w-[338px] relative">
                        
                        {/* 1. NODO IZQUIERDO: ANTEPASADO DE LA LÍNEA */}
                        <div
                          onClick={() => {
                            setSelectedId(persona.id);
                            setActiveTab('antepasado');
                          }}
                          className={`w-[145px] min-h-[92px] p-2.5 bg-white border transition-all cursor-pointer relative text-left flex flex-col justify-between shadow-3xs ${
                            isSelectedAntepasado
                              ? isAvo
                                ? 'border-[#076525] ring-2 ring-[#076525]/25 bg-emerald-50/15'
                                : 'border-[#07214e] ring-2 ring-[#07214e]/25 bg-blue-50/15'
                              : isAvo
                                ? 'border-[#076525]/60 hover:border-[#076525]'
                                : 'border-neutral-300 hover:border-neutral-500'
                          } ${isAvo ? 'border-t-[3px] border-t-[#076525]' : ''}`}
                        >
                          {/* Top: Avatar/Bandera + Parentesco */}
                          <div className="flex items-center justify-between gap-1">
                            <span className="w-5 h-5 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center text-[12px] shrink-0" title={getCountryData(persona.paisNacimiento).label}>
                              <CountryFlag country={persona.paisNacimiento} className="w-5 h-auto rounded-[2px]" />
                            </span>
                            <span className={`text-[9px] font-mono tracking-wider uppercase truncate px-1 py-0.2 font-medium ${
                              isAvo 
                                ? 'bg-[#076525]/10 text-[#076525]' 
                                : isSelectedAntepasado
                                  ? 'bg-[#07214e]/10 text-[#07214e]'
                                  : 'bg-neutral-100 text-neutral-600'
                            }`}>
                              {persona.parentesco.split(' ')[0]}
                            </span>
                          </div>

                          {/* Nombre completo */}
                          <div className="my-1">
                            <div className={`font-serif text-xs leading-snug line-clamp-2 font-medium ${
                              persona.nombreCompleto.trim() ? 'text-[#07214e]' : 'text-neutral-400 italic font-light'
                            }`}>
                              {persona.nombreCompleto.trim() || persona.parentesco}
                            </div>
                          </div>

                          {/* Año de nacimiento y estado vital */}
                          <div className="flex items-center justify-between text-[9px] font-mono text-neutral-500 pt-1 border-t border-neutral-100">
                            <span className="truncate">
                              {birthYearAntepasado ? `n. ${birthYearAntepasado}` : '—'}
                            </span>
                            <div className="flex items-center gap-1">
                              {persona.actaNacimiento && (
                                <span className="text-[#076525] font-bold" title="Acta de Nacimiento conseguida">✓</span>
                              )}
                              {persona.viveActualmente ? (
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" title="Vive actualmente" />
                              ) : deathYearAntepasado ? (
                                <span className="text-neutral-400" title={`Fallecido en ${deathYearAntepasado}`}>
                                  †{deathYearAntepasado}
                                </span>
                              ) : null}
                            </div>
                          </div>

                          {/* Badge flotante cuando está seleccionado */}
                          {isSelectedAntepasado && (
                            <div className={`absolute -top-2 left-2 px-1 py-0.2 text-[7.5px] font-mono uppercase tracking-widest text-white shadow-2xs ${
                              isAvo ? 'bg-[#076525]' : 'bg-[#07214e]'
                            }`}>
                              Editando
                            </div>
                          )}
                        </div>

                        {/* 2. CONECTOR CENTRAL: MATRIMONIO */}
                        <div className="flex flex-col items-center justify-center w-[48px] shrink-0 relative h-[92px]">
                          {/* Línea horizontal de unión matrimonial */}
                          <div className="w-full h-0.5 bg-neutral-300 absolute top-1/2 -translate-y-1/2 z-0" />
                          
                          {/* Botón de matrimonio */}
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedId(persona.id);
                              setActiveTab('matrimonio');
                            }}
                            title={persona.fechaMatrimonio ? `Matrimonio: ${persona.fechaMatrimonio}` : 'Editar Matrimonio'}
                            className={`z-10 w-7 h-7 rounded-full border flex items-center justify-center text-xs transition-transform hover:scale-110 cursor-pointer shadow-2xs ${
                              isSelectedMatrimonio
                                ? 'bg-[#07214e] border-[#07214e] text-white ring-2 ring-[#07214e]/25'
                                : persona.actaMatrimonio
                                  ? 'bg-emerald-50 border-[#076525] text-[#076525]'
                                  : persona.fechaMatrimonio || persona.lugarMatrimonio
                                    ? 'bg-amber-50 border-amber-300 text-amber-900'
                                    : 'bg-white border-neutral-300 text-neutral-500 hover:border-neutral-500'
                            }`}
                          >
                            <Heart className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>

                          {/* Año de matrimonio debajo del botón */}
                          {marriageYear && (
                            <span className="absolute top-[calc(50%+16px)] text-[8px] font-mono text-neutral-500 bg-white/90 px-1 border border-neutral-200">
                              m.{marriageYear}
                            </span>
                          )}
                        </div>

                        {/* 3. NODO DERECHO: ESPOSA / CÓNYUGE */}
                        <div
                          onClick={() => {
                            setSelectedId(persona.id);
                            setActiveTab('conyuge');
                          }}
                          className={`w-[145px] min-h-[92px] p-2.5 bg-white border transition-all cursor-pointer relative text-left flex flex-col justify-between shadow-3xs ${
                            isSelectedConyuge
                              ? 'border-[#07214e] ring-2 ring-[#07214e]/25 bg-blue-50/15'
                              : 'border-neutral-300 hover:border-neutral-500'
                          }`}
                        >
                          {/* Top: Avatar/Bandera + Rol */}
                          <div className="flex items-center justify-between gap-1">
                            <span className="w-5 h-5 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center text-[12px] shrink-0" title={getCountryData(persona.paisConyuge).label}>
                              <CountryFlag country={persona.paisConyuge} className="w-5 h-auto rounded-[2px]" />
                            </span>
                            <span className={`text-[9px] font-mono tracking-wider uppercase truncate px-1 py-0.2 font-medium ${
                              isSelectedConyuge
                                ? 'bg-[#07214e]/10 text-[#07214e]'
                                : 'bg-neutral-100 text-neutral-600'
                            }`}>
                              {(persona.parentescoConyuge || 'Esposa').split(' ')[0]}
                            </span>
                          </div>

                          {/* Nombre completo de la Esposa */}
                          <div className="my-1">
                            <div className={`font-serif text-xs leading-snug line-clamp-2 font-medium ${
                              persona.nombreConyuge.trim() ? 'text-[#07214e]' : 'text-neutral-400 italic font-light'
                            }`}>
                              {persona.nombreConyuge.trim() || persona.parentescoConyuge || 'Esposa / Pareja'}
                            </div>
                          </div>

                          {/* Año de nacimiento y estado vital de la esposa */}
                          <div className="flex items-center justify-between text-[9px] font-mono text-neutral-500 pt-1 border-t border-neutral-100">
                            <span className="truncate">
                              {birthYearConyuge ? `n. ${birthYearConyuge}` : '—'}
                            </span>
                            <div className="flex items-center gap-1">
                              {persona.actaNacimientoConyuge && (
                                <span className="text-[#076525] font-bold" title="Acta de Nacimiento de la cónyuge conseguida">✓</span>
                              )}
                              {persona.viveConyuge ? (
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" title="Vive actualmente" />
                              ) : deathYearConyuge ? (
                                <span className="text-neutral-400" title={`Fallecida en ${deathYearConyuge}`}>
                                  †{deathYearConyuge}
                                </span>
                              ) : null}
                            </div>
                          </div>

                          {/* Badge flotante cuando está seleccionada */}
                          {isSelectedConyuge && (
                            <div className="absolute -top-2 right-2 px-1 py-0.2 text-[7.5px] font-mono uppercase tracking-widest text-white bg-[#07214e] shadow-2xs">
                              Editando
                            </div>
                          )}
                        </div>

                      </div>

                      {/* Conector Ortogonal Vertical a la Siguiente Generación */}
                      {index < descendingPersonas.length - 1 && (
                        <div className="w-[338px] h-8 relative flex items-center justify-center select-none" aria-hidden="true">
                          <svg className="w-full h-full" viewBox="0 0 338 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Línea desde el matrimonio central (x=169, y=0) hacia el hijo antepasado abajo (x=72.5, y=32) */}
                            <path 
                              d="M 169 0 V 16 H 72.5 V 32" 
                              stroke="#94a3b8" 
                              strokeWidth="1.5" 
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            {/* Flecha terminal indicando filiación hacia el hijo */}
                            <polygon points="69.5,28 72.5,32 75.5,28" fill="#64748b" />
                            {/* Texto sutil de filiación directa */}
                            <text x="120" y="12" textAnchor="middle" fill="#9ca3af" fontSize="8" fontFamily="monospace">
                              filiación ↓
                            </text>
                          </svg>
                        </div>
                      )}

                    </React.Fragment>
                  );
                })}

              </div>
            </div>

            {/* Resumen y Leyenda al pie del árbol */}
            <div className="bg-white border border-neutral-200 p-4 shadow-2xs space-y-2 text-xs font-mono text-neutral-600">
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 uppercase tracking-wider text-[10px]">
                  Leyenda del Árbol Consular
                </span>
                <span className="text-[#07214e] font-semibold">
                  {personas.length} Generaciones Mapeadas
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-500 pt-1 border-t border-neutral-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-white border border-[#076525] border-t-2 border-t-[#076525] shrink-0" />
                  <span>Avo Italiano (Raíz)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-white border border-[#07214e] shrink-0" />
                  <span>Antepasado / Cónyuge</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border border-neutral-300 flex items-center justify-center shrink-0"><Heart className="w-2.5 h-2.5" aria-hidden="true" /></span>
                  <span>Matrimonio (Click para editar)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#076525] font-bold">✓</span>
                  <span>Acta conseguida</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* GUÍA INFORMATIVA CONSULAR INFERIOR                                        */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-neutral-200">
          <div className="bg-white p-5 border border-neutral-200 space-y-2 shadow-2xs">
            <h4 className="font-serif text-base text-[#07214e] flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#076525]" />
              Cadena Sin Fisuras
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              La ciudadanía italiana se transmite por sangre (<em>iure sanguinis</em>) de generación en generación. Cada matrimonio y nacimiento debe estar documentado con actas completas legalizadas o apostilladas.
            </p>
          </div>

          <div className="bg-white p-5 border border-neutral-200 space-y-2 shadow-2xs">
            <h4 className="font-serif text-base text-[#07214e] flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#FEBF02]" />
              Corte Electoral de Uruguay
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              Es el certificado más importante en Uruguay. Si el Avo se naturalizó como ciudadano legal uruguayo antes de nacer su hijo/a, se rompe la cadena. Si nunca se naturalizó o lo hizo después, el derecho permanece intacto.
            </p>
          </div>

          <div className="bg-white p-5 border border-neutral-200 space-y-2 shadow-2xs">
            <h4 className="font-serif text-base text-[#07214e] flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#07214e]" />
              Carta a la Comuna
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              ¿No tenés la partida de nacimiento italiana? Utilizá nuestro 
              <button 
                onClick={() => onNavigate?.('carta-comuna')}
                className="text-[#07214e] underline font-medium ml-1 cursor-pointer hover:text-blue-800"
              >
                Generador de Carta a la Comuna
              </button> para solicitar el <em>Estratto per riassunto dell'atto di nascita</em> en italiano formal.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MiArbol;

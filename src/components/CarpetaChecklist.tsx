import React, { useState, useEffect } from 'react';
import { DEFAULT_CHECKLIST_ITEMS } from '../data/checklistData';
import type { ChecklistItem } from '../types';
import { CheckSquare, CheckCircle, Clock, AlertCircle, Plus, Trash2, RotateCcw, Download, Filter, Bookmark } from 'lucide-react';

const STORAGE_KEY = 'via_nostra_family_checklist_v1';

const CATEGORY_LABELS: Record<ChecklistItem['category'], { label: string; badge: string; color: string }> = {
  avo: { label: 'Rama Avo Italiano', badge: 'Origen', color: 'border-l-[#D97706]' },
  intermedia: { label: 'Generación Intermedia (Padres / Abuelos)', badge: 'Puente', color: 'border-l-[#38BDF8]' },
  solicitante: { label: 'Generación Solicitante (Vos e Hijos)', badge: 'Titular', color: 'border-l-[#15803D]' },
  legalizaciones: { label: 'Legalizaciones, Apostillas y Traducciones', badge: 'Validez Legal', color: 'border-l-[#9333EA]' },
};

export const CarpetaChecklist: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return DEFAULT_CHECKLIST_ITEMS;
  });

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('todos');
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>('todos');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState<string>('');

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage full or disabled
    }
  }, [items]);

  const totalItems = items.length;
  const completedItems = items.filter(i => i.status === 'conseguido').length;
  const inProgressItems = items.filter(i => i.status === 'en_tramite').length;
  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const handleStatusChange = (id: string, newStatus: ChecklistItem['status']) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const handleCycleStatus = (id: string) => {
    setItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      if (item.status === 'pendiente') return { ...item, status: 'en_tramite' };
      if (item.status === 'en_tramite') return { ...item, status: 'conseguido' };
      return { ...item, status: 'pendiente' };
    }));
  };

  const handleSaveNote = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, notes: noteText } : item));
    setEditingNoteId(null);
  };

  const handleResetChecklist = () => {
    if (window.confirm('¿Seguro que deseás reiniciar el checklist al estado original? Se perderán las notas personalizadas.')) {
      setItems(DEFAULT_CHECKLIST_ITEMS);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleAddCustomItem = () => {
    const title = window.prompt('Título del documento o trámite adicional:');
    if (!title || !title.trim()) return;

    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      category: 'solicitante',
      title: title.trim(),
      description: 'Documento personalizado añadido a tu carpeta.',
      whereToGet: 'Organismo correspondiente',
      status: 'pendiente',
      notes: '',
      isCustom: true
    };

    setItems(prev => [...prev, newItem]);
  };

  const handleDeleteCustomItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleExportSummary = () => {
    const content = `CARPETA FAMILIAR VIA NOSTRA - ESTADO DEL EXPEDIENTE
Fecha de exportación: ${new Date().toLocaleDateString('es-UY')}
Progreso: ${progressPercent}% (${completedItems} de ${totalItems} completados)
En trámite: ${inProgressItems}

--------------------------------------------------
${items.map(item => `[${item.status.toUpperCase()}] ${item.title}
Organismo: ${item.whereToGet}
Notas: ${item.notes || 'Ninguna'}
`).join('\n--------------------------------------------------\n')}
`;
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `carpeta_familiar_via_nostra_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const filteredItems = items.filter(item => {
    const matchesCat = activeCategoryFilter === 'todos' || item.category === activeCategoryFilter;
    const matchesStatus = activeStatusFilter === 'todos' || item.status === activeStatusFilter;
    return matchesCat && matchesStatus;
  });

  return (
    <section id="checklist" className="py-20 bg-[#F4F1EA] text-[#0F172A] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A192F] text-[#FAF9F6] text-xs font-mono">
            <CheckSquare className="w-4 h-4 text-[#D97706]" />
            <span>Almacenamiento Local Automático</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A192F]">
            Checklist de Carpeta Familiar
          </h2>

          <p className="text-[#475569] text-base leading-relaxed">
            Hacé el seguimiento minucioso de cada acta de la cadena genealógica. Tus avances se guardan en tu navegador para que nunca pierdas el hilo de qué tenés y qué falta pedir.
          </p>
        </div>

        {/* Global Progress Dashboard Card */}
        <div className="bg-[#0A192F] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-[#1E293B] mb-10 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            
            {/* Left stats */}
            <div className="sm:col-span-8 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#D97706] uppercase tracking-wider font-bold">
                  Avance General del Expediente
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#F59E0B]">
                  {progressPercent}%
                </span>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full bg-[#1E293B] h-4 rounded-full overflow-hidden p-0.5 border border-[#334155]">
                <div
                  className="bg-gradient-to-r from-[#D97706] via-[#15803D] to-[#10B981] h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#94A3B8] pt-1">
                <span className="flex items-center gap-1.5 text-white">
                  <CheckCircle className="w-4 h-4 text-[#15803D]" /> {completedItems} conseguidos
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#38BDF8]" /> {inProgressItems} en trámite
                </span>
                <span className="flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-[#94A3B8]" /> {totalItems - completedItems - inProgressItems} pendientes
                </span>
              </div>
            </div>

            {/* Right quick actions */}
            <div className="sm:col-span-4 flex flex-col gap-2.5 sm:border-l sm:border-[#1E293B] sm:pl-6">
              <button
                onClick={handleAddCustomItem}
                className="w-full py-2.5 px-3 rounded-xl bg-[#1E293B] hover:bg-[#334155] text-xs font-semibold text-[#FAF9F6] flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4 text-[#D97706]" />
                <span>Agregar Documento</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={handleExportSummary}
                  className="flex-1 py-2 px-3 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-[11px] font-mono text-[#CBD5E1] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Exportar</span>
                </button>

                <button
                  onClick={handleResetChecklist}
                  className="py-2 px-3 rounded-lg bg-[#1E293B] hover:bg-[#B91C1C]/30 text-[11px] font-mono text-[#94A3B8] hover:text-[#EF4444] transition-colors"
                  title="Reiniciar lista"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-4 rounded-xl border border-[#E2E8F0]">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#64748B] flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Rama:
            </span>
            <button
              onClick={() => setActiveCategoryFilter('todos')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                activeCategoryFilter === 'todos'
                  ? 'bg-[#0A192F] text-white'
                  : 'bg-[#FAF9F6] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
            >
              Todas
            </button>
            {Object.entries(CATEGORY_LABELS).map(([catKey, catVal]) => (
              <button
                key={catKey}
                onClick={() => setActiveCategoryFilter(catKey)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  activeCategoryFilter === catKey
                    ? 'bg-[#0A192F] text-white'
                    : 'bg-[#FAF9F6] text-[#475569] hover:bg-[#E2E8F0]'
                }`}
              >
                {catVal.label.split('(')[0]}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#64748B]">Estado:</span>
            <select
              value={activeStatusFilter}
              onChange={(e) => setActiveStatusFilter(e.target.value)}
              className="text-xs py-1 px-2.5 rounded-lg border border-[#CBD5E1] bg-white text-[#0F172A] focus:outline-none"
            >
              <option value="todos">Todos los estados</option>
              <option value="pendiente">Solo Pendientes</option>
              <option value="en_tramite">Solo En Trámite</option>
              <option value="conseguido">Solo Conseguidos</option>
            </select>
          </div>
        </div>

        {/* Checklist Cards Container */}
        <div className="space-y-3">
          {filteredItems.map((item) => {
            const catInfo = CATEGORY_LABELS[item.category] || CATEGORY_LABELS.solicitante;
            const isEditingNote = editingNoteId === item.id;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-4 sm:p-5 transition-all border-l-4 ${catInfo.color}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  {/* Left: Checkmark and item details */}
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <button
                      onClick={() => handleCycleStatus(item.id)}
                      className="shrink-0 mt-0.5 focus:outline-none group"
                      title="Haz clic para alternar estado (Pendiente -> En trámite -> Conseguido)"
                    >
                      {item.status === 'conseguido' && (
                        <div className="w-6 h-6 rounded-md bg-[#15803D] text-white flex items-center justify-center shadow">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                      )}
                      {item.status === 'en_tramite' && (
                        <div className="w-6 h-6 rounded-md bg-[#0284C7] text-white flex items-center justify-center shadow">
                          <Clock className="w-4 h-4" />
                        </div>
                      )}
                      {item.status === 'pendiente' && (
                        <div className="w-6 h-6 rounded-md border-2 border-[#CBD5E1] group-hover:border-[#0A192F] transition-colors" />
                      )}
                    </button>

                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#FAF9F6] text-[#64748B] border border-[#E2E8F0]">
                          {catInfo.badge}
                        </span>
                        <h4 className={`font-serif text-sm sm:text-base font-bold ${
                          item.status === 'conseguido' ? 'text-[#64748B] line-through' : 'text-[#0A192F]'
                        }`}>
                          {item.title}
                        </h4>
                      </div>

                      <p className="text-xs text-[#475569] leading-relaxed">
                        {item.description}
                      </p>

                      <div className="text-[11px] font-mono text-[#0369A1] flex items-center gap-1 pt-0.5">
                        <span className="text-[#64748B]">Organismo:</span>
                        <span>{item.whereToGet}</span>
                      </div>

                      {/* Notes Section */}
                      {item.notes && !isEditingNote && (
                        <div className="mt-2 p-2 rounded-lg bg-[#FAF9F6] border border-[#E2E8F0] text-xs text-[#334155] flex items-start gap-1.5">
                          <Bookmark className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                          <span className="italic">{item.notes}</span>
                        </div>
                      )}

                      {isEditingNote && (
                        <div className="mt-2 flex gap-2">
                          <input
                            type="text"
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="Escribí una nota (ej. 'Tomo 5, Acta 43')..."
                            className="flex-1 p-1.5 text-xs rounded border border-[#CBD5E1] focus:ring-1 focus:ring-[#0A192F] focus:outline-none"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveNote(item.id)}
                            className="px-3 py-1 bg-[#0A192F] text-white text-xs rounded font-medium"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={() => setEditingNoteId(null)}
                            className="px-2 py-1 text-xs text-[#64748B]"
                          >
                            Cancelar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Status selector and note triggers */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F1F5F9]">
                    <div className="flex items-center gap-1.5">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value as ChecklistItem['status'])}
                        className={`text-xs font-semibold py-1 px-2.5 rounded-lg border focus:outline-none transition-colors ${
                          item.status === 'conseguido'
                            ? 'bg-[#15803D]/10 text-[#15803D] border-[#15803D]/30'
                            : item.status === 'en_tramite'
                            ? 'bg-[#0284C7]/10 text-[#0284C7] border-[#0284C7]/30'
                            : 'bg-gray-100 text-gray-700 border-gray-300'
                        }`}
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="en_tramite">En Trámite</option>
                        <option value="conseguido">Conseguido</option>
                      </select>

                      {item.isCustom && (
                        <button
                          onClick={() => handleDeleteCustomItem(item.id)}
                          className="p-1 rounded text-[#94A3B8] hover:text-[#EF4444]"
                          title="Eliminar ítem"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {!isEditingNote && (
                      <button
                        onClick={() => {
                          setEditingNoteId(item.id);
                          setNoteText(item.notes || '');
                        }}
                        className="text-[11px] font-mono text-[#64748B] hover:text-[#0A192F] underline"
                      >
                        {item.notes ? 'Editar nota' : '+ Agregar nota'}
                      </button>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

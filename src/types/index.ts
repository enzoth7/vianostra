export interface VideoEpisode {
  id: string;
  episodeNumber: number;
  title: string;
  subtitle: string;
  duration: string;
  location: string;
  category: 'estrategia' | 'italia' | 'uruguay' | 'genealogia';
  summary: string;
  youtubeId?: string;
  youtubeUrl?: string;
  tiktokUrl?: string;
  platform: 'youtube' | 'tiktok' | 'ambos';
  videoType: 'masterclass' | 'reel_tip';
  embedUrl?: string;
  coverImage: string;
  topics: string[];
  keyTakeaways: string[];
  documentsMentioned?: string[];
  date: string;
}

export interface EvaluatorQuestion {
  id: string;
  title: string;
  subtitle: string;
  options: {
    id: string;
    label: string;
    description: string;
    tag?: string;
  }[];
}

export interface RutaStep {
  stepNumber: number;
  title: string;
  tagline: string;
  institution: string;
  country: 'uruguay' | 'italia' | 'digital';
  description: string;
  actionItems: string[];
  insiderTip: string;
  resourceLinks: { label: string; url: string; badge?: string }[];
  iconName: string;
}

export interface ComuneRequestData {
  // Applicant details
  applicantName: string;
  applicantBirthDate: string;
  applicantBirthPlace: string;
  applicantAddress: string;
  applicantCityCountry: string;
  applicantEmail: string;
  applicantPhone: string;
  applicantIdNumber: string;
  
  // Avo (ancestor) details
  avoName: string;
  avoAlternativeNames: string;
  avoBirthDate: string;
  avoBirthDateIsApprox: boolean;
  avoFatherName: string;
  avoMotherName: string;
  avoComune: string;
  avoProvince: string;
  
  // Request specifics
  documentType: 'estratto_nascita_plurilingue' | 'estratto_nascita_completo' | 'copia_integrale' | 'certificato_matrimonio';
  deliveryMethod: 'pec_email' | 'posta_ordinaria';
  hasIdAttached: boolean;
  notes: string;
}

export interface ChecklistItem {
  id: string;
  category: 'avo' | 'intermedia' | 'solicitante' | 'legalizaciones';
  title: string;
  description: string;
  whereToGet: string;
  status: 'pendiente' | 'en_tramite' | 'conseguido';
  notes?: string;
  isCustom?: boolean;
}

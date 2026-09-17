export type NeuroProfileId = 'tea' | 'tdah' | 'dislexia' | 'baixa_visao' | 'pei_personalizado';

export interface NeuroProfile {
  id: NeuroProfileId;
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  badge: string;
  color: string;
  accentClass: string;
  bgLightClass: string;
  borderClass: string;
  strategies: string[];
}

export interface StudentInfo {
  schoolName: string;
  studentName: string;
  gradeLevel: string;
  subject: string;
  teacherName: string;
  date: string;
  customPeiNotes?: string;
}

export interface AdaptedQuestion {
  id: number;
  originalSnippet?: string;
  adaptedTitle?: string;
  adaptedQuestion: string;
  steps?: string[];
  adaptedOptions?: string[];
  visualCue?: string;
  pedagogicalRationale: string;
}

export interface AdaptationResult {
  profileId: NeuroProfileId;
  profileName: string;
  adaptedTitle: string;
  adaptedGeneralInstructions: string;
  questions: AdaptedQuestion[];
  pedagogicalSummary: string; // Justificativa legal e pedagógica (LBI nº 13.146/2015 e BNCC)
  pedagogicalTipsForTeacher: string[]; // Dicas práticas de mediação em sala
  appliedStrategies: string[];
}

export interface ExamSample {
  id: string;
  title: string;
  subject: string;
  grade: string;
  originalText: string;
  suggestedProfile: NeuroProfileId;
}
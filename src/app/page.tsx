'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Header } from '@/components/Header';
import { ProfileSelector } from '@/components/ProfileSelector';
import { ActivityInput } from '@/components/ActivityInput';
import { AdaptedPreview } from '@/components/AdaptedPreview';
import { SettingsModal } from '@/components/SettingsModal';
import { SalesPitchModal } from '@/components/SalesPitchModal';
import { EXAM_SAMPLES } from '@/lib/samples';
import { NeuroProfileId, StudentInfo, AdaptationResult } from '@/types';
import { NEURO_PROFILES } from '@/lib/profiles';
import { Sparkles, CheckCircle2, ShieldCheck, Clock, Users, ArrowDown, AlertTriangle } from 'lucide-react';

export default function Home() {
  const [selectedProfile, setSelectedProfile] = useState<NeuroProfileId>('tdah');
  const [customPeiNotes, setCustomPeiNotes] = useState('');
  const [originalText, setOriginalText] = useState(EXAM_SAMPLES[0].originalText);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AdaptationResult | null>(null);

  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    schoolName: 'Colégio Integrado Nova Educação',
    studentName: 'Lucas Ferreira',
    gradeLevel: '5º Ano A',
    subject: 'Matemática',
    teacherName: 'Profa. Mariana Costa',
    date: new Date().toLocaleDateString('pt-BR'),
  });

  const [apiKey, setApiKey] = useState('');
  const [fontMode, setFontMode] = useState<'lexend' | 'inter'>('lexend');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPitchOpen, setIsPitchOpen] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);

  // Carrega configurações salvas do localStorage
  useEffect(() => {
    try {
      const savedKey = localStorage.getItem('adaptedu_gemini_key');
      if (savedKey) setApiKey(savedKey);

      const savedSchool = localStorage.getItem('adaptedu_school_info');
      if (savedSchool) {
        setStudentInfo(prev => ({ ...prev, ...JSON.parse(savedSchool) }));
      }

      const savedFont = localStorage.getItem('adaptedu_font_mode');
      if (savedFont === 'inter' || savedFont === 'lexend') {
        setFontMode(savedFont);
      }
    } catch (e) {
      console.warn('Não foi possível ler dados do localStorage:', e);
    }
  }, []);

  // Salva no localStorage quando alterado
  const handleUpdateApiKey = (key: string) => {
    setApiKey(key);
    try {
      localStorage.setItem('adaptedu_gemini_key', key);
    } catch (e) {}
  };

  const handleUpdateStudentInfo = (info: StudentInfo) => {
    setStudentInfo(info);
    try {
      localStorage.setItem('adaptedu_school_info', JSON.stringify(info));
    } catch (e) {}
  };

  const handleUpdateFontMode = (mode: 'inter' | 'lexend') => {
    setFontMode(mode);
    try {
      localStorage.setItem('adaptedu_font_mode', mode);
    } catch (e) {}
  };

  const handleSelectSample = (sampleId: string) => {
    const sample = EXAM_SAMPLES.find(s => s.id === sampleId);
    if (!sample) return;

    setOriginalText(sample.originalText);
    setSelectedProfile(sample.suggestedProfile);
    setStudentInfo(prev => ({
      ...prev,
      subject: sample.subject,
      gradeLevel: sample.grade
    }));
  };

  const handleAdapt = async () => {
    if (!originalText.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/adapt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalText,
          profileId: selectedProfile,
          apiKey,
          studentName: studentInfo.studentName,
          customPeiNotes: selectedProfile === 'pei_personalizado' ? customPeiNotes : undefined
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Falha ao adaptar a atividade.');
      }

      const adaptedData: AdaptationResult = await response.json();
      setResult(adaptedData);

      // Rola suavemente até o resultado
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error('Erro na adaptação:', err);
      setError(err.message || 'Ocorreu um erro ao comunicar com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  const currentProfile = NEURO_PROFILES[selectedProfile] || NEURO_PROFILES.tdah;

  return (
    <div className={`flex-1 flex flex-col ${fontMode === 'lexend' ? 'font-[family-name:var(--font-lexend)]' : 'font-[family-name:var(--font-inter)]'}`}>
      <Header
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenPitch={() => setIsPitchOpen(true)}
        studentInfo={studentInfo}
        fontMode={fontMode}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        {/* Banner de Apresentação / Hero */}
        <section className="print:hidden text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Conformidade Legal com a Lei nº 13.146/2015 & BNCC</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
            Adapte Avaliações para Alunos <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
              Neurodivergentes em 30 Segundos
            </span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Elimine barreiras de aprendizagem sem rebaixar o conteúdo curricular. Gere folhas de prova prontas para impressão A4 e o parecer técnico do PEI com rigor pedagógico.
          </p>

          {/* Métricas Rápidas de Valor (Para Venda e Confiança) */}
          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto pt-2 text-left">
            <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center">
              <div className="text-base sm:text-lg font-extrabold text-indigo-600 flex items-center justify-center gap-1">
                <Clock className="w-4 h-4" /> 30 seg
              </div>
              <div className="text-[10px] sm:text-xs text-neutral-500">vs 4h manuais</div>
            </div>

            <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center">
              <div className="text-base sm:text-lg font-extrabold text-emerald-600 flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4" /> 100% LBI
              </div>
              <div className="text-[10px] sm:text-xs text-neutral-500">Parecer PEI oficial</div>
            </div>

            <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center">
              <div className="text-base sm:text-lg font-extrabold text-violet-600 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> A4 Pronto
              </div>
              <div className="text-[10px] sm:text-xs text-neutral-500">Impressão direta</div>
            </div>
          </div>
        </section>

        {/* 1. Seletor de Perfil */}
        <section className="print:hidden">
          <ProfileSelector
            selectedProfile={selectedProfile}
            onSelectProfile={setSelectedProfile}
            customPeiNotes={customPeiNotes}
            onChangeCustomPeiNotes={setCustomPeiNotes}
          />
        </section>

        {/* 2. Entrada da Atividade */}
        <section className="print:hidden">
          <ActivityInput
            originalText={originalText}
            onChangeText={setOriginalText}
            onSelectSample={handleSelectSample}
            onAdapt={handleAdapt}
            isLoading={isLoading}
            selectedProfile={selectedProfile}
          />
        </section>

        {/* Mensagem de Erro se houver */}
        {error && (
          <div className="print:hidden p-4 rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* 3. Área de Visualização e Impressão da Atividade Adaptada */}
        <section ref={resultRef} className="space-y-4">
          {result ? (
            <div className="space-y-4">
              <div className="print:hidden flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                    <span>3. Avaliação Adaptada & Instrumentos de Inclusão</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                      Pronta para Aplicação
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Clique em &quot;Imprimir Prova A4&quot; para gerar a folha limpa sem cabeçalhos de sistema.
                  </p>
                </div>
              </div>

              <AdaptedPreview
                result={result}
                originalText={originalText}
                studentInfo={studentInfo}
                selectedProfile={selectedProfile}
              />
            </div>
          ) : (
            <div className="print:hidden text-center py-12 px-4 rounded-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-800 bg-white/40 dark:bg-neutral-900/40">
              <Sparkles className="w-8 h-8 text-indigo-400 mx-auto mb-2 opacity-60" />
              <h4 className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                Nenhuma avaliação adaptada gerada ainda
              </h4>
              <p className="text-xs text-neutral-500 max-w-md mx-auto mt-1">
                Escolha o perfil de neurodivergência acima e clique no botão &quot;Adaptar Atividade Agora&quot; ou utilize uma das amostras reais para ver o resultado em segundos.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Rodapé */}
      <footer className="print:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 py-6 text-center text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div>
            <strong>AdaptEdu</strong> • Tecnologia a favor da Inclusão Escolar e da Acessibilidade Pedagógica
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button
              type="button"
              onClick={() => setIsPitchOpen(true)}
              className="text-emerald-600 hover:underline font-semibold"
            >
              💼 Oportunidade Comercial para Escolas
            </button>
            <button
              type="button"
              onClick={() => setIsSettingsOpen(true)}
              className="text-neutral-500 hover:underline"
            >
              Configurações
            </button>
          </div>
        </div>
      </footer>

      {/* Modais */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        studentInfo={studentInfo}
        onChangeStudentInfo={handleUpdateStudentInfo}
        apiKey={apiKey}
        onChangeApiKey={handleUpdateApiKey}
        fontMode={fontMode}
        onChangeFontMode={handleUpdateFontMode}
      />

      <SalesPitchModal
        isOpen={isPitchOpen}
        onClose={() => setIsPitchOpen(false)}
      />
    </div>
  );
}
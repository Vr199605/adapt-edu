'use client';

import React, { useState } from 'react';
import { AdaptationResult, StudentInfo, NeuroProfileId } from '@/types';
import { PrintHeader } from './PrintHeader';
import { PedagogicalReport } from './PedagogicalReport';
import { NEURO_PROFILES } from '@/lib/profiles';
import { 
  Printer, 
  Copy, 
  Download, 
  Columns, 
  FileText, 
  ShieldCheck, 
  Check, 
  Type, 
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface AdaptedPreviewProps {
  result: AdaptationResult;
  originalText: string;
  studentInfo: StudentInfo;
  selectedProfile: NeuroProfileId;
}

export const AdaptedPreview: React.FC<AdaptedPreviewProps> = ({
  result,
  originalText,
  studentInfo,
  selectedProfile
}) => {
  const [activeTab, setActiveTab] = useState<'exam' | 'side-by-side' | 'report'>('exam');
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [lineSpacing, setLineSpacing] = useState<'normal' | 'relaxed' | 'loose'>('relaxed');
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});

  const profile = NEURO_PROFILES[selectedProfile] || NEURO_PROFILES.tdah;

  const handlePrint = () => {
    window.print();
  };

  const handleToggleStep = (stepKey: string) => {
    setCheckedSteps(prev => ({ ...prev, [stepKey]: !prev[stepKey] }));
  };

  const handleCopyText = () => {
    let fullText = `${studentInfo.schoolName || 'ESCOLA'}\n`;
    fullText += `AVALIAÇÃO ADAPTADA: ${profile.fullName.toUpperCase()}\n`;
    fullText += `Estudante: ${studentInfo.studentName || '________________'} | Turma: ${studentInfo.gradeLevel || '____'} | Data: ${studentInfo.date || '____'}\n\n`;
    fullText += `${result.adaptedGeneralInstructions}\n\n`;

    result.questions.forEach((q, i) => {
      fullText += `QUESTÃO ${i + 1}:\n${q.adaptedQuestion}\n`;
      if (q.steps && q.steps.length > 0) {
        fullText += `Passos:\n${q.steps.join('\n')}\n`;
      }
      if (q.adaptedOptions && q.adaptedOptions.length > 0) {
        fullText += `Alternativas:\n${q.adaptedOptions.join('\n')}\n`;
      }
      fullText += `\n`;
    });

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    let fullText = `${studentInfo.schoolName || 'ESCOLA'}\n`;
    fullText += `AVALIAÇÃO ADAPTADA: ${profile.fullName.toUpperCase()}\n`;
    fullText += `Estudante: ${studentInfo.studentName || '________________'} | Turma: ${studentInfo.gradeLevel || '____'} | Data: ${studentInfo.date || '____'}\n\n`;
    fullText += `${result.adaptedGeneralInstructions}\n\n`;

    result.questions.forEach((q, i) => {
      fullText += `QUESTÃO ${i + 1}:\n${q.adaptedQuestion}\n`;
      if (q.steps && q.steps.length > 0) {
        fullText += `Passos:\n${q.steps.join('\n')}\n`;
      }
      if (q.adaptedOptions && q.adaptedOptions.length > 0) {
        fullText += `Alternativas:\n${q.adaptedOptions.join('\n')}\n`;
      }
      fullText += `\n`;
    });

    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `avaliacao-adaptada-${selectedProfile}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm': return 'text-xs sm:text-sm';
      case 'base': return 'text-sm sm:text-base';
      case 'lg': return 'text-base sm:text-lg';
      case 'xl': return 'text-lg sm:text-xl';
    }
  };

  const getLineSpacingClass = () => {
    switch (lineSpacing) {
      case 'normal': return 'leading-normal';
      case 'relaxed': return 'leading-relaxed';
      case 'loose': return 'leading-loose';
    }
  };

  return (
    <div className="space-y-4">
      {/* Barra de Ações e Abas de Visualização */}
      <div className="print:hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        {/* Abas */}
        <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('exam')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'exam'
                ? 'bg-white dark:bg-neutral-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Folha de Prova (A4)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('side-by-side')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'side-by-side'
                ? 'bg-white dark:bg-neutral-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Comparador Lado a Lado</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('report')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'report'
                ? 'bg-white dark:bg-neutral-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Parecer Técnico (PEI)</span>
          </button>
        </div>

        {/* Controles de Tipografia e Ações de Exportação */}
        <div className="flex flex-wrap items-center gap-2">
          {activeTab === 'exam' && (
            <div className="hidden sm:flex items-center gap-1.5 border-r border-neutral-200 dark:border-neutral-700 pr-2 mr-1">
              <span className="text-[11px] text-neutral-400 font-medium">Tamanho:</span>
              <button
                type="button"
                onClick={() => setFontSize('sm')}
                className={`px-2 py-0.5 text-xs rounded ${fontSize === 'sm' ? 'bg-indigo-100 dark:bg-indigo-950 font-bold text-indigo-600' : 'text-neutral-500'}`}
              >
                P
              </button>
              <button
                type="button"
                onClick={() => setFontSize('base')}
                className={`px-2 py-0.5 text-xs rounded ${fontSize === 'base' ? 'bg-indigo-100 dark:bg-indigo-950 font-bold text-indigo-600' : 'text-neutral-500'}`}
              >
                M
              </button>
              <button
                type="button"
                onClick={() => setFontSize('lg')}
                className={`px-2 py-0.5 text-xs rounded ${fontSize === 'lg' ? 'bg-indigo-100 dark:bg-indigo-950 font-bold text-indigo-600' : 'text-neutral-500'}`}
              >
                G
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={handleCopyText}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado!' : 'Copiar'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadTxt}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-1.5 text-xs font-bold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir Prova A4</span>
          </button>
        </div>
      </div>

      {/* Conteúdo da Aba Ativa */}
      {activeTab === 'exam' && (
        <div className="bg-white text-neutral-900 border border-neutral-300 rounded-2xl p-6 sm:p-10 shadow-lg print:border-none print:shadow-none print:p-0 print:m-0">
          <PrintHeader
            studentInfo={studentInfo}
            profileId={selectedProfile}
            adaptedTitle={result.adaptedTitle}
          />

          {/* Instruções Gerais Adaptadas */}
          <div className="mb-6 p-4 rounded-xl border border-neutral-300 bg-neutral-50/70 text-neutral-800 print:mb-4 print:p-3 print:bg-transparent">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 print:hidden" />
              <span>Instruções Gerais para o Estudante:</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed font-medium">
              {result.adaptedGeneralInstructions}
            </p>
          </div>

          {/* Lista de Questões Adaptadas */}
          <div className="space-y-6 print:space-y-4">
            {result.questions.map((q, idx) => {
              return (
                <div
                  key={q.id || idx}
                  className={`p-4 sm:p-5 rounded-xl border border-neutral-300 bg-white print:border-neutral-400 print:p-3 print:break-inside-avoid ${getFontSizeClass()} ${getLineSpacingClass()}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2 border-b border-neutral-200 pb-2 print:pb-1">
                    <span className="font-extrabold text-neutral-900 text-sm sm:text-base">
                      {q.adaptedTitle || `Questão ${idx + 1}`}
                    </span>
                    {q.visualCue && (
                      <span className="text-[11px] font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-300 print:hidden">
                        {q.visualCue}
                      </span>
                    )}
                  </div>

                  {/* Enunciado Adaptado */}
                  <div className="text-neutral-800 font-medium whitespace-pre-wrap mb-3">
                    {q.adaptedQuestion}
                  </div>

                  {/* Passos Sequenciais ou Caixas de Checagem (TDAH / TEA) */}
                  {q.steps && q.steps.length > 0 && (
                    <div className="my-3 p-3 rounded-lg bg-neutral-50 border border-neutral-200 space-y-1.5 print:bg-transparent print:p-2 print:border-neutral-300">
                      <div className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider mb-1">
                        Etapas de Resolução Guiada:
                      </div>
                      {q.steps.map((step, sIdx) => {
                        const stepKey = `q-${idx}-s-${sIdx}`;
                        const isChecked = !!checkedSteps[stepKey];
                        return (
                          <div
                            key={sIdx}
                            onClick={() => handleToggleStep(stepKey)}
                            className="flex items-start gap-2 text-xs sm:text-sm cursor-pointer select-none print:cursor-default"
                          >
                            <span className="font-mono text-neutral-600 mt-0.5">
                              {isChecked ? '☑' : '☐'}
                            </span>
                            <span className={isChecked ? 'line-through text-neutral-400' : 'text-neutral-800 font-medium'}>
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Alternativas se houver */}
                  {q.adaptedOptions && q.adaptedOptions.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {q.adaptedOptions.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className="flex items-start gap-2.5 p-2 rounded border border-neutral-200 bg-neutral-50/50 print:bg-transparent print:border-neutral-300 text-xs sm:text-sm"
                        >
                          <span className="inline-block w-4 h-4 rounded-full border border-neutral-500 shrink-0 mt-0.5" />
                          <span className="font-medium text-neutral-800">{opt}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Espaço para Resposta Manuscrita do Aluno */}
                  <div className="mt-4 pt-3 border-t border-dotted border-neutral-300">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-2">
                      Espaço para Resposta / Rascunho do Estudante:
                    </span>
                    <div className="space-y-3 print:space-y-2">
                      <div className="border-b border-neutral-300 h-6"></div>
                      <div className="border-b border-neutral-300 h-6"></div>
                      <div className="border-b border-neutral-300 h-6"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Comparador Lado a Lado */}
      {activeTab === 'side-by-side' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Columns className="w-5 h-5 text-indigo-500" />
              <span>Comparador Pedagógico: Original vs. Adaptada</span>
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Visualize como cada questão foi transformada e a justificativa pedagógica da intervenção.
            </p>
          </div>

          <div className="space-y-6">
            {result.questions.map((q, idx) => (
              <div
                key={idx}
                className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden"
              >
                <div className="bg-neutral-100 dark:bg-neutral-800/80 px-4 py-2 text-xs font-bold text-neutral-700 dark:text-neutral-300 flex justify-between items-center">
                  <span>Questão {idx + 1}</span>
                  <span className="text-[11px] font-normal text-neutral-500">
                    Perfil: {profile.name}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800 text-xs sm:text-sm">
                  {/* Lado Original */}
                  <div className="p-4 bg-red-50/30 dark:bg-red-950/10 space-y-2">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300 uppercase">
                      Original (Com Barreiras)
                    </span>
                    <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed font-mono text-xs">
                      {q.originalSnippet || 'Texto completo na aba de entrada'}
                    </p>
                  </div>

                  {/* Lado Adaptado */}
                  <div className="p-4 bg-emerald-50/30 dark:bg-emerald-950/10 space-y-3">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 uppercase">
                      Adaptada para {profile.name}
                    </span>
                    <p className="text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed">
                      {q.adaptedQuestion}
                    </p>

                    {q.steps && q.steps.length > 0 && (
                      <div className="p-2.5 rounded bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs space-y-1">
                        <span className="font-bold text-neutral-500 block">Passos de resolução:</span>
                        {q.steps.map((st, sI) => (
                          <div key={sI} className="text-neutral-700 dark:text-neutral-300">
                            • {st}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Justificativa Pedagógica */}
                <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/20 border-t border-neutral-200 dark:border-neutral-800 text-xs flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-indigo-900 dark:text-indigo-300">Justificativa Pedagógica: </strong>
                    <span className="text-neutral-700 dark:text-neutral-300">{q.pedagogicalRationale}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Parecer Técnico */}
      {activeTab === 'report' && (
        <PedagogicalReport result={result} studentInfo={studentInfo} />
      )}
    </div>
  );
};
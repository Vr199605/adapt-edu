'use client';

import React, { useRef } from 'react';
import { EXAM_SAMPLES } from '@/lib/samples';
import { NeuroProfileId } from '@/types';
import { FileUp, Trash2, BookOpen, Wand2, Loader2, Sparkles } from 'lucide-react';

interface ActivityInputProps {
  originalText: string;
  onChangeText: (text: string) => void;
  onSelectSample: (sampleId: string) => void;
  onAdapt: () => void;
  isLoading: boolean;
  selectedProfile: NeuroProfileId;
}

export const ActivityInput: React.FC<ActivityInputProps> = ({
  originalText,
  onChangeText,
  onSelectSample,
  onAdapt,
  isLoading,
  selectedProfile
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        onChangeText(content);
      }
    };
    reader.readAsText(file);
  };

  const wordCount = originalText.trim() ? originalText.trim().split(/\s+/).length : 0;
  const charCount = originalText.length;

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
            <span>2. Atividade ou Prova Original</span>
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Cole sua avaliação abaixo, carregue um arquivo de texto ou use uma amostra pronta para teste.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".txt,.md,.text"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 transition-colors"
          >
            <FileUp className="w-3.5 h-3.5" />
            <span>Carregar Arquivo</span>
          </button>

          {originalText && (
            <button
              type="button"
              onClick={() => onChangeText('')}
              className="px-2.5 py-1.5 text-xs font-medium rounded-lg text-neutral-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              title="Limpar texto"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Amostras Rápidas Prontas */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span className="text-[11px] font-semibold text-neutral-400 flex items-center gap-1 mr-1">
          <BookOpen className="w-3.5 h-3.5" /> Amostras reais:
        </span>
        {EXAM_SAMPLES.map((sample) => (
          <button
            key={sample.id}
            type="button"
            onClick={() => onSelectSample(sample.id)}
            className="px-2.5 py-1 text-xs rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-neutral-700 dark:text-neutral-300 transition-all"
          >
            {sample.subject}: {sample.title}
          </button>
        ))}
      </div>

      {/* Área de Texto Principal */}
      <div className="relative">
        <textarea
          value={originalText}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder="Cole aqui o texto da prova, lista de exercícios ou atividade que deseja adaptar..."
          rows={10}
          className="w-full p-4 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950/50 text-neutral-900 dark:text-neutral-100 text-sm font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-neutral-900 transition-all resize-y"
        />
        <div className="absolute bottom-3 right-3 text-[11px] text-neutral-400 bg-white/90 dark:bg-neutral-900/90 px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-800">
          {wordCount} palavras • {charCount} caracteres
        </div>
      </div>

      {/* Botão de Ação Principal */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
        <div className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span>Adaptação pedagógica imediata com justificativa legal para o PEI.</span>
        </div>

        <button
          type="button"
          onClick={onAdapt}
          disabled={isLoading || !originalText.trim()}
          className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processando Adaptação Pedagógica...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              <span>Adaptar Atividade Agora</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
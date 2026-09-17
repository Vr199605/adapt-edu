'use client';

import React from 'react';
import { NeuroProfileId } from '@/types';
import { NEURO_PROFILES } from '@/lib/profiles';
import { Sparkles, Brain, Eye, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface ProfileSelectorProps {
  selectedProfile: NeuroProfileId;
  onSelectProfile: (id: NeuroProfileId) => void;
  customPeiNotes: string;
  onChangeCustomPeiNotes: (notes: string) => void;
}

export const ProfileSelector: React.FC<ProfileSelectorProps> = ({
  selectedProfile,
  onSelectProfile,
  customPeiNotes,
  onChangeCustomPeiNotes
}) => {
  const getIcon = (id: NeuroProfileId) => {
    switch (id) {
      case 'tea':
        return <Sparkles className="w-5 h-5 text-sky-500" />;
      case 'tdah':
        return <Brain className="w-5 h-5 text-orange-500" />;
      case 'dislexia':
        return <FileText className="w-5 h-5 text-violet-500" />;
      case 'baixa_visao':
        return <Eye className="w-5 h-5 text-emerald-500" />;
      case 'pei_personalizado':
        return <AlertCircle className="w-5 h-5 text-pink-500" />;
    }
  };

  const profilesList = Object.values(NEURO_PROFILES);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
            1. Selecione o Perfil de Adaptação Inclusiva
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Cada perfil aciona algoritmos pedagógicos específicos para remover barreiras de aprendizagem.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {profilesList.map((prof) => {
          const isSelected = selectedProfile === prof.id;
          return (
            <button
              key={prof.id}
              type="button"
              onClick={() => onSelectProfile(prof.id)}
              className={`text-left p-3.5 rounded-xl border-2 transition-all flex flex-col justify-between relative group ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 shadow-sm ring-2 ring-indigo-500/20'
                  : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                    {getIcon(prof.id)}
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  )}
                </div>

                <div className="font-bold text-neutral-900 dark:text-neutral-100 text-sm">
                  {prof.name}
                </div>
                <div className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300 line-clamp-1">
                  {prof.fullName}
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 line-clamp-2">
                  {prof.tagline}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[10px] font-medium text-neutral-500">
                {prof.strategies[0]}
              </div>
            </button>
          );
        })}
      </div>

      {selectedProfile === 'pei_personalizado' && (
        <div className="p-4 rounded-xl border border-pink-200 dark:border-pink-900/60 bg-pink-50/50 dark:bg-pink-950/20 animate-in fade-in duration-200">
          <label className="block text-xs font-bold text-pink-900 dark:text-pink-300 mb-1">
            Orientações Específicas do Laudo / PEI do Estudante:
          </label>
          <p className="text-xs text-pink-700 dark:text-pink-400 mb-2">
            Insira detalhes como: restrição de opções (ex: no máximo 3 alternativas), aluno não alfabetizado em números decimais, preferência por perguntas diretas, etc.
          </p>
          <textarea
            value={customPeiNotes}
            onChange={(e) => onChangeCustomPeiNotes(e.target.value)}
            placeholder="Ex: Aluno com diagnóstico de TDAH combinado e disgrafia. Precisa de enunciados com no máximo 2 linhas, palavras de comando em caixa alta e espaço amplo para responder em letra bastão."
            rows={3}
            className="w-full text-xs p-3 rounded-lg border border-pink-300 dark:border-pink-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      )}
    </div>
  );
};
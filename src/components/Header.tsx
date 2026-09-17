'use client';

import React from 'react';
import { Sparkles, Sliders, Briefcase, School } from 'lucide-react';
import { StudentInfo } from '@/types';

interface HeaderProps {
  onOpenSettings: () => void;
  onOpenPitch: () => void;
  studentInfo: StudentInfo;
  fontMode: 'inter' | 'lexend';
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSettings,
  onOpenPitch,
  studentInfo,
  fontMode
}) => {
  return (
    <header className="print:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Marca */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-neutral-900 dark:text-white tracking-tight">
                Adapt<span className="text-indigo-600 dark:text-indigo-400">Edu</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-extrabold tracking-wider uppercase rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Inclusão Escolar
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 -mt-0.5 line-clamp-1">
              {studentInfo.schoolName ? (
                <span className="flex items-center gap-1 font-medium text-neutral-700 dark:text-neutral-300">
                  <School className="w-3 h-3 text-indigo-500 inline" /> {studentInfo.schoolName}
                </span>
              ) : (
                'Adaptador Pedagógico para TEA, TDAH, Dislexia & PEI'
              )}
            </p>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Botão Comercial (Como Vender) */}
          <button
            type="button"
            onClick={onOpenPitch}
            className="px-3 py-1.5 text-xs font-bold rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Como Vender para Escolas</span>
            <span className="sm:hidden">Vender</span>
          </button>

          {/* Botão de Configurações */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="p-2 sm:px-3 sm:py-1.5 text-xs font-semibold rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 flex items-center gap-1.5 transition-colors"
            title="Configurações e Cabeçalho"
          >
            <Sliders className="w-4 h-4" />
            <span className="hidden sm:inline">Configurações</span>
          </button>
        </div>
      </div>
    </header>
  );
};
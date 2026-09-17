'use client';

import React from 'react';
import { StudentInfo } from '@/types';
import { X, Key, School, User, Check, ExternalLink, Sliders } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentInfo: StudentInfo;
  onChangeStudentInfo: (info: StudentInfo) => void;
  apiKey: string;
  onChangeApiKey: (key: string) => void;
  fontMode: 'inter' | 'lexend';
  onChangeFontMode: (mode: 'inter' | 'lexend') => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  studentInfo,
  onChangeStudentInfo,
  apiKey,
  onChangeApiKey,
  fontMode,
  onChangeFontMode
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-base text-neutral-900 dark:text-neutral-100">
              Configurações do Sistema & Instituição
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chave de API Gemini */}
        <div className="space-y-2 p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-indigo-600" />
              <span>Chave de API do Google Gemini (Opcional):</span>
            </label>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
            >
              <span>Gerar chave grátis</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => onChangeApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full text-xs p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-mono"
          />
          <p className="text-[11px] text-neutral-500 leading-tight">
            Se deixada em branco, o sistema utilizará o motor pedagógico heurístico interno com amostras instantâneas sem custo.
          </p>
        </div>

        {/* Tipografia de Acessibilidade */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block">
            Tipografia Principal da Aplicação:
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onChangeFontMode('lexend')}
              className={`p-3 rounded-xl border text-left text-xs transition-all ${
                fontMode === 'lexend'
                  ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-bold'
                  : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              <div className="font-bold mb-0.5">Lexend (Recomendada)</div>
              <div className="text-[11px] text-neutral-500 font-normal">
                Desenvolvida especificamente para facilitar leitura e dislexia.
              </div>
            </button>

            <button
              type="button"
              onClick={() => onChangeFontMode('inter')}
              className={`p-3 rounded-xl border text-left text-xs transition-all ${
                fontMode === 'inter'
                  ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-bold'
                  : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              <div className="font-bold mb-0.5">Inter (Padrão UI)</div>
              <div className="text-[11px] text-neutral-500 font-normal">
                Moderna, neutra e altamente legível em telas e monitores.
              </div>
            </button>
          </div>
        </div>

        {/* Dados da Escola e Cabeçalho */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
            <School className="w-3.5 h-3.5" />
            <span>Dados Padrão para Cabeçalho das Provas (A4):</span>
          </h4>

          <div className="space-y-2 text-xs">
            <div>
              <label className="block text-neutral-600 dark:text-neutral-400 font-medium mb-1">
                Nome do Colégio / Escola:
              </label>
              <input
                type="text"
                value={studentInfo.schoolName}
                onChange={(e) => onChangeStudentInfo({ ...studentInfo, schoolName: e.target.value })}
                placeholder="Ex: Colégio Integrado São Paulo"
                className="w-full p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-neutral-600 dark:text-neutral-400 font-medium mb-1">
                  Nome do Estudante:
                </label>
                <input
                  type="text"
                  value={studentInfo.studentName}
                  onChange={(e) => onChangeStudentInfo({ ...studentInfo, studentName: e.target.value })}
                  placeholder="Ex: Lucas Gabriel"
                  className="w-full p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                />
              </div>

              <div>
                <label className="block text-neutral-600 dark:text-neutral-400 font-medium mb-1">
                  Turma / Série:
                </label>
                <input
                  type="text"
                  value={studentInfo.gradeLevel}
                  onChange={(e) => onChangeStudentInfo({ ...studentInfo, gradeLevel: e.target.value })}
                  placeholder="Ex: 6º Ano B"
                  className="w-full p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-neutral-600 dark:text-neutral-400 font-medium mb-1">
                  Disciplina:
                </label>
                <input
                  type="text"
                  value={studentInfo.subject}
                  onChange={(e) => onChangeStudentInfo({ ...studentInfo, subject: e.target.value })}
                  placeholder="Ex: Matemática"
                  className="w-full p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                />
              </div>

              <div>
                <label className="block text-neutral-600 dark:text-neutral-400 font-medium mb-1">
                  Professor(a) / Monitor(a):
                </label>
                <input
                  type="text"
                  value={studentInfo.teacherName}
                  onChange={(e) => onChangeStudentInfo({ ...studentInfo, teacherName: e.target.value })}
                  placeholder="Ex: Prof. Carlos Eduardo"
                  className="w-full p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Salvar e Concluir
          </button>
        </div>
      </div>
    </div>
  );
};
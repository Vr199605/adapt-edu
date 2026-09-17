'use client';

import React from 'react';
import { AdaptationResult, StudentInfo } from '@/types';
import { NEURO_PROFILES } from '@/lib/profiles';
import { ShieldCheck, CheckCircle, Lightbulb, Printer, FileCheck } from 'lucide-react';

interface PedagogicalReportProps {
  result: AdaptationResult;
  studentInfo: StudentInfo;
}

export const PedagogicalReport: React.FC<PedagogicalReportProps> = ({
  result,
  studentInfo
}) => {
  const profile = NEURO_PROFILES[result.profileId] || NEURO_PROFILES.tdah;

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Cabeçalho do Parecer */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-neutral-200 dark:border-neutral-800 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Parecer Técnico de Adequação Curricular & Avaliativa (PEI)
            </h3>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Documento de conformidade com a Lei nº 13.146/2015 (LBI) e Diretrizes Curriculares Nacionais.
          </p>
        </div>

        <button
          type="button"
          onClick={handlePrintReport}
          className="print:hidden px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300 transition-colors"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Imprimir Parecer</span>
        </button>
      </div>

      {/* Dados do Aluno e Instituição */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 text-xs border border-neutral-200/60 dark:border-neutral-800">
        <div>
          <span className="text-neutral-500 font-medium block">Estudante:</span>
          <span className="font-bold text-neutral-800 dark:text-neutral-200">
            {studentInfo.studentName || 'Não especificado'}
          </span>
        </div>
        <div>
          <span className="text-neutral-500 font-medium block">Turma / Série:</span>
          <span className="font-bold text-neutral-800 dark:text-neutral-200">
            {studentInfo.gradeLevel || 'Ensino Fundamental'}
          </span>
        </div>
        <div>
          <span className="text-neutral-500 font-medium block">Perfil Adaptado:</span>
          <span className="font-bold text-indigo-600 dark:text-indigo-400">
            {profile.fullName}
          </span>
        </div>
        <div>
          <span className="text-neutral-500 font-medium block">Data de Emissão:</span>
          <span className="font-bold text-neutral-800 dark:text-neutral-200">
            {studentInfo.date || new Date().toLocaleDateString('pt-BR')}
          </span>
        </div>
      </div>

      {/* Justificativa Legal & Pedagógica */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
          <FileCheck className="w-4 h-4 text-indigo-500" />
          <span>1. Justificativa Técnica e Fundamentação Legal</span>
        </h4>
        <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
          {result.pedagogicalSummary}
        </div>
      </div>

      {/* Estratégias Pedagógicas Aplicadas */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4 text-emerald-500" />
          <span>2. Recursos e Modificações Metodológicas Empregadas</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {result.appliedStrategies.map((strat, i) => (
            <div
              key={i}
              className="flex items-start gap-2 p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs text-neutral-800 dark:text-neutral-200"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span>{strat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recomendações de Mediação em Sala */}
      {result.pedagogicalTipsForTeacher && result.pedagogicalTipsForTeacher.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>3. Recomendações Práticas para o Professor e Monitor</span>
          </h4>
          <div className="space-y-2">
            {result.pedagogicalTipsForTeacher.map((tip, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200"
              >
                <strong>Dica {idx + 1}:</strong> {tip}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Assinaturas */}
      <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-8 text-center text-xs">
        <div>
          <div className="border-b border-neutral-400 dark:border-neutral-600 w-3/4 mx-auto mb-1"></div>
          <p className="font-bold text-neutral-800 dark:text-neutral-200">
            {studentInfo.teacherName || 'Professor(a) / Monitor(a) Responsável'}
          </p>
          <p className="text-[11px] text-neutral-500">Docente Regente</p>
        </div>
        <div>
          <div className="border-b border-neutral-400 dark:border-neutral-600 w-3/4 mx-auto mb-1"></div>
          <p className="font-bold text-neutral-800 dark:text-neutral-200">
            Coordenação Pedagógica / Educação Especial
          </p>
          <p className="text-[11px] text-neutral-500">Equipe de Apoio à Inclusão (AEE/PEI)</p>
        </div>
      </div>
    </div>
  );
};
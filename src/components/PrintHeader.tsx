'use client';

import React from 'react';
import { StudentInfo, NeuroProfileId } from '@/types';
import { NEURO_PROFILES } from '@/lib/profiles';

interface PrintHeaderProps {
  studentInfo: StudentInfo;
  profileId: NeuroProfileId;
  adaptedTitle?: string;
}

export const PrintHeader: React.FC<PrintHeaderProps> = ({
  studentInfo,
  profileId,
  adaptedTitle
}) => {
  const profile = NEURO_PROFILES[profileId] || NEURO_PROFILES.tdah;

  return (
    <div className="border-2 border-neutral-800 rounded-lg p-4 mb-6 bg-white text-neutral-900 print:mb-4 print:p-3">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-neutral-800 pb-3 mb-3 gap-2">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wide print:text-lg">
            {studentInfo.schoolName || 'COLÉGIO / INSTITUIÇÃO DE ENSINO'}
          </h2>
          <p className="text-xs text-neutral-600 font-medium">
            Instrumento Avaliativo com Adequação Curricular Inclusiva (Lei nº 13.146/2015)
          </p>
        </div>
        <div className="flex items-center gap-2 print:gap-1">
          <span className="text-xs px-2.5 py-1 font-semibold rounded bg-neutral-100 border border-neutral-400 text-neutral-800 print:text-[10px]">
            ADAPTAÇÃO: {profile.fullName.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs print:text-[11px] print:gap-1">
        <div>
          <span className="font-bold text-neutral-700">ESTUDANTE: </span>
          <span className="border-b border-dotted border-neutral-500 pb-0.5 inline-block w-36 sm:w-auto">
            {studentInfo.studentName || '________________________'}
          </span>
        </div>
        <div>
          <span className="font-bold text-neutral-700">TURMA / ANO: </span>
          <span className="border-b border-dotted border-neutral-500 pb-0.5 inline-block w-24 sm:w-auto">
            {studentInfo.gradeLevel || '________'}
          </span>
        </div>
        <div>
          <span className="font-bold text-neutral-700">DISCIPLINA: </span>
          <span className="border-b border-dotted border-neutral-500 pb-0.5 inline-block w-28 sm:w-auto">
            {studentInfo.subject || '________'}
          </span>
        </div>
        <div>
          <span className="font-bold text-neutral-700">DATA: </span>
          <span className="border-b border-dotted border-neutral-500 pb-0.5 inline-block w-20 sm:w-auto">
            {studentInfo.date || '___/___/202___'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mt-2.5 pt-2 border-t border-neutral-200 print:text-[10px] print:pt-1.5 print:mt-1.5">
        <div>
          <span className="font-bold text-neutral-700">PROFESSOR(A) / MEDIADOR(A): </span>
          <span>{studentInfo.teacherName || '________________________'}</span>
        </div>
        <div className="text-right sm:text-right print:text-right">
          <span className="font-bold text-neutral-700">RUBRICA DO RESPONSÁVEL / NOTA: </span>
          <span className="inline-block w-20 border-b border-neutral-600 ml-1"></span>
        </div>
      </div>
    </div>
  );
};
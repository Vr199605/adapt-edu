'use client';

import React from 'react';
import { X, DollarSign, Target, TrendingUp, CheckCircle2, Copy, ShieldAlert, Sparkles } from 'lucide-react';

interface SalesPitchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SalesPitchModal: React.FC<SalesPitchModalProps> = ({ isOpen, onClose }) => {
  const [copiedPitch, setCopiedPitch] = React.useState(false);

  if (!isOpen) return null;

  const pitchText = `Olá, [Nome do Coordenador(a)]! Tudo bem?

Acompanho o trabalho do [Nome do Colégio] e sei que uma das maiores dores da equipe pedagógica hoje é o tempo que os professores gastam para adaptar avaliações e atividades para alunos neurodivergentes (TEA, TDAH, Dislexia) e comprovar o PEI perante a Lei Brasileira de Inclusão.

Desenvolvemos o AdaptEdu: uma plataforma especializada onde o professor insere a prova comum e recebe em 30 segundos a versão com adequação curricular rigorosa (sem infantolizar o conteúdo) + o Parecer Técnico do PEI pronto para a pasta da escola e para mostrar aos pais.

Gostaria de liberar 14 dias de teste gratuito para a coordenação e para os professores avaliarem no fechamento deste bimestre. Posso te enviar um link demonstrativo de 2 minutos?`;

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(pitchText);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-base text-neutral-900 dark:text-neutral-100">
              Guia Comercial: Como Vender o AdaptEdu para Escolas
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

        {/* 1. Por que as escolas compram? */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
            <Target className="w-4 h-4 text-indigo-500" />
            <span>1. O Gatilho de Venda Irrecusável (Dor Real)</span>
          </h4>
          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-700 dark:text-neutral-300 space-y-2">
            <p>
              <strong>O Medo da Escola:</strong> Pela Lei Brasileira de Inclusão (Lei nº 13.146/2015), as escolas privadas são <em>obrigadas por lei</em> a fornecer adaptação curricular e avaliativa sem cobrar taxa extra dos pais. Caso não façam, sofrem notificações do Ministério Público e perda de alunos.
            </p>
            <p>
              <strong>A Dor do Professor:</strong> Professores do Ensino Fundamental e Médio têm turmas com 3 a 5 alunos com laudos diferentes. Reescrever provas manualmente consome 8 a 15 horas por bimestre.
            </p>
          </div>
        </div>

        {/* 2. Modelos de Precificação Sugeridos */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span>2. Planos de Preço Sugeridos para Você Cobrar</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              <div className="font-bold text-neutral-900 dark:text-neutral-100">Professor Individual</div>
              <div className="text-lg font-extrabold text-indigo-600 mt-1">R$ 39 <span className="text-xs font-normal text-neutral-500">/mês</span></div>
              <p className="text-[11px] text-neutral-500 mt-1">Ideal para professores de cursinho, reforço escolar ou autônomos.</p>
            </div>

            <div className="p-3 rounded-xl border-2 border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/20 relative">
              <span className="absolute -top-2 right-2 text-[9px] font-extrabold uppercase bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                Mais Vendido
              </span>
              <div className="font-bold text-neutral-900 dark:text-neutral-100">Escola Pequena / Média</div>
              <div className="text-lg font-extrabold text-indigo-600 mt-1">R$ 490 <span className="text-xs font-normal text-neutral-500">/mês</span></div>
              <p className="text-[11px] text-neutral-500 mt-1">Até 25 professores e 200 alunos neurodivergentes cadastrados.</p>
            </div>

            <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              <div className="font-bold text-neutral-900 dark:text-neutral-100">Colégio Integral</div>
              <div className="text-lg font-extrabold text-indigo-600 mt-1">R$ 1.200 <span className="text-xs font-normal text-neutral-500">/mês</span></div>
              <p className="text-[11px] text-neutral-500 mt-1">Professores ilimitados, personalização da marca e suporte AEE.</p>
            </div>
          </div>
        </div>

        {/* 3. Script de Abordagem Pronto */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>3. Script de WhatsApp / E-mail para Coordenadores</span>
            </h4>
            <button
              type="button"
              onClick={handleCopyPitch}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedPitch ? 'Copiado!' : 'Copiar Mensagem'}</span>
            </button>
          </div>
          <div className="p-3 rounded-xl bg-neutral-900 text-neutral-200 text-xs font-mono leading-relaxed whitespace-pre-wrap select-all">
            {pitchText}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
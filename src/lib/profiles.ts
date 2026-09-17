import { NeuroProfile } from '@/types';

export const NEURO_PROFILES: Record<string, NeuroProfile> = {
  tea: {
    id: 'tea',
    name: 'TEA',
    fullName: 'Transtorno do Espectro Autista',
    tagline: 'Linguagem literal, pistas visuais e passos sequenciais previsíveis',
    description: 'Elimina metáforas e ambiguidades, organiza a atividade em passos 1-2-3 explícitos e fornece pistas visuais ou pictogramas conceituais.',
    badge: 'Comunicação Literal & Estruturada',
    color: '#0284c7', // Sky-600
    accentClass: 'text-sky-600 dark:text-sky-400',
    bgLightClass: 'bg-sky-50 dark:bg-sky-950/40',
    borderClass: 'border-sky-300 dark:border-sky-700',
    strategies: [
      'Remoção de expressões figuradas, ironias e metáforas',
      'Estruturação das tarefas em passos sequenciais (1º, 2º, 3º)',
      'Inclusão de objetivo direto e explícito para cada questão',
      'Pistas visuais e suporte contextual sem duplo sentido',
      'Previsibilidade: indicação clara de início, meio e fim'
    ]
  },
  tdah: {
    id: 'tdah',
    name: 'TDAH',
    fullName: 'Transtorno do Déficit de Atenção e Hiperatividade',
    tagline: 'Fatiamento cognitivo (chunking), negrito em verbos e caixas de checagem',
    description: 'Quebra blocos longos de texto em partes menores, destaca os comandos centrais em negrito e inclui caixas [ ] para acompanhamento do progresso.',
    badge: 'Foco Direcionado & Chunking',
    color: '#ea580c', // Orange-600
    accentClass: 'text-orange-600 dark:text-orange-400',
    bgLightClass: 'bg-orange-50 dark:bg-orange-950/40',
    borderClass: 'border-orange-300 dark:border-orange-700',
    strategies: [
      'Chunking: divisão do enunciado em micro-etapas gerenciáveis',
      'Destaque em negrito nos verbos de comando (Calcule, Assinale, Escreva)',
      'Caixas de marcação [ ] para o aluno ticar conforme conclui cada passo',
      'Eliminação de distratores e histórias periféricas que sobrecarregam a atenção',
      'Espaçamento limpo para evitar saturação visual na folha'
    ]
  },
  dislexia: {
    id: 'dislexia',
    name: 'Dislexia',
    fullName: 'Dislexia do Desenvolvimento',
    tagline: 'Ordem direta, tipografia adaptada e redução de densidade textual',
    description: 'Reescreve em ordem direta (Sujeito + Verbo + Complemento), amplia espaçamentos e reduz confusões fonológicas e visuais.',
    badge: 'Acessibilidade Textual & Sintática',
    color: '#7c3aed', // Violet-600
    accentClass: 'text-violet-600 dark:text-violet-400',
    bgLightClass: 'bg-violet-50 dark:bg-violet-950/40',
    borderClass: 'border-violet-300 dark:border-violet-700',
    strategies: [
      'Construção frasal em ordem sintática direta sem orações subordinadas densas',
      'Espaçamento entre linhas ampliado (1.8x) e sem blocos justificados',
      'Alternativas de múltipla escolha com espaçamento generoso para não misturar linhas',
      'Eliminação de duplas negações ("não é incorreto")',
      'Vocabulário acessível preservando integralmente o rigor conceitual do conteúdo'
    ]
  },
  baixa_visao: {
    id: 'baixa_visao',
    name: 'Baixa Visão',
    fullName: 'Baixa Visão & Acessibilidade Visual',
    tagline: 'Alto contraste, tipografia ampliada e linhas-guia reforçadas',
    description: 'Fontes grandes (16pt+), alto contraste entre texto e fundo, delimitação nítida das áreas de resposta e espaçamento expandido.',
    badge: 'Ergonomia Visual Ampliada',
    color: '#059669', // Emerald-600
    accentClass: 'text-emerald-600 dark:text-emerald-400',
    bgLightClass: 'bg-emerald-50 dark:bg-emerald-950/40',
    borderClass: 'border-emerald-300 dark:border-emerald-700',
    strategies: [
      'Contraste maximizado e fontes com traço mais espesso',
      'Linhas de resposta reforçadas e quadros delimitados para escrita',
      'Hierarquia visual forte entre título, questão e alternativas',
      'Remoção de elementos decorativos secundários de baixa legibilidade'
    ]
  },
  pei_personalizado: {
    id: 'pei_personalizado',
    name: 'PEI Específico',
    fullName: 'Plano de Ensino Individualizado (PEI/PDI)',
    tagline: 'Adaptação sob medida conforme laudo e orientações da equipe multidisciplinar',
    description: 'Permite ao professor informar particularidades médicas e pedagógicas do aluno (ex: não alfabetizado, suporte a 3 alternativas, apoio de calculadora).',
    badge: 'Personalização Curricular Total',
    color: '#db2777', // Pink-600
    accentClass: 'text-pink-600 dark:text-pink-400',
    bgLightClass: 'bg-pink-50 dark:bg-pink-950/40',
    borderClass: 'border-pink-300 dark:border-pink-700',
    strategies: [
      'Aplicação direta das recomendações do laudo fonoaudiológico/psicopedagógico',
      'Ajuste fino de nível de complexidade e formato de resposta',
      'Adequação de vocabulário e comandos operatórios sob medida'
    ]
  }
};
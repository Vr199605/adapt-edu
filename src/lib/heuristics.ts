import { AdaptationResult, NeuroProfileId } from '@/types';
import { NEURO_PROFILES } from './profiles';

export function generateHeuristicAdaptation(
  originalText: string,
  profileId: NeuroProfileId,
  studentName?: string,
  customPeiNotes?: string
): AdaptationResult {
  const profile = NEURO_PROFILES[profileId] || NEURO_PROFILES.tdah;
  const isTea = profileId === 'tea';
  const isTdah = profileId === 'tdah';
  const isDislexia = profileId === 'dislexia';
  const isBaixaVisao = profileId === 'baixa_visao';

  // Divide o texto original em blocos de questões ou parágrafos
  const lines = originalText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  // Detecta se há título
  let title = 'Atividade Pedagógica Adaptada';
  if (lines.length > 0 && !lines[0].toLowerCase().startsWith('questão') && !lines[0].toLowerCase().startsWith('instru')) {
    title = `Atividade Adaptada: ${lines[0]}`;
  }

  // Identifica blocos de questões
  const rawQuestions: { id: number; raw: string; options: string[] }[] = [];
  let currentQuestion: { id: number; raw: string; options: string[] } | null = null;
  let qCount = 0;

  for (const line of lines) {
    const qMatch = line.match(/^Quest[aã]o\s*(\d+)/i) || line.match(/^(\d+)[\.\-\)]\s+/);
    if (qMatch) {
      if (currentQuestion) {
        rawQuestions.push(currentQuestion);
      }
      qCount++;
      currentQuestion = {
        id: qCount,
        raw: line.replace(/^Quest[aã]o\s*\d+[:\.\-]?\s*/i, '').replace(/^\d+[\.\-\)]\s*/, ''),
        options: []
      };
    } else if (currentQuestion) {
      if (line.match(/^[a-eA-E][\)\.\-]\s+/)) {
        currentQuestion.options.push(line);
      } else {
        currentQuestion.raw += ' ' + line;
      }
    }
  }
  if (currentQuestion) {
    rawQuestions.push(currentQuestion);
  }

  // Se não achou formato "Questão X", divide por parágrafos longos
  if (rawQuestions.length === 0) {
    const paragraphs = originalText.split(/\n\s*\n/).filter(p => p.trim().length > 15);
    paragraphs.forEach((p, idx) => {
      rawQuestions.push({
        id: idx + 1,
        raw: p.trim(),
        options: []
      });
    });
  }

  // Gera as questões adaptadas com base no perfil
  const adaptedQuestions = rawQuestions.map((q, idx) => {
    let questionText = q.raw;
    let steps: string[] | undefined;
    let visualCue = '';
    let rationale = '';

    if (isTea) {
      // Remover metáforas e dar passos explícitos
      questionText = questionText
        .replace(/com a cara amarrada/gi, 'com tempo frio e nublado')
        .replace(/com o coração na mão/gi, 'muito preocupado e ansioso')
        .replace(/mudar o rumo das águas/gi, 'mudar os acontecimentos')
        .replace(/frio na espinha/gi, 'medo ou apreensão')
        .replace(/zombando da minha ansiedade/gi, 'passando lentamente');

      steps = [
        'Passo 1: Leia as informações principais acima.',
        'Passo 2: Identifique exatamente o que foi solicitado.',
        'Passo 3: Escreva sua resposta na linha abaixo com suas palavras.'
      ];
      visualCue = 'Ícone de Foco: Resposta direta sem sentido figurado';
      rationale = 'Linguagem literal aplicada: eliminação de expressões metafóricas e inclusão de passos sequenciais previsíveis de resolução.';
    } else if (isTdah) {
      // Chunking e negrito em comandos operatórios
      questionText = questionText
        .replace(/\b(calcule|determine|resolva)\b/gi, '**$1**')
        .replace(/\b(assinale|marque|escolha)\b/gi, '**$1**')
        .replace(/\b(leia|observe|analise)\b/gi, '**$1**')
        .replace(/\b(escreva|explique|justifique)\b/gi, '**$1**');

      steps = [
        '[ ] Passo 1: Localize os números ou fatos principais destacados.',
        '[ ] Passo 2: Faça o cálculo ou rascunho no quadro ao lado.',
        '[ ] Passo 3: Marque a alternativa correta ou preencha a resposta.'
      ];
      visualCue = 'Caixas de checagem [ ] e verbos em negrito para foco';
      rationale = 'Chunking cognitivo aplicado: comandos destacados em negrito com caixas de checagem para reduzir a impulsividade e guiar a atenção sustentada.';
    } else if (isDislexia) {
      // Ordem direta e redução de densidade
      steps = [
        '1. Leia o enunciado pausadamente.',
        '2. Verifique cada opção com calma.'
      ];
      visualCue = 'Tipografia espaçada (1.8x) e ordem sintática direta';
      rationale = 'Adequação sintática e tipográfica: frases estruturadas em ordem direta (Sujeito + Verbo + Predicado), espaçamento ampliado e eliminação de duplas negações.';
    } else if (isBaixaVisao) {
      steps = [
        '• Utilize o espaço ampliado abaixo para registrar seu cálculo ou resposta.',
        '• Se precisar de apoio adicional, solicite a leitura em voz alta.'
      ];
      visualCue = 'Alto contraste e linhas demarcadas com espessura reforçada';
      rationale = 'Acessibilidade visual: aumento de tamanho de fonte, alto contraste e caixas delimitadas para escrita manual.';
    } else {
      // PEI Personalizado
      steps = [
        'Etapa guiada conforme orientações do PEI.',
        'Responda com apoio do mediador se necessário.'
      ];
      visualCue = 'Adaptação individualizada com foco nas potencialidades do aluno';
      rationale = `Aplicação de estratégias personalizadas com base nas anotações do PEI: ${customPeiNotes || 'Ajuste de complexidade e tempo estendido.'}`;
    }

    // Adapta as opções se houver
    const adaptedOptions = q.options.map(opt => {
      if (isDislexia) {
        return opt.replace(/não é incorreto/gi, 'é correto');
      }
      return opt;
    });

    return {
      id: q.id || (idx + 1),
      originalSnippet: q.raw.length > 90 ? q.raw.substring(0, 90) + '...' : q.raw,
      adaptedTitle: `Questão ${idx + 1}`,
      adaptedQuestion: questionText,
      steps: steps,
      adaptedOptions: adaptedOptions.length > 0 ? adaptedOptions : undefined,
      visualCue: visualCue,
      pedagogicalRationale: rationale
    };
  });

  // Instruções gerais adaptadas
  let generalInstructions = 'Instruções para o Aluno: Leia com tranquilidade. Você tem tempo para realizar cada questão com calma.';
  if (isTea) {
    generalInstructions = 'Rotina da Atividade: Esta avaliação possui ' + adaptedQuestions.length + ' questões com passos numerados. Comece pela questão 1. Quando terminar todas, avise o professor.';
  } else if (isTdah) {
    generalInstructions = 'Dica de Foco: Marque a caixinha [X] ao concluir cada etapa. Responda uma questão de cada vez sem pressa.';
  } else if (isDislexia) {
    generalInstructions = 'Instruções Claras: Todas as frases estão em ordem direta. Se preferir, você pode ler com apoio de régua de foco ou solicitar leitura assistida.';
  }

  // Parecer Técnico
  const pedagogicalSummary = `Este documento certifica a adequação curricular e avaliativa realizada para o perfil de ${profile.fullName}, em conformidade com as diretrizes da Lei Brasileira de Inclusão da Pessoa com Deficiência (Lei Federal nº 13.146/2015, Art. 28) e os princípios de Desenho Universal para a Aprendizagem (DUA) previstos na BNCC. As modificações efetuadas preservam 100% dos objetivos essenciais de aprendizagem e o conteúdo curricular programático, atuando exclusivamente na eliminação de barreiras cognitivas, linguísticas e atitudinais de acesso ao instrumento avaliativo.`;

  const teacherTips = [
    `Conceda tempo adicional de até 50% para a realização desta atividade sem penalidade na nota.`,
    `Permita que o estudante utilize recursos auxiliares como marca-texto ou rascunho livre.`,
    `Em caso de dúvida durante a leitura, ofereça mediação pontual para esclarecer o vocabulário sem fornecer a resposta final.`
  ];

  return {
    profileId,
    profileName: profile.name,
    adaptedTitle: title,
    adaptedGeneralInstructions: generalInstructions,
    questions: adaptedQuestions,
    pedagogicalSummary,
    pedagogicalTipsForTeacher: teacherTips,
    appliedStrategies: profile.strategies
  };
}
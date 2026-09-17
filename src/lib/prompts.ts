import { NeuroProfileId } from '@/types';

export const SYSTEM_PEDAGOGICAL_PROMPT = `
Você é o motor pedagógico do AdaptEdu, um especialista sênior em Neuroeducação, Psicopedagogia e Inclusão Escolar com profundo domínio da Lei Brasileira de Inclusão da Pessoa com Deficiência (Lei nº 13.146/2015) e da Base Nacional Comum Curricular (BNCC).

SUA MISSÃO:
Receber uma atividade escolar, prova ou lista de exercícios original e ADAPTÁ-LA para um aluno neurodivergente de acordo com o perfil solicitado (TEA, TDAH, Dislexia, Baixa Visão ou PEI Personalizado).

DIRETRIZES CRÍTICAS QUE NUNCA DEVEM SER VIOLADAS:
1. PRESERVAÇÃO DO OBJETO DE CONHECIMENTO: A adaptação NUNCA deve infantolizar o aluno nem eliminar o conteúdo científico/conceitual pretendido pelo professor. A adaptação visa remover barreiras de ACESSIBILIDADE e COMUNICAÇÃO, e não rebaixar a inteligência do estudante.
2. RIGOR TERMINOLÓGICO: Mantenha os conceitos-chave, mas garanta que o comando de execução seja cristalino.
3. ESTRUTURA DO RETORNO: Você SEMPRE deve responder em formato JSON estrito, sem markdown ao redor, seguindo o schema fornecido.
`;

export function getProfilePedagogicalRules(profileId: NeuroProfileId, customPeiNotes?: string): string {
  switch (profileId) {
    case 'tea':
      return `
PERFIL: TRANSTORNO DO ESPECTRO AUTISTA (TEA)
- Elimine 100% de metáforas, ironias, duplos sentidos, figuras de linguagem e ambiguidades ("cara amarrada", "coração na mão", "voar alto").
- Se o texto original for literário/poético, insira uma breve nota explicativa literal antes: "(Nota: o autor usou essa expressão para dizer literalmente que...)".
- Forneça objetivos explícitos e imediatos para cada questão (ex: "Objetivo: Encontrar o valor de X").
- Divida cada questão em passos sequenciais numerados com início e fim definidos (Passo 1, Passo 2, Passo 3).
- Use linguagem direta e comandos literais. Evite instruções abertas como "discorra sobre o que você sente".
- Insira uma sugestão de pista visual concreta ou âncora temática para cada questão.
`;

    case 'tdah':
      return `
PERFIL: TRANSTORNO DO DÉFICIT DE ATENÇÃO E HIPERATIVIDADE (TDAH)
- CHUNKING OBRIGATÓRIO: Quebre blocos longos de enunciados em pequenas etapas com caixas de checagem [ ] para o aluno marcar conforme conclui.
- DESTAQUE VISUAL: Coloque em **NEGRITO** todos os verbos de ação e comandos operatórios (ex: **Leia**, **Calcule**, **Sublinhe**, **Assinale**, **Escreva**).
- ELIMINAÇÃO DE RUÍDO: Remova narrativas desnecessárias ou historinhas secundárias que sirvam apenas como distração cognitiva periférica.
- NÚMEROS E DADOS DESTACADOS: Destaque visualmente os números ou fatos principais da questão.
- ESPAÇO RESPIRÁVEL: Garanta que cada questão tenha início e fim bem demarcados para não misturar visualmente com a próxima.
`;

    case 'dislexia':
      return `
PERFIL: DISLEXIA DO DESENVOLVIMENTO
- ORDEM SINTÁTICA DIRETA: Reescreva todas as frases na ordem direta (Sujeito + Verbo + Predicado). Evite orações subordinadas intercaladas.
- SEM DUPLA NEGAÇÃO: Jamais use expressões como "não é incorreto dizer", "assinale a que não está errada". Transforme em afirmativa direta: "Assinale a alternativa verdadeira".
- SIMPLIFICAÇÃO MORFOSSINTÁTICA: Troque palavras rebuscadas ou com encontros consonantais pesados por sinônimos claros e frequentes, sem perder o conceito da matéria.
- ALTERNATIVAS ESPAÇADAS: Cada alternativa de múltipla escolha deve ser uma linha única curta e objetiva para evitar salto involuntário de linha visual.
`;

    case 'baixa_visao':
      return `
PERFIL: BAIXA VISÃO / ACESSIBILIDADE VISUAL
- Formatação de alto contraste sem sombreamento ou itálicos tênues.
- Instruções para que a folha tenha espaço delimitado com linhas grossas e escuras para a resposta do aluno.
- Questões de múltipla escolha com letras bem separadas e alternativas em parágrafos distintos.
- Descrição textual minuciosa de qualquer imagem, gráfico ou figura geométrica.
`;

    case 'pei_personalizado':
      return `
PERFIL: PLANO DE ENSINO INDIVIDUALIZADO (PEI)
- Adapte a atividade integrando rigorosamente as seguintes observações e laudos específicos do aluno informados pelo professor/coordenação:
"${customPeiNotes || 'Adaptação balanceada com foco em enunciados curtos, suporte visual e no máximo 3 alternativas por questão.'}"
- Respeite as limitações descritas preservando o engajamento do estudante.
`;
  }
}

export function buildAdaptationPrompt(
  originalText: string,
  profileId: NeuroProfileId,
  studentName?: string,
  customPeiNotes?: string
): string {
  const profileRules = getProfilePedagogicalRules(profileId, customPeiNotes);

  return `
Você deve adaptar a seguinte atividade escolar original para o perfil selecionado.

---
ATIVIDADE ORIGINAL:
${originalText}
---

${profileRules}

${studentName ? `ALUNO ESPECÍFICO: ${studentName}` : ''}

RETORNE EXCLUSIVAMENTE UM OBJETO JSON VÁLIDO no seguinte formato (sem formatação markdown tripla como \`\`\`json no início/fim, apenas o JSON puro):
{
  "adaptedTitle": "Título claro e adaptado da avaliação",
  "adaptedGeneralInstructions": "Instruções gerais adaptadas para o aluno no início da folha",
  "appliedStrategies": [
    "Lista de estratégias pedagógicas aplicadas nesta atividade (ex: Fatiamento cognitivo, Remoção de metáforas, etc.)"
  ],
  "questions": [
    {
      "id": 1,
      "originalSnippet": "Pequeno trecho de como era no original",
      "adaptedTitle": "Subtítulo amigável da questão (opcional)",
      "adaptedQuestion": "O enunciado da questão completamente adaptado e reescrito segundo as regras do perfil",
      "steps": ["Passo 1: ...", "Passo 2: ..."],
      "adaptedOptions": ["a) Primeira opção...", "b) Segunda opção..."],
      "visualCue": "Sugestão ou descrição de pista visual / ícone ou caixa de checagem",
      "pedagogicalRationale": "Por que esta questão foi alterada desta forma para atender a este perfil neurodivergente"
    }
  ],
  "pedagogicalSummary": "Texto formal de 2 a 3 parágrafos justificando a adaptação com base na Lei Brasileira de Inclusão (Lei 13.146/2015) e BNCC para compor a pasta do PEI da escola",
  "pedagogicalTipsForTeacher": [
    "Dica prática 1 para o professor ou monitor durante a aplicação da prova em sala",
    "Dica prática 2 para tempo estendido ou mediação oral",
    "Dica prática 3 sobre incentivo e redução de ansiedade"
  ]
}
`;
}
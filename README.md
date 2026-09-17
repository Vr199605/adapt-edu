# AdaptEdu - Adaptador Pedagógico Inteligente para Inclusão & Neurodivergência

> **Sistema desenvolvido para solucionar a maior dor atual de colégios, professores e monitores: a obrigação legal e pedagógica de adaptar avaliações para estudantes neurodivergentes (TEA, TDAH, Dislexia, Baixa Visão e PEI).**

---

## 🎯 A Dor do Mercado & Oportunidade de Venda

1. **Obrigação Legal (Lei nº 13.146/2015 - LBI):**
   * As escolas particulares e públicas são legalmente obrigadas a fornecer material e avaliações adaptadas para alunos com deficiência e neurodivergências, **sem cobrar taxa extra dos pais**.
   * Falhas de adaptação geram reclamações graves de famílias e notificações do Ministério Público.
2. **Sobrecarga do Professor:**
   * Professores gastam entre 8 a 15 horas manuais por bimestre reescrevendo provas para 3 a 5 laudos diferentes por sala de aula.
3. **A Solução do AdaptEdu:**
   * O professor insere a prova original e, em **30 segundos**, recebe a avaliação adaptada com rigor conceitual (sem rebaixar ou infantilizar o conteúdo) + **Folha de Prova em formato oficial A4** + **Parecer Técnico do PEI** para o arquivo da escola.

---

## 🚀 Funcionalidades Principais

* **Módulos Especializados por Neurodivergência:**
  * **TEA (Transtorno do Espectro Autista):** Elimina metáforas, ironias e ambiguidades; divide enunciados em passos sequenciais (1º, 2º, 3º); inclui pistas visuais e previsibilidade de início/fim.
  * **TDAH (Déficit de Atenção e Hiperatividade):** *Chunking* cognitivo (fatiamento de enunciados); destaque em **negrito** dos verbos de comando operatório (**Calcule**, **Assinale**, **Explique**); caixas de checagem `[ ]` interativas.
  * **Dislexia:** Ordem sintática direta (Sujeito + Verbo + Predicado); tipografia adaptada (fonte *Lexend*); espaçamento ampliado entre linhas (1.8x) e alternativas curtas.
  * **Baixa Visão:** Alto contraste, fontes ampliadas (16pt+) e linhas guias demarcadas para escrita manual.
  * **PEI Personalizado:** Campo para inclusão de laudo multidisciplinar ou particularidades do estudante.
* **Folha de Prova para Impressão A4:**
  * Cabeçalho oficial escolar (Escola, Aluno, Turma, Data, Professor, Rubrica).
  * Estilização estrita para impressão (`@media print`): oculta botões da tela, remove sombras e fundos coloridos para não gastar tinta.
* **Comparador Lado a Lado (Original vs. Adaptada):**
  * Auditoria transparente com justificativa pedagógica para cada questão alterada.
* **Parecer Técnico de Adequação Curricular (PEI):**
  * Relatório formal em 1 página fundamentado no Art. 28 da Lei Federal nº 13.146/2015 e BNCC.
  * Dicas práticas de mediação em sala para o professor/monitor.
* **Modo Offline e IA Híbrida:**
  * Funciona imediatamente com o motor pedagógico heurístico interno (sem custo de API).
  * Suporta integração com **Google Gemini API** (`gemini-2.0-flash`) para adaptações ainda mais ricas e personalizadas.

---

## 🛠️ Tecnologias Utilizadas

* **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
* **Estilização:** Tailwind CSS v4 + Regras avançadas de `@media print`
* **Tipografia Inclusiva:** Google Fonts (`Lexend` & `Inter`)
* **Ícones:** Lucide React
* **Motor de IA:** Google Gemini API (`@google/genai` / REST) + Fallback Heurístico Heuristics Engine

---

## 📦 Como Rodar Localmente

```bash
# 1. Instalar dependências
npm install --ignore-scripts

# 2. Iniciar servidor de desenvolvimento
npm run dev

# 3. Acesse no navegador
http://localhost:3000
```

---

## 🌐 Como Publicar no GitHub e Vercel

### Passo 1: Criar Repositório no GitHub
1. Acesse o seu [GitHub](https://github.com/new) e crie um novo repositório (ex: `adapt-edu`).
2. No terminal do projeto, execute:
```bash
git remote add origin https://github.com/SEU_USUARIO/adapt-edu.git
git branch -M main
git push -u origin main
```

### Passo 2: Deploy na Vercel
1. Acesse [vercel.com](https://vercel.com) e faça login com sua conta do GitHub.
2. Clique em **"Add New..."** > **"Project"**.
3. Importe o repositório `adapt-edu`.
4. (Opcional) Em **Environment Variables**, adicione `GEMINI_API_KEY` com sua chave do Google AI Studio.
5. Clique em **Deploy**! Em menos de 1 minuto seu sistema estará no ar com link público HTTPS.

---

## 💼 Guia Comercial: Como Vender para Escolas

* **Público-Alvo:** Coordenadores Pedagógicos, Diretores de Colégios Privados e Professores de Cursinhos.
* **Preço Sugerido B2B:** R$ 490 a R$ 1.200/mês por colégio.
* **Preço Sugerido B2C:** R$ 39/mês para professores individuais.
* **Gatilho de Venda:** Economia de até 15 horas de trabalho por professor por bimestre e conformidade jurídica com a Lei nº 13.146/2015.
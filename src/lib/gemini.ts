import { AdaptationResult, NeuroProfileId } from '@/types';
import { buildAdaptationPrompt, SYSTEM_PEDAGOGICAL_PROMPT } from './prompts';
import { generateHeuristicAdaptation } from './heuristics';
import { NEURO_PROFILES } from './profiles';

export async function adaptActivityWithGemini(
  originalText: string,
  profileId: NeuroProfileId,
  apiKey?: string,
  studentName?: string,
  customPeiNotes?: string
): Promise<AdaptationResult> {
  const activeKey = apiKey || process.env.GEMINI_API_KEY;

  // Se não houver chave de API informada, utiliza o motor heurístico especializado instantâneo
  if (!activeKey || activeKey.trim() === '') {
    return generateHeuristicAdaptation(originalText, profileId, studentName, customPeiNotes);
  }

  const prompt = buildAdaptationPrompt(originalText, profileId, studentName, customPeiNotes);

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${activeKey.trim()}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_PEDAGOGICAL_PROMPT }]
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topP: 0.8,
          responseMimeType: 'application/json'
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`[AdaptEdu] Erro na API do Gemini (${response.status}):`, errText);
      // Fallback gracioso para garantir que o professor nunca fique na mão
      return generateHeuristicAdaptation(originalText, profileId, studentName, customPeiNotes);
    }

    const data = await response.json();
    const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawContent) {
      return generateHeuristicAdaptation(originalText, profileId, studentName, customPeiNotes);
    }

    // Limpa possíveis delimitadores de markdown json caso a IA os envie
    const cleanedJson = rawContent
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();

    const parsed = JSON.parse(cleanedJson);
    const profile = NEURO_PROFILES[profileId] || NEURO_PROFILES.tdah;

    return {
      profileId,
      profileName: profile.name,
      adaptedTitle: parsed.adaptedTitle || 'Avaliação Adaptada',
      adaptedGeneralInstructions: parsed.adaptedGeneralInstructions || 'Instruções adaptadas para resolução.',
      questions: Array.isArray(parsed.questions) ? parsed.questions : [],
      pedagogicalSummary: parsed.pedagogicalSummary || '',
      pedagogicalTipsForTeacher: Array.isArray(parsed.pedagogicalTipsForTeacher) ? parsed.pedagogicalTipsForTeacher : [],
      appliedStrategies: Array.isArray(parsed.appliedStrategies) ? parsed.appliedStrategies : profile.strategies
    };
  } catch (err) {
    console.error('[AdaptEdu] Exceção ao chamar Gemini, acionando fallback pedagógico:', err);
    return generateHeuristicAdaptation(originalText, profileId, studentName, customPeiNotes);
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { adaptActivityWithGemini } from '@/lib/gemini';
import { NeuroProfileId } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { originalText, profileId, apiKey, studentName, customPeiNotes } = body;

    if (!originalText || typeof originalText !== 'string' || originalText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Por favor, forneça o texto da atividade original.' },
        { status: 400 }
      );
    }

    const validProfiles: NeuroProfileId[] = ['tea', 'tdah', 'dislexia', 'baixa_visao', 'pei_personalizado'];
    const selectedProfile: NeuroProfileId = validProfiles.includes(profileId) ? profileId : 'tdah';

    const result = await adaptActivityWithGemini(
      originalText,
      selectedProfile,
      apiKey,
      studentName,
      customPeiNotes
    );

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error('[API adapt] Erro interno:', error);
    return NextResponse.json(
      { error: 'Falha ao processar adaptação pedagógica.' },
      { status: 500 }
    );
  }
}
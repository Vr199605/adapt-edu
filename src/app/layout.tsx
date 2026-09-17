import type { Metadata } from 'next';
import { Inter, Lexend } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AdaptEdu - Adaptador Pedagógico para Inclusão & Neurodivergência',
  description: 'Sistema de adaptação automática de provas e atividades para TEA, TDAH, Dislexia e Baixa Visão com Parecer Técnico do PEI e impressão A4.',
  keywords: ['inclusão escolar', 'adaptação pedagógica', 'TEA', 'TDAH', 'Dislexia', 'PEI', 'BNCC', 'LBI', 'provas adaptadas'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${lexend.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
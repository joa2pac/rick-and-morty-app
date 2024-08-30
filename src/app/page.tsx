"use client"

import Header from '@/app/_presentation/components/header';
import CharacterSelection from '@/app/_presentation/components/character-selection';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <main className="container mx-auto py-8">
        <CharacterSelection />
      </main>
    </div>
  );
}

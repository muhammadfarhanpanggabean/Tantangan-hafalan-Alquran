import React, { useState } from 'react';
import { Player, Difficulty } from '../types';
import { JUZ_COUNT, DIFFICULTIES } from '../constants';

interface GameSetupScreenProps {
  player: Player;
  onStartGame: (juz: number[], difficulty: Difficulty) => void;
}

const GameSetupScreen: React.FC<GameSetupScreenProps> = ({ player, onStartGame }) => {
  const [selectedJuz, setSelectedJuz] = useState<number[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);

  const handleJuzToggle = (juz: number) => {
    setSelectedJuz(prev =>
      prev.includes(juz) ? prev.filter(j => j !== juz) : [...prev, juz]
    );
  };

  const handleStart = () => {
    if (selectedJuz.length > 0 && selectedDifficulty) {
      onStartGame(selectedJuz.sort((a,b) => a-b), selectedDifficulty);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full animate-fade-in border border-slate-200">
      <h2 className="text-2xl font-bold mb-2 text-center">
        Assalamu'alaikum, <span className="text-teal-500">{player.name}</span>!
      </h2>
      <p className="text-center text-slate-600 mb-6">Siapkan hafalan terbaikmu.</p>
      
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3">1. Pilih Juz</h3>
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2">
          {Array.from({ length: JUZ_COUNT }, (_, i) => i + 1).map(juz => (
            <button
              key={juz}
              onClick={() => handleJuzToggle(juz)}
              className={`p-2 rounded-lg font-bold text-center border-2 transition-all duration-200 ${
                selectedJuz.includes(juz)
                  ? 'bg-teal-500 text-white border-teal-500'
                  : 'bg-slate-100 border-slate-200 hover:border-teal-400'
              }`}
            >
              {juz}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3">2. Pilih Tingkat Kesulitan</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          {DIFFICULTIES.map(level => (
            <button
              key={level}
              onClick={() => setSelectedDifficulty(level)}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold border-2 transition-all duration-200 ${
                selectedDifficulty === level
                  ? 'bg-teal-500 text-white border-teal-500'
                  : 'bg-slate-100 border-slate-200 hover:border-teal-400'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
      
      <button
        onClick={handleStart}
        disabled={selectedJuz.length === 0 || !selectedDifficulty}
        className="w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:transform-none"
      >
        Mulai Permainan
      </button>
    </div>
  );
};

export default GameSetupScreen;
import React, { useState } from 'react';

interface WelcomeScreenProps {
  onNameSubmit: (name: string) => void;
  onShowLeaderboard: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNameSubmit, onShowLeaderboard }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onNameSubmit(name.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 text-center animate-fade-in">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-slate-200">
        <h2 className="text-3xl font-bold text-teal-600 mb-4">
          Selamat Datang!
        </h2>
        <p className="text-slate-600 mb-6">
          Uji dan tingkatkan hafalan Al-Quran Anda. Masukkan nama Anda untuk memulai.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama Anda"
            className="w-full px-4 py-3 bg-slate-100 border-2 border-transparent rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
            required
          />
          <button
            type="submit"
            className="w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-gray-400"
            disabled={!name.trim()}
          >
            Mulai
          </button>
        </form>
         <button
          onClick={onShowLeaderboard}
          className="w-full mt-4 bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-lg hover:bg-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
        >
          Papan Peringkat
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
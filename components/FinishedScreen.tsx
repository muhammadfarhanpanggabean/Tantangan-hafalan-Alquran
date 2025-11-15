import React from 'react';
import { Score } from '../types';

interface FinishedScreenProps {
  scores: Score[];
  currentPlayerScore: number;
  onPlayAgain: () => void;
  playerName: string;
}

const FinishedScreen: React.FC<FinishedScreenProps> = ({ scores, currentPlayerScore, onPlayAgain, playerName }) => {
  const topScores = scores.slice(0, 10);
  const playerHistory = scores.filter(score => score.name === playerName).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());


  return (
    <div className="flex flex-col items-center gap-8 animate-fade-in">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center w-full max-w-md border border-slate-200">
            <h2 className="text-3xl font-bold text-teal-500 mb-2">Permainan Selesai!</h2>
            <p className="text-slate-600 mb-4">Skor akhir Anda:</p>
            <p className="text-6xl font-bold text-slate-800 mb-6">{currentPlayerScore}</p>
            <button
                onClick={onPlayAgain}
                className="w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105"
            >
                Main Lagi
            </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl border border-slate-200">
            <h3 className="text-2xl font-bold mb-4 text-center">Riwayat Permainan Anda</h3>
             <div className="overflow-x-auto max-h-60">
                <table className="w-full text-left">
                    <thead className="bg-slate-100 sticky top-0">
                        <tr>
                            <th className="p-3 font-semibold">Tanggal</th>
                            <th className="p-3 font-semibold">Juz</th>
                            <th className="p-3 font-semibold">Tingkat</th>
                            <th className="p-3 font-semibold text-right">Skor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playerHistory.map((score) => (
                            <tr key={`${score.name}-${score.date}`} className="border-b border-slate-200 hover:bg-slate-50">
                                <td className="p-3">{new Date(score.date).toLocaleDateString('id-ID')}</td>
                                <td className="p-3">{score.juz.join(', ')}</td>
                                <td className="p-3">{score.difficulty}</td>
                                <td className="p-3 text-right font-semibold">{score.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {playerHistory.length === 0 && <p className="text-center p-4 text-slate-500">Belum ada riwayat permainan.</p>}
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl border border-slate-200">
            <h3 className="text-2xl font-bold mb-4 text-center">Papan Peringkat (Top 10)</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="p-3 font-semibold">Peringkat</th>
                            <th className="p-3 font-semibold">Nama</th>
                            <th className="p-3 font-semibold text-right">Skor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topScores.map((score, index) => (
                            <tr key={`${score.name}-${score.date}`} className="border-b border-slate-200 hover:bg-slate-50">
                                <td className="p-3 font-bold text-teal-500">{index + 1}</td>
                                <td className="p-3">{score.name}</td>
                                <td className="p-3 text-right font-semibold">{score.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {scores.length === 0 && <p className="text-center p-4 text-slate-500">Belum ada skor tercatat.</p>}
            </div>
        </div>
    </div>
  );
};

export default FinishedScreen;
import React from 'react';
import { Score } from '../types';

interface LeaderboardScreenProps {
  scores: Score[];
  onBack: () => void;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ scores, onBack }) => {
  const topScores = scores.slice(0, 50); // Show top 50 scores

  return (
    <div className="flex flex-col items-center gap-8 animate-fade-in w-full">
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl border border-slate-200">
            <h3 className="text-2xl font-bold mb-6 text-center text-teal-600">Papan Peringkat Global</h3>
            <div className="overflow-x-auto max-h-96">
                <table className="w-full text-left">
                    <thead className="bg-slate-100 sticky top-0">
                        <tr>
                            <th className="p-3 font-semibold rounded-tl-lg">Peringkat</th>
                            <th className="p-3 font-semibold">Nama</th>
                            <th className="p-3 font-semibold">Tanggal</th>
                            <th className="p-3 font-semibold text-right rounded-tr-lg">Skor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topScores.map((score, index) => (
                            <tr key={`${score.name}-${score.date}`} className="border-b border-slate-200 hover:bg-slate-50">
                                <td className="p-3 font-bold text-teal-500 w-16">{index + 1}</td>
                                <td className="p-3">{score.name}</td>
                                <td className="p-3 text-sm text-slate-500">{new Date(score.date).toLocaleDateString('id-ID')}</td>
                                <td className="p-3 text-right font-semibold">{score.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {scores.length === 0 && <p className="text-center p-8 text-slate-500">Belum ada skor tercatat. Jadilah yang pertama!</p>}
            </div>
             <div className="mt-6 text-center">
                <button
                    onClick={onBack}
                    className="bg-teal-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105"
                >
                    Kembali
                </button>
            </div>
        </div>
    </div>
  );
};

export default LeaderboardScreen;
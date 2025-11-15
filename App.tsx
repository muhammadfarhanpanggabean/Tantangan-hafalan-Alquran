import React, { useState, useEffect } from 'react';
import { GameState, Difficulty, Score, Player } from './types';
import { MOTIVATIONAL_QUOTES } from './constants';
import useLocalStorage from './hooks/useLocalStorage';

import WelcomeScreen from './components/WelcomeScreen';
import GameSetupScreen from './components/GameSetupScreen';
import GameScreen from './components/GameScreen';
import FinishedScreen from './components/FinishedScreen';
import Header from './components/Header';
import MotivationalQuote from './components/MotivationalQuote';
import LeaderboardScreen from './components/LeaderboardScreen';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [player, setPlayer] = useState<Player | null>(null);
  const [scores, setScores] = useLocalStorage<Score[]>('quran-game-scores', []);
  const [currentScore, setCurrentScore] = useState(0);

  const [gameConfig, setGameConfig] = useState<{ juz: number[], difficulty: Difficulty } | null>(null);
  const [motivationalQuote, setMotivationalQuote] = useState('');

  useEffect(() => {
    // Set a random motivational quote on initial load
    setMotivationalQuote(MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]);
  }, []);

  const handleNameSubmit = (name: string) => {
    setPlayer({ name });
    setGameState('setup');
  };

  const handleGameStart = (juz: number[], difficulty: Difficulty) => {
    setGameConfig({ juz, difficulty });
    setCurrentScore(0);
    setMotivationalQuote(MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]);
    setGameState('playing');
  };

  const handleGameEnd = (score: number) => {
    setCurrentScore(score);
    if (player && gameConfig) {
      const newScore: Score = {
        name: player.name,
        score,
        date: new Date().toISOString(),
        juz: gameConfig.juz,
        difficulty: gameConfig.difficulty,
      };
      setScores(prevScores => [...prevScores, newScore].sort((a, b) => b.score - a.score));
    }
    setGameState('finished');
  };

  const handlePlayAgain = () => {
    setGameConfig(null);
    setCurrentScore(0);
    setMotivationalQuote(MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]);
    setGameState('setup');
  };

  const handleShowLeaderboard = () => {
    setGameState('leaderboard');
  };

  const handleBackToWelcome = () => {
    setGameState('welcome');
  };
  
  const renderContent = () => {
    switch (gameState) {
      case 'welcome':
        return <WelcomeScreen onNameSubmit={handleNameSubmit} onShowLeaderboard={handleShowLeaderboard} />;
      case 'setup':
        return player && <GameSetupScreen player={player} onStartGame={handleGameStart} />;
      case 'playing':
        return gameConfig && <GameScreen {...gameConfig} onGameEnd={handleGameEnd} motivationalQuote={motivationalQuote} />;
      case 'finished':
        return player && <FinishedScreen scores={scores} currentPlayerScore={currentScore} onPlayAgain={handlePlayAgain} playerName={player.name} />;
      case 'leaderboard':
        return <LeaderboardScreen scores={scores} onBack={handleBackToWelcome} />;
      default:
        return <WelcomeScreen onNameSubmit={handleNameSubmit} onShowLeaderboard={handleShowLeaderboard} />;
    }
  };

  return (
    <div className="min-h-screen font-sans antialiased">
      <Header />
      <main className="container mx-auto p-4 md:p-6 lg:p-8 flex flex-col items-center">
        {gameState !== 'welcome' && gameState !== 'leaderboard' && gameState !== 'playing' && <MotivationalQuote quote={motivationalQuote} />}
        <div className="w-full max-w-4xl mt-8">
            {renderContent()}
        </div>
      </main>
    </div>
  );
}
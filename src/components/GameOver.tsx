import React from 'react';
import './Game.css';

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, onRestart }) => {
  return (
    <div className="glass-card game-over">
      <h1>¡Juego Terminado!</h1>
      <p>Tu Puntuación: <span className="score-value">{score}</span></p>
      <button className="start-button" onClick={onRestart}>Jugar de Nuevo</button>
    </div>
  );
};

export default GameOver;
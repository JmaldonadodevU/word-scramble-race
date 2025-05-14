import React, { useEffect } from 'react';
import useGameState from '../hooks/useGameState';
import WordScramble from './WordScramble';
import GameOver from './GameOver';
import './Game.css';

const Game: React.FC = () => {
    const {
        currentWord,
        score,
        timer,
        isGameOver,
        startGame,
        resetGame,
    } = useGameState();

    useEffect(() => {
        // Iniciar el juego automáticamente al cargar el componente
        startGame();
    }, []);

    return (
        <div className="game-container">
            {isGameOver ? (
                <GameOver score={score} onRestart={resetGame} />
            ) : (
                <>
                    <h1 className="game-title">Word Scramble Race</h1>
                    <div className="game-header">
                        <div className="game-stats">
                            <div className="stat-item">
                                <span className="stat-label">Puntuación</span>
                                <span className="stat-value">{score}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Tiempo</span>
                                <span className="stat-value timer-value">{timer}</span>
                            </div>
                        </div>
                    </div>
                    <WordScramble word={currentWord} />
                    <button className="start-button" onClick={startGame}>Reiniciar Juego</button>
                </>
            )}
        </div>
    );
};

export default Game;
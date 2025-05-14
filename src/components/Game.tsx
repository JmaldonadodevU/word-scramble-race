import React, { useEffect } from 'react';
import useGameState from '../hooks/useGameState';
import WordScramble from './WordScramble';
import GameOver from './GameOver';

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
        if (isGameOver) {
            // Handle game over logic here, e.g., save score, show results
        }
    }, [isGameOver]);

    return (
        <div className="game-container">
            {isGameOver ? (
                <GameOver score={score} onRestart={resetGame} />
            ) : (
                <>
                    <h1>Word Scramble Race</h1>
                    <p>Score: {score}</p>
                    <p>Time Left: {timer}</p>
                    <WordScramble word={currentWord} />
                    <button onClick={startGame}>Start Game</button>
                </>
            )}
        </div>
    );
};

export default Game;
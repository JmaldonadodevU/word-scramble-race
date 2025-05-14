import { useState, useEffect } from 'react';

const useGameState = () => {
    const [currentWord, setCurrentWord] = useState('');
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(60); // 60 seconds timer
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        if (timer > 0 && !isGameOver) {
            const interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else if (timer === 0) {
            setIsGameOver(true);
        }
    }, [timer, isGameOver]);

    const resetGame = () => {
        setCurrentWord('');
        setScore(0);
        setTimer(60);
        setIsGameOver(false);
    };

    const updateScore = (points: number) => {
        setScore(prevScore => prevScore + points);
    };

    // Add this function since it's used in Game.tsx
    const startGame = () => {
        resetGame();
    };

    return {
        currentWord,
        setCurrentWord,
        score,
        timer,
        isGameOver,
        resetGame,
        updateScore,
        startGame,
    };
};

export default useGameState;
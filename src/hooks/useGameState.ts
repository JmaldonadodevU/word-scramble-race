import { useState, useEffect } from 'react';
import { fetchWords } from '../services/wordService';

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

    // Función para obtener una nueva palabra aleatoria
    const loadNewWord = async () => {
        try {
            const words = await fetchWords();
            const randomWord = words[Math.floor(Math.random() * words.length)];
            setCurrentWord(randomWord);
        } catch (error) {
            console.error("Error al cargar palabras:", error);
            setCurrentWord('default'); // En caso de error, usamos una palabra por defecto
        }
    };

    const resetGame = () => {
        setScore(0);
        setTimer(60);
        setIsGameOver(false);
    };

    const updateScore = (points: number) => {
        setScore(prevScore => prevScore + points);
    };

    // Modificamos startGame para que también cargue una nueva palabra
    const startGame = async () => {
        resetGame();
        await loadNewWord(); // Cargamos una nueva palabra al iniciar el juego
    };

    // Función para avanzar a la siguiente palabra
    const nextWord = async () => {
        await loadNewWord();
        updateScore(1); // Incrementamos la puntuación cuando el jugador acierta
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
        nextWord,
    };
};

export default useGameState;
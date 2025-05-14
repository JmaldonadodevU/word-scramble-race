import React, { useState, useEffect } from 'react';
import { fetchWords, scrambleWord } from '../services/wordService';
import './WordScramble.css';

interface WordScrambleProps {
    word?: string;
}

const WordScramble: React.FC<WordScrambleProps> = ({ word }) => {
    const [internalWord, setInternalWord] = useState<string>('');
    const [scrambledWord, setScrambledWord] = useState<string>('');
    const [userInput, setUserInput] = useState<string>('');
    const [score, setScore] = useState<number>(0);
    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

    useEffect(() => {
        if (word) {
            setInternalWord(word);
            setScrambledWord(scrambleWord(word));
        } else {
            loadNewWord();
        }
    }, [word]);

    const loadNewWord = async () => {
        try {
            const words = await fetchWords();
            const randomWord = words[Math.floor(Math.random() * words.length)];
            setInternalWord(randomWord);
            setScrambledWord(scrambleWord(randomWord));
            setUserInput('');
            setMessage('');
            setMessageType('');
        } catch (error) {
            console.error("Failed to load words:", error);
            setMessage("Error al cargar palabras. Intenta de nuevo.");
            setMessageType('error');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userInput.toLowerCase() === internalWord.toLowerCase()) {
            setScore(score + 1);
            setMessage('¡Correcto! Cargando nueva palabra...');
            setMessageType('success');
            loadNewWord();
        } else {
            setMessage('¡Intenta de nuevo!');
            setMessageType('error');
        }
    };

    return (
        <div className="word-scramble">
            <p>Desordena esta palabra:</p>
            <div className="scrambled-word">{scrambledWord}</div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    placeholder="Tu respuesta"
                    autoFocus
                />
                <button type="submit">Comprobar</button>
            </form>
            {message && <p className={`message ${messageType}`}>{message}</p>}
        </div>
    );
};

export default WordScramble;
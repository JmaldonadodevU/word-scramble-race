import React, { useState, useEffect } from 'react';
import { scrambleWord } from '../services/wordService';
import './WordScramble.css';

interface WordScrambleProps {
    word?: string;
    onCorrectGuess?: () => Promise<void>;
}

const WordScramble: React.FC<WordScrambleProps> = ({ word, onCorrectGuess }) => {
    const [scrambledWord, setScrambledWord] = useState<string>('');
    const [userInput, setUserInput] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

    useEffect(() => {
        if (word) {
            setScrambledWord(scrambleWord(word));
            setUserInput('');
            setMessage('');
            setMessageType('');
        }
    }, [word]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (userInput.toLowerCase() === word?.toLowerCase()) {
            setMessage('¡Correcto! Cargando nueva palabra...');
            setMessageType('success');
            if (onCorrectGuess) {
                await onCorrectGuess();
            }
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
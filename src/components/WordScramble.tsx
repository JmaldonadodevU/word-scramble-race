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
        } catch (error) {
            console.error("Failed to load words:", error);
            setMessage("Failed to load words. Please try again.");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userInput.toLowerCase() === internalWord.toLowerCase()) {
            setScore(score + 1);
            setMessage('Correct! Loading new word...');
            loadNewWord();
        } else {
            setMessage('Try again!');
        }
    };

    return (
        <div className="word-scramble">
            <p>Score: {score}</p>
            <p>Unscramble the word: {scrambledWord}</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    placeholder="Your guess"
                />
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default WordScramble;
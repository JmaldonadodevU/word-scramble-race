// Fallback word list when API is not available
const FALLBACK_WORDS = [
    'apple', 'banana', 'cherry', 'orange', 'grape', 
    'lemon', 'mango', 'peach', 'kiwi', 'pear',
    'melon', 'plum', 'avocado', 'strawberry', 'blueberry'
];

export const fetchWords = async (): Promise<string[]> => {
    try {
        const response = await fetch('https://api.example.com/words');
        if (!response.ok) {
            throw new Error('Failed to fetch words');
        }
        const data = await response.json();
        return data.words;
    } catch (error) {
        console.warn('Using fallback word list:', error);
        return FALLBACK_WORDS;
    }
};

export const scrambleWord = (word: string): string => {
    const scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
    return scrambled;
};

export const checkWord = (input: string, original: string): boolean => {
    return input.trim().toLowerCase() === original.trim().toLowerCase();
};
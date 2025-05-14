import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <h1>Word Scramble Race</h1>
            <p>Welcome to the Word Scramble Race! Test your skills in this fun and challenging game.</p>
            <Link to="/game" className="start-button">Start Game</Link>
        </div>
    );
};

export default Home;
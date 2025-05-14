import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <div className="glass-card">
                <h1>Word Scramble Race</h1>
                <p>¡Bienvenido a Word Scramble Race! Pon a prueba tus habilidades en este divertido y desafiante juego.</p>
                <Link to="/game" className="start-button">Comenzar Juego</Link>
            </div>
        </div>
    );
};

export default Home;
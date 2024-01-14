// WelcomeScreen.js
import './WelcomeScreen.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function WelcomeScreen() {
    const [playerName, setPlayerName] = useState('');
  

    const handleStartGame = () => {
        if (playerName.trim() !== '') {
            // Redirige al jugador a la pantalla del juego con el nombre del jugador en la URL
            window.location.href = `/game?player=${encodeURIComponent(playerName)}`;
        } else {
            alert('Por favor, introduce tu nombre para comenzar el juego.');
        }
    };

    const handleInputChange = (e) => {
        setPlayerName(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleStartGame(e);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Juego del Ahorcado</h1> {/* Título del juego */}
            <input
                type="text"
                placeholder="Introduce tu nombre"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <Link to={`/game?player=${encodeURIComponent(playerName)}`}>
                <button className="start-button" onClick={handleStartGame}>Comenzar Juego</button>
            </Link>

            <footer className="footer">
                2023 Juego del Ahorcado
            </footer>
           
        </div>
    );
}

export default WelcomeScreen;


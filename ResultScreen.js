// ResultScreen.js
import './ResultScreen.css';
import React from 'react';
import { Link } from 'react-router-dom';

function ResultScreen({ playerName, result }) {
  const handleRestartGame = () => {
      // Lógica para reiniciar el juego
      alert('Aquí va la lógica para reiniciar el juego');
      window.location.href = '/';
    };

   return (
        <div className="container">
            <h1>Resultados del Juego</h1>
            <p>{result}</p>
            <p>¡Hola, {playerName}!</p>

            <Link to="/">
                <button className="home-button">Volver a Inicio</button>
            </Link>

            <button className="reset-game" onClick={handleRestartGame}>Jugar de Nuevo</button>

            <footer className="footer">
                2023 Juego del Ahorcado
            </footer>
        </div>
    );
}

export default ResultScreen;

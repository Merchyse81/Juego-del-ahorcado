// GameScreen.js
import './GameScreen.css';
import React, {useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function GameScreen({ onEndGame }) {

    const params = new URLSearchParams(window.location.search);
    const playerName = params.get('player');

    const [word, setWord] = useState('');
    const [guesses, setGuesses] = useState([]);
    const maxAttempts = 7;
    const [attempts, setAttempts] = useState(maxAttempts);
    const alphabet = "abcdefghijklmnñopqrstuvwxyz".split('');
   
    //No distingue letras mayúsculas, minúsculas o con acentos, para que las acepte todas
    const normalizeLetter = (letter) => {
        return letter.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      };

    useEffect(() => {
        axios.get('https://random-word-api.herokuapp.com/word?lang=es&length=8')
            .then(response => {
                setWord(response.data[0]);
            })
            .catch(error => {
                console.error("Error al obtener la palabra", error);
            });
    }, []);

    
    const handleLetterGuess = (letter) => {
        const normalizedLetter = normalizeLetter(letter);
        const normalizedWord = word.split('').map(normalizeLetter).join('');
        const normalizedGuesses = guesses.map(normalizeLetter);
    
        if (
          !normalizedGuesses.includes(normalizedLetter) &&
          attempts > 0 &&
          !normalizedWord.includes(normalizedLetter)
        ) {
          setGuesses([...guesses, letter]);
          setAttempts(attempts - 1);
        } else if (
          !normalizedGuesses.includes(normalizedLetter) &&
          attempts > 0 &&
          normalizedWord.includes(normalizedLetter)
        ) {
          setGuesses([...guesses, letter]);
          if (!normalizedWord.split('').some((char) => !normalizedGuesses.includes(char))) {
            setAttempts(0);
          }
        }
      };

      const renderedWord = word
      .split('')
      .map((letter) => guesses.includes(normalizeLetter(letter)) ? letter : '_')
      .join(' ');

    

      // Verificar si el jugador ha ganado o perdido
      let message = '';
        if (attempts === 0) {
            message = `¡Se han agotado los intentos! La palabra era: ${word}`;
        } else if (!renderedWord.includes('_')) {
            message = '¡Felicidades! ¡Has ganado!';
        }

        const resetGame = () => {
            setGuesses([]);
            setAttempts(maxAttempts);
            axios
              .get('https://random-word-api.herokuapp.com/word?lang=es&length=8')
              .then((response) => {
                setWord(response.data[0]);
                message = '';
              })
              .catch((error) => {
                console.error('Error al obtener la palabra', error);
              });
              window.location.href = '/';
          }; 

    
      return (
        <div className="container">
        <h2>Juego del Ahorcado</h2>
        <h3>Bienvenido, {playerName}!</h3>
        <p>Intentos restantes: {attempts}</p>
        <p>Palabra a adivinar: {renderedWord}</p>
        {message && <p>{message}</p>}
        <div className="alphabet-buttons">
          {alphabet.map((letter, index) => (
            <button
              key={index}
              onClick={() => handleLetterGuess(letter)}
              disabled={!renderedWord.includes('_') || message !== '' || guesses.includes(letter)}
            >
              {letter.toUpperCase()}
            </button>
          ))}
        </div>
        {attempts === 0 && (
          <button className="reset-game" onClick={resetGame}>Jugar de Nuevo</button>
        )}
        <Link to="/">
          <button className= "home-button">Volver a Inicio</button>
        </Link>
        <footer className="footer">
                2023 Juego del Ahorcado
        </footer>
      </div>
      );
    }
    
    export default GameScreen;
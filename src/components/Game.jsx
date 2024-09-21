import React, { useState } from 'react';
import Board from './Board';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

const Game = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);

    const handleClick = (index) => {
        if (squares[index] || winner) return;

        const newSquares = squares.slice();
        newSquares[index] = isXNext ? 'X' : 'O';
        setSquares(newSquares);
        setIsXNext(!isXNext);

        const calculatedWinner = calculateWinner(newSquares);
        if (calculatedWinner) {
            setWinner(calculatedWinner);
            toast.success(`${calculatedWinner} wins!`); 
            setTimeout(() => handleReset(), 2000); 
        } else if (newSquares.every(square => square)) {
            toast.info('The game ended in a tie!');
            setTimeout(() => handleReset(), 2500); 
        }
    };

    const handleReset = () => {
        setSquares(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
        window.location.reload();
    };

    return (
        <div className="game">
            <Board squares={squares} onClick={handleClick} />
            <button onClick={handleReset}>
                <FontAwesomeIcon icon={faRedo} />
            </button>
        </div>
    );
};

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};

export default Game;
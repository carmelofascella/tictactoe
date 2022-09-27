import React, { useState } from 'react';
import Board from './components/Board';
import './styles/root.scss';
import { calculateWinner } from './helpers';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); //useState returns a value and a function to update it
  const [isXNext, setIsXNext] = useState(false);

  const winner = calculateWinner(board);
  const message = winner
    ? `Winner is ${winner}`
    : `Next player is ${isXNext ? 'O' : 'X'}`;

  console.log(winner);
  const handleSquareClick = position => {
    //if position is filled or we have already the winner
    if (board[position] || winner) {
      console.log('already clicked');
      return;
    }

    setBoard(prev => {
      return prev.map((square, pos) => {
        if (pos === position) {
          return isXNext ? 'X' : 'O';
        }

        return square;
      });
    });

    setIsXNext(prev => !prev);
  };

  return (
    <div className="app">
      <h1>TIC TAC TOE</h1>
      <h2>{message}</h2>
      <Board board={board} handleSquareClick={handleSquareClick} />
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import Board from './components/Board';
import History from './components/History';
import { calculateWinner } from './helpers';
import './styles/root.scss';

const NEW_GAME = [{ board: Array(9).fill(null), isXNext: true }];

const App = () => {
  const [history, setHistory] = useState(NEW_GAME);

  const [currentMove, setCurrentMove] = useState(0);

  const current = history[currentMove];

  const [isXNext, setIsXNext] = useState(false);

  const { winner, winningSquares } = calculateWinner(current.board);
  const message = winner
    ? `Winner is ${winner}`
    : `Next player is ${current.isXNext ? 'O' : 'X'}`;

  const handleSquareClick = position => {
    //if position is filled or we have already the winner
    if (current.board[position] || winner) {
      console.log('already clicked');
      return;
    }

    setHistory(prev => {
      const last = prev[prev.length - 1];

      const newBoard = last.board.map((square, pos) => {
        if (pos === position) {
          return last.isXNext ? 'X' : 'O';
        }

        return square;
      });

      return prev.concat({ board: newBoard, isXNext: !last.isXNext });
    });

    setCurrentMove(prev => prev + 1);
  };

  const moveTo = move => {
    setCurrentMove(move);
  };

  const onNewGame = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };

  return (
    <div className="app">
      <h1>TIC TAC TOE</h1>
      <h2>{message}</h2>
      <Board
        board={current.board}
        handleSquareClick={handleSquareClick}
        winningSquares={winningSquares}
      />
      <button type="button" onClick={onNewGame}>
        Start new game
      </button>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
    </div>
  );
};

export default App;

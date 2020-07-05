import React, { useState, useRef, useEffect } from 'react';
import Cell from './Cell';

function makeEmptyBoard(rows, cols) {
  let board = [...Array(rows)].map((e) => Array(cols));
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      board[y][x] = false;
    }
  }
  return board;
}

function makeRandomBoard(rows, cols, probability = 0.85) {
  let board = [...Array(rows)].map((e) => Array(cols));
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (Math.random() < probability) {
        board[y][x] = false;
      } else {
        board[y][x] = true;
      }
    }
  }
  return board;
}

function updateBoard(x, y, board) {
  board[y][x] = !board[y][x];
  return board;
}
function makeCells(rows, cols, board) {
  let cells = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (board[y][x]) {
        cells.push({ x, y });
      }
    }
  }
  return cells;
}

function Game() {
  const CELL_SIZE = 20;
  const WIDTH = 1000; // 800
  const HEIGHT = 600;
  const rows = HEIGHT / CELL_SIZE;
  const cols = WIDTH / CELL_SIZE;
  const [board, setBoard] = useState(makeEmptyBoard(rows, cols)); // useState(makeRandomBoard(rows, cols)); // useState(makeEmptyBoard(rows, cols));
  const [cells, setCells] = useState(makeCells(rows, cols, board));
  const boardRef = useRef();
  const [numAlive, setNumAlive] = useState(cells.length);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [probability, setProbability] = useState(0.85);

  useEffect(() => {
    setBoard(updateBoard(x, y, board));
    setCells(makeCells(rows, cols, board));
  }, [x, y, rows, cols, board, CELL_SIZE]);

  useEffect(() => {
    setNumAlive(cells.length);
  }, [cells]);

  const generateRandomBoard = (lessOrMore) => {
    if (lessOrMore === 'more') {
      const newProbability = probability - 0.05;
      if (newProbability > 0) {
        setProbability(newProbability);
      }
    } else if (lessOrMore === 'less') {
      const newProbability = probability + 0.01;
      if (newProbability <= 1) {
        setProbability(newProbability);
      }
    } else {
      setProbability(0.85);
    }

    console.log(probability);
    setBoard(makeRandomBoard(rows, cols, probability));
  };

  const handleClick = (e) => {
    const elemOffset = getElementOffset();
    const offsetX = e.clientX - elemOffset.x;
    const offsetY = e.clientY - elemOffset.y;
    const newX = Math.floor(offsetX / CELL_SIZE);
    const newY = Math.floor(offsetY / CELL_SIZE);
    if (newX >= 0 && newX <= cols && newY >= 0 && newY <= rows) {
      console.log(`New cell: ${newX}, ${newY}`);
      setX(newX);
      setY(newY);
    }
  };

  const getElementOffset = () => {
    const rect = boardRef.current.getBoundingClientRect();
    const doc = document.documentElement;
    return {
      x: rect.left + window.pageXOffset - doc.clientLeft,
      y: rect.top + window.pageYOffset - doc.clientTop,
    };
  };

  return (
    <div>
      <div
        className="Board"
        style={{
          width: WIDTH,
          height: HEIGHT,
          backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
        }}
        onClick={handleClick}
        ref={boardRef}
      >
        {cells &&
          cells.map((cell) => {
            return (
              <Cell
                x={cell.x}
                y={cell.y}
                key={`${cell.x}, ${cell.y}`}
                CELL_SIZE={CELL_SIZE}
              />
            );
          })}
      </div>
      {numAlive && (
        <div>
          <h3>Number of Live Cells: {numAlive}</h3>
        </div>
      )}
      <div>
        {x ? (
          <h3>
            Newest Live Cell: ( {x}, {y} )
          </h3>
        ) : (
          <h3>Click on grid to generate new cells.</h3>
        )}
      </div>
      <div>
        <button onClick={() => generateRandomBoard('less')}>
          <span role="img" aria-label="Down-Pointing Red Triangle">
            🔻
          </span>
        </button>
        <button onClick={() => generateRandomBoard('restore')}>
          Random Board
        </button>
        <button onClick={() => generateRandomBoard('more')}>
          <span role="img" aria-label="Up-Pointing Red Triangle">
            🔺
          </span>
        </button>
      </div>
    </div>
  );
}

export default Game;

import React, { useState, useRef } from 'react';
import Cell from './Cell';

function makeEmptyBoard(rows, cols) {
  let board = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      board[y][x] = false;
    }
  }
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
  const WIDTH = 800;
  const HEIGHT = 600;
  const { rows, setRows } = useState(HEIGHT / CELL_SIZE);
  const { cols, setCols } = useState(WIDTH / CELL_SIZE);
  const { board, setBoard } = useState(makeEmptyBoard(rows, cols));
  const { cells, setCells } = useState(makeCells(rows, cols, board));
  const boardRef = useRef();

  const handleClick = (e) => {
    console.log(e.pageX);
    console.log(e.pageY);
    const elemOffset = getElementOffset();
    const offsetX = e.clientX - elemOffset.x;
    const offsetY = e.clientY - elemOffset.y;
    const x = Math.floor(offsetX / CELL_SIZE);
    const y = Math.floor(offsetY / CELL_SIZE);
    if (x >= 0 && x <= cols && y >= 0 && y <= rows) {
      board[y][x] = !board[y][x];
      setCells(makeCells, rows, cols, board);
    }
  };

  const getElementOffset = () => {
    const rect = boardRef.getBoundingClientRect();
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
        {cells.map((cell) => {
          return (
            <Cell
              x={cell.x}
              y={cell.y}
              key={`${cell.x}, ${cell.y}`}
              CELL_SIZE
            />
          );
        })}
      </div>
    </div>
  );
}

export default Game;

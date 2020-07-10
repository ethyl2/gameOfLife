import React, { useState, useRef, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import Cell from './Cell';
import Explanation from './Explanation';
import makeRandomBoard from './utils/makeRandomBoard';
import updateCompleteBoard from './utils/updateCompleteBoard';
import makeEmptyBoard from './utils/makeEmptyBoard';
import {
  makeBlinkers,
  makeToads,
  makeBeacons,
  makePulsar,
  makePentadecathlon,
} from './utils/makePatterns';

function Game() {
  const [probability, setProbability] = useState(0.85); //0.999 //Use 0.999 if you want to start with an empty board
  const CELL_SIZE = 20;
  const WIDTH = 1000; // 800
  const HEIGHT = 600;
  const rows = HEIGHT / CELL_SIZE;
  const cols = WIDTH / CELL_SIZE;
  const [board, setBoard] = useState(makeRandomBoard(rows, cols, probability)); //useState(makeEmptyBoard(rows, cols));
  const [cells, setCells] = useState(makeCells());
  const boardRef = useRef();
  const [numAlive, setNumAlive] = useState(cells.length);
  const [x, setX] = useState(cols / 2);
  const [y, setY] = useState(rows / 2);

  const [numClicks, setNumClicks] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [interval, setInterval] = useState(100);
  const [timeoutHandler, setTimeoutHandler] = useState(null);

  useEffect(() => {
    setBoard(updateBoard());
    setCells(makeCells());
  }, [x, y, board, numClicks]);

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
    console.log('P a cell will be dead: ', probability.toFixed(4));
    setBoard(makeRandomBoard(rows, cols, probability));
  };

  function updateBoard() {
    board[y][x] = !board[y][x];
    return board;
  }

  function makeCells() {
    let newCells = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (board[y][x]) {
          newCells.push({ x, y });
        }
      }
    }

    return newCells;
  }

  const handleClick = (e) => {
    const elemOffset = getElementOffset();
    const offsetX = e.clientX - elemOffset.x;
    const offsetY = e.clientY - elemOffset.y;
    const newX = Math.floor(offsetX / CELL_SIZE);
    const newY = Math.floor(offsetY / CELL_SIZE);
    if (newX >= 0 && newX <= cols && newY >= 0 && newY <= rows) {
      console.log(`Clicked on: ${newX}, ${newY}`);
      setX(newX);
      setY(newY);
    }
    setNumClicks(numClicks + 1);
    setProbability(
      1 - cells.length / ((HEIGHT / CELL_SIZE) * (WIDTH / CELL_SIZE))
    );
  };

  const getElementOffset = () => {
    const rect = boardRef.current.getBoundingClientRect();
    const doc = document.documentElement;
    return {
      x: rect.left + window.pageXOffset - doc.clientLeft,
      y: rect.top + window.pageYOffset - doc.clientTop,
    };
  };

  const runGame = () => {
    setIsRunning(true);
    console.log('start game');
    runIteration();
  };

  const stopGame = () => {
    setIsRunning(false);
    console.log('stop game');
    if (timeoutHandler) {
      window.clearTimeout(timeoutHandler);
      setTimeoutHandler(null);
    }
  };

  const runIteration = () => {
    console.log('running iteration with interval ' + interval);
    //TODO: Make functionality to have cells change according to rules.
    // For now, we'll just generate a new random board.
    //setBoard(makeRandomBoard());
    setBoard(updateCompleteBoard(rows, cols, board));
    setTimeoutHandler(
      window.setTimeout(() => {
        runIteration();
      }, interval)
    );
  };

  const handleIntervalChange = (e) => {
    setInterval(e.target.value);
    if (isRunning) {
      stopGame();
    }
  };

  const clearBoard = () => {
    setBoard(makeEmptyBoard(rows, cols));
  };
  /*
  useEffect(() => {
    // For testing purposes
    //49 , 29
    //calculateNeighbors(2, 2, board, rows, cols);
    // console.log(determineCellsFate(1, 1, board, rows, cols));
    //const boardCopy = [...board];
    //const newBoard = updateCompleteBoard(rows, cols, board);
    //console.log(newBoard);
    //setBoard(updateCompleteBoard(rows, cols, board));
    //setBoard(makeBlinker());
  }, [numClicks]);
  */
  const handleGenerationClick = () => {
    setBoard(updateCompleteBoard(rows, cols, board));
  };

  const makePattern = (patternType) => {
    switch (patternType) {
      case 'blinker':
        setBoard(makeBlinkers(rows, cols));
        break;
      case 'toad':
        setBoard(makeToads(rows, cols));
        break;
      case 'beacon':
        setBoard(makeBeacons(rows, cols));
        break;
      case 'pentadecathlon':
        setBoard(makePentadecathlon(rows, cols));
        break;
      default:
        setBoard(makePulsar(rows, cols));
    }
  };

  return (
    <div className="Game">
      <div>
        <Explanation />
      </div>

      <div
        className="Board"
        data-tip
        data-for="board"
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
        {numClicks < 1 && (
          <ReactTooltip id="board" type="success">
            <span>Click to place live cells</span>
          </ReactTooltip>
        )}
        {numClicks === 1 && (
          <ReactTooltip id="board" type="success">
            <span>Click on a live cell to kill it</span>
          </ReactTooltip>
        )}
      </div>
      <div>
        <h2>Let's Play!</h2>

        <div>
          <button
            data-tip
            data-for="less"
            onClick={() => generateRandomBoard('less')}
          >
            <span role="img" aria-label="Down-Pointing Red Triangle">
              🔻
            </span>
          </button>
          <ReactTooltip id="less" type="success">
            <span>Less Cells</span>
          </ReactTooltip>
          <button
            data-tip
            data-for="restore"
            onClick={() => generateRandomBoard('restore')}
          >
            <span role="img" aria-label="Petri Dish">
              🧫
            </span>
          </button>
          <ReactTooltip id="restore" type="success">
            <span>Random Board</span>
          </ReactTooltip>
          <button
            data-tip
            data-for="more"
            onClick={() => generateRandomBoard('more')}
          >
            <span role="img" aria-label="Up-Pointing Red Triangle">
              🔺
            </span>
          </button>
          <ReactTooltip id="more" type="success">
            <span>More Cells</span>
          </ReactTooltip>
        </div>

        <div>
          <button
            data-tip
            data-for="generation"
            onClick={handleGenerationClick}
          >
            <span role="img" aria-label="Baby: Dark Skin Tone">
              👶🏿
            </span>
            <span role="img" aria-label="Baby: Medium-Dark Skin Tone">
              👶🏾
            </span>
            <span role="img" aria-label="Baby: Medium Skin Tone">
              👶🏽
            </span>
          </button>
          <ReactTooltip id="generation" type="success">
            <span>Show Next Generation</span>
          </ReactTooltip>
        </div>

        <div>
          <h3>Number of Live Cells: {numAlive}</h3>
        </div>

        <div>
          <h3>{`Chance of cells being alive: ${
            ((1 - probability) * 100).toFixed(0) > 0
              ? ((1 - probability) * 100).toFixed(0)
              : '< 1'
          }%`}</h3>
        </div>

        <div>
          {isRunning ? (
            <button onClick={stopGame}>
              <span role="img" aria-label="Octagonal Sign">
                🛑
              </span>
            </button>
          ) : (
            <button data-tip data-for="run" onClick={runGame}>
              <span role="img" aria-label="Black Right-Pointing Triangle">
                ▶️
              </span>
            </button>
          )}
          <ReactTooltip id="run" type="success">
            <span>{isRunning ? 'Stop' : 'Run'}</span>
          </ReactTooltip>
          <button data-tip data-for="clear" onClick={clearBoard}>
            <span role="img" aria-label="Bar of Soap">
              🧼
            </span>
          </button>
          <ReactTooltip id="clear" type="success">
            <span>Clear</span>
          </ReactTooltip>
        </div>

        <div>
          <h3>
            Update every
            <input
              value={interval}
              type="number"
              onChange={handleIntervalChange}
            />
            ms
          </h3>
        </div>

        <div>
          <hr />
          <h3>Show Patterns</h3>
          <p>Oscillators</p>
          <button
            data-tip
            data-for="blinker"
            onClick={() => makePattern('blinker')}
          >
            <span role="img" aria-label="Sparkles">
              ✨
            </span>
          </button>
          <ReactTooltip id="blinker" type="success">
            <span>Blinkers</span>
          </ReactTooltip>

          <button data-tip data-for="toad" onClick={() => makePattern('toad')}>
            <span role="img" aria-label="Frog">
              🐸
            </span>
          </button>
          <ReactTooltip id="toad" type="success">
            <span>Toads</span>
          </ReactTooltip>

          <button
            data-tip
            data-for="beacon"
            onClick={() => makePattern('beacon')}
          >
            <span role="img" aria-label="Police Car Light">
              🚨
            </span>
          </button>
          <ReactTooltip id="beacon" type="success">
            <span>Beacons</span>
          </ReactTooltip>

          <button
            data-tip
            data-for="pulsar"
            onClick={() => makePattern('pulsar')}
          >
            <span role="img" aria-label="Collision">
              💥
            </span>
          </button>
          <ReactTooltip id="pulsar" type="success">
            <span>Pulsars</span>
          </ReactTooltip>

          <button
            data-tip
            data-for="pentadecathlon"
            onClick={() => makePattern('pentadecathlon')}
          >
            <span role="img" aria-label="Wind Chime">
              🎐
            </span>
          </button>
          <ReactTooltip id="pentadecathlon" type="success">
            <span>Pentadecathlon</span>
          </ReactTooltip>
        </div>
      </div>
    </div>
  );
}

export default Game;

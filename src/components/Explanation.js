import React from 'react';

function Explanation() {
  return (
    <div>
      <h2>What is the Game of Life?</h2>
      <p>
        It is a 'cellular automaton' invented by Cambridge mathematician John
        Conway in 1970.
      </p>
      <p>
        The board contains of cells which will live, die or multiply, depending
        on the rules.
      </p>
      <p>
        Depending on the initial layout of the grid, the cells may form various
        patterns as the game advances.
      </p>
      <h2>The Rules</h2>
      <h3>If a cell is alive:</h3>
      <ul>
        <li>
          If it has only 0-1 alive neighbors, it dies, representing
          underpopulation.
        </li>
        <li>
          If it has 2-3 alive neighbors, it lives on to the next generation.
        </li>
        <li>
          If it has more than 3 alive neighbors, it dies, representing
          overpopulation.
        </li>
      </ul>
      <h3>If a cell is dead:</h3>
      <ul>
        <li>
          If it has exactly 3 alive neighbors, it becomes a live cell,
          representing reproduction.
        </li>
        <li>Otherwise, it remains dead.</li>
      </ul>
    </div>
  );
}

export default Explanation;

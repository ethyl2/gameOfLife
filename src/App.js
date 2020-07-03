import React from 'react';
import Game from './Game';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">Conway's Game of Life</header>
      <main>
        <Game />
      </main>
    </div>
  );
}

export default App;

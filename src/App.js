import React from 'react';
import Game from './Game';
import './App.css';
import GOLBanner2 from './images/GOLBanner2.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={GOLBanner2} alt="Conway's Game of Life" />
      </header>
      <main>
        <Game />
      </main>
    </div>
  );
}

export default App;

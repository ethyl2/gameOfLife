module.exports = {
  makeBlinkers,
  makeToads,
  makeBeacons,
  makePulsar,
};

function makeBlinkers(rows, cols) {
  let newBoard = [...Array(rows)].map((e) => Array(cols));
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (
        [10, 11, 12, 35, 36, 37].includes(x) &&
        [2, 7, 12, 17, 22, 27].includes(y)
      ) {
        newBoard[y][x] = true;
      } else {
        newBoard[y][x] = false;
      }
    }
  }
  return newBoard;
}

function makeToads(rows, cols) {
  let newBoard = [...Array(rows)].map((e) => Array(cols));
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if ([10, 11, 12, 30, 31, 32].includes(x) && y === 10) {
        newBoard[y][x] = true;
      } else if ([11, 12, 13, 31, 32, 33].includes(x) && y === 11) {
        newBoard[y][x] = true;
      } else if ([20, 21, 22].includes(x) && y === 20) {
        newBoard[y][x] = true;
      } else if ([21, 22, 23].includes(x) && y === 21) {
        newBoard[y][x] = true;
      } else {
        newBoard[y][x] = false;
      }
    }
  }
  return newBoard;
}

function makeBeacons(rows, cols) {
  let newBoard = [...Array(rows)].map((e) => Array(cols));
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if ([10, 11, 34, 35].includes(x) && [10, 11].includes(y)) {
        newBoard[y][x] = true;
      } else if ([12, 13, 32, 33].includes(x) && [12, 13].includes(y)) {
        newBoard[y][x] = true;
      } else {
        newBoard[y][x] = false;
      }
    }
  }
  return newBoard;
}

function makePulsar(rows, cols) {
  let newBoard = [...Array(rows)].map((e) => Array(cols));
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (
        [10, 11, 12, 16, 17, 18, 30, 31, 32, 36, 37, 38].includes(x) &&
        [10, 15, 17, 22].includes(y)
      ) {
        newBoard[y][x] = true;
      } else if (
        [8, 13, 15, 20, 28, 33, 35, 40].includes(x) &&
        [12, 13, 14, 18, 19, 20].includes(y)
      ) {
        newBoard[y][x] = true;
      } else {
        newBoard[y][x] = false;
      }
    }
  }
  return newBoard;
}
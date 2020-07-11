module.exports = {
  makeBlinkers,
  makeToads,
  makeBeacons,
  makePulsar,
  makePentadecathlon,
  makeBlocks,
  makeBeehives,
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

function makePentadecathlon(rows, cols) {
  let newBoard = [...Array(rows)].map((e) => Array(cols));
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (
        [10, 11, 12, 40, 41, 42].includes(x) &&
        [10, 13, 18, 21].includes(y)
      ) {
        newBoard[y][x] = true;
      } else if ([9, 13, 39, 43].includes(x) && [11, 12, 19, 20].includes(y)) {
        newBoard[y][x] = true;
      } else {
        newBoard[y][x] = false;
      }
    }
  }
  return newBoard;
}

function makeBlocks(rows, cols) {
  let newBoard = [...Array(rows)].map((e) => Array(cols));
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const indices = [10, 11, 15, 16, 30, 31, 34, 35, 5, 6];
      if (indices.includes(x) && indices.includes(y)) {
        newBoard[y][x] = true;
      }
    }
  }
  return newBoard;
}

function makeBeehives(rows, cols) {
  let newBoard = [...Array(rows)].map((e) => Array(cols));
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if ([10, 11, 15, 16].includes(x) && [10, 12, 15, 17].includes(y)) {
        newBoard[y][x] = true;
      } else if ([9, 12, 14, 17].includes(x) && [11, 16].includes(y)) {
        newBoard[y][x] = true;
      } else {
        newBoard[y][x] = false;
      }
    }
  }
  return newBoard;
}

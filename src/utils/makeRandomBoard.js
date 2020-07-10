export default function makeRandomBoard(rows, cols, probability) {
  // If the probability is a higher number, less alive cells will result.
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

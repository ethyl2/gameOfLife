export default function calculateNeighbors(
  currentX,
  currentY,
  board,
  rows,
  cols
) {
  let totalAliveNeighbors = 0;
  const neighborBooleans = [];
  const neighbors = [
    [currentX - 1, currentY - 1],
    [currentX, currentY - 1],
    [currentX + 1, currentY - 1],
    [currentX - 1, currentY],
    [currentX + 1, currentY],
    [currentX - 1, currentY + 1],
    [currentX, currentY + 1],
    [currentX + 1, currentY + 1],
  ];

  // Modify neighbors for special edge cases:

  // When currentX === 0 && currentY === 0:
  if (currentX === 0 && currentY === 0) {
    neighbors[0] = [cols - 1, rows - 1];
    neighbors[1][1] = rows - 1;
    neighbors[2][1] = rows - 1;
    neighbors[3][0] = cols - 1;
    neighbors[5][0] = cols - 1;
  }
  // When currentX === 0 && currentY = rows-1
  else if (currentX === 0 && currentY === rows - 1) {
    neighbors[0][0] = cols - 1;
    neighbors[3][0] = cols - 1;
    neighbors[5] = [cols - 1, 0];
    console.log(neighbors[5]);
    neighbors[6][1] = 0;
    neighbors[7][1] = 0;
  }
  // When currentX === cols-1 && currentY = rows-1

  // When currentX === cols-1 && currentY === 0

  // When x === 0

  // When x === cols-1

  // When y === 0

  // When y === rows-1
  else {
    console.log('no special case to consider');
  }
  for (let i = 0; i < neighbors.length; i++) {
    const xToCheck = neighbors[i][0];
    const yToCheck = neighbors[i][1];
    if (board[yToCheck][xToCheck]) {
      totalAliveNeighbors++;
      neighborBooleans.push(true);
    } else {
      neighborBooleans.push(false);
    }
  }

  console.log(totalAliveNeighbors);
  console.log(neighborBooleans);
}

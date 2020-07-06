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

  // Special edge cases:
  // When currentX === 0 && currentY === 0:

  // When currentX === 0 && currentY = rows-1

  // When currentX === cols-1 && currentY = rows-1

  // When currentX === cols-1 && currentY === 0

  // When x === 0

  // When x === cols-1

  // When y === 0

  // When y === rows-1

  console.log(totalAliveNeighbors);
  console.log(neighborBooleans);
}

export default function calculateNeighbors(currentX, currentY, board) {
  let totalAliveNeighbors = 0;
  const neighborBooleans = [];

  // Special edge cases:
  // When only currentX === 0 && currentY === 0:

  // Top row:
  for (let i = -1; i < 2; i++) {
    // console.log(`Checking board[${currentY - 1}][${currentX + i}]`);
    if (board[currentY - 1][currentX + i]) {
      totalAliveNeighbors++;
      neighborBooleans.push(true);
    } else {
      neighborBooleans.push(false);
    }
  }

  // Middle row:
  if (board[currentY][currentX - 1]) {
    totalAliveNeighbors++;
    neighborBooleans.push(true);
  } else {
    neighborBooleans.push(false);
  }

  if (board[currentY][currentX + 1]) {
    totalAliveNeighbors++;
    neighborBooleans.push(true);
  } else {
    neighborBooleans.push(false);
  }

  // Bottom row:
  for (let i = -1; i < 2; i++) {
    if (board[currentY + 1][currentX + i]) {
      totalAliveNeighbors++;
      neighborBooleans.push(true);
    } else {
      neighborBooleans.push(false);
    }
  }

  console.log(totalAliveNeighbors);
  console.log(neighborBooleans);
}

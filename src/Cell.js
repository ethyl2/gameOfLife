import React, { useState } from 'react';

function Cell(props) {
  const { x, setX } = useState(props.x);
  const { y, setY } = useState(props.y);
  return (
    <div
      className="Cell"
      style={{
        left: `${props.CELL_SIZE * x + 1}px`,
        top: `${props.CELL_SIZE * y + 1}px`,
        width: `${props.CELL_SIZE - 1}px`,
        height: `${props.CELL_SIZE - 1}px`,
      }}
    ></div>
  );
}
export default Cell;

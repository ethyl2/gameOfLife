import React from 'react';

function Cell(props) {
  return (
    <div
      className="Cell"
      style={{
        left: `${props.CELL_SIZE * props.x + 1}px`,
        top: `${props.CELL_SIZE * props.y + 1}px`,
        width: `${props.CELL_SIZE - 1}px`,
        height: `${props.CELL_SIZE - 1}px`,
      }}
    ></div>
  );
}
export default Cell;

import React from 'react';
import ReactTooltip from 'react-tooltip';

/*
Sample props:
name: 'blinker',
makePattern: makePattern,
ariaLabel: 'Sparkles',
emoji: '✨',
spanText: 'Blinkers'
*/
function PatternButton(props) {
  return (
    <div className="pattern-button-box">
      <button
        data-tip
        data-for={props.name}
        onClick={() => props.makePattern(props.name)}
      >
        <span role="img" aria-label={props.ariaLabel}>
          {props.emoji}
        </span>
      </button>
      <ReactTooltip id={props.name} type="success">
        <span>{props.spanText}</span>
      </ReactTooltip>
    </div>
  );
}

export default PatternButton;

import React from 'react';

function GameOver(props) {
  return (
    <div>
      <div className="GameOverContainer">
        <h1>You lost, better luck next time!</h1>
        <button className="PlayAgain" onClick={props.handleReset}>Play Again</button>
      </div>
      <div className="Modal"></div>
    </div>
  );
}

export default GameOver;
import React from 'react';

function Winner(props) {
  return (
    <div>
      <div className="WinContainer">
        <h1>Congrats! You have won.</h1>
        <button className="PlayAgain" onClick={props.handleReset}>Play Again</button>
      </div>
      <div className="Modal"></div>
    </div>
  )
}

export default Winner;
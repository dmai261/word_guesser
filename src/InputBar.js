import React from 'react';

function InputBar(props) {
  return (
    <div className="inputBarContainer">
      <input type="text" onKeyUp={props.keyUpHandler} />
    </div>
  );
}

export default InputBar;
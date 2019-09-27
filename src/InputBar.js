import React from 'react';

function InputBar(props) {
  return (
    <div className="InputBarContainer">
      <h2>Type your letter in the box below and press enter to make a guess!</h2>
      <input className="InputBar" type="text" maxLength="1" onKeyUp={props.keyUpHandler} />
    </div>
  );
}

export default InputBar;
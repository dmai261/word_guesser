import React from 'react';

function Underscore(props) {
  console.log(props);
  return (
    <span className='wordContainer'>
      {props.guessed === true ? <u>{props.char}</u>
      : <span> { '_'} </span>} <span>{' '}</span>
    </span>
  )
}

export default Underscore;
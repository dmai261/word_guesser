import React from 'react';

function Underscore(props) {
  return (
    <span className='UnderscoreContainer'>
      {props.guessed === true 
        ? <span className="Underscore"> {props.char} </span>
        : <span className="Underscore"> {'_'} </span>} 
    </span>
  )
}

export default Underscore;
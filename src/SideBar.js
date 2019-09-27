import React from 'react';

function SideBar(props) {
  let charArr = Array.from(props.charsGuessed);

  return (
    <div className="SideBarContainer">
      <div className='Lives'>
        You have currently have <b className="LifeCounter">{props.lives}</b> lives left!
      </div>

      <div className="HorizontalDivider"></div>

      <div className='CharsGuessed'>
        <div>Incorrect Guesses:</div>
        {charArr.map(function(char, index) {
          return <b key={index}> {char} </b>
        })}

      </div>
    </div>
  );
}

export default SideBar;
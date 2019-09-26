import React from 'react';
import './App.css';
import Underscore from './Underscore.js';
import InputBar from './InputBar.js'
const URI = 'http://localhost:8080/words';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      charsGuessed: new Set(),
    };

    this.randomWordPicker = this.randomWordPicker.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
  }

  keyUpHandler(e) {
    if (e.key === "Enter") {
      let value = e.target.value;

      this.setState((state,props) => {
        return {charsGuessed: state.charsGuessed.add(value)};
        }, 
        ()=>{e.target.value = ''}
      );

    }

  }

  randomWordPicker(dictionary, min, max) {
    let index = Math.floor(Math.random() * max);
    return dictionary[index];
  }

  componentDidMount() {
    fetch(URI)
      .then((response) => {
        response.json().then((parsed) => {
          let data = parsed.split(/\n/);
          let word = this.randomWordPicker(data, 0, data.length);

          this.setState({ word });
        })
      })
      .catch((error) => {
        console.error(error);
      })
  }

  render() {
    let { word } = this.state;
    const chars = word.split("");
    let { charsGuessed } = this.state;

    return (
      <div className="App">
        <InputBar keyUpHandler={this.keyUpHandler}/>
        {chars.map(function(char) {
          const guessed = charsGuessed.has(char) ? true : false;
          return <Underscore char={char} guessed={guessed} />
        })}
        
      </div>
    );
  }
}

export default App;

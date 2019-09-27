import React from 'react';
import './App.css';
import Underscore from './Underscore.js';
import InputBar from './InputBar.js';
import SideBar from './SideBar.js';
import GameOver from './GameOver.js';
import Winner from './Winner.js';

const URI = 'http://localhost:8080/words';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      charsGuessed: new Set(),
      correctChars: new Set(),
      lives: 6,
      gameOver: false,
      won: false,
    };

    this.randomWordPicker = this.randomWordPicker.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset() {
    this.fetchWord();
  }

  didWin(list) {
    let word = this.state.word;

    for (var i = 0; i < word.length; i++) {
      if (!list.has(word[i])) {
        return false;
      }
    }

    return true;
  }

  keyUpHandler(e) {
    if (e.key === "Enter") {
      let guessedChar = e.target.value;
      let chars = this.state.word.split("");
      let lives = this.state.lives;
      let gameOver;

      if (!chars.includes(guessedChar)) {
        lives -= 1;

        if (lives === 0) {
          gameOver = true;
        }

        this.setState((state,props) => {
          return {charsGuessed: state.charsGuessed.add(guessedChar), lives: lives, gameOver};
          }
        );
      } else {
        this.setState((state,props) => {
          return {correctChars: state.correctChars.add(guessedChar)}
        }, ()=> {
          let won = this.didWin(this.state.correctChars);
          if (won) {
            this.setState({won})
          }
        });
      }
      
      e.target.value = '';
    }

  }

  randomWordPicker(dictionary, min, max) {
    let index = Math.floor(Math.random() * max);
    return dictionary[index];
  }

  fetchWord() {
    fetch(URI)
      .then((response) => {
        response.json().then((parsed) => {
          let data = parsed.split(/\n/);
          let word = this.randomWordPicker(data, 0, data.length);
          console.log(word);
          this.setState({
            word: word,
            charsGuessed: new Set(),
            correctChars: new Set(),
            lives: 6,
            gameOver: false,
            won: false,
          });
        })
      })
      .catch((error) => {
        console.error(error);
      })
  }

  componentDidMount() {
    this.fetchWord();
  }

  render() {
    let { word } = this.state;
    let chars = word.split("") || [];
    let { charsGuessed } = this.state;
    let { correctChars } = this.state;
    let { lives } = this.state;
    let { gameOver } = this.state;
    let { won } = this.state;

    return (
      <div className="App">
        <div className="AppContainer">
          <div className="MainContainer">
            <InputBar keyUpHandler={this.keyUpHandler}/>

            <div className="WordContainer">
              {chars.map(function(char, index) {
                let guessed = correctChars.has(char) ? true : false;
                
                return (
                  <Underscore char={char} guessed={guessed} key={index} />
                  )
                })}
            </div>
          </div>

          <div className="VerticalDivider"></div>

          <SideBar charsGuessed={charsGuessed} lives={lives} />
        {gameOver && <GameOver  handleReset={this.handleReset}/>}
        {won && <Winner handleReset={this.handleReset}/>}
        </div>

      </div>
    );
  }
}

export default App;

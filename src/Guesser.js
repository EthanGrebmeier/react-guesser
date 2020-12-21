import React from 'react'

import './Guesser.css';

export default class Guesser extends React.Component {
  constructor(){
    super()
    this.state = {
      number: 1,
      lowerBound: 0, 
      upperBound: 100,
      guesses: [],
      attempts: 10,
      guessField: '',
      message: '',
      buttonText: 'Guess'
    }
  }

  componentDidMount(){
    this.setState({
      number: Math.floor(Math.random() * 100 )
    })
  }
  
  tryGuess = () => {
    if (this.state.guessField !== ''){
      let guess
      let message
      let attempts = this.state.attempts - 1
      console.log(attempts)

      try {
        guess = parseInt(this.state.guessField)
      } catch (error) {
        message = 'Be sure that your input is a number'
      }

      let guesses = this.state.guesses
      guesses.push(guess)

      

      if (this.state.guessField == this.state.number){
        message = 'Congrats, you got it!'
        this.endGame()
      } else if (this.state.guessField < this.state.number){
        message = 'Your guess is too low'
      } else {
        message = 'Your guess is too high'
      }

      if (attempts == 0 && this.state.guessField != this.state.number) {
        message = 'Game Over!'
        this.endGame()
      } 

      this.setState({
        message: message,
        guesses: guesses,
        attempts: attempts
      })
    }
  }

  endGame = () => {
    this.setState({
      buttonText: 'Reset',
      guessField: ''
    })
  }

  resetGame = () => {
    this.setState({
      buttonText: 'Guess',
      message: 'Try Again!',
      number: Math.floor(Math.random() * 100 ),
      guesses: [],
      attempts: 10
    })
  }

  renderGuesses = () => {
    return (
      <div className="guesses">
        <p> Guesses: </p>
        <p>
          {this.state.guesses.length === 0 ? "None Yet" : this.state.guesses.map((guess) => `${guess} `)} 
        </p>
      </div>
    )
  }

  handleChange = (e) => {
    this.setState({
      guessField: e.target.value
    })
  }

  render(){
    return (
      <div className="guesser">
        <h1 className="guesser-header"> Guess a number between {this.state.lowerBound} and {this.state.upperBound} </h1>
        <h2> {this.state.message} </h2>
        <input type="number" value={this.state.guessField} min="1" max="100"  onChange={this.handleChange} placeholder="50" />
        <p> Attempts Remaining: {this.state.attempts} </p>
        {this.renderGuesses()} 
        <button onClick={this.state.buttonText == "Guess" ? this.tryGuess : this.resetGame} class="guesser-button"> {this.state.buttonText} </button>
      </div>
    );
  }
}


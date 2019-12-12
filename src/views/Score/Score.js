import React from 'react'
import './StyledScore.scss'

const Score = (props) => {
  return (
    <main>
      <div className="score">
        <h2>Correct answers: {props.correctAnswers}</h2>
        <h2>Incorrect answers: {props.incorrectAnswers}</h2>
        <h2>Unanswerd: {props.unanswerdAnswers}</h2>
        <button onClick={props.restartQuiz}>Retake Quiz</button>
      </div>
    </main>
  )
}

export default Score
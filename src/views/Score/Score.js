import React from 'react'

const Score = (props) => {
  return (
    <main>
      <h2>Correct answers: {props.correctAnswers}</h2>
      <h2>Incorrect answers: {props.incorrectAnswers}</h2>
      <h2>Unanswerd: {props.unanswerdAnswers}</h2>
      <button onClick={props.restartQuiz}>Retake Quiz</button>
    </main>
  )
}

export default Score
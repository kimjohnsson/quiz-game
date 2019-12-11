import React, { useState, useEffect } from 'react'
import './StyledTimer.scss'

const Timer = (props) => {

  const [time, setTime] = useState(15)
  const [questionNumber, setQuestionNumber] = useState(props.questionNumber)


  // resets timer when moving on to next question 
  if (questionNumber !== props.questionNumber) {
    setTime(15)
    setQuestionNumber(props.questionNumber)
  }


  useEffect(() => {

    // set countdown timer
    let countdown = setTimeout(() => {
      if (time > 0) {
        setTime(time - 1)
      } else {
        props.nextQuestion()
      }
    }, 1000);

    // clear timeout when component unmount
    return () => {
      clearTimeout(countdown)
    }
  });


  return (
    <div className="timer">
      {time}
    </div>
  )
}

export default Timer
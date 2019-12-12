import React, { useState, useEffect } from 'react'
import './StyledTimer.scss'

const Timer = (props) => {

  const [time, setTime] = useState(15)
  const [questionNumber, setQuestionNumber] = useState(props.questionNumber)
  const [usedLifeline, setUsedLifeline] = useState(false)


  // give player more time if lifeline is used
  if (!props.lifeline && !usedLifeline) {
    setTime(time + 10)
    setUsedLifeline(true)
  }


  // resets timer when moving on to next question 
  if (questionNumber !== props.questionNumber) {
    setTime(15)
    setQuestionNumber(props.questionNumber)
  }


  useEffect(() => {

    // set countdown timer
    let countdown = setTimeout(() => {
      if (time > 1) {
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
      <span>{time}</span>
    </div>
  )
}

export default Timer
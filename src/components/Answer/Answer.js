import React from "react"
import './StyledAnswer.scss'

const Answer = (props) => {


  return (
    <div className="answer" onClick={props.onClick}>
      <p>{props.answer.replace(/(&amp;)/g, " & ")}</p>
    </div>
  )
}

export default Answer
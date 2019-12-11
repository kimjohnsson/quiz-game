import React from "react"
import './StyledAnswer.scss'

const Answer = (props) => {

  return (
    <div className={props.lifeline ? 'disable answer' : 'answer'} onClick={props.onClick}>
      <p>{props.answer.replace(/(&amp;)/g, " & ")}</p>
    </div>
  )
}

export default Answer
import React from "react"
import './StyledTimeLifeline.scss'

const TimeLifeline = (props) => {
  return (
    <div className="timeLifeline" onClick={props.onClick}>
      +10 sec
    </div>
  )
}

export default TimeLifeline
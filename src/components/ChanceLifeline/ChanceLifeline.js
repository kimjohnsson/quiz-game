import React from 'react'
import './StyledChanceLifeline.scss'

const ChanceLifeline = (props) => {

  return (
    <div className="chanceLifeline" onClick={props.onClick}>
      50/50
  </div>
  )
}

export default ChanceLifeline
import React from 'react';

export default (props) =>{
  const style ={
    letf:`${props.dot[0]}%`,
    top:`${props.dot[1]}%`

  }
  return (
  <div className="snake-food" style={style}></div>
  )
}

import React from 'react';

const ProgressBar = (props) => {
    
  const progress = props.value;
  const width = props.width;
  const color = props.color;
  const margin = props.margin || 0

  const progressContainerStyle = {
    height: 10,
    width: `${width}%`,
    backgroundColor: '#e0e0de',
    display: 'inline-block',
    marginTop: 15,
    marginLeft: margin,
  }

  const progressFillerStyle = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: color,
    borderRadius: 'inherit',
  }
 
  return (
    <div style={progressContainerStyle}>
      <div style={progressFillerStyle}></div>
    </div>
  )
} 

export default ProgressBar;
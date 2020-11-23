import React from 'react';

const ProgressBar = (props) => {
    
  const progress = props.value;
  const width = props.width;

  const progressContainerStyle = {
    height: 12,
    width: `${width}%`,
    backgroundColor: '#e0e0de',
    margin: 7,
  }

  const progressFillerStyle = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: '#77dd77',
    borderRadius: 'inherit',
  }

  return (
    <div style={progressContainerStyle}>
      <div style={progressFillerStyle}></div>
    </div>
  )
} 

export default ProgressBar;
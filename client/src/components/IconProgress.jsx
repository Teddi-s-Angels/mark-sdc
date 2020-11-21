import React from 'react';
import { FaCaretDown } from 'react-icons/fa'

const IconProgress = (props) => {
    
  const progress = props.value;
  const width = props.width;

  const progressContainerStyle = {
    height: 12,
    width: `100%`,
    backgroundColor: '#e0e0de',
    borderRadius: 25,
    margin: 7,
  }

  const progressFillerStyle = {
    verticalAlign: top,
    height: 0,
    width: 10,
    marginLeft: `${progress}%`,
    borderRadius: 'inherit',
    padding: 0,
    marginTop: 0,
  }
  const icon = {
    fontSize: 25,
    top: 0,
    marginTop: -10,
  }

  const marker = {
    height: '100%',
    width: 10,
    backgroundColor: 'white',
    marginLeft: '33%',
  }

  const marker2 = {
    height: '100%',
    width: 10,
    backgroundColor: 'white',
    marginLeft: '66%',
  }

  return (
    <div style={progressContainerStyle}>
      <div style={progressFillerStyle}>
        <p style={icon}>&#9660;</p>
        {/* <FaCaretDown size={25}/> */}
      </div>

    </div>
  )
} 

export default IconProgress;
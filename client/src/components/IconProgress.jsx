import React from 'react';
import { FaCaretDown } from 'react-icons/fa'

const IconProgress = (props) => {
    
  const progress = props.value;
  const width = props.width;

  const progressContainerStyle = {
    height: 10,
    width: `100%`,
    backgroundColor: '#e0e0de',
    borderRadius: 0,
    margin: 7,
    marginLeft: 0,
    marginRight: 0,
    position: 'relative'
  }

  const progressFillerStyle = {
    verticalAlign: top,
    height: 0,
    width: 10,
    marginLeft: `${progress}%`,
    borderRadius: 'inherit',
    padding: 0,
    marginTop: 0,
    zIndex: 3,
    position: 'absolute'
  }

  const marker = {
    position: 'absolute',
    top: 0,
    width: 10,
    height: '100%',
    backgroundColor: 'white',
    marginLeft: '33%',
    zIndex: 1,
  }

  const markerList = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  }

  const marker2 = {
    position: 'relative',
    top: 0,
    width: 10,
    height: '100%',
    backgroundColor: 'white',
    marginLeft: '66%',
    zIndex: 1,
  }
  const icon = {
    fontSize: 25,
    top: 0,
    marginTop: -12,
    zIndex: 2,
  }

  return (
    <div style={progressContainerStyle}>
      <ul style={markerList}>
          <li style={marker}></li>
          <li style={marker2}></li>
        </ul>
        <div style={progressFillerStyle}>
        <p style={icon}>&#9660;</p>
      </div>
    </div>
  )
} 

export default IconProgress;
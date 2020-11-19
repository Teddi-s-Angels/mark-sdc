import React from 'react';
import { FaStar } from 'react-icons/fa'

class ShowStarRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
      hover: null,
    }
    this.handleStarClick = props.handleStarClick.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    const value = event.target.value
    this.setState({rating: value})
    this.handleStarClick(value)
  }

  render() {
    return (
      <div>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
  
          return (
            <label>
              <input 
                type='radio'
                id='customRating'
                name='rating'
                value={ratingValue}
                onClick={this.handleClick}     
                //onClick={props.handleClick}        
              />
              <FaStar
                className='customStar'
                color={ratingValue <= (this.state.hover || this.state.rating) ? '#ffc107' : '#e4e5e9'}
                size={30}
                value={ratingValue}
                onMouseEnter={() => this.setState({hover: ratingValue})}
                onMouseLeave={() => this.setState({hover: null})}
              />
            </label>
          );
        })}
  
      </div>
    )
  }
}

export default ShowStarRating
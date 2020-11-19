import React from 'react';
import StarRatings from 'react-star-ratings';

class StarRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: props.rating,
      starDimension: `${props.starDimension}px`,
      color: ''
    }
  }

  render() {
    return (
      <StarRatings rating={this.state.rating} numberOfStars={5} name='rating' starDimension={this.state.starDimension} starSpacing='2px' starRatedColor='light gray'/>
    )
  }
}

export default StarRating
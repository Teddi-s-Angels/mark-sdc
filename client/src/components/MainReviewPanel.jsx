import React from 'react';
import SingleReview from './SingleReview.jsx';

class MainReviewPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: props.reviews
    }
  }

  render() {
  return (
    this.state.reviews.map((review) =>
      <SingleReview review={review} />
    ))
  }  
}


export default MainReviewPanel


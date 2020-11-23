import React from 'react';
import { Row } from 'react-bootstrap';
import LargeRating from './LargeRating.jsx';
import StarChart from './StarChart.jsx'
import Characteristics from './characteristics.jsx'

class ProductMeta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: props.meta.product_id,
      ratings: props.meta.ratings,
      recommended: props.meta.recommended,
      percRecommended: 0,
      characteristics: props.meta.characteristics,
      width: props.meta.width,
      comfort: props.meta.comfort
    }
    this.getPercentRecommend = this.getPercentRecommend.bind(this)
    this.getStarReviews = props.getStarReviews.bind(this)
  }

  componentDidMount() {
    this.getPercentRecommend()
  }

  getPercentRecommend () {
    let total = this.state.recommended[0] + this.state.recommended[1];
    let recommended = this.state.recommended[1];
    let percent = (recommended / total * 100).toString().slice(0, 4);
    this.setState({percRecommended: percent})
  }



  render() {
    return (
      <div id='mainRating'>
        <Row>
          <LargeRating ratings={this.state.ratings} />
        </Row>
        <Row>
          <p>{this.state.percRecommended}% of reviews recommend this product</p>
        </Row>
        <Row>
          <StarChart ratings={this.state.ratings} getStarReviews={this.getStarReviews}/>
        </Row>
        <br></br>
        <Row>
          <Characteristics stats={this.state.characteristics}/>
        </Row>
      </div>
    )
  }
}

export default ProductMeta
import React from 'react';
import ProgressBar from './ProgressBar.jsx';
import { Container, Row, Col } from 'react-bootstrap';

class StarChart extends React.Component {
  constructor(props) {
    super(props);
    const totalRatings = props.ratings[1] + props.ratings[2] + props.ratings[3]+ props.ratings[4] + props.ratings[5]
    this.state = {
      allRatings: props.ratings,
      oneStars: ((props.ratings[1] / totalRatings) * 100), 
      twoStars: ((props.ratings[2] / totalRatings) * 100),  
      threeStars: ((props.ratings[3] / totalRatings) * 100), 
      fourStars: ((props.ratings[4] / totalRatings) * 100), 
      fiveStars: ((props.ratings[5] / totalRatings) * 100),
      oneStarCount: props.ratings[1],
      twoStarCount: props.ratings[2],
      threeStarCount: props.ratings[3],
      fourStarCount: props.ratings[4],
      fiveStarCount: props.ratings[5],
    }
    this.getStarReviews = props.getStarReviews.bind(this)
  }

  render() {
    return(
      <Container>
        <div id='starProgress'>
          <Row>
            <Col>
              <Row>
                <a id='starFilterLink' onClick={() => this.getStarReviews(5)}>5 Stars</a>  <ProgressBar value={this.state.fiveStars} width={70} color='#00ff00' /> ({this.state.fiveStarCount})
              </Row>
              <Row>
                <a id='starFilterLink' onClick={() => this.getStarReviews(4)}>4 Stars</a>  <ProgressBar value={this.state.fourStars} width={70} color='#00ff00' /> ({this.state.fourStarCount})
              </Row>
              <Row>
                <a id='starFilterLink' value={3} onClick={() => this.getStarReviews(3)}>3 Stars</a>  <ProgressBar value={this.state.threeStars} width={70} color='#00ff00'/> ({this.state.threeStarCount})
              </Row>
              <Row>
                <a id='starFilterLink' onClick={() => this.getStarReviews(2)}>2 Stars</a>  <ProgressBar value={this.state.twoStars} width={70} color='#00ff00' />({this.state.twoStarCount})
              </Row>
              <Row>
                <a id='starFilterLinkOne' onClick={() => this.getStarReviews(1)}>1 Stars</a> <ProgressBar value={this.state.oneStars} width={70} color='#00ff00'/> ({this.state.oneStarCount})
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
    )
  }

};

export default StarChart;
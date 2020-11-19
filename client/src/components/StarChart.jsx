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
  }

  render() {
    return(
      <Container>
        <div id='starProgress'>
          <Row>
            <Col>
              <Row>
                <u>1 Stars&nbsp;</u> <ProgressBar value={this.state.oneStars} width={70} color='#00ff00'/> ({this.state.oneStarCount})
              </Row>
              <Row>
                <u>2 Stars</u>  <ProgressBar value={this.state.twoStars} width={70} color='#00ff00' />({this.state.twoStarCount})
              </Row>
              <Row>
                <u>3 Stars</u>  <ProgressBar value={this.state.threeStars} width={70} color='#00ff00'/> ({this.state.threeStarCount})
              </Row>
              <Row>
                <u>4 Stars</u>  <ProgressBar value={this.state.fourStars} width={70} color='#00ff00' /> ({this.state.fourStarCount})
              </Row>
              <Row>
                <u>5 Stars</u>  <ProgressBar value={this.state.fiveStars} width={70} color='#00ff00' /> ({this.state.fiveStarCount})
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
    )
  }

};

export default StarChart;
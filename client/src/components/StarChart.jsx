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
      fiveStars: ((props.ratings[5] / totalRatings) * 100)
    }
  }

  render() {
    return(
      <Container>
        <div id='starProgress'>
          <Row>
            <Col>
              <Row>
                <u>1 Stars</u> <ProgressBar value={this.state.oneStars} width={75}/>
              </Row>
              <Row>
                <u>2 Stars</u>  <ProgressBar value={this.state.twoStars} width={75} />
              </Row>
              <Row>
                <u>3 Stars</u>  <ProgressBar value={this.state.threeStars} width={75} />
              </Row>
              <Row>
                <u>4 Stars</u>  <ProgressBar value={this.state.fourStars} width={75} />
              </Row>
              <Row>
                <u>5 Stars</u>  <ProgressBar value={this.state.fiveStars} width={75} />
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
    )
  }

};

export default StarChart;
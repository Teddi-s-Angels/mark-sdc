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
      oneStarHover: false,
      twoStarHover: false,
      threeStarHover: false,
      fourStarHover: false,
      fiveStarHover: false,
    }
    this.getStarReviews = props.getStarReviews.bind(this)
  }

  render() {
    return(
      <Container>
        <div id='starProgress'>
          <Row>
            <Col>
              <Row fluid>
                <a id='starFilterLink' 
                onClick={() => this.getStarReviews(5)}
                onMouseEnter={() => this.setState({fiveStarHover: true})}
                onMouseLeave={() => this.setState({fiveStarHover: false})}
                >
                  <u>5 Stars</u>  <ProgressBar value={this.state.fiveStars} width={70} color={this.state.fiveStarHover ? '#0063a7' : '#77dd77'} /> {this.state.fiveStarCount}
                </a>
              </Row>
              <Row>
                <a id='starFilterLink'
                onClick={() => this.getStarReviews(4)}
                onMouseEnter={() => this.setState({fourStarHover: true})}
                onMouseLeave={() => this.setState({fourStarHover: false})}
                >
                  <u>4 Stars</u>  <ProgressBar value={this.state.fourStars} width={70} color={this.state.fourStarHover ? '#0063a7' : '#77dd77'} /> {this.state.fourStarCount}
                </a>
              </Row>
              <Row> 
                <a id='starFilterLink' value={3} 
                onClick={() => this.getStarReviews(3)}
                onMouseEnter={() => this.setState({threeStarHover: true})}
                onMouseLeave={() => this.setState({threeStarHover: false})}
                >
                  <u>3 Stars</u>  <ProgressBar value={this.state.threeStars} width={70} color={this.state.threeStarHover ? '#0063a7' : '#77dd77'}/> {this.state.threeStarCount}
                </a>
              </Row>
              <Row>
                <a id='starFilterLink'
                onClick={() => this.getStarReviews(2)}
                onMouseEnter={() => this.setState({twoStarHover: true})}
                onMouseLeave={() => this.setState({twoStarHover: false})}
                >
                  <u>2 Stars</u>  <ProgressBar value={this.state.twoStars} width={70} color={this.state.twoStarHover ? '#0063a7' : '#77dd77'} /> {this.state.twoStarCount}
                </a>
              </Row>
              <Row>
                <a id='starFilterLink' 
                onClick={() => this.getStarReviews(1)}
                onMouseEnter={() => this.setState({oneStarHover: true})}
                onMouseLeave={() => this.setState({oneStarHover: false})}
                >
                  <u>1 Stars</u>   <ProgressBar  value={this.state.oneStars} width={70} color={this.state.oneStarHover ? '#0063a7' : '#77dd77'} margin={2}/> {this.state.oneStarCount}
                </a>
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
    )
  }
 
}

export default StarChart;
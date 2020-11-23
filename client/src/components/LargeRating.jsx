import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StarRating from './StarRating.jsx'

class LargeRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: props.ratings,
      averageRating: 0
    }
    this.getAverageRating = this.getAverageRating.bind(this);
  }

  componentDidMount() {
    this.getAverageRating();
  }

  getAverageRating() {
    let sum = 0;
    let counter = 0;
    for (const key in this.state.ratings) {
      sum += key * this.state.ratings[key];
      counter += Number(this.state.ratings[key]);
    }
    const average = (sum / counter);
    this.setState({averageRating: average.toFixed(1)});
    ReactDOM.render(<StarRating starDimension={20} rating={average} />, document.getElementById('nf-stars'))
  }

  render() {
    return(
      <Container>
        <Row>
          <p id='nf-number'>{this.state.averageRating}</p>
          <div id='nf-stars'>
          </div>
        </Row>
      </Container>
    )
  }
}

export default LargeRating
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import StarRating from './StarRating.jsx';
import Parse from '../Parse.js';
import { Checkmark } from 'react-checkmark';

class SingleReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewId: props.review.review_id,
      body: props.review.body, 
      date: props.review.date.slice(0, 10), 
      helpfulness: props.review.helpfulness,
      photos: props.review.photos,
      rating: props.review.rating,
      recommend: props.review.recommend,
      didRecommend: '',
      response: props.review.response,
      reviewerName: props.review.reviewer_name,
      summary: props.review.summary,
      isHelpful: 0,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.formatDate();
  }

  handleClick() {
    if(this.state.isHelpful === 0) {
      const newResult = this.state.helpfulness + 1;
      this.setState({helpfulness: newResult});
      this.setState({isHelpful: 1});
      Parse.markAsHelpful(this.state.reviewId, (result) => {
        console.log(result);
      })
    }
  }

  formatDate() {
    let dateArray = this.state.date.split('-');
    let newDate = `${dateArray[2]}, ${dateArray[0]}`
    if(dateArray[1] === '01') {
      newDate = 'January ' + newDate;
    } else if (dateArray[1] === '02') {
      newDate = 'February ' + newDate;
    } else if (dateArray[1] === '03') {
      newDate = 'March ' + newDate;
    } else if (dateArray[1] === '04') {
      newDate = 'April ' + newDate;
    } else if (dateArray[1] === '05') {
      newDate = 'May ' + newDate;
    } else if (dateArray[1] === '06') {
      newDate = 'June ' + newDate;
    } else if (dateArray[1] === '07') {
      newDate = 'July ' + newDate;
    } else if (dateArray[1] === '08') {
      newDate = 'August ' + newDate;
    } else if (dateArray[1] === '09') {
      newDate = 'September ' + newDate;
    } else if (dateArray[1] === '10') {
      newDate = 'October ' + newDate;
    } else if (dateArray[1] === '11') {
      newDate = 'November ' + newDate;
    } else {
      newDate = 'December ' + newDate;
    }
    return this.setState({date: newDate})
  }

  render() {
    let recommend;
    if(this.state.recommend === 1) {
      recommend = <span>&#10003; &nbsp; I Recommend This Product</span>
    } else {
      recommend = '';
    }
    return (
      <Container id='review' fluid>
        <Row>
          <Col id='reviewPanelStars'>
          <StarRating starDimension={15} rating={this.state.rating} />
          </Col>
          <Col id='date'>
            <br></br>
            <p>{this.state.reviewerName}, {this.state.date}</p>
          </Col>
        </Row>
        <Row>
          <Col id='summary'><p>{this.state.summary}</p></Col>
        </Row>
        <Row>
          <Col id='body'><p>{this.state.body}</p></Col>
        </Row>
        <Row>
          <Col id='didRecommend'>{recommend}</Col>
        </Row>
        <Row>
          <Col><p>{this.state.response}</p></Col>
        </Row>
        <Row>
        <Col><p> Helpful? &nbsp;<a href='#' className='helpful' onClick={this.handleClick}>Yes</a> ({this.state.helpfulness}) &nbsp; &nbsp;| &nbsp; &nbsp;   <u>Report</u></p></Col>
        </Row>
      </Container>
    )
  }
}

// 

export default SingleReview
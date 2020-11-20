import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import StarRating from './StarRating.jsx';
import Parse from '../Parse.js';

class SingleReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewId: props.review.review_id,
      body: props.review.body, 
      bodyPreview: props.review.body.slice(0, 250),
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
      readMore: false,
      didReport: false,
    }
    this.handleClick = this.handleClick.bind(this);
    this.showMore = this.showMore.bind(this);
    this.handleReport = this.handleReport.bind(this)
  }

  componentDidMount() {
    this.formatDate();
    if(this.state.body.length < 250) {
      this.setState({readMore: true})
    }
  }

  showMore() {
    this.setState({readMore: true})
  }

  handleReport() {
    this.setState({didReport: true})
    Parse.reportReview(this.state.reviewId, (result) => {
      console.log(result);
    })
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
    let photos;
    if(this.state.photos.length > 0) {
      photos = <div><p>{this.state.photos[0] ? 'Photos: ' : ''}</p><Image src={this.state.photos[0].url} thumbnail /></div>
    } else {
      photos='';
    }
    let reported;
    if(this.state.didReport) {
      reported = <b>This review has been reported!</b>
    } else {
      reported = <u><a className='report' onClick={this.handleReport}>Report</a></u>
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
          <Col id='body'><p>{this.state.readMore ? this.state.body : this.state.bodyPreview} <a id='readMore' onClick={this.showMore}><b>{this.state.readMore ? '' : '... Read More'}</b></a></p></Col>
        </Row>
        <Row>
          <Col id='didRecommend'>{recommend}</Col>
        </Row>
        <Row>
          <Col><p>{this.state.response}</p></Col>
        </Row>
        <Row id='reviewPhoto'>
          <Col xs={6} md={4} id='reviewThumbnailPhoto'>
            {photos}
            <br></br>
          </Col>
        </Row>
        <Row>
        <p> Helpful? &nbsp;<u><a className='helpful' onClick={this.handleClick}>Yes</a></u> ({this.state.helpfulness}) &nbsp; &nbsp;| &nbsp; &nbsp;  {reported} </p>
        </Row>
      </Container>
    )
  }
}

// 

export default SingleReview
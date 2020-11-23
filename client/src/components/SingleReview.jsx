import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import StarRating from './StarRating.jsx';
import Parse from '../Parse.js';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

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
      photoLightboxTriggered: false,
      lightboxId: null,
    }
    this.handleClick = this.handleClick.bind(this);
    this.showMore = this.showMore.bind(this);
    this.handleReport = this.handleReport.bind(this)
    this.handlePhotoLightbox = this.handlePhotoLightbox.bind(this)
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

  handlePhotoLightbox(photoId) {
    console.log(photoId)
    this.setState({lightboxId: photoId})
    this.setState({photoLightboxTriggered: true})
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
    if(this.state.photos.length === 1) {
      photos = <div><p id='helpful'>Photos:</p><Image onClick={() => this.handlePhotoLightbox(0)} src={this.state.photos[0].url} thumbnail id='thumbnailReviewImage'/></div>
    } else if(this.state.photos.length === 2) {
      photos = <div><p id='helpful'>Photos:</p><Image onClick={() => this.handlePhotoLightbox(0)} src={this.state.photos[0].url} thumbnail id='thumbnailReviewImage'/><Image onClick={() => this.handlePhotoLightbox(1)} src={this.state.photos[1].url} thumbnail id='thumbnailReviewImage'/></div>
    } else if(this.state.photos.length === 3) {
      photos = <div><p id='helpful'>Photos:</p><Image onClick={() => this.handlePhotoLightbox(0)} src={this.state.photos[0].url} thumbnail id='thumbnailReviewImage'/><Image onClick={() => this.handlePhotoLightbox(1)} src={this.state.photos[1].url} thumbnail id='thumbnailReviewImage'/><Image onClick={() => this.handlePhotoLightbox(2)} src={this.state.photos[2].url} thumbnail id='thumbnailReviewImage'/></div>
    } else if(this.state.photos.length === 4) {
      photos = <div><p id='helpful'>Photos:</p><Image onClick={() => this.handlePhotoLightbox(0)} src={this.state.photos[0].url} thumbnail id='thumbnailReviewImage'/><Image onClick={() => this.handlePhotoLightbox(1)} src={this.state.photos[1].url} thumbnail id='thumbnailReviewImage'/><Image onClick={() => this.handlePhotoLightbox(2)} src={this.state.photos[2].url} thumbnail id='thumbnailReviewImage'/><Image onClick={() => this.handlePhotoLightbox(3)} src={this.state.photos[3].url} thumbnail id='thumbnailReviewImage'/></div>
    } else if(this.state.photos.length === 5) {
      photos = <div><p id='helpful'>Photos:</p><Image onClick={() => this.handlePhotoLightbox(0)} src={this.state.photos[0].url} thumbnail id='thumbnailReviewImage'/><Image onClick={() => this.handlePhotoLightbox(1)} src={this.state.photos[1].url} thumbnail id='thumbnailReviewImage'/><Image onClick={() => this.handlePhotoLightbox(2)} src={this.state.photos[2].url} thumbnail id='thumbnailReviewImage'/><Image onClick={() => this.handlePhotoLightbox(3)} src={this.state.photos[3].url} thumbnail id='thumbnailReviewImage'/><Image onClick={() => this.handlePhotoLightbox(4)} src={this.state.photos[4].url} thumbnail id='thumbnailReviewImage'/></div>
    } else {
      photos='';
    }
    let reported;
    if(this.state.didReport) {
      reported = <b>This review has been reported!</b>
    } else {
      reported = <u><a className='report' onClick={this.handleReport}>Report</a></u>
    }
    let photoLightbox;
    if(this.state.photoLightboxTriggered) {
      photoLightbox = <Lightbox mainSrc={this.state.photos[this.state.lightboxId].url} onCloseRequest={() => this.setState({ photoLightboxTriggered: false })}/>
    }
    return (
      <Container id='review' fluid>
        <Row>
          <Col id='reviewPanelStars'>
          <StarRating starDimension={17} rating={this.state.rating} />
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
          <Col fluid id='reviewThumbnailPhoto'>
            {photos}
            <br></br>
            {photoLightbox}
          </Col>
        </Row>
        <Row>
        <p id='helpful'>&nbsp;&nbsp;&nbsp; Helpful? &nbsp;<u><a className='helpful' onClick={this.handleClick}>Yes</a></u> ({this.state.helpfulness}) &nbsp; &nbsp;| &nbsp; &nbsp;  {reported} </p>
        </Row>
      </Container>
    )
  }
}

// 

export default SingleReview
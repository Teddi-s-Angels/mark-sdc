import React from 'react';
import ReactDOM from 'react-dom'
import Parse from '../Parse.js';
import { Col, Button, Form, Image, Row } from 'react-bootstrap';
import ShowStarRating from './ShowStarRating.jsx';

class AddReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meta: props.meta.characteristics,
      nickname: '',
      body: '',
      summary: '',
      email: '',
      doRecommend: null,
      stars: 0,
      size: 0,
      width: 0,
      comfort: 0,
      quality: 0,
      length: 0,
      fit: 0,
      summaryChar: 0,
      bodyChar: 0,
      nicknameError: false,
      emailError: false,
      starsError: false,
      doRecommendError: false,
      summaryError: false,
      bodyError: false,
      qualityError: false, 
      comfortError: false,
      sizeError: false,
      lengthError: false,
      widthError: false,
      fitError: false,
      photos: [],
      photoURL: '',
      productName: props.product,
      starRatingLabel: '',
      sentReview: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStarClick = this.handleStarClick.bind(this);
    this.validate = this.validate.bind(this);
    this.handlePhotos = this.handlePhotos.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    const error = name + 'Error';
    const validEmailRegex = 
     RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

    if(name === 'doRecommend' || name === 'fit' || name === 'size' || name === 'width' || name === 'comfort' || name === 'quality' || name === 'length' || name === 'stars') {
      value = Number(value);
      this.setState({[error]: false})
    } else if(name === 'body') {
      this.setState({bodyChar: value.length})
      this.setState({bodyError: false})
    } else if (name === 'nickname') {
      this.setState({nicknameError: false})
    } else if(name === 'summary') {
      this.setState({summaryChar: value.length})
      this.setState({summaryError: false})
    } else if(name === 'email') {
      if(validEmailRegex.test(this.state.email)=== false) {
        this.setState({emailError: true})
      } else {
        this.setState({emailError: false})
      }
    }
    this.setState({
      [name]: value
    });
  }

  validate(event) {
    event.preventDefault()
    if(this.state.nickname.length === 0) {
      this.setState({nicknameError: true})
    } else {
      this.setState({nicknameError: false})
    }

    if(this.state.email.length === 0) {
      this.setState({emailError: true})
    } else {
      this.setState({emailError: false})
    }

    if(this.state.body.length < 50) {
      this.setState({bodyError: true})
    } else {
      this.setState({bodyError: false})
    }

    if(this.state.stars === 0) {
      this.setState({starsError: true})
    } else {
      this.setState({starsError: false})
    }

    if(this.state.quality === 0) {
      this.setState({qualityError: true})
    } else {
      this.setState({qualityError: false})
    }

    if(this.state.comfort === 0) {
      this.setState({comfortError: true})
    } else {
      this.setState({comfortError: false})
    }

    if(this.state.size === 0) {
      this.setState({sizeError: true})
    } else {
      this.setState({sizeError: false})
    }

    if(this.state.length === 0) {
      this.setState({lengthError: true})
    } else {
      this.setState({lengthError: false})
    }

    if(this.state.width === 0) {
      this.setState({widthError: true})
    } else {
      this.setState({widthError: false})
    }

    if(this.state.fit === 0) {
      this.setState({fitError: true})
    } else {
      this.setState({fitError: false})
    }

    if(this.state.stars === 0) {
      this.setState({starsError: true})
    } else {
      this.setState({starsError: false})
    }

    if(this.state.doRecommend === null) {
      this.setState({doRecommendError: true})
    } else {
      this.setState({doRecommendError: false})
    }

    if(this.state.starsError === true || this.state.doRecommendError === true || this.state.nicknameError === true || this.state.bodyError === true || this.state.qualityError === true || this.state.comfortError === true || this.state.sizeError === true || this.state.lengthError === true || this.state.widthError === true || this.state.fitError === true || this.state.emailError === true ) {
      console.log('error')
    } else {
      this.handleSubmit()
    }
  }

  handleStarClick(stars) {
    stars=Number(stars)
    this.setState({stars: stars})
    if(stars === 1) {
      this.setState({starRatingLabel: 'Poor'})
    } else if(stars === 2) {
      this.setState({starRatingLabel: 'Fair'})
    } else if(stars === 3) {
      this.setState({starRatingLabel: 'Average'})
    } else if(stars === 4) {
      this.setState({starRatingLabel: 'Good'})
    } else if(stars === 5) {
      this.setState({starRatingLabel: 'Great'})
    }
  }

  handlePhotos(e) {
    e.preventDefault();
    const ArrayURL = this.state.photoURL.split(' ')
    let newState = this.state.photos.concat(ArrayURL)
    this.setState({photos: newState})
    ReactDOM.render(<Image thumbnail id='imageThumbnail' onClick={this.handlePhotoLightbox} src={this.state.photoURL} />, document.getElementById('photoPreview'))
    this.setState({photoURL: ''})
  }

  handleSubmit() {
    //const sizeId = this.state.meta.Size.id ? this.state.meta.Size.id : null;
    const comfortId = this.state.meta.Comfort.id ? this.state.meta.Comfort.id : null;
    const fitId = this.state.meta.Fit.id || null;
    const qualityId = this.state.meta.Quality.id || null;
    const lengthId = this.state.meta.Length.id || null;
    //const widthId = this.state.meta.Width.id ? this.state.meta.Width.id : null;

    let characteristicsObj = {
      //[sizeId]: this.state.size,
      //[widthId]: this.state.width,
      [comfortId]: this.state.comfort,
      [qualityId]: this.state.quality,
      [fitId]: this.state.fit,
      [lengthId]: this.state.length

    }
    const body = {
      rating: this.state.stars,
      summary: this.state.summary,
      body: this.state.body,
      recommend: this.state.doRecommend,
      name: this.state.nickname,
      email: this.state.email,
      photos: this.state.photoURL.split(' '),
      characteristics: characteristicsObj
    }

    if(this.state.sentReview) {
      return
    } else {
      Parse.submitReview(JSON.stringify(body), (err, result) => {
        if(err) {
          console.log(err)
        } else {
          console.log(result)
        }
      })
    }
    this.setState({sentReview: true})
  }

  render() {
    let reviewSent;
    if(this.state.sentReview) {
      reviewSent = <b>Review Was Sent Successfully</b>
    } else {
      reviewSent = <Button variant='primary' onClick={this.validate}>Post Review</Button>
    }
    return (
      <div>
        <Form id='addReviewForm'>
        <h3 id='reviewFormTitle'>Write Your Review</h3>
        <h3 id='reviewFormSubtitle'>About the {this.state.productName}</h3>
        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Label id='formQuestions'>Username*</Form.Label>
                <Form.Control name='nickname' maxlength='20' type='text' placeholder='Example: jackson11!' value={this.state.nickname} onChange={this.handleChange} className={this.state.nicknameError ? 'error' : ''}/>
                <p id='finePrint'>&nbsp;For privacy reasons, do not use your full name or email address</p>
            </Form.Group>
          </Col>
          <Col>
            <Form.Label id='formQuestions'>Email*</Form.Label>
            <Form.Group>
              <Form.Control name='email' maxlength='60' required value={this.state.email} type='email' placeholder='Example: jackson11@email.com' onChange={this.handleChange} className={this.state.emailError ? 'error' : ''}/>
              {/* <p id='emailError'>{this.state.emailError ? 'Enter Value Email' : ''}</p> */}
              <p id='finePrint'>&nbsp;For authentication reasons, you will not be emailed</p>
             
            </Form.Group>
          </Col>
        </Form.Row>
          <Form.Group>
            <Form.Row>
            <br></br>
            <Form.Label className={this.state.starsError ? 'error' : ''} id='formQuestionsRadio'>What is your overall rating of this product?*&nbsp; &nbsp; &nbsp;</Form.Label>
              <br></br>
              <ShowStarRating handleStarClick={this.handleStarClick = this.handleStarClick.bind(this)}/> <p id='starRatingLabel'>{this.state.starRatingLabel}</p>
              </Form.Row>
          </Form.Group>
          <Form.Group>
            <Form.Label inline  id='formQuestions' className={this.state.doRecommendError ? 'error' : ''}>Do You Recommend This Product?*&nbsp; &nbsp; &nbsp;</Form.Label>
            <Form.Check inline name='doRecommend' value={1} label='Yes' type='radio' id='inline-radio1' onChange={this.handleChange} />
            <Form.Check inline name='doRecommend' value={0} label='No' type='radio' id='inline-radio1' onChange={this.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label id='formQuestions'>Review Title</Form.Label>
            <Form.Control required name='summary' value={this.state.summary} maxlength='60' type='text' placeholder='Example: Best Purchase Ever!' onChange={this.handleChange} className={this.state.summaryError ? 'error' : ''}/>
            {/* <p id='charCount'>{60 - this.state.summaryChar} Characters Left</p> */}
          </Form.Group>
          <Form.Group>
            <Form.Label id='formQuestions'>Review Body*</Form.Label>
            <Form.Control as='textarea' name='body' value={this.state.body} required maxlength='1000' type='text' placeholder='Why did you like the product or not?' onChange={this.handleChange} className={this.state.bodyError ? 'error' : ''}/>
            <p id='charCount'><b>{this.state.bodyError ? 'Review must be 50 characters or longer' : ''}</b> &nbsp; &nbsp; &nbsp; {this.state.bodyChar >= 50 ? 'Minimum Reached' : `Minimum Required Characters Left: ${50 - this.state.bodyChar}`}</p>
          </Form.Group>
          <Form.Group>
            <Form.Label id='formQuestions'>How Was the Quality of the Product You Recieved*</Form.Label>
            <Form.Control id='reviewDropdown' as='select' defaultValue='None Selected' value={this.state.quality} onChange={this.handleChange} name='quality' className={this.state.qualityError ? 'error' : ''}>
              <option value={0}>None Selected</option>
              <option value={5}>5 - Perfect</option>
              <option value={4}>4 - Pretty Great</option>
              <option value={3}>3 - What I Expected</option>
              <option value={2}>2 - Below Average</option>
              <option value={1}>1 - Poor</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
          <Form.Label id='formQuestions'>How Comfortable is the Product Your Ordered*</Form.Label>
            <Form.Control id='reviewDropdown' as='select' defaultValue='None Selected' value={this.state.comfort} onChange={this.handleChange} name='comfort' className={this.state.comfortError ? 'error' : ''}>
              <option value={0}>None Selected</option>
              <option value={5}>5 - Perfect</option>
              <option value={4}>4 - Comfortable</option>
              <option value={3}>3 - Ok</option>
              <option value={2}>2 - Slightly Uncomfortable</option>
              <option value={1}>1 - Uncomfortable</option>
            </Form.Control>
          </Form.Group>
          {/* <Form.Group>
          <Form.Label id='formQuestions'>Was the Size Accurate With the Listing?*</Form.Label>
            <Form.Control id='reviewDropdown' as='select' defaultValue='None Selected' value={this.state.size} onChange={this.handleChange} name='size' className={this.state.sizeError ? 'error' : ''}>
              <option>None Selected</option>
              <option value={5}>5 - A Size Too Big</option>
              <option value={4}>4 - A 1/2 Size Too Big</option>
              <option value={3}>3 - Perfect</option>
              <option value={2}>2 - A 1/2 Size Too Small</option>
              <option value={1}>1 - A Size Too Small</option>
            </Form.Control>
          </Form.Group> */}
          <Form.Group>
          <Form.Label id='formQuestions'>Was the Length Accurate With the Listing?*</Form.Label>
            <Form.Control id='reviewDropdown' as='select' defaultValue='None Selected' value={this.state.length} onChange={this.handleChange} name='length' className={this.state.lengthError ? 'error' : ''}>
              <option value={0}>None Selected</option>
              <option value={5}>5 - Runs Long</option>
              <option value={4}>4 - Runs Slightly Long</option>
              <option value={3}>3 - Perfect</option>
              <option value={2}>2 - Runs Slightly Short</option>
              <option value={1}>1 - Runs Short</option>
            </Form.Control>
          </Form.Group>
          {/* <Form.Group>
          <Form.Label id='formQuestions'>Was the Width Accurate With the Listing?*</Form.Label>
            <Form.Control id='reviewDropdown' as='select' defaultValue='None Selected' value={this.state.width} onChange={this.handleChange} name='width' className={this.state.widthError ? 'error' : ''}>
              <option value={0}>None Selected</option>
              <option value={5}>5 - Too Wide</option>
              <option value={4}>4 - Slightly Wide</option>
              <option value={3}>3 - Perfect</option>
              <option value={2}>2 - Slightly Narrow</option>
              <option value={1}>1 - Too Narrow</option>
            </Form.Control>
          </Form.Group> */}
          <Form.Group>
          <Form.Label id='formQuestions'>Was the Fit Accurate With the Listing?*</Form.Label>
            <Form.Control id='reviewDropdown' as='select' defaultValue='None Selected' value={this.state.fit} onChange={this.handleChange} name='fit' className={this.state.fitError ? 'error' : ''}>
              <option value={0}>None Selected</option>
              <option value={5}>5 - Runs Loose</option>
              <option value={4}>4 - Runs Slightly Loose</option>
              <option value={3}>3 - Perfect</option>
              <option value={2}>2 - Runs Slightly Tight</option>
              <option value={1}>1 - Runs Tight</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
          <Form.Label id='formQuestions'>Share a Photo of Your Purchase</Form.Label>
            <Form.Row>
              <Form.Control name='photoURL' type='text' placeholder='Enter Valid URL to Photo' value={this.state.photoURL} onChange={this.handleChange} id='photoInput'/>
              <Button id='addPhoto' onClick={this.handlePhotos} >Attach</Button>
            </Form.Row>
          </Form.Group>
          <Form.Row id='photoPreview'>
              
          </Form.Row>
           <p id='requiredField'>* = required</p>
           <Form.Row>
          {reviewSent}
           </Form.Row>
        </Form>
      </div>
    )
  }
}

export default AddReviewForm
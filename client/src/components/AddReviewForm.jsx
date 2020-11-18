import React from 'react';
import Parse from '../Parse.js'
import { Col, Button, Form } from 'react-bootstrap'
import CustomStarRating from './CustomStarRating.jsx'
import ShowStarRating from './ShowStarRating.jsx'

class AddReviewForm extends React.Component {
  constructor() {
    super();
    this.state = {
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
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStarClick = this.handleStarClick.bind(this);
    this.validate = this.validate.bind(this);
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

    if(this.state.body.length === 0) {
      this.setState({bodyError: true})
    } else {
      this.setState({bodyError: false})
    }

    if(this.state.summary.length === 0) {
      this.setState({summaryError: true})
    } else {
      this.setState({summaryError: false})
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

    if(this.state.starsError === true || this.state.doRecommendError === true || this.state.nicknameError === true || this.state.bodyError === true || this.state.summaryError === true || this.state.qualityError === true || this.state.comfortError === true || this.state.sizeError === true || this.state.lengthError === true || this.state.widthError === true || this.state.fitError === true || this.state.emailError === true ) {
      console.log('error')
    } else {
      this.handleSubmit()
    }
  }

  handleStarClick(stars) {
    // console.log(event.target)
    // let stars = event.target.value
    console.log('stars'+ stars)
    this.setState({stars: stars})
    console.log(this.state.stars)
  }

  handleSubmit(event) {
    event.preventDefault();
    const characteristicsObj = {
      '14': this.state.size,
      '15': this.state.width,
      '16': this.state.comfort,
      '17': this.state.quality

    }
    const body = {
      rating: 1,
      summary: this.state.summary,
      body: this.state.body,
      recommend: false,
      name: this.state.nickname,
      email: this.state.email,
      characteristics: characteristicsObj
    }
    Parse.submitReview(JSON.stringify(body), (err, result) => {
      if(err) {
        console.log(err)
      } else {
        console.log(result)
      }
    })
  }

  render() {
    return (
      <div>
        <Form id='addReviewForm'>
        <h3 id='reviewFormTitle'>Write Your Review</h3>
        <Form.Row>
          <Col>
            <Form.Group>
                <Form.Control name='nickname' maxlength='20' type='text' placeholder='Enter Username*' value={this.state.nickname} onChange={this.handleChange} className={this.state.nicknameError ? 'error' : ''}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Control name='email' required value={this.state.email} type='email' placeholder='Enter Valid Email*' onChange={this.handleChange} className={this.state.emailError ? 'error' : ''}/>
              <p id='emailError'>{this.state.emailError ? 'Enter Value Email' : ''}</p>
            </Form.Group>
          </Col>
        </Form.Row>
          <Form.Group>
            <Form.Label className={this.state.starsError ? 'error' : ''} id='formQuestions'>What is your overall rating of this product?*&nbsp; &nbsp; &nbsp;</Form.Label>
              <br></br>
              <ShowStarRating handleStarClick={this.handleStarClick = this.handleStarClick.bind(this)}/>
          </Form.Group>
          <Form.Group>
            <Form.Label inline  id='formQuestions' className={this.state.doRecommendError ? 'error' : ''}>Do You Recommend This Product?*&nbsp; &nbsp; &nbsp;</Form.Label>
            <Form.Check inline name='doRecommend' value={1} label='Yes' type='radio' id='inline-radio1' onChange={this.handleChange} />
            <Form.Check inline name='doRecommend' value={0} label='No' type='radio' id='inline-radio1' onChange={this.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Control required name='summary' value={this.state.summary} maxlength='60' type='text' placeholder='Enter Review Title*' onChange={this.handleChange} className={this.state.summaryError ? 'error' : ''}/>
            <p id='charCount'>{60 - this.state.summaryChar} Characters Left</p>
          </Form.Group>
          <Form.Group>
            <Form.Control as='textarea' name='body' value={this.state.body} required maxlength='1000' type='text' placeholder='Enter Full Review*' onChange={this.handleChange} className={this.state.bodyError ? 'error' : ''}/>
            <p id='charCount'>{1000 - this.state.bodyChar} Characters Left</p>
          </Form.Group>
          <Form.Group>
            <Form.Label id='formQuestions'>How Was the Quality of the Product You Recieved*</Form.Label>
            <Form.Control as='select' defaultValue='None Selected' value={this.state.quality} onChange={this.handleChange} name='quality' className={this.state.qualityError ? 'error' : ''}>
              <option value={0}>None Selected</option>
              <option value={5}>5 - Perfect</option>
              <option value={4}>4 - Great</option>
              <option value={3}>3 - Not Poor, but Not Great</option>
              <option value={2}>2 - Poor</option>
              <option value={1}>1 - Disapointing</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
          <Form.Label id='formQuestions'>How Comfortable is the Product Your Ordered*</Form.Label>
            <Form.Control as='select' defaultValue='None Selected' value={this.state.comfort} onChange={this.handleChange} name='comfort' className={this.state.comfortError ? 'error' : ''}>
              <option value={0}>None Selected</option>
              <option value={5}>5 - Very Comfortable</option>
              <option value={4}>4 - Somewhat Comfortable</option>
              <option value={3}>3 - It is Average</option>
              <option value={2}>2 - Dissapointing</option>
              <option value={1}>1 - Not Comfortable</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
          <Form.Label id='formQuestions'>Was the Size Accurate With the Listing?*</Form.Label>
            <Form.Control as='select' defaultValue='None Selected' value={this.state.size} onChange={this.handleChange} name='size' className={this.state.sizeError ? 'error' : ''}>
              <option>None Selected</option>
              <option value={5}>5 - Way Too Big</option>
              <option value={4}>4 - A Little Big</option>
              <option value={3}>3 - Perfect</option>
              <option value={2}>2 - A Little Small</option>
              <option value={1}>1 - Way Too Small</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
          <Form.Label id='formQuestions'>Was the Length Accurate With the Listing?*</Form.Label>
            <Form.Control as='select' defaultValue='None Selected' value={this.state.length} onChange={this.handleChange} name='length' className={this.state.lengthError ? 'error' : ''}>
              <option value={0}>None Selected</option>
              <option value={5}>5 - Way Too Long</option>
              <option value={4}>4 - A Little Long</option>
              <option value={3}>3 - Perfect</option>
              <option value={2}>2 - A Little Short</option>
              <option value={1}>1 - Way Too Short</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
          <Form.Label id='formQuestions'>Was the Width Accurate With the Listing?*</Form.Label>
            <Form.Control as='select' defaultValue='None Selected' value={this.state.width} onChange={this.handleChange} name='width' className={this.state.widthError ? 'error' : ''}>
              <option value={0}>None Selected</option>
              <option value={5}>5 - Way Too Big</option>
              <option value={4}>4 - A Little Big</option>
              <option value={3}>3 - Perfect</option>
              <option value={2}>2 - A Little Tight</option>
              <option value={1}>1 - Way Too Tight</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
          <Form.Label id='formQuestions'>Was the Fit Accurate With the Listing?*</Form.Label>
            <Form.Control as='select' defaultValue='None Selected' value={this.state.fit} onChange={this.handleChange} name='fit' className={this.state.fitError ? 'error' : ''}>
              <option value={0}>None Selected</option>
              <option value={5}>5 - Fit Perfectly</option>
              <option value={4}>4 - Great Fit</option>
              <option value={3}>3 - As Expected</option>
              <option value={2}>2 - Poor Fit</option>
              <option value={1}>1 - Does Not Fit</option>
            </Form.Control>
           <p id='requiredField'>* = required</p>
          </Form.Group>
          <Button variant='primary' onClick={this.handleSubmit}>Post Review</Button>
        </Form>
      </div>
    )
  }
}

export default AddReviewForm
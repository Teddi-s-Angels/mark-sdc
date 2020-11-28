import React from 'react';
import Parse from '../Parse.js';
import { Col, Button, Form, Image } from 'react-bootstrap';
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
    this.handleValidation = this.handleValidation.bind(this);
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

    if(this.state.quality === 0 && this.state.meta.Quality) {
      this.setState({qualityError: true})
    } else {
      this.setState({qualityError: false})
    }

    if(this.state.comfort === 0 && this.state.meta.Comfort) {
      this.setState({comfortError: true})
    } else {
      this.setState({comfortError: false})
    }

    if(this.state.size === 0 && this.state.meta.Size) {
      this.setState({sizeError: true})
    } else {
      this.setState({sizeError: false})
    }

    if(this.state.length === 0 && this.state.meta.Length) {
      this.setState({lengthError: true})
    } else {
      this.setState({lengthError: false})
    }

    if(this.state.width === 0 && this.state.meta.Width) {
      this.setState({widthError: true})
    } else {
      this.setState({widthError: false})
    }

    if(this.state.fit === 0 && this.state.meta.Fit) {
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
    setTimeout(function() {this.handleValidation()}.bind(this), 100)
  }

  handleValidation() {
    console.log(this.state)
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
    const ArrayURL = this.state.photoURL.split(' ');
    let newState = this.state.photos.concat(ArrayURL);
    this.setState({photos: newState});
    this.setState({photoURL: ''});
  }

  handleSubmit() {
    if(this.state.starsError === true || this.state.doRecommendError === true || this.state.nicknameError === true || this.state.bodyError === true || this.state.qualityError === true || this.state.comfortError === true || this.state.sizeError === true || this.state.lengthError === true || this.state.widthError === true || this.state.fitError === true || this.state.emailError === true ) {
      return;
    }

    const sizeId = this.state.meta.Size ? this.state.meta.Size.id : null;
    const comfortId = this.state.meta.Comfort ? this.state.meta.Comfort.id : null;
    const fitId = this.state.meta.Fit ? this.state.meta.Fit.id : null;
    const qualityId = this.state.meta.Quality ? this.state.meta.Quality.id : null;
    const lengthId = this.state.meta.Length ? this.state.meta.Length.id : null;
    const widthId = this.state.meta.Width ? this.state.meta.Width.id : null;

    let characteristicsObj ={}
    if(sizeId) {
      characteristicsObj[sizeId] = this.state.size
    }
    if(comfortId) {
      characteristicsObj[comfortId] = this.state.comfort
    }
    if(fitId) {
      characteristicsObj[fitId] = this.state.fit
    }
    if(qualityId) {
      characteristicsObj[qualityId] = this.state.quality
    }
    if(lengthId) {
      characteristicsObj[lengthId] = this.state.length
    }
    if(widthId) {
      characteristicsObj[widthId] = this.state.width
    }

    const body = {
      rating: this.state.stars,
      summary: this.state.summary,
      body: this.state.body,
      recommend: this.state.doRecommend,
      name: this.state.nickname,
      email: this.state.email,
      photos: this.state.photos,
      characteristics: characteristicsObj
    };

    if(this.state.sentReview) {
      return
    } else {
      Parse.submitReview(JSON.stringify(body), (err, result) => {
        if(err) {
          console.log(err);
        } else {
          console.log(result);
        }
      })
      this.setState({sentReview: true});
    }
  }

  render() {
    let reviewSent;
    if(this.state.sentReview) {
      reviewSent = <b>Review Was Sent Successfully</b>
    } else {
      reviewSent = <Button id='submitReviewButton' onClick={this.validate}>Post Review</Button>
    }

    let addPhotoButton;
    if(this.state.photos.length < 5) {
      addPhotoButton = <Button id='addPhotoButton' onClick={this.handlePhotos} >Attach</Button>
    }

    let photoOne;
    let photoTwo;
    let photoThree;
    let photoFour;
    let photoFive;
    if(this.state.photos[0]) {
      photoOne = <Image thumbnail id='imageThumbnail' onClick={this.handlePhotoLightbox} src={this.state.photos[0]} />
    } 
    
    if(this.state.photos[1]) {
      photoTwo = <Image thumbnail id='imageThumbnail' onClick={this.handlePhotoLightbox} src={this.state.photos[1]} />
    }

    if(this.state.photos[2]) {
      photoThree = <Image thumbnail id='imageThumbnail' onClick={this.handlePhotoLightbox} src={this.state.photos[2]} />
    }

    if(this.state.photos[3]) {
      photoFour = <Image thumbnail id='imageThumbnail' onClick={this.handlePhotoLightbox} src={this.state.photos[3]} />
    }
    
    if(this.state.photos[4]) {
      photoFive = <Image thumbnail id='imageThumbnail' onClick={this.handlePhotoLightbox} src={this.state.photos[4]} />
    }
    let quality;
    let comfort;
    let fit;
    let size;
    let length;
    let width;

    if(this.state.meta.Quality) {
      quality = <Form.Group>
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
    }
    if(this.state.meta.Comfort) {
      comfort = <Form.Group>
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
    }
    if(this.state.meta.Fit) {
      fit = <Form.Group>
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
    }
    if(this.state.meta.Size) {
      size = <Form.Group>
              <Form.Label id='formQuestions'>Was the Size Accurate With the Listing?*</Form.Label>
                <Form.Control id='reviewDropdown' as='select' defaultValue='None Selected' value={this.state.size} onChange={this.handleChange} name='size' className={this.state.sizeError ? 'error' : ''}>
                  <option>None Selected</option>
                  <option value={5}>5 - A Size Too Big</option>
                  <option value={4}>4 - A 1/2 Size Too Big</option>
                  <option value={3}>3 - Perfect</option>
                  <option value={2}>2 - A 1/2 Size Too Small</option>
                  <option value={1}>1 - A Size Too Small</option>
                </Form.Control>
              </Form.Group>
    }
    if(this.state.meta.Length) {
      length = <Form.Group>
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
    }
    if(this.state.meta.Width) {
      width = <Form.Group>
                <Form.Label id='formQuestions'>Was the Width Accurate With the Listing?*</Form.Label>
                  <Form.Control id='reviewDropdown' as='select' defaultValue='None Selected' value={this.state.width} onChange={this.handleChange} name='width' className={this.state.widthError ? 'error' : ''}>
                    <option value={0}>None Selected</option>
                    <option value={5}>5 - Too Wide</option>
                    <option value={4}>4 - Slightly Wide</option>
                    <option value={3}>3 - Perfect</option>
                    <option value={2}>2 - Slightly Narrow</option>
                    <option value={1}>1 - Too Narrow</option>
                  </Form.Control>
                </Form.Group>
    }

    let requirementsHeader;
    let nicknameError;
    let emailError;
    let starsError;
    let recommendError;
    let bodyError;
    let qualityError;
    let comfortError;
    let sizeError;
    let lengthError;
    let widthError;
    let fitError;

    if(this.state.starsError === true || this.state.doRecommendError === true || this.state.nicknameError === true || this.state.bodyError === true || this.state.qualityError === true || this.state.comfortError === true || this.state.sizeError === true || this.state.lengthError === true || this.state.widthError === true || this.state.fitError === true || this.state.emailError === true ) {
      requirementsHeader = <ul id='errorMessageHeader'>Correct the Following:</ul>
    }
    
    if(this.state.starsError) {
      starsError = <li id='errorMessage'>Please fill in star rating</li>
    }
    if(this.state.doRecommendError) {
      recommendError = <li id='errorMessage'>Please fill in yes or no for recommending product</li>
    }
    if(this.state.nicknameError) {
      nicknameError = <li id='errorMessage'>Please fill in your nickname</li>
    }
    if(this.state.bodyError) {
      bodyError = <li id='errorMessage'>Please fill in the body of the review</li>
    }
    if(this.state.qualityError && this.state.meta.Quality) {
      qualityError = <li id='errorMessage'>Please fill in the quality rating</li>
    }
    if(this.state.comfortError && this.state.meta.Comfort) {
      comfortError = <li id='errorMessage'>Please fill in the comfort rating</li>
    }
    if(this.state.sizeError && this.state.meta.Size) {
      sizeError = <li id='errorMessage'>Please fill in the size rating</li>
    }
    if(this.state.lengthError && this.state.meta.Length) {
      lengthError = <li id='errorMessage'>Please fill in the length rating</li>
    }
    if(this.state.widthError && this.state.meta.Width) {
      widthError = <li id='errorMessage'>Please fill in the width rating</li>
    }
    if(this.state.fitError && this.state.meta.Fit) {
      fitError = <li id='errorMessage'>Please fill in the fit rating</li>
    }
    if(this.state.emailError) {
      emailError = <li id='errorMessage'>Please provide a valid email</li>
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
          {quality}
          {comfort}
          {size}
          {length}
          {width}
          {fit}
          <Form.Group>
          <Form.Label id='formQuestions'>Share Photos of Your Purchase (max: 5)</Form.Label>
            <Form.Row>
              <Form.Control name='photoURL' type='text' placeholder='Enter Valid URL to Photo' value={this.state.photoURL} onChange={this.handleChange} id='photoInput'/>
              {addPhotoButton}
            </Form.Row>
          </Form.Group>
          <Form.Row id='photoPreview'>
            {photoOne}
            {photoTwo}
            {photoThree}
            {photoFour}
            {photoFive}
          </Form.Row>
            <p id='requiredField'>* = required</p>
            {requirementsHeader}
            {nicknameError}
            {emailError}
            {starsError}
            {recommendError}
            {bodyError}
            {qualityError}
            {comfortError}
            {sizeError}
            {lengthError}
            {widthError}
            {fitError}
          <Form.Row>
            {reviewSent}
          </Form.Row>
        </Form>
      </div>
    )
  }
}

export default AddReviewForm
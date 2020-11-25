import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import Parse from './Parse.js';
import MainReviewPanel from './components/MainReviewPanel.jsx';
import ProductMeta from './components/ProductMeta.jsx';
import AddReviewForm from './components/AddReviewForm.jsx';
import StarRating from './components/StarRating.jsx';
import '../dist/style.css'


class ReviewApp extends React.Component {
  constructor() {
    super();
    this.state = {
      reviews: [],
      reviewsToShow: [],
      example: '',
      numberOfReviews: '',
      addReview: 0,
      meta: {},
      sortName: 'relevance',
      starFilterLabel: 'All Stars',
      starFilter: [],
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      productList: [],
      filterOn: false,
    }
    this.handleMoreReviews = this.handleMoreReviews.bind(this);
    this.handleAddReview = this.handleAddReview.bind(this);
    this.getNewestReviews = this.getNewestReviews.bind(this);
    this.getHelpfulReviews = this.getHelpfulReviews.bind(this);
    this.getRelevantReviews = this.getRelevantReviews.bind(this);
    this.handleClearFilter = this.handleClearFilter.bind(this);
    this.starhelper = this.starhelper.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidMount() {
    Parse.getAllProductList((productList) => {
      this.setState({productList: productList[3].name})
    });
    Parse.getProductMeta((meta) => {
     this.setState({meta: meta})
     ReactDOM.render(<ProductMeta meta={this.state.meta} getStarReviews={this.starhelper}/>, document.getElementById('productMeta'))
     this.getRelevantReviews()
    });

  }

  getRelevantReviews() {
    Parse.getAllList((data) => {
      this.setState({numberOfReviews: data.results.length})
      let twoReviews = data.results.splice(0, 2)
      this.setState({sortName: 'relevance'})
      this.setState({reviews: data.results})
      this.setState({reviewsToShow: twoReviews})
      ReactDOM.unmountComponentAtNode(document.getElementById('reviewPannel'))
      ReactDOM.render(<MainReviewPanel reviews={this.state.reviewsToShow} meta={this.state.meta}/>, document.getElementById('reviewPannel'))
    });
  }

  getNewestReviews() {

    Parse.getAllListNewest((data) => {

      this.setState({numberOfReviews: data.results.length})

      let twoReviews = data.results.splice(0, 2)

      this.setState({sortName: 'newest'})

      this.setState({reviews: data.results})

      this.setState({reviewsToShow: twoReviews})

      ReactDOM.unmountComponentAtNode(document.getElementById('reviewPannel'))

      ReactDOM.render(<MainReviewPanel reviews={this.state.reviewsToShow} />, document.getElementById('reviewPannel'))
    });
  }

  getHelpfulReviews() {
    Parse.getAllListHelpfulness((data) => {

      this.setState({numberOfReviews: data.results.length})

      let twoReviews = data.results.splice(0, 2)

      this.setState({sortName: 'helpfulness'})

      this.setState({reviews: data.results})

      this.setState({reviewsToShow: twoReviews})

      ReactDOM.unmountComponentAtNode(document.getElementById('reviewPannel'))

      ReactDOM.render(<MainReviewPanel reviews={this.state.reviewsToShow} />, document.getElementById('reviewPannel'))
    });
  }

  starhelper(stars) {
    console.log(stars)
    const newStars = this.state.starFilter
    newStars.push(stars)
    this.setState({[stars]: true})
    this.setState({starFilter: newStars})
    this.getStarReviews()
  }

  getStarReviews() {
    const array = this.state.starFilter
    if(this.state.sortName === 'relevance') {
      Parse.getAllList((data) => {
        let reviewArray = data.results;
        let result = [];
        reviewArray.map((review) => {
          if(array.indexOf(review.rating) > -1) {
            result.push(review)
          }
        })
        this.setState({numberOfReviews: result.length})
        let twoReviews = result.splice(0, 2)
        this.setState({reviewsToShow: twoReviews})
        this.setState({reviews: result})
        ReactDOM.unmountComponentAtNode(document.getElementById('reviewPannel'))
        ReactDOM.render(<MainReviewPanel reviews={this.state.reviewsToShow} />, document.getElementById('reviewPannel'))
      })
    } else if(this.state.sortName === 'newest') {
      Parse.getAllListNewest((data) => {
        let reviewArray = data.results;
        let result = [];
        reviewArray.map((review) => {
          if(array.indexOf(review.rating) > -1) {
            result.push(review)
          }
        })
        this.setState({numberOfReviews: result.length})
        let twoReviews = result.splice(0, 2)
        this.setState({reviewsToShow: twoReviews})
        this.setState({reviews: result})
        ReactDOM.unmountComponentAtNode(document.getElementById('reviewPannel'))
        ReactDOM.render(<MainReviewPanel reviews={this.state.reviewsToShow} />, document.getElementById('reviewPannel'))
      })
    } else {
      Parse.getAllListHelpfulness((data) => {
        let reviewArray = data.results;
        let result = [];
        reviewArray.map((review) => {
          if(array.indexOf(review.rating) > -1) {
            result.push(review)
          }
        })
        this.setState({numberOfReviews: result.length})
        let twoReviews = result.splice(0, 2)
        this.setState({reviewsToShow: twoReviews})
        this.setState({reviews: result})
        ReactDOM.unmountComponentAtNode(document.getElementById('reviewPannel'))
        ReactDOM.render(<MainReviewPanel reviews={this.state.reviewsToShow} />, document.getElementById('reviewPannel'))
      })
    }
  }


  handleMoreReviews() {
    let moreReviews = this.state.reviews.splice(0, 2);
    if(moreReviews[0] !== undefined) {
      this.state.reviewsToShow.push(moreReviews[0])
    }
    if(moreReviews[1] !== undefined) {
      this.state.reviewsToShow.push(moreReviews[1])
    }
    this.setState({reviewsToShow: this.state.reviewsToShow})
    this.setState({reviews: this.state.reviews})

    ReactDOM.unmountComponentAtNode(document.getElementById('reviewPannel'))

    ReactDOM.render(<MainReviewPanel reviews={this.state.reviewsToShow} />, document.getElementById('reviewPannel'))
  }

  handleAddReview() {
    if(this.state.addReview === 0) {
      ReactDOM.render(<AddReviewForm meta={this.state.meta} product={this.state.productList}/>, document.getElementById('reviewForm'))
      this.setState({addReview: 1})
      document.getElementById('reviewForm').scrollIntoView()
    } else {
      ReactDOM.unmountComponentAtNode(document.getElementById('reviewForm'))
      this.setState({addReview: 0})
    }
  }

  handleSort(sortName) {
    if(sortName === 'newest') {
      this.setState({sortName: sortName})
      if(this.state.starFilter.length === 0) {
        this.getNewestReviews()
      } else {
        this.getStarReviews()      
      }
    } else if(sortName === 'relevance') {
      this.setState({sortName: sortName})
      if(this.state.starFilter.length === 0) {
        this.getRelevantReviews()
      } else {
        this.getStarReviews()      
      }
    } else if(sortName === 'helpfulness') {
      this.setState({sortName: sortName})
      if(this.state.starFilter.length === 0) {
        this.getHelpfulReviews()
      } else {
        this.getStarReviews()      
      }
    }
  }

  handleClearFilter(stars) {
    console.log(stars)
    this.setState({[stars]: false})
    const array = this.state.starFilter;
    array.splice(array.indexOf(stars), 1)
    this.setState({starFilter: array})
    if(this.state.starFilter.length > 0) {
      this.getStarReviews()
    } else {
      this.getRelevantReviews()
    }
    
  }

  render() {
    let clearFiveStar;
    if(this.state[5]) {
      clearFiveStar = <u><a value={5} onClick={() => this.handleClearFilter(5)}>5 Stars</a></u>
    }
    let clearFourStar;
    if(this.state[4]) {
      clearFourStar = <u><a value={4} onClick={() => this.handleClearFilter(4)}>4 Stars</a></u>
    }
    let clearThreeStar;
    if(this.state[3]) {
      clearThreeStar = <u><a value={3} onClick={() => this.handleClearFilter(3)}>3 Stars</a></u>
    }
    let clearTwoStar;
    if(this.state[2]) {
      clearTwoStar = <u><a value={2} onClick={() => this.handleClearFilter(2)}>2 Stars</a></u>
    }
    let clearOneStar;
    if(this.state[1]) {
      clearOneStar = <u><a value={1} onClick={() => this.handleClearFilter(1)}>1 Star</a></u>
    }
    let numberOfReviews = this.state.numberOfReviews
    let showMoreReviews;
    if(this.state.reviews.length === 0) {
      showMoreReviews = ''
    } else {
      showMoreReviews = <Button id='reviewButton' onClick={this.handleMoreReviews} >More Reviews</Button>
    }


    return ( 
      <div>
        <br></br>
          <br></br>
        <Container>
        <Row>
          <h3 id='reviewAppHeading'>RATINGS & REVIEWS</h3>
        </Row>
        <Row>
          <Col xl={4}>
            <div id='productMeta'></div>
          </Col>
          <Col fluid> 
            <Row id='reviewPannelHeader'> 
              <br></br>
              <Col id='sortDropdown' fluid>
                <Row id='sort'>
              <h3 id='sortTitle'>{numberOfReviews} {this.state.numberOfReviews === 1 ? 'review' : 'reviews'}, sorted by&nbsp; </h3>
                <DropdownButton id="dropdown-item-button" title={this.state.sortName}>
                  <Dropdown.Item onClick={() => this.handleSort('helpfulness')}>Helpfulness</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.handleSort('relevance')}>Relevance</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.handleSort('newest')}>Newest</Dropdown.Item>
                </DropdownButton>
                </Row>
              </Col>
              <Col>
               <Row id='starFilter'> 
                <p id='clearFilter'>{clearFiveStar} &nbsp; {clearFourStar} &nbsp; {clearThreeStar} &nbsp; {clearTwoStar} &nbsp; {clearOneStar}</p>
                </Row>
              </Col>
            </Row>
            <div id='reviewPannel'></div>
            <br></br>
            <br></br>
              {showMoreReviews} &nbsp; &nbsp; &nbsp; &nbsp;
              <Button id='reviewButton' onClick={this.handleAddReview}> Add A Review &nbsp;&nbsp;&#43; </Button>
            <br></br>
            <br></br>
            <br></br>
            <div id='reviewForm'>
            </div>
            <br></br>
          </Col>
        </Row>
      </Container>
      </div>
  );
  }
}

export default ReviewApp;
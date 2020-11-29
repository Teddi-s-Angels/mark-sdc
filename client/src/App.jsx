import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import Parse from './Parse.js';
import MainReviewPanel from './components/MainReviewPanel.jsx';
import ProductMeta from './components/ProductMeta.jsx';
import AddReviewForm from './components/AddReviewForm.jsx';
import '../dist/style.css'
import Search from './components/Search.jsx';


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
      productList: [],
      sortName: 'relevance',
      filterOn: false,
      starFilter: [],
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
    }
    this.handleMoreReviews = this.handleMoreReviews.bind(this);
    this.handleAddReview = this.handleAddReview.bind(this);
    this.getNewestReviews = this.getNewestReviews.bind(this);
    this.getHelpfulReviews = this.getHelpfulReviews.bind(this);
    this.getRelevantReviews = this.getRelevantReviews.bind(this);
    this.handleClearFilter = this.handleClearFilter.bind(this);
    this.starhelper = this.starhelper.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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
    if(this.state[stars]) {
      this.handleClearFilter(stars)
    } else {
      const newStars = this.state.starFilter
      newStars.push(stars)
      this.setState({[stars]: true})
      this.setState({starFilter: newStars})
      this.getStarReviews()
    }
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
    } 
    if(this.state.sortName === 'newest') {
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
    } 
    if(this.state.sortName === 'helpfulness') {
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

    const element = document.getElementById('reviewPannel')
    element.scrollTop = element.scrollHeight
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

  handleSort(sortedName) {
    console.log(sortedName)
    console.log(this.state.starFilter)
    if(sortedName === 'newest') {
      this.setState({sortName: sortedName})
      if(this.state.starFilter.length === 0) {
        this.getNewestReviews()
      }
    } else if(sortedName === 'relevance') {
      this.setState({sortName: sortedName})
      if(this.state.starFilter.length === 0) {
        this.getRelevantReviews()
      }
    } else if(sortedName === 'helpfulness') {
      this.setState({sortName: sortedName})
      if(this.state.starFilter.length === 0) {
        this.getHelpfulReviews()
      }
    }
    if(this.state.starFilter.length > 0) {
      setTimeout(function() {this.getStarReviews()}.bind(this), 500)
    }
  }

  handleClearFilter(stars) {
    if(stars === undefined) {
      const array = [];
      this.setState({starFilter: array})
      for (var i = 1; i < 6; i++) {
        this.setState({[i]: false})
      }
      this.getRelevantReviews()
    } else {
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
  }

  handleSearch(query) {
    console.log(query)
  }

  render() {
    let clearFiveStar;
    if(this.state[5]) {
      clearFiveStar = <a value={5} onClick={() => this.handleClearFilter(5)}><u>5 Stars</u> &nbsp;</a>
    }

    let clearFourStar;
    if(this.state[4]) {
      clearFourStar = <a value={4} onClick={() => this.handleClearFilter(4)}><u>4 Stars</u> &nbsp;</a>
    }

    let clearThreeStar;
    if(this.state[3]) {
      clearThreeStar = <a value={3} onClick={() => this.handleClearFilter(3)}><u>3 Stars</u> &nbsp;</a>
    }

    let clearTwoStar;
    if(this.state[2]) {
      clearTwoStar = <a value={2} onClick={() => this.handleClearFilter(2)}><u>2 Stars</u> &nbsp;</a>
    }

    let clearOneStar;
    if(this.state[1]) {
      clearOneStar = <a value={1} onClick={() => this.handleClearFilter(1)}><u>1 Star</u> &nbsp;</a>
    }

    let clearAll;
    let filterTitle;
    if(this.state[1] || this.state[2] || this.state[3] || this.state[4] || this.state[5]) {
      clearAll = <a onClick={() => this.handleClearFilter()}>&nbsp;<u>Clear All</u></a>
      filterTitle = <b>Rating Breakdown: &nbsp;</b>
    }

    let numberOfReviews = this.state.numberOfReviews
    let showMoreReviews;
    if(this.state.reviews.length === 0) {
      showMoreReviews = ''
    } else {
      showMoreReviews = <Button id='reviewButton' onClick={this.handleMoreReviews} >MORE REVIEWS </Button>
    } 

    return ( 
      <div>
        <br></br>
        <br></br>
        <Container>
          <Row>
            <Col id='reviewAppHeading'>
              <h3 id='reviewAppHeading'>
                RATINGS & REVIEWS
              </h3>
            </Col>
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
                      <Dropdown.Item onClick={() => this.handleSort('helpfulness')}>
                        Helpfulness
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => this.handleSort('relevance')}>
                        Relevance
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => this.handleSort('newest')}>
                        Newest
                      </Dropdown.Item>
                    </DropdownButton>
                  </Row>
                </Col>
                <Col id='starFilter'>
                  <Row id='starFilter'> 
                    {/* <Search handleSearch={this.handleSearch}/> */}
                  </Row>
                </Col>
              </Row>
              <Row id='starFilter'> 
                <p id='clearFilter'>{filterTitle} {clearFiveStar} {clearFourStar} {clearThreeStar}  {clearTwoStar} {clearOneStar} {clearAll}</p>
              </Row>
              <div id='reviewPannel'></div>
              <div id='reviewPannelBottom'></div>
              <br></br>
              <br></br>
              {showMoreReviews} &nbsp; &nbsp; &nbsp; &nbsp;
              <Button id='reviewButton' onClick={this.handleAddReview}>
                ADD A REVIEW &nbsp;&nbsp; +
              </Button>
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
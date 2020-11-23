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
      starFilter: null,
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
  }

  componentDidMount() {
    Parse.getAllProductList((productList) => {
      this.setState({productList: productList[3].name})
    });
    Parse.getProductMeta((meta) => {
     this.setState({meta: meta})
     ReactDOM.render(<ProductMeta meta={this.state.meta} getStarReviews={this.getStarReviews}/>, document.getElementById('productMeta'))
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

  getStarReviews(stars) {
    Parse.getAllList((data) => {

      this.setState ({starFilterLabel: `${stars} Stars`})

      let reviewArray = data.results;

      let result = [];

      reviewArray.map((review) => {
        if(review.rating === stars) {
          result.push(review)
        }
      })

      this.setState({numberOfReviews: result.length})

      this.setState({filterOn: true})

      let twoReviews = result.splice(0, 2)

      this.setState({reviewsToShow: twoReviews})
      this.setState({reviews: result})

      ReactDOM.unmountComponentAtNode(document.getElementById('reviewPannel'))

      ReactDOM.render(<MainReviewPanel reviews={this.state.reviewsToShow} />, document.getElementById('reviewPannel'))
    })
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

  handleClearFilter() {
    this.setState({filterOn: false})
    this.setState({starFilterLabel: 'All Stars'})
    this.getRelevantReviews()
  }

  render() {
    let clearFilter;
    if(this.state.filterOn) {
      clearFilter = <p id='clearFilter'><u><a onClick={this.handleClearFilter}>Clear Filter</a></u></p>
    } else {
      clearFilter = <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
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
                <Row>
              <h3 id='sortTitle'>{numberOfReviews} {this.state.numberOfReviews === 1 ? 'review' : 'reviews'}, sorted by&nbsp; </h3>
                <DropdownButton id="dropdown-item-button" title={this.state.sortName}>
                  <Dropdown.Item onClick={this.getHelpfulReviews}>Helpfulness</Dropdown.Item>
                  <Dropdown.Item onClick={this.getRelevantReviews}>Relevance</Dropdown.Item>
                  <Dropdown.Item onClick={this.getNewestReviews}>Newest</Dropdown.Item>
                </DropdownButton>
                </Row>
              </Col>
              <Col id='starFilter' xl={4}>
                <Row>
                <p>{clearFilter}</p>
                <DropdownButton id="dropdown-star-button" className='starDropdown' title={this.state.starFilterLabel}>
                  <Dropdown.Item onClick={() => {this.getStarReviews(5)}}><StarRating rating={5} starDimension={15}/></Dropdown.Item>
                  <Dropdown.Item onClick={() => {this.getStarReviews(4)}}><StarRating rating={4} starDimension={15}/></Dropdown.Item>
                  <Dropdown.Item onClick={() => {this.getStarReviews(3)}}><StarRating rating={3} starDimension={15}/></Dropdown.Item>
                  <Dropdown.Item onClick={() => {this.getStarReviews(2)}}><StarRating rating={2} starDimension={15}/></Dropdown.Item>
                  <Dropdown.Item onClick={() => {this.getStarReviews(1)}}><StarRating rating={1} starDimension={15}/></Dropdown.Item>
                  {/* <Dropdown.Item onClick={this.getRelevantReviews}>All Stars</Dropdown.Item> */}
                </DropdownButton>
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
import React from 'react';
import { Row, Col} from 'react-bootstrap';

class starFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: [],
      oneStarOn: false,
      twoStarOn: false,
      threeStarOn: false,
      fourStarOn: false,
      fiveStarOn: false,
    }
  }


  render() {
    let oneStar;
    let twoStar;
    let threeStar;
    let fourStar;
    let fiveStar;
    if(onStarOn) {
      oneStar = <a>X 1 star</a>
    }

    return(
      <Col>
        <Row>
        
        </Row>
      </Col>
    )
  }
}

export default starFilter
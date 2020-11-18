import React from 'react';
import { Container, Col, Row } from 'react-bootstrap'
import ProgressBar from './ProgressBar.jsx'
class Size extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: props.size
    }
  }

  render() {
    return(
      <div>
        <Row id = 'characteristicsTitle'>Size:</Row>
        <Row fluid>
          <ProgressBar width={100} value={(this.state.size * 20)} />
        </Row>
        <Row fluid>
          <Col>
            Too Small
          </Col>
          <Col>
            Slightly Small
          </Col>
          <Col>
            Perfect
          </Col>
          <Col>
            Slightly Big
          </Col>
          <Col>
            Too Big
          </Col>
        </Row>
      </div> 
    )
  }
}

export default Size
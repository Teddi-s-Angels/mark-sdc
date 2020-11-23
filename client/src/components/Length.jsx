import React from 'react';
import { Col, Row } from 'react-bootstrap'
import IconProgress from './IconProgress.jsx'
class Length extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      length: props.length
    }
  }

  render() {
    return(
      <div>
        <Col fluid>
        <Row id = 'characteristicsTitle'>Length:</Row>
        <Row fluid>
          <IconProgress width={100} value={(this.state.length * 20)} />
        </Row>
        <Row fluid id = 'characteristicsLabels'>
          <Col id='characteristicsLeft'>
            Too Short
          </Col>
          <Col id='characteristicsMiddle'>
            Perfect
          </Col>
          <Col id='characteristicsRight'>
            Too Long
          </Col>
        </Row>
        </Col>
      </div> 
    )
  }
}

export default Length
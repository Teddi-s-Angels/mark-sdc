import React from 'react';
import { Col, Row } from 'react-bootstrap'
import IconProgress from './IconProgress.jsx'
class Quality extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quality: props.quality
    }
  }

  render() {
    return(
      <div>
        <Col fluid>
        <Row id = 'characteristicsTitle'>Quality:</Row>
        <Row fluid>
          <IconProgress width={100} value={(this.state.quality * 20)} />
        </Row>
        <Row fluid id = 'characteristicsLabels'>
        <Col id='characteristicsLeft'>
          Poor
          </Col>
          <Col id='characteristicsMiddle'>
            Expected
          </Col>
          <Col id='characteristicsRight'>
            Perfect
          </Col>
        </Row>   
        </Col>
      </div>
    )
  }
}

export default Quality
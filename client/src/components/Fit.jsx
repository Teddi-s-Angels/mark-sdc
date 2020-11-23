import React from 'react';
import { Col, Row } from 'react-bootstrap'
import IconProgress from './IconProgress.jsx'
class Fit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fit: props.fit
    }
  }

  render() {
    return(
      <div>
        <Col fluid>
        <Row id = 'characteristicsTitle'>Fit</Row>
        <Row fluid>
          <IconProgress width={100} value={(this.state.fit * 20)} />
        </Row>
        <Row fluid id = 'characteristicsLabels'>
          <Col id='characteristicsLeft'>
            Too Loose
          </Col>
          <Col id='characteristicsMiddle'>
            Perfect
          </Col>
          <Col id='characteristicsRight'>
            Too Tight
          </Col>
        </Row>
        </Col>
      </div> 
    )
  }
}

export default Fit
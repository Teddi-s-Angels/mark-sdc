import React from 'react';
import { Container, Col, Row } from 'react-bootstrap'
import IconProgress from './IconProgress.jsx'
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
        <Col xl={11}>
        <Row id = 'characteristicsTitle'>Size:</Row>
        <Row fluid>
          <IconProgress width={100} value={(this.state.size * 20)} />
        </Row>
        <Row fluid id = 'characteristicsLabels'>
          <Col id='characteristicsLeft'>
            Too Small
          </Col>
          <Col id='characteristicsMiddle'>
            Perfect
          </Col>
          <Col id='characteristicsRight'>
            Too Big
          </Col>
        </Row>
        </Col>
      </div> 
    )
  }
}

export default Size
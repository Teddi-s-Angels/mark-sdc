import React from 'react';
import { Col, Row } from 'react-bootstrap'
import IconProgress from './IconProgress.jsx'
class Width extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: props.width
    }
  }

  render() {
    return(
      <div>
        <Col xl={11}>
        <Row id = 'characteristicsTitle'>Width:</Row>
        <Row fluid>
          <IconProgress width={100} value={(this.state.width * 20)} />
        </Row>
        <Row fluid>
          <Col>
            Too Tight
          </Col>
          <Col>
            Slightly Tight
          </Col>
          <Col>
            Perfect
          </Col>
          <Col>
            Slightly Wide
          </Col>
          <Col>
            Too Wide
          </Col>
        </Row>
        </Col>
      </div> 
    )
  }
}

export default Width
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
        <Col xl={11}>
        <Row id = 'characteristicsTitle'>Length:</Row>
        <Row fluid>
          <IconProgress width={100} value={(this.state.length * 20)} />
        </Row>
        <Row fluid>
          <Col>
            Too Short
          </Col>
          <Col> 
            Somewhat Short
          </Col>
          <Col>
            Perfect
          </Col>
          <Col>
            Somewhat Long
          </Col>
          <Col>
            Too Long
          </Col>
        </Row>
        </Col>
      </div> 
    )
  }
}

export default Length
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
        <Row id = 'characteristicsTitle'><b>Length:</b></Row>
        <Row fluid>
          <IconProgress width={100} value={(this.state.length * 20)} />
        </Row>
        <Row fluid>
          <Col>
            Runs Short
          </Col>
          <Col>
          <p></p>
          </Col>
          <Col>
            Perfect
          </Col>
          <Col>
          <p></p>
          </Col>
          <Col>
          Runs Long
          </Col>
        </Row>
        </Col>
      </div> 
    )
  }
}

export default Length
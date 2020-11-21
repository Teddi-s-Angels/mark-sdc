import React from 'react';
import { Col, Row } from 'react-bootstrap'
import IconProgress from './IconProgress.jsx'
class Comfort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comfort: props.comfort
    }
  }

  render() {
    return(
      <div>
        <Col fluid>
        <Row id = 'characteristicsTitle'> <b>Comfort:</b>
        </Row>
        <Row fluid>
          <IconProgress width={100} value={(this.state.comfort * 20)} />
        </Row>
        <Row fluid>
          <Col>
          Poor
          </Col>
          <Col>
          <p></p>
          </Col>
          <Col>
            Expected
          </Col>
          <Col>
          <p></p>
          </Col>
          <Col>
            Perfect
          </Col>
        </Row>
        </Col>
      </div> 
    )
  }
}

export default Comfort
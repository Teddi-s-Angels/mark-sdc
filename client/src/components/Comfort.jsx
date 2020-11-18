import React from 'react';
import { Col, Row } from 'react-bootstrap'
import ProgressBar from './ProgressBar.jsx'
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
        <Row id = 'characteristicsTitle'> Comfort:
        </Row>
        <Row fluid>
          <ProgressBar width={100} value={(this.state.comfort * 20)} />
        </Row>
        <Row fluid>
          <Col>
            No Comfort
          </Col>
          <Col>
            Poor Comfort
          </Col>
          <Col>
            Expected Comfort
          </Col>
          <Col>
            Good Comfort
          </Col>
          <Col>
            Perfect Comfort
          </Col>
        </Row>
      </div> 
    )
  }
}

export default Comfort
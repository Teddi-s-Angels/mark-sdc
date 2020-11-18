import React from 'react';
import { Col, Row } from 'react-bootstrap'
import ProgressBar from './ProgressBar.jsx'
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
        <Row id = 'characteristicsTitle'>Fit:</Row>
        <Row fluid>
          <ProgressBar width={100} value={(this.state.fit * 20)} />
        </Row>
        <Row fluid>
          <Col>
            Did Not Fit
          </Col>
          <Col> 
            Somewhat Fit
          </Col>
          <Col>
            As Expected
          </Col>
          <Col>
            Good Fit
          </Col>
          <Col>
            Fit Perfectly
          </Col>
        </Row>
      </div> 
    )
  }
}

export default Fit
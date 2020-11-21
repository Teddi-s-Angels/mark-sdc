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
        <Row id = 'characteristicsTitle'><b>Fit</b></Row>
        <Row fluid>
          <IconProgress width={100} value={(this.state.fit * 20)} />
        </Row>
        <Row fluid>
          <Col>
            Runs Loose
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
            Runs Tight
          </Col>
        </Row>
        </Col>
      </div> 
    )
  }
}

export default Fit
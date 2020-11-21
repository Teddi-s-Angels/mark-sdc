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
        <Col xl={11}>
        <Row id = 'characteristicsTitle'>Fit:</Row>
        <Row fluid>
          <IconProgress width={100} value={(this.state.fit * 20)} />
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
        </Col>
      </div> 
    )
  }
}

export default Fit
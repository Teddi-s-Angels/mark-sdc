import React from 'react';
import { Col, Row } from 'react-bootstrap'
import IconProgress from './IconProgress.jsx'
class Quality extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quality: props.quality
    }
  }

  render() {
    return(
      <div>
        <Col fluid>
        <Row id = 'characteristicsTitle'><b>Quality:</b></Row>
        <Row fluid>
          <IconProgress width={100} value={(this.state.quality * 20)} />
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

export default Quality
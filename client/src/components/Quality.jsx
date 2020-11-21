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
        <Col xl={11}>
        <Row id = 'characteristicsTitle'>Quality:</Row>
        <Row fluid>
          <IconProgress width={100} value={(this.state.quality * 20)} />
        </Row>
        <Row fluid>
          <Col>
            No Quality
          </Col>
          <Col>
            Poor Quality
          </Col>
          <Col>
            Expected  Quality
          </Col>
          <Col>
            Good Quality
          </Col>
          <Col>
            Perfect Quality
          </Col>
        </Row>   
        </Col>
      </div>
    )
  }
}

export default Quality
import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Main from "./sections/main";
import Sidebar from "./sections/sidebar";

class Layout extends React.Component {
  handleClick(eventKey) {
    console.log(eventKey);
  }

  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col sm={4}><Sidebar onItemClick={this.handleClick} /></Col>
          <Col sm={8}><Main /></Col>
        </Row>
      </Container>
    );
  }
}

export default Layout;
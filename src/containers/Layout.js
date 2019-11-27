// Divides the page into different sections.
// Each section is handled by it's own componant.
// Also deals with some state

import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Main from "./sections/main";
import Sidebar from "./sections/sidebar";

class Layout extends React.Component {
  // Runs when a note is clicked in the sidebar
  handleSidebarNoteSelectionClick(eventKey) {
    console.log(eventKey);
  }

  // Splits the screen into one third sidebar and two thirds main
  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col sm={4}><Sidebar onItemClick={this.handleSidebarNoteSelectionClick} /></Col>
          <Col sm={8}><Main /></Col>
        </Row>
      </Container>
    );
  }
}

export default Layout;
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
  constructor(props) {
    super(props);
    this.state = {
      // This varable will be used to store the name of the current note
      currentNote: null,
    }
    // Make sure changeCurrentNote has acess to this object's "this" object
    this.changeCurrentNote = this.changeCurrentNote.bind(this)
  }

  // Runs when a note is clicked in the sidebar
  // Takes the name of a note as a paramiter
  changeCurrentNote(name) {
    this.setState({
      currentNote: name,
    });
  }

  // Splits the screen into one third sidebar and two thirds main
  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col sm={4}>
            <Sidebar
              // When  a note is clicked
              onItemClick={this.changeCurrentNote}
              // When a new note is created or the current one is deleated
              changeCurrentNote={this.changeCurrentNote}
              // The current note
              note={this.state.currentNote}
            />
          </Col>
          
          <Col sm={8}>
            <Main
              // the current note
              note={this.state.currentNote}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Layout;
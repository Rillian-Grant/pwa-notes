import React from "react";

import Editor from "../../componants/editor";
import storage from "../../storage";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

// Icons for the edit/view buttons
import { Edit, Eye } from "react-feather";

// Displayed in the main (left) panal of the view
export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentNote: this.props.note,
            mode: "view", // Can be view or edit
        }
        this.handleSwitchModeClick = this.handleSwitchModeClick.bind(this);
    }

    // This function is called when the props change. The object it returns becomes the new state.
    static getDerivedStateFromProps(nextProps, prevState) {
        // If the note has changed
        if (prevState.currentNote !== nextProps.note || !storage.doesNoteExsist(nextProps.note)) {
            // Change the current note to the new note and switch the mode to view
            // This is needed because the edit object needs to be recreated when the note changes. This function solves that by changing the mode to view meaning that if it was edit ti would now be changed
            return {
                currentNote: nextProps.note,
                mode: "view",
            };
        } else {
            // Do nothing
            return prevState
        }
    }

    // When someone clicks the edit or view button
    handleSwitchModeClick() {
        // Change to opposite mode
        if (this.state.mode !== "view") {
            this.setState({
                mode: "view"
            })
        } else {
            this.setState({
                mode: "edit",
            })
        }
    }

    render() {
        // If there is a note selected and that note exsists
        if (this.props.note != null && storage.doesNoteExsist(this.props.note)) {
            // thing either the editor or the displayed note
            var thing
            if (this.state.mode !== "view") {
                thing = <Editor note={this.props.note}></Editor>
            } else {
                thing = <>{storage.get(this.props.note)}</>
            }

            var switchModeButton
            if (this.state.mode !== "edit") {
                switchModeButton = <Edit size="45" color="green" className="ml-auto" onClick={this.handleSwitchModeClick}></Edit>
            } else {
                switchModeButton = <Eye size="45" color="green" className="ml-auto" onClick={this.handleSwitchModeClick}></Eye>
            }

            return(
                <>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand>{this.props.note}</Navbar.Brand>
                    {switchModeButton}
                </Navbar>

                <Container>
                   {thing}
                </Container>
                </>
            )
        } else {
            // If there is no note selected yet or the selected note does not exsist
            return(
                <h1>Chose or create a note</h1>
            )
        }
    }
}
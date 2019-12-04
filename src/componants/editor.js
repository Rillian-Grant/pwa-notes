// WARNING: This object must be fully recreated when the note changes by, for example, displaying something different after the note changes.

import React from "react";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import storage from "../storage";

// getDerivedStateFromProps to set to new note wont work here because the value state is set from the value of the textbox.
// and editing the textbox contents from getDeriv... may not work because it is currently being rerendered
// What may work is adding a state bool var called stateSourceOfTruth which when true after the object is rerendered then changes the value of the textbox

export default class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Current value of the textbox
            value: storage.get(this.props.note),
            // Name of current note to save to.
            // Is set once on object creation. Object must be recreated to change note
            note: this.props.note
        }
        this.handleChange = this.handleChange.bind(this);
    }

    // Keep this.state.value up to date with the value of the textbox
    handleChange(event) {
        // I dont think you need this because the event is called from the DOM object that contains the value
        //event.persist();
        this.setState({
           value: event.target.value,
        })
        storage.edit(this.state.note, event.target.value);
    }

    render() {
        return(
            <InputGroup>
                <FormControl as="textarea" value={this.state.value} onChange={this.handleChange} placeholder="Start taking notes..." />
            </InputGroup>
        );
    }
}
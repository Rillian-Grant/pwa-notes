// The sidebar

import React from "react";

import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

// An icon module
import { Check, X } from "react-feather";

import storage from "../../storage";

class Sidebar extends React.Component {
    // Create an array of Nav.Link JSX objects (the list) with contents being the title of the notes aquired from storage.js
    itemList() {
        // Turns an array of names into an array of JSX Item ojects that contain the names
        return (storage.getList().map((value, index, array) => {
            // Nav.Link is a bootstrap object
            // eventKey needs to be unique. I set it to the name of the note
            // onClick is a function that calls another function that was passed down from Layout.js. This enables us to pass it the titleof the note that this menu item is about because the arrow syntax outer function is ddefined here and therefore has acess to this classe's varables which it can then pass to the function from Layout.js.
            return (
            <>
                <Nav.Link
                    eventKey={value}
                    onClick={() => {this.props.onItemClick(value)}}
                    // If this note is the current note (defined by Layout) add the class active
                    className={(value === this.props.note) ? "active" : ""}
                >
                    {value}
                </Nav.Link>
            </>
            );
        }));
    }

    render() {
        return(
            <div id="list">
                <Nav className="flex-column" fill variant="pills">
                    <AddNewButton
                        // Define a simple callback
                        callback={value => {
                            storage.put(value, "");
                            this.props.changeCurrentNote(value);
                        }}
                    >
                    </AddNewButton>
                    <hr />
                    {this.itemList()}
                </Nav>
            </div>
        );
    }
}

// Creates a button. When it is clicked it becomes a text box. When enter is pressed or onSubmit is otherwise triggered for the text box the callback prop is called with the value.
// Takes callback function as a prop in the form function(value)
class AddNewButton extends React.Component {
    // Add internal varables
    constructor(props) {
        super(props);
        this.state = {
            // Possible modes: textbox, textbox-disabled, button/anything else
            mode: "button",
            // True if the current value of #textbox is bad. It starts as true because "" is bad.
            badName: true,
        };

        // .bind(value) copies it's parent function and returns a copy of it with it's this keyward set to value
        // You need to do this because the function is called outside the context of this class because the function was passed
        // onEvent={function} needs this. onEvent{() => function()} does not because the function was called here. You can tell because function() instead of just function
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    buttonClick() {
        this.setState({
            // Change mode to textbox and make sure that it's value is ""
            mode: "textbox",
            value: "",
            // True if the current value of #textbox is bad. It starts as true because "" is bad.
            badName: true,
        });
    }

    // Called by onSubmit event
    handleSubmit(event) {
        // Don't do the standard GET request that usually happens when trigger onSubmit (by pressing Enter)
        event.preventDefault();
        // Makes react give me the full event object.
        // If I didn't do this event.target would be null. This is a menory saving feature.
        event.persist();

        // this event is on the form object which contains the textbox so you need to find a child of it that has the tag textbox
        const name = event.target.querySelector("#textbox").value;
        
        // Only continue if the entered note name is not a bad note name
        if (!storage.badNoteName(name)) {
            // Disable the text box while the callback is doing it's thing
            this.setState({
                mode: "textbox-disabled",
            });
            // Callback
            this.props.callback(name)
            // Reset to the starting state
            this.setState({
                mode: "button",
            });
        }
    }

    // When the contents of the textbox changes
    handleChange(event) {
        event.persist();
        // This event is on the textbox so you can find it's value directly
        // Checks to see if the value is good or bad
        if (storage.badNoteName(event.target.value)) {
            this.setState({
                badName: true,
            });
        } else {
            this.setState({
                badName: false,
            });
        }
    }

    // When the mouse clicks outside the textbox or you switch windows then this object goes back to being a button
    handleBlur() {
        this.setState({
            mode: "button",
        });
    }

    // Every time this componant changes check to see if the button has class active and remove it
    // PROBLEM: can't put id= on Nav.Link have to encase in a div.
    // PROBLEM: Is there a better way.
    componentDidUpdate() {
        if (document.getElementById("_buttonNew") != null) {
            document.getElementById("_buttonNew").children[0].classList.remove("active")
        }
    }

    render() {
        // popover discribing the naming requirements. It is displayed when the name is bad.
        const namingRequirementsPopover = (
            <Popover id="popover-basic">
              <Popover.Title as="h3">Naming requirements</Popover.Title>
              <Popover.Content>
                The name of the new note must be unique and not be comprised entierly of whitespace
              </Popover.Content>
            </Popover>
        );

        if (this.state.mode === "textbox" || this.state.mode === "textbox-disabled") {
            return(
                <Nav.Item
                    // Make this a form html object with Nav.Item classes
                    as="form"
                    onSubmit={this.handleSubmit}
                >
                    <InputGroup className="mb-3">
                        <Form.Control
                            // So that it can be easily found
                            id="textbox"
                            type="text"
                           placeholder="New note"
                            autoFocus
                            // If disabled disabled=true
                            disabled={(this.state.mode === "textbox-disabled")}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                        />
                        
                        {this.state.badName
                            // If badName has been set to true by handleChange..
                            ? <OverlayTrigger
                                // Dsiplay the popover to the right of the content contained within OverlayTrigger
                                placement="right"
                                // The popover html (defined above)
                                overlay={namingRequirementsPopover}
                                // No event set as the default is hover
                              >
                                <X
                                    // red X icon
                                    color="red"
                                    size="45"
                                />
                              </OverlayTrigger>
                            // Else...
                            : <Check
                                // Green check with no popover
                                color="green"
                                size="45"
                              />
                        }
                    </InputGroup>
                </Nav.Item>
            );
        } else {
            return(
                // This div's only purpose is to be found via the id. The componentDidUpdate function uses this.
                <div id="_buttonNew">
                <Nav.Link
                    // Under score for stuff not generated by a for loop or similar
                    eventKey="_new"
                    onClick={() => {this.buttonClick()}}
                >
                    New note
                </Nav.Link>
                </div>
            );
        }
    }
}

export default Sidebar;
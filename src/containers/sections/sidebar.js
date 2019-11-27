// The sidebar

import React from "react";

import Nav from "react-bootstrap/Nav";

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
                    {this.itemList()}
                </Nav>
            </div>
        );
    }
}

export default Sidebar;
import React from "react";

import Nav from "react-bootstrap/Nav";

import storage from "../../storage";

class Sidebar extends React.Component {
    itemList() {
        return (storage.getList().map((value, index, array) => {
            return (
            <>
                <Item title={value} eventKey={value} onClick={this.props.onItemClick} />
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

/* export default () => {
    return (
        <Nav defaultActiveKey="/home" className="flex-column" fill variant="pills">
            <Item title="Hi"></Item>
            <Item title="Bye"></Item>
        </Nav>
    );
}*/

const Item = (props) => {
    return (
        <>
            <Nav.Link eventKey={props.eventKey} onClick={() => {props.onClick(props.title)}}>{props.title}</Nav.Link>
        </>
    );
}

export default Sidebar;
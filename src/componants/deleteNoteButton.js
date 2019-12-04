import React from "react";

import { Trash2 } from "react-feather";
import storage from "../storage";

export default class DeleteNoteButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "grey",
        }
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleMouseOver(){
        this.setState({
            color: "red",
        })
    }

    handleMouseOut(){
        this.setState({
            color: "grey",
        })
    }

    handleClick() {
        storage.deleteNote(this.props.note)
    }

    render() {
        return (
            <div
                alt={this.props.note}
            >
                <Trash2
                    size="25"
                    color={this.state.color}
                    onMouseOver={this.handleMouseOver}
                    onMouseOut={this.handleMouseOut}
                    onClick={this.handleClick}
                ></Trash2>
            </div>
        )
    }
}
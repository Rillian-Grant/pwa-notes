import React from "react";

import Showdown from "showdown";

import storage from "../storage";

export default props => {
    var converter = new Showdown.Converter({noHeaderId: true});
    var md = storage.get(props.note);
    var html = converter.makeHtml(md)

    return(
        <div dangerouslySetInnerHTML={{__html: html}}></div>
    )
}
import * as React from "react"
import * as ReactDOM from "react-dom"
import BaseComponent from "./BaseComponent"
import SingleHexNoteNames from "./SingleHexNoteNames"
import SingleHex from "./SingleHex"

// 
// ReactDOM.render(React.createElement(BaseComponent, null), document.getElementById('pocket'))
ReactDOM.render(React.createElement(SingleHexNoteNames, null), document.getElementById('pocket'))
ReactDOM.render(React.createElement(SingleHex, null), document.getElementById('pocket2'))

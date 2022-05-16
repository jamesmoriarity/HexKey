import * as React from "react"
import * as ReactDOM from "react-dom"
import BaseComponent from "./BaseComponent"
import SingleHexNoteNames from "./SingleHexNoteNames"
import SingleHex from "./SingleHex"
import PositionInKey from "./PositionInKey"

ReactDOM.render(
    React.createElement(SingleHex, null), document.getElementById('pocket0'))
ReactDOM.render(
    React.createElement(SingleHexNoteNames, null), document.getElementById('pocket1'))
ReactDOM.render(
    React.createElement(PositionInKey, null), document.getElementById('pocket2'))

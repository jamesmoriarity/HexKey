import * as React from "react"
import * as ReactDOM from "react-dom"
import SingleHexNoteNamesMulti from "./SingleHexNoteNamesMulti"
import SingleHexMulti from "./SingleHexMulti"
import PositionInKey from "./PositionInKey"
import KeyBuilder from "./KeyBuilder"

ReactDOM.render(
    React.createElement(SingleHexMulti, null), document.getElementById('pocket0'))
ReactDOM.render(
    React.createElement(SingleHexNoteNamesMulti, null), document.getElementById('pocket1'))
ReactDOM.render(
    React.createElement(PositionInKey, null), document.getElementById('pocket2'))
ReactDOM.render(
    React.createElement(KeyBuilder, null), document.getElementById('pocket3'))
    
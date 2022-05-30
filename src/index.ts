import * as React from "react"
import * as ReactDOM from "react-dom"
import SingleHexNoteNamesMulti from "./SingleHexNoteNamesMulti"
import SingleHexMulti from "./SingleHexMulti"
import SingleHexFreestyle from "./SingleHexFreestyle"
import PositionInKey from "./PositionInKey"
import KeyBuilder from "./KeyBuilder"
import { Angles } from "./Angles"

ReactDOM.render(
    React.createElement(SingleHexMulti, null), document.getElementById('pocket0'))
    ReactDOM.render(
        React.createElement(SingleHexFreestyle, null), document.getElementById('pocket1'))
ReactDOM.render(
    React.createElement(SingleHexNoteNamesMulti, null), document.getElementById('pocket2'))
ReactDOM.render(
    React.createElement(PositionInKey, null), document.getElementById('pocket3'))
ReactDOM.render(
    React.createElement(KeyBuilder, null), document.getElementById('pocket4'))


    console.log(Angles.getAngleFromPoints(10,10, 0,0))
    
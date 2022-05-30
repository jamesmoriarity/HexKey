import React from "react"
import { HexIntervalArrow } from "./HexIntervalArrow"
import HexKey, { HexKeyProps, PositionState } from "./HexKey"
import { HexNode } from "./HexNode"
import { Music } from "./Music"


export class HexKeyHelperArrows extends HexKey {
    props!:HexKeyProps
    constructor(props:HexKeyProps){
        super(props);
        this.width = 100
        this.height = 100
    }
    getArrows = () => {
        console.log('getArrows')
        let arrows:JSX.Element[] = []
        for(let i = 0; i < 7; i++){
            arrows.push(<HexIntervalArrow position={i} key={i}/>)
        }
        return arrows
    }
    getClassName = () => {
        return 'hexkey helper arrows'
    }
    getLabels = ():JSX.Element => {
        return <g className="interval-labels">
                    <text className="interval-label one-two">2</text>
                    <text className="interval-label two-three">2</text>
                    <text className="interval-label three-four">1</text>
                    <text className="interval-label four-five">2</text>
                    <text className="interval-label five-six">2</text>
                    <text className="interval-label six-seven">2</text>
                    <text className="interval-label seven-one">1</text>
                </g>
    }
    getHexNodes = () => {
        let nodes:JSX.Element[] = []
        this.props.positionStates.forEach((displayState:PositionState, index:number)=>{
            let node:JSX.Element = <HexNode   
                                    displayState = {new PositionState(true, true, false, PositionState.LABELTYPE_NOTENAME) }
                                    onClick={()=>{}} 
                                    position={index} 
                                    rootNote={Music.getKeyScale(this.props.tonic)[index]} 
                                    key={index}/>
            // this key attribute is not a musical key, its a unique identifier
            nodes.push(node)
        })
        return nodes
    }
}

export default HexKeyHelperArrows
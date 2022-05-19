import React from "react"
import { HexNode } from "./HexNode"
import { Music } from "./Music"
export class PositionState{
    static LABELTYPE_NUMBER:number = 0
    static LABELTYPE_NOTENAME:number = 1
    static LABELTYPE_QUESTION:number = 2
    hilite:boolean 
    hiliteSelected:boolean
    labelDisplay:boolean
    labelType:number
    constructor(hilite:boolean, hiliteSelected:boolean, labelDisplay:boolean, labelType:number){
        this.hilite = hilite
        this.hiliteSelected = hiliteSelected
        this.labelDisplay = labelDisplay
        this.labelType = labelType
    }
}
export interface HexKeyProps{
    tonic:number
    positionStates:PositionState[]
    onPositionClick:Function
    completed:boolean | null
}

export class HexKey extends React.Component {
    props!:HexKeyProps
    constructor(props:HexKeyProps){
        super(props);
    }
    componentDidUpdate = () => {
        console.log('componentDidUpdate')
    }
    getHexNodes = () => {
        let nodes:JSX.Element[] = []
        this.props.positionStates.forEach((displayState:PositionState, index:number)=>{
            let node:JSX.Element = <HexNode   
                                    displayState={displayState} 
                                    onClick={this.props.onPositionClick} 
                                    position={index} 
                                    rootNote={Music.getKeyScale(this.props.tonic)[index]} 
                                    key={index}/>
            // this key attribute is not a musical key, its a unique identifier
            nodes.push(node)
        })
        return nodes
    }
    getPoints = () => {
        return "0 -10, 8.66 -5, 8.66 5, 0 10, -8.66 5, -8.66 -5"
      }
    getOutlineClassName = () => {
        let className:string = 'outline'
        let modifier:string = (this.props.completed) ? ' completed' : ''
        return (className + modifier)
    }
    render = () => {
        return  <svg className="hexkey" width="300" height="300" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <g className="hex00">
                    <polygon className={this.getOutlineClassName()} 
                        points={this.getPoints()}
                        />
                    <g className="nodes">{this.getHexNodes()}</g>
                    </g>
                </svg>
    }
}

export default HexKey
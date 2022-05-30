import React from "react"
import { HexIntervalArrow } from "./HexIntervalArrow"
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
    activeArrows:number[]
    completed:boolean | null
}

export class HexKey extends React.Component {
    props!:HexKeyProps
    width:number
    height:number
    constructor(props:HexKeyProps){
        super(props);
        this.width = 300
        this.height = 300
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
    getArrows = () => {
        return this.props.activeArrows.map((position:number) =>{
            return <HexIntervalArrow position={position} key={position}/>
        })
    }
    getClassName = () => {
        return 'hexkey'
    }
    getLabels = (): null | JSX.Element => {
        return null
    }
    render = () => {
        return  <svg className={this.getClassName()} width={this.width} height={this.height} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <g className="hex00">
                        <polygon className={this.getOutlineClassName()} 
                            points={this.getPoints()}
                            />
                        <g className="interval-labels">{this.getLabels()}</g>
                        <g className="interval-arrows">
                            {this.getArrows()}
                        </g>
                        <g className="nodes">{this.getHexNodes()}</g>
                    </g>
                </svg>
    }
}

export default HexKey
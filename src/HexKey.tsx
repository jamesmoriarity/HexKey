import React from "react"
import { HexNode } from "./HexNode"
import { Music } from "./Music"
export class PositionState{
    static LABELTYPE_NUMBER:number = 0
    static LABELTYPE_NOTENAME:number = 1
    hilite:boolean 
    labelDisplay:boolean
    labelType:number
    constructor(hilite:boolean, labelDisplay:boolean, labelType:number){
        this.hilite = hilite
        this.labelDisplay = labelDisplay
        this.labelType = labelType
    }
}
export interface HexKeyProps{
    tonic:number
    positionStates:PositionState[]
    onPositionClick:Function
}
export class HexKeyState{
    tonic:number
    scale:number[]
    constructor(props:HexKeyProps){
        this.tonic = props.tonic
        this.scale = Music.getKeyScale(this.tonic)
    }
}
export class HexKey extends React.Component {
    props!:HexKeyProps
    state:HexKeyState
    constructor(props:HexKeyProps){
        super(props);
        this.state = new HexKeyState(this.props)
    }
    getHexNodes = () => {
        let nodes:JSX.Element[] = []
        this.props.positionStates.forEach((displayState:PositionState, index:number)=>{
            console.log('displayState', displayState)
            let node:JSX.Element = <HexNode   
                                    displayState={displayState} 
                                    onClick={this.props.onPositionClick} 
                                    position={index} 
                                    rootNote={this.state.scale[index]} 
                                    key={index}/>
            // this key attribute is not a musical key, its a unique identifier
            nodes.push(node)
        })
        return nodes
    }
    getPoints = () => {
        return "0 -10, 8.66 -5, 8.66 5, 0 10, -8.66 5, -8.66 -5"
      }
    render = () => {
        return  <svg className="hexkey" width="300" height="300" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <g className="hex00">
                    <polygon className="outline" 
                        points={this.getPoints()}
                        />
                    <g className="nodes">{this.getHexNodes()}</g>
                    </g>
                </svg>
    }
}

export default HexKey

  /*
    <HexKey tonic={index} displayStates={displayState[]} onClick
  */
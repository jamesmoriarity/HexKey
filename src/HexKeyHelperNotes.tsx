import React from "react"
import { HexIntervalArrow } from "./HexIntervalArrow"
import HexKey, { HexKeyProps, PositionState } from "./HexKey"
import { HexNode } from "./HexNode"
import { Music } from "./Music"


export class HexKeyHelperNotes extends HexKey {
    props!:HexKeyProps
    constructor(props:HexKeyProps){
        super(props);
        this.width = 100
        this.height = 100
    }
    getClassName = () => {
        return 'hexkey'
    }
    getHexNodes = () => {
        let nodes:JSX.Element[] = []
        this.props.positionStates.forEach((displayState:PositionState, index:number)=>{
            let node:JSX.Element = <HexNode   
                                    displayState = {new PositionState(true, true, true, PositionState.LABELTYPE_NOTENAME) }
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

export default HexKeyHelperNotes
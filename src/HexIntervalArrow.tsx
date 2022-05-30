import React from "react"
import { ReactNode } from "react"
import { HexNodeNames } from "./HexNode"
export interface HexIntervalArrowProps{
    position:number
}
export class HexIntervalArrow extends React.Component{
    props!:HexIntervalArrowProps
    shaftLength:number
    shaftWidth:number
    constructor(props:HexIntervalArrowProps){
        super(props)
        this.shaftLength =  9
        if(this.props.position === 3) this.shaftLength = 19
        this.shaftWidth = 0.6
    }
    getShaftPoints = () => {
        return [0,0, this.shaftLength,0, this.shaftLength, this.shaftWidth, 0, this.shaftWidth].join()
    }
    getClassPositionName = () => {
        let starter:string = "interval-arrow node "
        return starter + HexNodeNames.asStrings[this.props.position]
    }
    render(): ReactNode {
        return <g className={this.getClassPositionName()}>
                    <g className="interval-arrow-inner">
                        <polygon className="interval-arrow-head" points="0,1,2,0,2,2" />
                        <polygon className="interval-arrow-shaft" points={this.getShaftPoints()}/>
                    </g>
                </g>
    }
}
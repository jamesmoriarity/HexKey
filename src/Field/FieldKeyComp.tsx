import React, { MouseEventHandler } from "react";
import { HexKey } from "../HexKey";
import { FieldKey } from "./FieldKey";
export class FieldKeyComp extends React.Component{
    props!:FieldKey
    state:any
    constructor(props:FieldKey){
        super(props)
        this.state = {visible:false}
    }
    getTransform = () => {
        let x:number = this.props.origin.x
        let y:number = this.props.origin.y
        let t = 'translate(' + x + ' ' + y + ')'
        return t
    }
    componentDidMount(){
        this.show()
        // setTimeout(()=>{this.show()}, (this.props.index * 100) + (this.props.index)/(this.props.index * this.props.index))
    }
    show = () => {
        this.setState({visible:true})
    }
    getIndex = () => {
    }   
    getPointArray = () => {
        let r:number = this.props.parentField.props.radius
        let w:number = r * .866
        let posA:number[] = [0, -1 * r]
        let posB:number[] = [w, -0.5 * r]
        let posC:number[] = [w, 0.5 * r]
        let posD:number[] = [0, r]
        let posE:number[] = [-1 * w, 0.5 * r]
        let posF:number[] = [-1 * w, -0.5 * r]
        return[posA, posB, posC, posD, posE, posF]
    } 
    getPoints = () => {
        let points:number[][] = this.getPointArray()
        return [points[0].join(' '), points[1].join(' '), points[2].join(' '), points[3].join(' '), points[4].join(' '), points[5].join(' ')].join(',')
    }
    onClick = (e:any)=>{
        this.props.onKeyClick()
    }
    getLabel = () => {
        if(this.props.active){
            return null
        }
        return <text className="field-key-label">{this.props._note}</text>
    }
    getClassName = () => {
        return "field-hexagon "  + ((this.props.active) ? ' active' : '')
    }
    render(){
        if(this.state.visible === false || !this.props.display){return null}
        return  <g transform={this.getTransform()}>
                    <polygon onClick={this.onClick} className={this.getClassName()} 
                            points={this.getPoints()}
                            />
                    {this.getLabel()}
                </g>
    }
}
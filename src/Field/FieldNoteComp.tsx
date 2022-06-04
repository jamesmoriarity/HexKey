import React from "react";
import { Coordinates } from "../Coordinates";
import { HexKey } from "../HexKey";
import { FieldKey } from "./FieldKey";
import { FieldNote } from "./FieldNote";
// origin keys notename
export interface FieldNoteCompProps{
    origin:Coordinates
    parentKeys:(FieldKey | null)[]
    noteName:string
}
export class FieldNoteComp extends React.Component{
    props!:FieldNoteCompProps
    state:any
    constructor(props:FieldNoteCompProps){
        super(props)
        this.state = {visible:true, triangle:true}
    }
    getTransform = () => {
        let x:number = this.props.origin.x
        let y:number = this.props.origin.y
        let t = 'translate(' + x + ' ' + y + ')'
        return t
    }
    getTriangleCoordinates = ():Coordinates[] => {
        // if it has all three keys then it's the origin of those three keys
        let points:Coordinates[] = []
        this.props.parentKeys.forEach((parentKey:FieldKey | null, index:number)=>{
            if(parentKey !== null){
                points.push(parentKey.origin)
            }
        })
        return points
    }
    getTrianglePoints = ():string | null => {
        let points:Coordinates[] = this.getTriangleCoordinates()
        if(points.length <  3){return null}
        let stringPoints:string[] = points.map((coords:Coordinates)=>{
            return coords.toStringPoints()
        })
        return stringPoints.join(',')
    }
    componentDidMount(){
        console.log('componentdidmount', this.getTrianglePoints())
        //this.show()
        // setTimeout(()=>{this.show()}, (this.props.index * 100) + (this.props.index)/(this.props.index * this.props.index))
    }
    componentDidUpdate(){
        // this.show()
    }
    shouldShow = ():boolean => {
        let isActive:boolean = false
        this.props.parentKeys.forEach((key:FieldKey | null, index:number)=>{
            if(key && key.display && key.active){
                isActive = true
            }
        })
        return isActive
    }  
    getTriangle = () => {
        if(!this.state.triangle){return null}
        let points:string | null = this.getTrianglePoints()
        if(points === null){return null}
        let className:string = 'field-note-triangle ' + this.props.noteName
        return <polygon className={className} points={points}/>
    }
    getCircleClassName = () => {
        return "field-note-circle " + this.props.noteName
    }
    onClick = () => {
        this.setState({triangle:!this.state.triangle})
    }
    render(){
        if(!this.shouldShow()){return null}

        return  <g className='field-note'>
                   <g> {this.getTriangle()} </g>
{                    <g transform={this.getTransform()}>
{/*                         <circle onClick={this.onClick} className={this.getCircleClassName()} r={10} cy={0} cx={0}/>
                        <text className="field-note-name">{this.props.noteName}</text> */}
                    </g>}
                </g>
    }
}
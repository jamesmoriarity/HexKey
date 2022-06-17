import React from "react";
import { Coordinates } from "../Coordinates";
import { HexKey } from "../HexKey";
import { FieldKey } from "./FieldKey";
import { FieldNote } from "./FieldNote";
// origin keys notename
export class FieldNoteComp extends React.Component{
    props!:FieldNote
    constructor(props:FieldNote){
        super(props)
    }
    toggleSelected = () => {
        this.props.parentField.toggleSelectOfNote(this.props)
    }
    getTransform = () => {
        let x:number = this.props.origin.x
        let y:number = this.props.origin.y
        let t = 'translate(' + x + ' ' + y + ')'
        return t
    }

    componentDidMount(){}
    componentDidUpdate(){}
    shouldShow = ():boolean => {
        let activeKeys:(FieldKey | null)[] = this.props.getParentKeys().filter((key:FieldKey|null)=>{
            console.log('active', key?.active)
            return (key !== null && key !== undefined && key.active === true)
        })
        console.log('activeKeys.length', activeKeys.length)
        let show:boolean = (activeKeys.length > 0)
        console.log('show', show)
        return show
    }
    getTriangle = (): JSX.Element | null => {
        console.log('getTriangle base')
        return null
    }
    getCircleClassName = () => {
        return "field-note-circle " + ((this.props.selected) ? this.props._noteName : '')
    }
    onClick = () => {
        this.toggleSelected()
    }
    getPetals = ():JSX.Element | null => {
        return  null
    }
    buildPetalPointString = (c1:Coordinates,c2:Coordinates,c3:Coordinates,c4:Coordinates, ) => {
        return [c1.toStringPoints(), c2.toStringPoints(), c3.toStringPoints(), c4.toStringPoints()].join(',')
    }
    getPetalSelectedClass = (position:number) => {
        return (this.props.petalStates[position].selected) ? 'selected' : 'unselected'
    }
    onPetalClick = (position:number) => {
        console.log('onPetalClick')
        this.props.parentField.toggleSelectOfNotePetal(this.props, position)
    }
    makePetal = (points:string, mode:string, position:number) => {
        let classNames:string[] = ['petal', mode, this.props._noteName, this.getPetalSelectedClass(position)]
        let className:string =classNames.join(' ')
        if(this.props.selected && this.props.getParentKeys()[position]?.active){ 
            return <g className={className}><polygon onClick={(e)=>{this.onPetalClick(position)}} points={points}/></g>
        }
        return null   
    }
    getRadius = () => {
        return this.props.parentField.props.radius
    }
    getLabel = () => {
        if(this.props.displayType === FieldNote.displayType_Note) return this.props._noteName
        if(this.props.displayType === FieldNote.displayType_Number) return this.props.index 
    }
    render(){
        if(!this.shouldShow()){return null}

        return  <>
                    <g className='field-note'>
                        <g> {this.getPetals()}</g>
                        <g transform={this.getTransform()}>
                            <circle onClick={this.onClick} className={this.getCircleClassName()} r={this.getRadius()/4} cy={0} cx={0}/>
                            <text className="field-note-name">{this.props._noteName}</text>
                        </g>
                    </g>
                </>
    }
}

export class FieldNoteCompEven extends FieldNoteComp{
    getDorianPoint = () => {  
        let x:number = this.props.origin.x - (this.getRadius() * .866)
        let y:number = this.props.origin.y + (this.getRadius()/2)
        return new Coordinates(x,y)
    }
    getLydianPoint = () => {  
        let x:number = this.props.origin.x + (this.getRadius() * .866)
        let y:number = this.props.origin.y + (this.getRadius()/2)
        return new Coordinates(x,y)
    }
    getAeolianPoint = () => {  
        let x:number = this.props.origin.x
        let y:number = this.props.origin.y - this.getRadius()
        return new Coordinates(x,y)
    }
    constructor(props:FieldNote){
        super(props)
    }
    getPetals = ():JSX.Element | null => {
        let d:Coordinates = this.getDorianPoint()
        let l:Coordinates = this.getLydianPoint()
        let a:Coordinates = this.getAeolianPoint()
        let dl:Coordinates = new Coordinates((d.x + l.x)/2, (d.y + l.y)/2)
        let la:Coordinates = new Coordinates((l.x + a.x)/2, (l.y + a.y)/2)
        let ad:Coordinates = new Coordinates((a.x + d.x)/2, (a.y + d.y)/2)
        let c:Coordinates = this.props.origin
        let dorPoints = this.buildPetalPointString(c, ad, d, dl)
        let lydPoints = this.buildPetalPointString(c, la, l, dl)
        let aeoPoints = this.buildPetalPointString(c, ad, a, la)
        return  <>
                    {this.makePetal(dorPoints, 'dorian', 0)}
                    {this.makePetal(lydPoints, 'lydian', 1)}
                    {this.makePetal(aeoPoints, 'aeolian', 2)}
                </>
    }
}

export class FieldNoteCompOdd extends FieldNoteComp{
    getIonianPoint = () => { 
        let x:number = this.props.origin.x
        let y:number = this.props.origin.y + this.getRadius()
        return new Coordinates(x,y)
    }
    getPhrygianPoint = () => {  
        let x:number = this.props.origin.x - (this.getRadius() * .866)
        let y:number = this.props.origin.y - (this.getRadius()/2)
        return new Coordinates(x,y)
    }
    getMixolydianPoint = () => {  
        let x:number = this.props.origin.x + (this.getRadius() * .866)
        let y:number = this.props.origin.y - (this.getRadius()/2)
        return new Coordinates(x,y)
    }
    getPetals = ():JSX.Element | null => { 
        if(!this.props.selected){return null}
        let i:Coordinates = this.getIonianPoint()
        let p:Coordinates = this.getPhrygianPoint()
        let m:Coordinates = this.getMixolydianPoint()
        let ip:Coordinates = new Coordinates((i.x + p.x)/2, (i.y + p.y)/2)
        let im:Coordinates = new Coordinates((i.x + m.x)/2, (i.y + m.y)/2)
        let pm:Coordinates = new Coordinates((p.x + m.x)/2, (p.y + m.y)/2)
        let c:Coordinates = this.props.origin

        let ioPoints = this.buildPetalPointString(c, ip, i, im)
        let phPoints = this.buildPetalPointString(c, pm, p, ip)
        let mxPoints = this.buildPetalPointString(c, im, m, pm) 
        return  <>
                    {this.makePetal(ioPoints, 'ionian', 0)}
                    {this.makePetal(phPoints, 'phrygian', 1)}
                    {this.makePetal(mxPoints, 'mixolydian', 2)}
                </>
    }
    constructor(props:FieldNote){
        super(props)
    }
}

export class FieldNoteCompSeventh extends FieldNoteComp{
    getLocrianKey = () => { return this.props.getParentKeys()[0]}
    constructor(props:FieldNote){
        super(props)
    }
}


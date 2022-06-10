import React from "react";
import { Coordinates } from "../Coordinates";
import { FieldKey } from "./FieldKey";
import { FieldKeyComp } from "./FieldKeyComp";
import { FieldNote } from "./FieldNote";
import { FieldNoteComp, FieldNoteCompEven, FieldNoteCompOdd, FieldNoteCompSeventh } from "./FieldNoteComp";
export interface FieldProps{
    radius:number
    bounds:number[]
}
class FieldState{
    keys:FieldKey[]
    notes:FieldNote[]
    currentKeyIndex:number
    currentNoteIndex:number
    constructor(){
        this.keys = []
        this.notes = []
        this.currentKeyIndex = -1
        this.currentNoteIndex = -1
    }
}
export class Field extends React.Component{
    props!:FieldProps
    state:FieldState
    keyLimit:number
    origin:Coordinates
    rowLimit:number
    columnLimit:number
    constructor(props:FieldProps){
        super(props)
        this.state = new FieldState()
        this.keyLimit = 2096
        this.rowLimit = 3
        this.columnLimit = 5
        this.origin = new Coordinates(100,50)
        this.build()
    }
    componentDidMount(){
        this.showKeys()
    }

    showKeys = () => {
        let newKeys:FieldKey[] = [...this.state.keys]
/*         newKeys[0].display = true
        newKeys[1].display = true
        newKeys[2].display = true
        newKeys[3].display = true
        newKeys[4].display = true
        newKeys[5].display = true
        newKeys[6].display = true
        newKeys[7].display = true
        newKeys[8].display = true
        newKeys[9].display = true
        newKeys[12].display = true
        newKeys[13].display = true */
        // newKeys[14].display = true
        this.setState({keys:newKeys})
    }
    build = () => {
        this.buildInitialKey()
        this.expandKeys()
    }
    buildInitialKey = () => {
        const tonic:number = 3
        const radius:number = this.props.radius
        const seedNotes:FieldNote[] = []
        const positions:number[] = []
        const origin:Coordinates = this.origin
        const parentField:Field = this
        let key:FieldKey = new FieldKey(parentField, tonic, origin, radius, seedNotes, positions, 0)
        this.state.keys.push(key)
    }
    expandKeys = () => {
        this.state.keys.forEach((key:FieldKey, index:number) => {
            key.expand()
        })
    }
    atLimit = () => {
        return (this.state.keys.length >= this.keyLimit)
    }
    coordinatesMatch = (c1:Coordinates, c2:Coordinates) => {
        let diffX:number = Math.abs(c1.x - c2.x)
        let diffY:number = Math.abs(c1.y - c2.y)
        return (diffY < 2 && diffX < 2)
    }
    getExistingNote = (origin:Coordinates) => {
        let matchingNotes:FieldNote[] = this.state.notes.filter((note:FieldNote, index:number)=>{
            return (this.coordinatesMatch(origin, note.origin))
        })
        if(matchingNotes.length > 0){
            return matchingNotes[0]
        }
        return null
    }
    toggleSelectOfNote = (note:FieldNote) => {
        let exNote:FieldNote | null = this.getExistingNote(note.origin)
        if(exNote !== null){
            exNote.selected = !exNote.selected
            let newNotes:FieldNote[] = [...this.state.notes]
            this.setState({notes:newNotes})
        }
    }
    toggleSelectOfNotePetal = (note:FieldNote, position:number) => {
        console.log('toggleSelectOfNotePetal')
        let exNote:FieldNote | null = this.getExistingNote(note.origin)
        if(exNote !== null){
            console.log('exNote not null')
            exNote.petalStates[position].selected = !exNote.petalStates[position].selected
            let newNotes:FieldNote[] = [...this.state.notes]
            this.setState({notes:newNotes})
        }
    }
    buildNote = (key:FieldKey, keyPosition:number):FieldNote => {
        let note:FieldNote =  new FieldNote([key], [keyPosition], this)
        let existingNote:FieldNote | null = this.getExistingNote(note.origin)
        if(existingNote){ // use existing note
            existingNote.keys.set(keyPosition, key)
            return existingNote
        }
        else{ // use the new note
            note.keys.set(keyPosition, key)
            this.state.notes.push(note)
            this.onKeyNoteBuilt(note)
            return note
        }
    }
    onNeighborKeysBuilt = () => {
        this.expandKeys()
    }
    hasEnoughOfKey = (tonic:number) => {
        let matchingKeys:FieldKey[] = this.state.keys.filter((key:FieldKey, index:number)=>{
            return tonic === key.tonic
        })
        return (matchingKeys.length > 500)
    }
    getExistingKey = (tonic:number, coordinates:Coordinates) => {
        let matchingKeys:FieldKey[] = this.state.keys.filter((key:FieldKey, index:number)=>{
            return ( tonic === key.tonic && (coordinates.x === key.origin.x && coordinates.y === key.origin.y) )
        })
        if(matchingKeys.length > 0){
            return matchingKeys[0]
        }
        return (null)
    }
    keyOutOfRange = (c:Coordinates) => {
          let keysOnSameRow:number = this.state.keys.filter((key:FieldKey, index:number)=>{
            return key.origin.y === c.y
         }).length
         if(keysOnSameRow >= this.columnLimit){return true}
         if(c.y > this.origin.y + (this.rowLimit * 1.5 * this.props.radius)){return true}
         if(c.y < this.origin.y){return true}
         if(c.x < this.origin.x || c.y < this.origin.y){ return true}
         return false
    }
    shouldBuildKey = () => {

    }
    onKeyClick = (key:FieldKey) => {
        key.active = !key.active
        let keys:FieldKey[] = [...this.state.keys]
        this.setState({keys:keys})
    }
    buildKey = (tonic:number, origin:Coordinates, radius:number, seeds:FieldNote[], seedPositions:number[]) => {
        let existingKey:FieldKey | null = this.getExistingKey(tonic, origin)
        if(existingKey !== null){return existingKey}
        if(this.keyOutOfRange(origin)){return null}
        if(this.hasEnoughOfKey(tonic)){return null}
        if(this.atLimit()){return null}
        let key:FieldKey = new FieldKey(this, tonic, origin, radius, seeds, seedPositions, this.state.keys.length)
        this.state.keys.push(key)
        return key
    }
    onKeyNoteBuilt = (note:FieldNote) => {
        // this.buildKeysForNote(note)
    }
    getKeys = ():JSX.Element[] => {
        let keys:JSX.Element[] = this.state.keys.map((key:FieldKey, index:number) => {
            return <FieldKeyComp {...key} key={index}/>
        })
        return keys
    }
    getNotes = ():JSX.Element[] => {
        let notes:JSX.Element[] = this.state.notes.map((note:FieldNote, index:number) => {
            if(note.isEven){
                return <FieldNoteCompEven {...note} key={index}/>
            }
            else if(note.isSeventh){
                return <FieldNoteCompSeventh {...note} key={index}/>}
            return <FieldNoteCompOdd {...note} key={index}/>
        })
        return notes
    }
    render = () => {
        return   <svg viewBox="0 0 1000 800" xmlns="http://www.w3.org/2000/svg">
                    <g className="fieldContainer" transform="translate(0 0)">
                        <g className="field">
                            <g className="field-keys">{this.getKeys()}</g>
                            <g className="field-notes">{this.getNotes()}</g>
                        </g>
                    </g>
                </svg>
    }
}
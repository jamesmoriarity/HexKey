import React from "react";
import { Coordinates } from "../Coordinates";
import { Modes } from "../Modes";
import { Music } from "../Music";
import { Field } from "./Field";
import { FieldNote } from "./FieldNote";
class FieldKeyNotes{
    notes:Map<number, FieldNote | null>
    key:FieldKey
    constructor(key:FieldKey, seedNotes:FieldNote[] = [], positions:number[] = []){
        this.key = key
        this.notes = this.createNotesMap()
        this.fillSeedNotes(seedNotes, positions)

    }
    getNote = (num:number):FieldNote | null => {
        let note:any = this.notes.get(num)
        if(note === undefined || note === null){
            return null
        }
        return note
    }
    createNotesMap = () => {
        let notes:Map<number, FieldNote | null> = new Map()
        Modes.names.forEach((modeName:string, index:number)=>{
            notes.set(index, null)
        })
        return notes
    }
    fillSeedNotes = (seedNotes:FieldNote[], positions:number[]) => {
        seedNotes.forEach((seedNote:FieldNote, index:number)=>{
           const position:number = positions[index]
           seedNote.keys.set(position, this.key)
           this.notes.set(position, seedNote)
        })
    }
    fillNullNotes = () => {
        let newNotes:Map<number, FieldNote | null> = new Map(this.notes)
        this.notes.forEach((note:FieldNote | null, position:number)=>{
            if(note === null){
                let newNote:FieldNote = this.key.parentField.buildNote(this.key, position)
                newNotes.set(position, newNote)
            }
        })
        this.notes = newNotes
    } 
}
export class FieldKeyNeighbors{ 
    keys:Map<string, FieldKey | null>
    constructor(){
        this.keys = new Map()
        this.keys.set(Music.intervalNames[Music.interval_minor3rd], null)
        this.keys.set(Music.intervalNames[Music.interval_3rd], null)
        this.keys.set(Music.intervalNames[Music.interval_4th], null)
        this.keys.set(Music.intervalNames[Music.interval_5th], null)
        this.keys.set(Music.intervalNames[Music.interval_flat6th], null)
        this.keys.set(Music.intervalNames[Music.interval_6th], null)
    }
    set = (name:string, key:FieldKey) => {
        this.keys.set(name, key)
    }
}
export class FieldKey{
    tonic:number
    radius:number
    origin:Coordinates
    notes:FieldKeyNotes
    parentField:Field
    expanded:boolean
    neighbors:FieldKeyNeighbors
    _note:string
    index:number
    display:boolean
    active:boolean
    // parentField, tonic, coordinates, radius, seedNotes, positions
    constructor( 
                    parentField:Field,
                    tonic:number,
                    origin:Coordinates,
                    radius:number, 
                    seedNotes:FieldNote[], 
                    positions:number[],
                    index:number
                ){
        this.tonic = tonic
        this.radius = radius
        this.parentField = parentField
        this.notes = new FieldKeyNotes(this, seedNotes, positions)
        this.origin = origin
        this.expanded = false
        this.neighbors = new FieldKeyNeighbors()
        this._note = Music.notes[tonic]
        this.index = index
        this.display = true
        this.active = false
    }
    onKeyClick = () => {
        this.parentField.onKeyClick(this)
    }
    determineCenter = (center:Coordinates | null) => {
        return new Coordinates()
    }
    buildAllNotes = () => {
        this.notes.fillNullNotes()
    }
    buildAllNeighbors = () => {
        this.buildSixth()
        this.buildThird()
        this.buildFourth()
        this.buildFifth()
        this.buildFlatSixth()
        this.buildMinorThird()
        this.parentField.onNeighborKeysBuilt()
    }

    getThirdOrigin = () => {
        let x:number = this.origin.x + Math.floor(this.radius * .866)
        let y:number = this.origin.y + (this.radius * 1.5)
        let origin:Coordinates = new Coordinates(x, y)
        return origin
    }
    buildThird = () => {
        let seedPositions:number[] = [2,5]
        let newSeedPositions:number[] = [0,3]
        let neighborName:string = Music.intervalNames[Music.interval_3rd]
        let tonic = Music.addInterval(this.tonic, Music.interval_3rd)
        this.buildNeighbor(neighborName, tonic, this.getThirdOrigin(), seedPositions, newSeedPositions)
    }
    getFlatSixthOrigin = () => {
        let x:number = this.origin.x - Math.floor(this.radius * .866)
        let y:number = this.origin.y - (this.radius * 1.5)
        let origin:Coordinates = new Coordinates(x, y)
        return origin
    }
    buildFlatSixth = () => {
        let seedPositions:number[] = [0,3]
        let newSeedPositions:number[] = [2,5]
        let neighborName:string = Music.intervalNames[Music.interval_flat6th]
        let tonic = Music.addInterval(this.tonic, Music.interval_flat6th)
        this.buildNeighbor(neighborName, tonic, this.getFlatSixthOrigin(), seedPositions, newSeedPositions)
    }

    getFourthOrigin = () => {
        let x:number = this.origin.x + Math.floor(this.radius * .866)
        let y:number = this.origin.y - (this.radius * 1.5)
        let origin:Coordinates = new Coordinates(x, y)
        return origin
    }
    buildFourth = () => {
        let seedPositions:number[] = [0,1]
        let newSeedPositions:number[] = [4,5]
        let neighborName:string = Music.intervalNames[Music.interval_4th]
        let tonic = Music.addInterval(this.tonic, Music.interval_4th)
        this.buildNeighbor(neighborName, tonic, this.getFourthOrigin(), seedPositions, newSeedPositions)
    }
    getFifthOrigin = () => {
        let x:number = this.origin.x - Math.floor(this.radius * .866)
        let y:number = this.origin.y + (this.radius * 1.5)
        let origin:Coordinates = new Coordinates(x, y)
        return origin
    }
    buildFifth = () => {
        let seedPositions:number[] = [4,5]
        let newSeedPositions:number[] = [0,1]
        let neighborName:string = Music.intervalNames[Music.interval_5th]
        let tonic = Music.addInterval(this.tonic, Music.interval_5th)
        this.buildNeighbor(neighborName, tonic, this.getFifthOrigin(), seedPositions, newSeedPositions)
    }
    buildMinorThird = () => {
        let seedPositions:number[] = [3,4]
        let newSeedPositions:number[] = [1,2]
        let tonic = Music.addInterval(this.tonic, Music.interval_minor3rd)
        let neighborName:string = Music.intervalNames[Music.interval_minor3rd]
        this.buildNeighbor(neighborName, tonic, this.getMinorThirdOrigin(), seedPositions, newSeedPositions)
    }
    getMinorThirdOrigin = () => {
        let x:number = this.origin.x - (2 * Math.floor(this.radius * .866))
        let origin:Coordinates = new Coordinates(x, this.origin.y)
        return origin
    }
    getSixthOrigin = () => {
        let x:number = this.origin.x + (2 * Math.floor(this.radius * .866))
        let origin:Coordinates = new Coordinates(x, this.origin.y)
        return origin
    }
    buildSixth = () => {
        let seedPositions:number[] = [1,2]
        let newSeedPositions:number[] = [3,4]
        let tonic = Music.addInterval(this.tonic, Music.interval_6th)
        let neighborName:string = Music.intervalNames[Music.interval_6th]
        this.buildNeighbor(neighborName, tonic, this.getSixthOrigin(), seedPositions, newSeedPositions)
    }
    buildNeighbor = (neighborName:string, tonic:number, origin:Coordinates, seedPositions:number[], newSeedPositions:number[]) => {
        let seeds:FieldNote[] = []
        seedPositions.forEach((position:number)=>{
            let note:FieldNote | null = this.notes.getNote(position)
            if(note !== null){
                seeds.push(note)
            }
        })
        let neighbor:FieldKey | null = this.parentField.buildKey(tonic, origin, this.radius, seeds, newSeedPositions)
        if(neighbor){
            this.neighbors.set(neighborName, neighbor)
        }
        
    }
    listAllNotes = () => {
        let notesArray:string[] = []
        let notes = this.notes.notes.values()
        for (const note of notes) {
            if(note){
                notesArray.push(note._noteName)
            }
        }
        //console.log('key: ' + this._note + ":" + notesArray)
    }
    expand = () => {
        if(!this.expanded){
            this.expanded = true
            this.buildAllNotes()
            this.buildAllNeighbors()
            this.listAllNotes()
        }
    }
}
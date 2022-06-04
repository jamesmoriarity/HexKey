import React from "react";
import { Coordinates } from "../Coordinates";
import { Music } from "../Music";
import { FieldKey } from "./FieldKey";
import { FieldNoteCompProps } from "./FieldNoteComp";
export class FieldNote{
    isEven:boolean
    isSeventh:boolean
    keys:Map <number, FieldKey | null>
    origin:Coordinates
    tonic:number
    _noteName:string
    constructor(seedKeys:FieldKey[] = [], positions:number[] = []){
        this.isSeventh = (positions[0] === 6)
        this.isEven = ((positions[0]) % 2 === 0 && !this.isSeventh)
        this.keys = this.buildEmptyKeys()
        seedKeys.forEach((key:FieldKey, index:number)=>{
            this.keys.set(positions[index], key)
        })
        let scale:any = Music.getKeyScale(seedKeys[0].tonic)
        this.tonic = scale[positions[0]]
        this._noteName = Music.notes[this.tonic]
        this.origin = this.getOrigin(positions)
    } 
    getParentKeys = () => {
      return Array.from(this.keys.values())
    }
    toProps = ():FieldNoteCompProps => {
        return {origin:this.origin, parentKeys:this.getParentKeys(), noteName:this._noteName}
    }
    getOrigin = (positions:number[]):Coordinates => { 
        if(positions.length === 0){
            throw new Error('FieldNote.getOrigin: Positions is empty')
        }
        let position:number = positions[0]
        let origin:Coordinates = new Coordinates(0,0)
        let key:FieldKey | null | undefined = this.keys.get(position)
        if(!key){
            throw new Error('FieldNote.getOrigin: Key does not exist')
        }
        if(key){
            switch(position){
                case 0:
                    origin.x = key.origin.x
                    origin.y = key.origin.y - key.radius
                    break;
                case 1:
                    origin.x = key.origin.x + (key.radius * .866)
                    origin.y = key.origin.y - (key.radius * 0.5)
                    break;
                case 2:
                    origin.x = key.origin.x + (key.radius * .866)
                    origin.y = key.origin.y + (key.radius * 0.5)
                    break;
                case 3:
                    origin.x = key.origin.x - (key.radius * .866)
                    origin.y = key.origin.y - (key.radius * 0.5)
                    break;
                case 4:
                    origin.x = key.origin.x - (key.radius * .866)
                    origin.y = key.origin.y + (key.radius * 0.5)
                    break;
                case 5:
                    origin.x = key.origin.x
                    origin.y = key.origin.y + key.radius
                    break;
                case 6:
                    origin.x = key.origin.x
                    origin.y = key.origin.y
                    break;
            }
        }
        origin.x = Math.floor(origin.x)
        origin.y = Math.floor(origin.y)
        return origin
    }
    buildEmptyKeys = () => {
        let keys:Map <number, FieldKey | null> = new Map()
        const keyIndexes:number[] = (this.isSeventh) ? [6] : (this.isEven) ? [0,2,4] : [1,3,5]
        keyIndexes.forEach((index:number)=>{
            keys.set(index, null)
        })
        return keys
    }
    getPositions = () => {
        return (this.isSeventh) ? [6] : (this.isEven) ? [0,2,4] : [1,3,5]
    }
}
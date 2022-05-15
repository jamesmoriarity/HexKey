import React, { ChangeEvent } from "react"
import { HexNode, HexNodeProps } from "./HexNode"
import { Music } from "./Music"
import SingleHex, { SingleHexState } from "./SingleHex"



class SingleHexNoteNames extends SingleHex {
 	constructor(props:any){
        super(props)
        this.state.displayType = SingleHexState.DISPLAY_NOTENAME
    }
   nextQuestion = () => {
     // exclude currentNumber
     let a:number[] = []
     for(let i = 1; i < 7; i++){
       if(i !== this.state.currentNumber){
         a.push(i)
       }
     }
     let nextIndex:number = Math.floor(Math.random() * a.length)
     let nextNumber:number = a[nextIndex]
     this.setState({currentNumber:nextNumber, currentAnswer:null})
   }
  getCurrentNote = () => {
    let scale:number[] = this.getKeyScale()

    console.log('getCurrentNote', scale)
    let num:number = (this.state.currentNumber) ? this.state.currentNumber : 0
    let note:number = scale[num]
    console.log('getCurrentNote', note)
    return Music.notes[note]
  }
  getSubtitle = ():string => {
    if(this.state.currentAnswer === null){
      return 'click the note' 
    }
    if(this.state.currentAnswer === this.state.currentNumber){
      return 'correct'
    }
    return 'incorrect'
  }
  getHexNodeDisplayType = (index:number)=>{
    if(index === 0){
        return this.state.displayType
    }
    let isAnswer:boolean =  (index === this.state.currentNumber && index === this.state.currentAnswer)
    if(isAnswer){
      return this.state.displayType
    }
    return SingleHexState.DISPLAY_NONE
  }
  onKeySelect = (e:any) => {
    console.log(e.target.value)
    this.setState({tonic:parseInt(e.target.value)})
  }
  render (){ return <div>
                      <div className="questionPosition">
                          <div>hello
                              <select value={this.state.tonic} onChange={this.onKeySelect}>
                                  <option value={8}>Ab</option>
                                  <option value={9}>A</option>
                                  <option value={10}>Bb</option>
                                  <option value={11}>B</option>
                                  <option value={0}>C</option>
                                  <option value={1}>Db</option>
                                  <option value={2}>D</option>
                                  <option value={3}>Eb</option>
                                  <option value={4}>E</option>
                                  <option value={5}>F</option>
                                  <option value={6}>Gb</option>
                                  <option value={7}>G</option>
                              </select>
                            </div>
                        <div>{this.getSubtitle()}</div>
                        <div>{this.getCurrentNote()}</div>
                      </div>
                      <svg className="hexkey" width="300" height="300" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <g className="hex00">
                            <polygon className="outline" 
                              points={this.getPoints()}
                              />
                            <g className="nodes">{this.getHexNodes()}</g>
                          </g>
                        </svg>
                    </div>
  }
}
export default SingleHexNoteNames

import React from "react"
import { HexNode } from "./HexNode"
import { Music } from "./Music"

export class SingleHexState{
  static DISPLAY_NONE:number = -1
  static DISPLAY_NUMBER:number = 0
  static DISPLAY_NOTENAME:number = 1
  currentNumber:number | null
  currentAnswer:number | null
  displayType:number
  tonic:number
  constructor(displayType:number){
    this.currentNumber = null
    this.currentAnswer = null
    this.displayType = displayType
    this.tonic = Music.G
  }
}

class SingleHex extends React.Component {
  state:SingleHexState
 	constructor(props:any){
 		super(props)
    this.state = new SingleHexState(SingleHexState.DISPLAY_NUMBER)
    this.state.currentNumber = Math.floor(Math.random() * 7)
 	}
   componentDidUpdate = ()=>{
     console.log('componentDidUpdate')
     // if currentAnswer and currentQuestion are identical, then ask a new question
     // after some length of time.
     if(this.state.currentAnswer === this.state.currentNumber){
       setTimeout(this.nextQuestion, 1000)
     }
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

  onNodeClick = (position:number) => {
    console.log('onNodeClick', position)
    this.setState({currentAnswer:position})
  }

  getKeyScale = ()=>{
    let scale:number[] = [this.state.tonic]
    let currentNote:number = this.state.tonic
    for(let i:number = 0; i < 6; i++){
      currentNote = (currentNote + Music.majorScaleIntervals[i]) % 12
      scale.push(currentNote)
    }
    return scale
  }
  getHexNodeDisplayType = (index:number)=>{
    let isAnswer:boolean =  (index === this.state.currentNumber && index === this.state.currentAnswer)
    if(isAnswer){
      return this.state.displayType
    }
    return SingleHexState.DISPLAY_NONE
  }
  getHexNodes = ()=>{
    console.log('getHexNodes')
    let nodes:JSX.Element[] = []
    this.getKeyScale().forEach((rootNote:number, index:number) => {
      nodes.push(<HexNode displayType={this.getHexNodeDisplayType(index)} onClick={this.onNodeClick} position={index} rootNote={rootNote} key={index}/>)
    });
    return nodes
  }
  getPoints = () => {
    return "0 -10, 8.66 -5, 8.66 5, 0 10, -8.66 5, -8.66 -5"
  }
  getUserAnswerReply = ():string => {
    if(this.state.currentAnswer === null){
      return ''
    }
    if(this.state.currentAnswer === this.state.currentNumber){
      return 'correct.'
    }
    return 'incorrect. try again.'
  }
  getInstruction = ():string => {
    return 'click on position...'

  }
  getCurrentNumberLabel = ():number => {
    if(this.state.currentNumber){
      return this.state.currentNumber + 1
    }
    return 0
  }
  render (){ return <div>
                      <div className="questionPosition">
                        <div>{this.getInstruction()} {this.getCurrentNumberLabel()}</div>
                        <div>{this.getUserAnswerReply()}</div>
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
export default SingleHex

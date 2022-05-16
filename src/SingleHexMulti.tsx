import React from "react"
import { HexNode } from "./HexNode"
import { Music } from "./Music"

export class SingleHexMultiState{
  static DISPLAY_NONE:number = -1
  static DISPLAY_NUMBER:number = 0
  static DISPLAY_NOTENAME:number = 1
  currentNumbers:number[]
  currentAnswers:number[]
  lastAnswer:number | null
  displayType:number
  tonic:number
  scale:number[]
  constructor(tonic:number, displayType:number){
    this.currentNumbers = []
    this.currentAnswers = []
    this.lastAnswer = null
    this.displayType = displayType
    this.tonic = tonic
    this.scale = Music.getKeyScale(this.tonic)
  }
}

class SingleHexMulti extends React.Component {
  state:SingleHexMultiState
 	constructor(props:any){
 		super(props)
    this.state = new SingleHexMultiState(Music.G, SingleHexMultiState.DISPLAY_NUMBER)
    this.state.currentNumbers = this.getNextSequence();
 	}
    getNextSequence = () => {
        let sequences:number[][] = [[0,2,4], [1,3,5], [2,4,6], [3,5,0], [4,6,1], [5,0,2], [6,1,3]]
        return sequences[Math.floor(Math.random() * sequences.length) % 8]
    }
    answerIsCorrect = () => {
        return (this.state.currentAnswers.length === this.state.currentNumbers.length)
    }
   componentDidUpdate = ()=>{
     if(this.answerIsCorrect()){
        console.log('all answers are present')
        setTimeout(this.nextQuestion, 700)
     }
   }
   nextQuestion = () => {
     let sequence:number[] = this.getNextSequence()
     this.setState({currentNumbers:sequence, currentAnswers:[], lastAnswer:null})
   }

  onNodeClick = (position:number) => {
    if(position === this.state.currentNumbers[this.state.currentAnswers.length]){
        let newAnswers:number[] = [...this.state.currentAnswers]
        newAnswers.push(position)
        this.setState({currentAnswers:newAnswers, currentAnswer:position, lastAnswer:position})
    }
    else{
        this.setState({lastAnswer:position})
    }
  }


  getHexNodeDisplayType = (index:number)=>{
    let isAnAnswer:boolean =  this.state.currentAnswers.includes(index)
    if(isAnAnswer){
      return this.state.displayType
    }
    return SingleHexMultiState.DISPLAY_NONE
  }
  getHexNodes = ()=>{
    console.log('getHexNodes')
    let nodes:JSX.Element[] = []
    this.state.scale.forEach((rootNote:number, index:number) => {
      nodes.push(<HexNode displayType={this.getHexNodeDisplayType(index)} onClick={this.onNodeClick} position={index} rootNote={rootNote} key={index}/>)
    });
    return nodes
  }
  getPoints = () => {
    return "0 -10, 8.66 -5, 8.66 5, 0 10, -8.66 5, -8.66 -5"
  }
  getUserAnswerReply = ():string => {
    if(this.state.lastAnswer === null){
        return ''
    }
    let currAnswers:number[] = this.state.currentAnswers
    let isLastAnswerCorrect:boolean = (this.state.lastAnswer === currAnswers[currAnswers.length-1])
    if(currAnswers.length === this.state.currentNumbers.length){
        return 'sequence completed.'
    }
    if(isLastAnswerCorrect){
        return 'correct so far...'
    }
    else{
        return 'incorrect. try again.'
    }
  }
  getCurrentNumbersAsOneBasedPositions = () => {
      let remapped:number[] = this.state.currentNumbers.map((elm:number)=>{
        return elm + 1
      })
      return remapped
  }
  getInstruction = ():string => {
    return 'click on multiple positions...  ' + this.getCurrentNumbersAsOneBasedPositions().join(' - ')
  }

  render (){ return <div>
                      <div className="questionPosition">
                        <div>{this.getInstruction()}</div>
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
export default SingleHexMulti

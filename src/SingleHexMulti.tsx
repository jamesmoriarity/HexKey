import React from "react"
import { HexKey, PositionState } from "./HexKey"
import { HexNode } from "./HexNode"
import { Music } from "./Music"

export class SingleHexMultiState{
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
        this.state = this.getState()
        this.state.currentNumbers = this.getNextSequence();
 	}
    getState = () => {
        return new SingleHexMultiState(Music.G, PositionState.LABELTYPE_NUMBER)
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
        setTimeout(this.nextQuestion, 1200)
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
  getPositionStates = () => {
      let states:PositionState[] = []
      for(let positionIndex = 0; positionIndex < 7; positionIndex++){
          let labelShouldDisplay:boolean = this.state.currentAnswers.includes(positionIndex)
          let hilite:boolean = labelShouldDisplay
          let state:PositionState = new PositionState(
                                                hilite,
                                                labelShouldDisplay, 
                                                this.state.displayType)
          
          states.push(state)
        }
      return states
  }
  render (){ return <div>
                      <div className="questionPosition">
                        <div>{this.getInstruction()}</div>
                        <div>{this.getUserAnswerReply()}</div>
                      </div>
                      <HexKey
                        tonic={this.state.tonic}
                        positionStates={this.getPositionStates()}
                        onPositionClick={this.onNodeClick} />
                    </div>
  }
}
export default SingleHexMulti

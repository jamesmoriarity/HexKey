import React, { ChangeEvent } from "react"
import { HexKey, PositionState } from "./HexKey"
import { HexNode, HexNodeProps } from "./HexNode"
import { Music } from "./Music"
import SingleHexMulti, { SingleHexMultiState } from "./SingleHexMulti"



class SingleHexNoteNamesMulti extends SingleHexMulti {
    constructor(props:any){
        super(props)
        this.state = this.getState()
        this.state.currentNumbers = this.getNextSequence();
    }
    getState = () => {
        return new SingleHexMultiState(Music.G, PositionState.LABELTYPE_NOTENAME)
    }
    getCurrentNumbersAsNotes = () => {
        let notes:string[] = this.state.currentNumbers.map((elm:number)=>{
            return Music.notes[this.state.scale[elm]]
        })
        return notes
    }
    getInstruction = ():string => {
        return 'click on multiple positions... ' + this.getCurrentNumbersAsNotes().join('-')
    }
    onKeySelect = (e:any) => {
        console.log(e.target.value)
        let newState:SingleHexMultiState = new SingleHexMultiState(e.target.value, PositionState.LABELTYPE_NOTENAME)
        this.setState({...newState})
    }
    render (){ return <div>
                        <div className="questionPosition">
                            <div>
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
export default SingleHexNoteNamesMulti

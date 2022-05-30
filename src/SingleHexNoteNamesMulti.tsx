import React, { ChangeEvent } from "react"
import { HexKey, PositionState } from "./HexKey"
import { HexKeyHelperNotes } from "./HexKeyHelperNotes"
import { HexNode, HexNodeProps } from "./HexNode"
import { Music } from "./Music"
import { NotesSelect } from "./NotesSelect"
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
        let val:number = parseInt(e.target.value)
        let newState:SingleHexMultiState = new SingleHexMultiState(val, PositionState.LABELTYPE_NOTENAME)
        this.setState({...newState})
    }
    getHelper = () => {
        if(!this.state.showHelper){ return null}
        return <HexKeyHelperNotes 
          activeArrows={[]}
          tonic={this.state.tonic}
          positionStates={this.getPositionStates()}
          onPositionClick={this.onNodeClick} 
          completed={false}/>
      }

      toggleShowHelper = () => {
        this.setState({showHelper:!this.state.showHelper})
      }
    render (){ return <div>
                        <div className="questionPosition">
                            <div>
                            <NotesSelect tonic={this.state.tonic} onChange={this.onKeySelect}/>
                            </div>
                        <div>{this.getInstruction()}</div>
                        <div>
                              <input type="checkbox" 
                                    checked={this.state.showHelper} 
                                    onChange={this.toggleShowHelper}/> Show Hint - Sequence Pattern

                            </div>
                        <div>{this.getUserAnswerReply()}</div>
                        </div>                      
                        <HexKey
                            activeArrows={[]}
                            tonic={this.state.tonic}
                            positionStates={this.getPositionStates()}
                            onPositionClick={this.onNodeClick}
                            completed={false} />
                      <div className="hexkeyhelper">{this.getHelper()}</div>
                    </div>
    }
}
export default SingleHexNoteNamesMulti

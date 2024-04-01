import { Component, ReactNode } from 'react'
import { SafeAreaView, Text, View, Alert } from 'react-native'
import styles from './styles'
import params from './params'
import MineField from './Components/MineField/MineField'
import { createMinedBoard,cloneBoard,openField,hadExplosion,wonGame,showMines,invertFlag, flagsUsed } from './functions'
import Header from './Components/Header/Header'
import LevelSelect from './screens/LevelSelect/LevelSelect'

type MyState={
  board:BoardInterface[][]
  won:boolean
  lost:boolean
  showLevelSelection:boolean
}

export default class App extends Component<any,MyState>{

  constructor(props:any){
    super(props)
    this.state = this.createState() as MyState
  }

  minesAmount(){
    const rows = params.getRowsAmount()

    const columns = params.getColumnsAmount()

    return Math.ceil(columns * rows * params.difficultLevel)
  }

  onOpenField = (row:number, column:number) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)

    if (lost) {
      showMines(board)
      Alert.alert('Perdeeeeu!', 'Que buuuurro!')
    }

    if (won) {
      Alert.alert('Parabéns', 'Você Venceu!')
    }

    this.setState({ board, lost, won })
  }


  createState = () => {

    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()

    return {
      board:createMinedBoard(rows,cols,this.minesAmount()),
      lost:false,
      won:false,
      showLevelSelection:false
    }

  }

  onSelectField = (row:number,column:number) => {

    const board = cloneBoard(this.state.board)

    invertFlag(board,row,column)

    const won = wonGame(board)

    if(won){
      Alert.alert('Parabéns', 'Você Venceu!')
    }

    this.setState({board,won})
  }

  onLevelSelected = (level:number) : void=> {
    params.difficultLevel=level

    this.setState(this.createState())

  }

  render(): ReactNode {

    return(
      <SafeAreaView style={styles.container}>
        <LevelSelect 
          onLevelSelected={this.onLevelSelected} 
          isVisible={this.state.showLevelSelection}
          onCancel={() => this.setState({showLevelSelection:false})} 
        />
        <Header 
          flagsLeft={this.minesAmount() - flagsUsed(this.state.board)} 
          onFlagPress={() => this.setState({showLevelSelection:true})} 
          onNewGame={()=>this.setState(this.createState())}
        />
        <View style={styles.board}>
            <MineField onSelect={this.onSelectField}  board={this.state.board} onOpenField={this.onOpenField}/>
        </View>
      </SafeAreaView>
    )
  }

}

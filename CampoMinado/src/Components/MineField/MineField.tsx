import { Component, ReactNode } from 'react'
import { View } from 'react-native'
import Field from '../Field/Field'
import styles from './styles'

type Props={
    board:BoardInterface[][],
    onOpenField:any,
    onSelect:any
}

export default class MineField extends Component<Props>{

    render(): ReactNode {

        const rows = this.props.board.map((row,r) =>{
            const columns = row.map((field, c) => <Field onSelect={() => this.props.onSelect(r,c)} onOpen={() => this.props.onOpenField(r,c)} {...field} key={c}/>)

            return <View style={{flexDirection:'row'}} key={r}>{columns}</View>
        })

        return(
            <View style={styles.container}>{rows}</View>
        )
    }
}
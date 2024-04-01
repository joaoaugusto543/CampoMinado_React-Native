import { Component, ReactNode } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styles from './styles'

type Props={
    onLevelSelected:any,
    buttonLabel:string,
    level:number,
    bg:string
}

export default class ButtonLevel extends Component<Props>{

    render(): ReactNode {

        const {level,buttonLabel,onLevelSelected,bg} = this.props
         
        return(
            <TouchableOpacity
                style={[styles.button,{backgroundColor:bg}]}
                onPress={()=> onLevelSelected(level)}    
            >
                <Text style={styles.buttonLabel}>{buttonLabel}</Text>
            </TouchableOpacity>
        )
    }
}
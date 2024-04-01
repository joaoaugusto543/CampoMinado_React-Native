import React, { Component, ReactNode } from 'react'
import { SafeAreaView, Text, TouchableWithoutFeedback } from 'react-native'
import styles from './styles'
import Mine from '../Mine/Mine'
import Flag from '../Flag/Flag'

type Props = {
    mined:boolean,
    opened:boolean,
    nearMines:number,
    exploded:boolean,
    flagged:boolean,
    onOpen: any,
    onSelect: any
}


export default class Field extends Component<Props>{

    render(): ReactNode {

        const {opened,nearMines,mined,exploded,flagged} = this.props

        const stylesField:any=[styles.field]

        if(opened){
            stylesField.push(styles.opened)
        }

        if(exploded){
            stylesField.push(styles.exploded)
        }

        if(flagged){
            stylesField.push(styles.flagged)
        }

        if(!opened && !exploded){
            stylesField.push(styles.regular)
        }

        let color: any = null

        if(nearMines > 0){

            if(nearMines == 1){
                color = '#2A28D7'
            }

            if(nearMines == 2){
                color = '#2B520F'
            }

            if(nearMines > 2 && nearMines < 6){
                color = '#F9060A'
            }

            if(nearMines >= 6){
                color = '#F221A9'
            }
        }

        return(
            <TouchableWithoutFeedback onPress={this.props.onOpen} onLongPress={this.props.onSelect}>
                <SafeAreaView style={stylesField}>
                    {!mined && opened && nearMines > 0 && 
                        <Text style={[styles.label, {color}]}>
                            {nearMines}
                        </Text>
                    }
                    {mined && opened && <Mine/>}
                    {flagged && !opened && <Flag bigger={false}/>}
                </SafeAreaView>
            </TouchableWithoutFeedback>
        )
    }

}
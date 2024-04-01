import React, { Component } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import Flag from '../Flag/Flag'
import styles from './styles'

type Props = {
    onFlagPress:any,
    flagsLeft:number,
    onNewGame:any
}

export default class Header extends Component<Props>{
    render(): React.ReactNode {
        return(
            <SafeAreaView style={styles.container}>
                    <View style={styles.flagContainer}>
                        <TouchableOpacity onPress={this.props.onFlagPress} style={styles.flagButton}>
                            <Flag bigger={true}/>
                        </TouchableOpacity>
                        <Text style={styles.flagsLeft}>= {this.props.flagsLeft}</Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={this.props.onNewGame}>
                        <Text style={styles.buttonLabel}>Novo Jogo</Text>
                    </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

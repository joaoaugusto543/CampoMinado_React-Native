import { Component, ReactNode } from 'react'
import { SafeAreaView, View } from 'react-native'
import styles from './styles'

type Props={
    bigger:boolean
}

export default class Flag extends Component<Props>{
    render(): ReactNode {

        return(
            <SafeAreaView style={styles.container}>
                <View style={[styles.flagpole, this.props.bigger ? styles.flagpoleBigger : null]}/>
                <View style={[styles.flag,this.props.bigger ? styles.flagBigger : null]}/>
                <View style={[styles.base1,this.props.bigger ? styles.base1Bigger : null]}/>
                <View style={[styles.base2,this.props.bigger ? styles.base2Bigger : null]}/>
            </SafeAreaView>
        )
    }
}
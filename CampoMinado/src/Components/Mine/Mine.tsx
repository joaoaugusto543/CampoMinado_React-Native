import { Component, ReactNode } from 'react'
import { SafeAreaView, View } from 'react-native'
import styles from './styles'

type Props = {

}

export default class Mine extends Component<Props>{

    render(): ReactNode {
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.coreMine}/>
                <View style={styles.line}/>
                <View style={[styles.line,{transform:[{rotate: '45deg'}]}]}/>
                <View style={[styles.line,{transform:[{rotate: '90deg'}]}]}/>
                <View style={[styles.line,{transform:[{rotate: '135deg'}]}]}/>
            </SafeAreaView>
        )
    }

}
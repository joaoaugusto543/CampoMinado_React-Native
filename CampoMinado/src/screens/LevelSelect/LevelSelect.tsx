import { Component, ReactNode } from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import ButtonLevel from '../../Components/ButtonLevel/ButtonLevel'

type Props = {
    onCancel:any,
    isVisible:boolean,
    onLevelSelected:any
}

export default class LevelSelect extends Component<Props>{
    render(): ReactNode {

        const {onCancel,isVisible,onLevelSelected} = this.props

        return(
            <Modal 
                onRequestClose={onCancel}
                visible={isVisible} 
                animationType='slide'
                transparent={true}
            >
                <View style={styles.frame}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Selecione o Nível</Text>
                        <ButtonLevel level={0.1} buttonLabel='Fácil' bg='#49b65d' onLevelSelected={onLevelSelected} />
                        <ButtonLevel level={0.2} buttonLabel='Intermediário' bg='#2765F7' onLevelSelected={onLevelSelected} />
                        <ButtonLevel level={0.3} buttonLabel='Difícil' bg='#F26337' onLevelSelected={onLevelSelected} />
                    </View>
                </View>
            </Modal>
        )
    }
}
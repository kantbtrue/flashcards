import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'
import { white, lightGreen, lightBlue, black } from '../utils/colors'

class NewDeck extends Component {
    state = {
        text: '',
    }
    onChangeText = (text) => {
        this.setState(() => ({
            text
        }))
    }
    
    submitDeck = () =>  {  
        const { text } = this.state
        const { dispatch, navigation } = this.props

        dispatch(addDeck({
            [text]: {
                title: text,
                questions: [],
            }
        }))

        saveDeckTitle(text)

        navigation.navigate(
            'Deck', 
            { deckTitle: text }
        )

        this.setState(() => ({
            text: ''
        }))
    }
    render() {
        const { text } = this.state

        const textLeft = 25 - text.length

        return (
            <View style={styles.container} >
                <Text style={{fontSize: 35}}>What is the title of the new deck?</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => this.onChangeText(text)}
                    value={text}
                    placeholder={'Deck Title'}
                    maxLength={25}
                    multiline={false}
                />
                {textLeft <= 18 && (
                    <Text style={{fontSize: 15, color: 'red'}}>
                        {`${textLeft} characters left`}
                    </Text>
                )}
                { (text !== '') && (
                    <TouchableOpacity 
                        onPress={this.submitDeck} 
                        style={{marginTop: 120}} >
                        <Text style={styles.button}>
                            Create Deck
                        </Text> 
                    </TouchableOpacity>
                )}
                { (text === '') && (
                    <TouchableOpacity 
                        onPress={this.submitDeck} 
                        style={{marginTop: 120}} 
                        disabled= {true}>
                        <Text style={styles.disabledButton}>
                            Create Deck
                        </Text> 
                    </TouchableOpacity>
                )}         
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: white,
        padding: 15,
    },
    textInput: {
        color: black,
        fontSize: 25,
        borderColor: 'gray', 
        borderWidth: 2,
        height: 40,
        marginTop: 30,
        width: 325,
    },
    button: {
        fontSize: 25, 
        color: white, 
        backgroundColor: lightGreen, 
        padding: 25,
    },
    disabledButton: {
        fontSize: 25, 
        color: white, 
        backgroundColor: lightBlue, 
        padding: 25,
    }
})

export default connect()(NewDeck)


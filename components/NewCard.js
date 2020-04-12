import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { addCardToDeck } from '../utils/api'
import { white, lightGreen, lightBlue, black } from '../utils/colors'

class NewCard extends Component {
    state = {
        questionText: '',
        answerText: '',
    }
    onChangeQuestionText = (questionText) => {
        this.setState(() => ({
            questionText
        }))
    }
    onChangeAnswerText = (answerText) => {
        this.setState(() => ({
            answerText
        }))
    }
    submitCard = () =>  {  
        const { questionText, answerText } = this.state
        const { dispatch, navigation, deckTitle } = this.props

        dispatch(addCard(
                deckTitle,
                {
                    question: questionText,
                    answer: answerText,
                },
        ))

        addCardToDeck(
            deckTitle,
            {
                question: questionText,
                answer: answerText,
            },
        )

        navigation.navigate(
            'Deck', 
            { deckTitle: deckTitle }
        )

        this.setState(() => ({
            questionText: '',
            answerText: '',
        }))
    }
    render() {
        const { questionText, answerText } = this.state
        const questionTextLeft = 50 - questionText.length
        const answerTextLeft = 50 - answerText.length

        return (
            <View style={styles.container} >
                <TextInput
                    style={styles.textInput}
                    onChangeText={questionText => this.onChangeQuestionText(questionText)}
                    value={questionText}
                    placeholder={'Enter a question?'}
                    maxLength={140}
                    multiline={false}
                />
                {questionTextLeft <= 18 && (
                    <Text style={{fontSize: 15, color: 'red'}}>
                        {`${questionTextLeft} characters left`}
                    </Text>
                )}
                <TextInput
                    style={styles.textInput}
                    onChangeText={answerText => this.onChangeAnswerText(answerText)}
                    value={answerText}
                    placeholder={'Enter the answer?'}
                    maxLength={140}
                    multiline={false}
                />
                {answerTextLeft <= 18 && (
                    <Text style={{fontSize: 15, color: 'red'}}>
                        {`${answerTextLeft} characters left`}
                    </Text>
                )}
                { (questionText !== '' && answerText !== '') && (
                    <TouchableOpacity 
                        onPress={this.submitCard} 
                        style={{marginTop: 120}} >
                        <Text style={styles.button}>
                            Create Card
                        </Text> 
                    </TouchableOpacity>
                )}
                { (questionText === '' || answerText === '') && (
                    <TouchableOpacity 
                        onPress={this.submitCard} 
                        style={{marginTop: 120}} 
                        disabled= {true}>
                        <Text style={styles.disabledButton}>
                            Create Card
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
        width: 320,
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

function mapStateToProps (decks, { navigation, route }) {
    const { deckTitle } = route.params
    return {
        deckTitle: deckTitle,
        goBack: () => navigation.goBack(),
    }
}

export default connect(mapStateToProps)(NewCard)


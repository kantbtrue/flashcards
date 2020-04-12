import React, { Component, Fragment } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { connect } from 'react-redux'
import { white, lightGreen, green, red } from '../utils/colors'
import { Foundation } from '@expo/vector-icons'
import { clearLocalNotification, setLocalNotification} from '../utils/helpers'

class Quiz extends Component {
    state = {
        currentQuestion: 0,
        cardSide: 'front',
        correctAnswers: 0,
        bounceValue: new Animated.Value(1),
    }
    render() {
        const { navigation, deck, goBack } = this.props
        const { title, questions } = deck
        const { currentQuestion, cardSide, correctAnswers, bounceValue } = this.state
        navigation.setOptions({
            title: `${title} deck quiz`
        })

        if (questions.length === 0) {
            return (
                <View style={styles.container}>
                    <Foundation name='alert' size={50}/>
                    <Text style={{fontSize: 32}}>
                        There are no cards here. Add some cards first.
                    </Text>
                </View>
            )
        }

        const quizFinished = (currentQuestion === questions.length)

        if (quizFinished) {
            Animated.sequence([
                Animated.timing(bounceValue, { duration: 100, toValue: 1.24 }),
                Animated.spring(bounceValue, { toValue: 1, friction: 4 }),
            ]).start()
            
            clearLocalNotification()
                .then(setLocalNotification)
        }

        return (
            <View style={styles.container} >
                <View style={styles.container}>
                    {(!quizFinished) && (
                        <Fragment>
                            <View style={{flex: 1}}>
                                <Text style={{fontSize: 20}}>
                                    {`Question ${currentQuestion + 1} out of ${questions.length}`}
                                </Text>
                            </View>
                            <View style={{flex: 1}}>
                                {(cardSide === 'front') && (
                                    <Text style={{fontSize: 33}}>{questions[currentQuestion].question}</Text>
                                )}
                                {(cardSide === 'back') && (
                                    <Text style={{fontSize: 33}}>{questions[currentQuestion].answer}</Text>
                                )}
                            </View>
                        </Fragment>
                    )}
                    {(quizFinished) && (
                        <View style={{flex: 1}}>
                            <Animated.Text style={{fontSize: 33, transform: [{scale: bounceValue}]}}>
                                {`You've answered ${Math.round((correctAnswers / questions.length)*100)}% questions accurately`}
                            </Animated.Text>
                        </View>
                    )}
                </View>
                <View style={styles.container}>
                    {(!quizFinished) && (
                        <Fragment>
                            {(cardSide === 'front') && (
                                <TouchableOpacity onPress={() => {
                                    this.setState(() => ({ cardSide: 'back' }))
                                }} style={{marginTop: 30}}>
                                    <Text style={styles.showAnswer}>
                                        Show Answer
                                    </Text> 
                                </TouchableOpacity>
                            )}
                            {(cardSide === 'back') && (
                                <TouchableOpacity onPress={() => {
                                    this.setState(() => ({ cardSide: 'front' }))
                                }} style={{marginTop: 30}}>
                                    <Text style={styles.showQuestion}>
                                        Show Question
                                    </Text> 
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity onPress={() => {
                                this.setState(() => (
                                    {
                                        cardSide: 'front',
                                        correctAnswers: correctAnswers + 1,
                                        currentQuestion: currentQuestion + 1
                                    }
                                ))
                            }} style={{marginTop: 30}}>
                                <Text style={styles.correct}>
                                    Correct
                                </Text> 
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState(() => (
                                    {
                                        cardSide: 'front',
                                        currentQuestion: currentQuestion + 1
                                    }
                                ))
                            }} style={{marginTop: 30}}>
                                <Text style={styles.incorrect}>
                                    Incorrect
                                </Text> 
                            </TouchableOpacity>
                        </Fragment>
                    )}
                    {(quizFinished) && (
                        <Fragment>
                            <TouchableOpacity onPress={() => {
                                this.setState(() => (
                                    {
                                        cardSide: 'front',
                                        correctAnswers: 0,
                                        currentQuestion: 0
                                    }
                                ))
                            }} style={{marginTop: 30}}>
                                <Text style={styles.restartQuiz}>
                                    Restart Quiz
                                </Text> 
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                goBack()
                            }} style={{marginTop: 30}}>
                                <Text style={styles.backToDeck}>
                                    Back to Deck
                                </Text> 
                            </TouchableOpacity>
                        </Fragment>
                    )}
                </View>
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
    showAnswer: {
        fontSize: 25, 
        color: white, 
        backgroundColor: lightGreen, 
        padding: 25,
    },
    showQuestion: {
        fontSize: 25, 
        color: white,
        backgroundColor: lightGreen, 
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 18,
        paddingRight: 16,
    },
    correct: {
        fontSize: 25, 
        color: white, 
        backgroundColor: green, 
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 58,
        paddingRight: 58,
    },
    incorrect: {
        fontSize: 25, 
        color: white, 
        backgroundColor: red, 
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 51,
        paddingRight: 51,
    },
    restartQuiz: {
        fontSize: 25, 
        color: white, 
        backgroundColor: lightGreen, 
        padding: 25,
    },
    backToDeck: {
        fontSize: 25, 
        color: white, 
        backgroundColor: lightGreen, 
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 21,
        paddingRight: 21,
    },
})

function mapStateToProps (decks, { navigation, route }) {
    const { deckTitle } = route.params
    return {
        deck: decks[deckTitle],
        goBack: () => navigation.goBack(),
    }
}

export default connect(mapStateToProps)(Quiz)
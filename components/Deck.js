import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { removeDeck } from '../actions/index'
import { removeFromDeckList } from '../utils/api'
import { gray, white, lightGreen } from '../utils/colors'

class Deck extends Component {
    deleteDeck = () =>  {  
        const { dispatch, navigation, deckTitle } = this.props
        dispatch(removeDeck(deckTitle))
        removeFromDeckList(deckTitle)
        navigation.goBack()
    }
    render() {
        const { navigation, deck } = this.props
        if ( !deck ) { return null }
        const { title, questions } = deck
        navigation.setOptions({
            title: `${title} deck`
        })
        return (
            <View style={styles.container} >
                <Text style={{fontSize: 52}}>{title}</Text>
                <Text style={{fontSize: 36, color: gray}}>
                    {questions.length} {questions.length === 1 ? 'card' : 'cards'}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate(
                    'Quiz',
                    { deckTitle: title }
                    )} style={{marginTop: 120}}>
                        <Text style={styles.button}>
                            Start Quiz
                        </Text> 
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate(
                    'NewCard',
                    { deckTitle: title }
                    )} style={{marginTop: 10}}>
                        <Text style={styles.newCardButton}>
                            Add Card
                        </Text> 
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={this.deleteDeck}
                    style={{marginTop: 10}}>
                        <Text style={styles.deleteButton}>
                            Delete Deck
                        </Text> 
                </TouchableOpacity>
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
    button: {
        fontSize: 25, 
        color: white, 
        backgroundColor: lightGreen, 
        padding: 25,
    },
    newCardButton: {
        fontSize: 25, 
        color: white, 
        backgroundColor: lightGreen, 
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 28,
        paddingRight: 28,
    },
    deleteButton: {
        fontSize: 25, 
        color: white, 
        backgroundColor: lightGreen, 
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 13,
        paddingRight: 13,
    }
})


function mapStateToProps (decks, { navigation, route }) {
    
    const { deckTitle } = route.params
    
    return {
        deckTitle: deckTitle,
        deck: decks[deckTitle],
        
        goBack: () => navigation.goBack(),
    }
}

export default connect(mapStateToProps)(Deck)
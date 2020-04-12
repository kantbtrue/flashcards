import React, { Component } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity, Animated } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { getDecks } from '../utils/api'
import { AppLoading } from 'expo'
import { gray, white } from '../utils/colors'
import { useNavigation } from '@react-navigation/native'

function Decks ({ title, questions }) {
    const navigation = useNavigation()
    const bounceValue = new Animated.Value(1)
    return (
        <TouchableOpacity onPress={() => {
            Animated.sequence([
                Animated.timing(bounceValue, { duration: 100, toValue: 1.24 }),
                Animated.spring(bounceValue, { toValue: 1, friction: 4 }),
            ]).start(() => {navigation.navigate('Deck', { deckTitle: title })})
            }
        }>
            <View style={styles.item}>
                <Animated.Text 
                    style={[styles.title, {transform: [{scale: bounceValue}]}]}>
                        {title} 
                </Animated.Text>
                <Animated.Text  style={{fontSize: 32, color: gray, transform: [{scale: bounceValue}]}} >
                    {questions.length} {questions.length === 1 ? 'card' : 'cards'}
                </Animated.Text>
            </View>
        </TouchableOpacity>
    )
}

class DeckList extends Component {
    state = {
        isReady: false,
    }
    componentDidMount() {
        const { dispatch } = this.props
        getDecks()
            .then((decks) => dispatch(receiveDecks(decks)))
            .then(() => this.setState(() => ({
                isReady: true,
            })))
    }
    renderItem = ({ item }) => {
        return <Decks {...item} />
    }
    render() {
        const { decks } = this.props
        const { isReady } = this.state

        if (isReady === false) {
            return <AppLoading />
        }
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={decks}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 3,
        }
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
    },
})

function mapStateToProps (decks) {
    const keyedValuesDecks = Object.values(decks).map((deck) => {
        return {
            ...deck,
            key: deck.title,
        }
    }) 
    return {
        decks: keyedValuesDecks.sort((a,b) => b.title < a.title),
    }
} 

export default connect(mapStateToProps)(DeckList)
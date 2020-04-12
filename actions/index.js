export const ADD_DECK = 'ADD_DECK'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_DECK = 'REMOVE_DECK'

export function addDeck (deck) {
    return {
        type: ADD_DECK,
        deck,
    }
}

export function receiveDecks (decks) {
    return {
        type: RECEIVE_DECKS,
        decks,
    }
}

export function addCard (title, card) {
    return {
        type: ADD_CARD,
        title,
        card,
    }
}

export function removeDeck (title) {
    return {
        type: REMOVE_DECK,
        title,
    }
}


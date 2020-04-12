import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, REMOVE_DECK } from '../actions'

export default function decks (state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS :
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK :
            return {
                ...state,
                ...action.deck
            }
        case ADD_CARD :
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    questions: state[action.title].questions.concat([action.card])
                }
            }
        case REMOVE_DECK :
            return Object.keys(state).
                        filter(key => key !== action.title).
                        reduce((obj, key) => {
                            obj[key] = state[key]
                            return obj
                        }, {})
        default :
            return state
    }
}
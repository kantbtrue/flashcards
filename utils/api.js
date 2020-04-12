import { AsyncStorage } from 'react-native'
import { deckData } from './_DATA'

export const FLASHCARDS_STORAGE_KEY = 'FlashCards'

export function getDecks () {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        .then(function (res) {
            if (res === null) {
                AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(deckData))
                return deckData;
            } else {
                return JSON.parse(res);
            }
        })
}

export function getDeck (id) {
    return getDecks()
            .then((decks) => decks[id])
}

export function saveDeckTitle (title) {
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title: title,
            questions: [],
        },
    }))
}

export function addCardToDeck (title, card) {
    getDeck(title).then((deck) => {
        return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
            [title]: {
                title: title,
                questions: deck.questions.concat([card]),
            },
        }))
    })
}

export function removeFromDeckList (title) {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[title] = undefined
            delete data[title]
            AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
        })
} 
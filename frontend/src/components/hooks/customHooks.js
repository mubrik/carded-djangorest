import React from 'react';
import CardBody from '../cards/CardBody'
import DeckItem from '../decks/DeckItem'

const useCreateDeck = (listObj) => {

    let tabledDeck = [];
    if (listObj.length >= 0) {
        tabledDeck = listObj.map((deck) => {
            return {value: deck['id'], label: deck['name'] }
        })
        return tabledDeck
    } else {
        return tabledDeck
    }
}

const useCardsCreator = (listObj) => {

    if (listObj === null || listObj === undefined) return null
    if (listObj.length === 0 ) return []
    console.log(listObj)
    let cards = listObj.map((item) => {
        return <CardBody key={item} id={item}/>
    })

    return cards;

}

const useDecksCreator = (listObj) => {

    if (listObj === null || listObj === undefined) return null
    if (listObj.length === 0 ) return null

    let cards = listObj.map((item) => {
        return <DeckItem key={item} id={item}/>
    })

    return cards;
}

export {useCreateDeck, useCardsCreator, useDecksCreator}
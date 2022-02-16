const cardsInOneDeck = 52;
const deckRanks = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
];
const suits = ["Spade", "Club", "Diamond", "Heart"];

function suitToHtmlCode(suit) {
    switch (suit) {
        case "Spade":
            return "&#9824;";
            break;
        case "Club":
            return "&#9827;";
            //return "♣️";
            break;
        case "Diamond":
            return "&#9830;";
            break;
        case "Heart":
            return "&#9829;";
            break;
    }
}

class Card {
    constructor(suit, rank, value) {
        //suit: club, etc, rank: 9,10,J,Q,K,A, value: 10 for face cards
        (this.suit = suit), (this.rank = rank); //,(this.value = value);
    }
}

class Deck {
    constructor() {
        this.cards = [];
        this.createDeck();
    }

    createDeck() {
        for (let i = 0; i < cardsInOneDeck / 4; i++) {
            for (let j = 0; j < 4; j++) {
                this.cards.push(new Card(suits[j], deckRanks[i]));
            }
        }
    }
    printDeck() {
        this.cards.forEach((card) => {
            console.log(card);
        });
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    shuffleDeck() {
        let currentDeck = this.cards;
        let shuffledDeck = [];

        while (currentDeck.length > 0) {
            let randomNum = this.getRandomInt(currentDeck.length);
            shuffledDeck.push(currentDeck[randomNum]);
            currentDeck.splice(randomNum, 1);
        }
        //console.log(shuffledDeck);
        this.cards = shuffledDeck;
    }
}

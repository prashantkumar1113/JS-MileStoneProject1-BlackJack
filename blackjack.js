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

    createDeck(numOfDecks) {
        for (let i = 0; i < cardsInOneDeck / 4; i++) {
            this.cards.push(new Card(suits[0], deckRanks[i]));
            this.cards.push(new Card(suits[1], deckRanks[i]));
            this.cards.push(new Card(suits[2], deckRanks[i]));
            this.cards.push(new Card(suits[3], deckRanks[i]));
        }
    }
    printDeck() {
        this.cards.forEach((card) => {
            console.log(card);
        });
    }

    //shuffleDeck
}

let bjDeck = new Deck();
bjDeck.printDeck();

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

    createDeck(numOfDecks) {
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

// class BlackjackDeck extends Deck {
//     constructor() {
//         super();
//     }
//     getHandValue(playerHand) {
//         console.log(playerHand);
//     }
// }

class BlackjackGame {
    constructor(bankRoll) {
        this.bankRoll = bankRoll;
        this.playerHand = [];
        this.dealerHand = [];
        this.deck = new Deck();
        this.deck.shuffleDeck();
    }
    //Need to grab DOM elements to append to

    getHandValue(playerHand) {
        console.log(playerHand);
        let handValue = 0;
        playerHand.forEach((card) => {
            if (card.rank === "K" || card.rank === "Q" || card.rank === "J") {
                handValue += 10;
            } else if (card.rank === "A") {
                handValue += 11;
            } else {
                handValue += parseInt(card.rank);
            }
        });

        return handValue;
    }

    displayHand(cards, domElement, isDealersFirstHand) {
        let currentCards = [...cards];
        console.log(currentCards);
        domElement.innerHTML = "";

        //hide one of the dealers cards
        if (isDealersFirstHand) {
            currentCards.pop();
            let cardElement = document.createElement("div");
            cardElement.className = "card card-back";
            cardElement.innerHTML = `
            <div class='card-header'> \` </div>
            <div class='card-body'> ' </div>
            <div class='card-footer'> \` </div>`;
            domElement.appendChild(cardElement);
        }
        currentCards.forEach((card) => {
            let cardElement = document.createElement("div");
            if (card.suit === "Diamond" || card.suit === "Heart") {
                cardElement.className = "card red"; //${card.suit.toLowerCase()}
            } else {
                cardElement.className = "card";
            }
            cardElement.innerHTML = `
            <div class='card-header'>${card.rank}</div>
             <div class='card-body'>
                <span class='suit'>${suitToHtmlCode(card.suit)}</span>
             </div>
             <div class='card-footer'>${card.rank}</div>`;
            domElement.appendChild(cardElement);
        });
    }

    playGame() {
        //first move
        this.playerHand.push(this.deck.cards.pop());
        this.dealerHand.push(this.deck.cards.pop());
        this.playerHand.push(this.deck.cards.pop());
        this.dealerHand.push(this.deck.cards.pop());
        //console.log(this.playerHand);
        //console.log(this.dealerHand);

        //player gets to hit or stay
        const playerHandDiv = document.getElementById("player-hand");
        this.displayHand(this.playerHand, playerHandDiv, false);
        const dealerHandDiv = document.getElementById("dealer-hand");
        this.displayHand(this.dealerHand, dealerHandDiv, true);

        //wire up the control buttons
        const hitButton = document.getElementById("hit-button");
        const stayButton = document.getElementById("stay-button");
        const betButtons = document.querySelectorAll(".bet");

        hitButton.addEventListener("click", (e) => {
            // alert("Hit button clicked");
            this.playerHand.push(this.deck.cards.pop());
            this.displayHand(this.playerHand, playerHandDiv, false);
        });
        stayButton.addEventListener("click", (e) => {
            alert("Stay button clicked");
        });
        betButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                console.log(button.value);
            });
        });

        console.log("Player Value: " + this.getHandValue(this.playerHand));
        console.log("Dealer Value: " + this.getHandValue(this.dealerHand));
        //then dealer turn
    }
}

let game = new BlackjackGame(1000);
game.playGame();

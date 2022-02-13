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
    }

    displayHand(cards, domElement) {
        cards.forEach((card) => {
            let cardElement = document.createElement("div");
            if (card.suit === "Diamond" || card.suit === "Heart") {
                cardElement.className = "card red"; //${card.suit.toLowerCase()}
            } else {
                cardElement.className = "card";
            }
            //create the card header
            let cardHeader = document.createElement("div");
            cardHeader.className = "card-header";
            cardHeader.appendChild(document.createTextNode(card.rank));
            cardElement.appendChild(cardHeader);

            //create the card body
            let cardBody = document.createElement("div");
            cardBody.className = "card-body";
            let suitSpan = document.createElement("span");
            suitSpan.className = "suit";
            suitSpan.textContent = card.suit.charAt(0);
            cardBody.appendChild(suitSpan);
            cardElement.appendChild(cardBody);

            //create the card footer
            let cardFooter = document.createElement("div");
            cardFooter.className = "card-footer";
            cardFooter.appendChild(document.createTextNode(card.rank));
            cardElement.appendChild(cardFooter);

            // cardElement.textContent = `${card.rank} ${suitToHtmlCode(
            //     card.suit
            // )}`;

            domElement.appendChild(cardElement);
        });
    }

    playGame() {
        //first move
        this.playerHand.push(this.deck.cards.pop());
        this.dealerHand.push(this.deck.cards.pop());
        this.playerHand.push(this.deck.cards.pop());
        this.dealerHand.push(this.deck.cards.pop());
        console.log(this.playerHand);
        console.log(this.dealerHand);

        //wire up the control buttons
        const hitButton = document.getElementById("hit-button");
        const stayButton = document.getElementById("stay-button");
        const betButtons = document.querySelectorAll(".bet");

        hitButton.addEventListener("click", (e) => {
            alert("Hit button clicked");
        });
        stayButton.addEventListener("click", (e) => {
            alert("Stay button clicked");
        });
        betButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                console.log(button.value);
            });
        });

        //player gets to hit or stay
        const playerHandDiv = document.getElementById("player-hand");
        this.displayHand(this.playerHand, playerHandDiv);
        const dealerHandDiv = document.getElementById("dealer-hand");
        this.displayHand(this.dealerHand, dealerHandDiv);

        //then dealer turn
    }
}

let game = new BlackjackGame(1000);
game.playGame();

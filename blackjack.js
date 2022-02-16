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
        let currentHand = [...playerHand];
        let handValue = 0;

        currentHand.forEach((card, i) => {
            if (card.rank === "A") {
                let removedCard = currentHand.splice(i, 1);
                currentHand.push(removedCard[0]);
            }
        });
        console.log(currentHand);

        currentHand.forEach((card) => {
            if (card.rank === "K" || card.rank === "Q" || card.rank === "J") {
                handValue += 10;
            } else if (card.rank === "A") {
                if (handValue + 11 > 21) {
                    handValue += 1;
                } else {
                    handValue += 11;
                }
            } else {
                handValue += parseInt(card.rank);
            }
        });

        return handValue;
    }

    displayHandValue(playerHand, domElement) {
        //console.log(playerHand, domElement);
        domElement.textContent = " Value : " + this.getHandValue(playerHand);
    }

    displayHand(cards, domElement, isDealersFirstHand) {
        let currentCards = [...cards];
        //console.log(currentCards);
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
        const playerStatusElement = document.getElementById("player-status");
        //first move
        this.playerHand.push(this.deck.cards.pop());
        this.dealerHand.push(this.deck.cards.pop());
        this.playerHand.push(this.deck.cards.pop());
        this.dealerHand.push(this.deck.cards.pop());
        // console.log(this.playerHand);
        console.log("Dealer hand: " + this.dealerHand);

        //Display hands
        const playerHandDiv = document.getElementById("player-hand");
        this.displayHand(this.playerHand, playerHandDiv, false);
        this.displayHandValue(this.playerHand, playerStatusElement);
        const dealerHandDiv = document.getElementById("dealer-hand");
        this.displayHand(this.dealerHand, dealerHandDiv, true);

        //wire up the control buttons
        const hitButton = document.getElementById("hit-button");
        const stayButton = document.getElementById("stay-button");
        const betButtons = document.querySelectorAll(".bet");

        hitButton.addEventListener("click", (e) => {
            this.playerHand.push(this.deck.cards.pop());
            this.displayHand(this.playerHand, playerHandDiv, false);
            this.displayHandValue(this.playerHand, playerStatusElement);
        });
        stayButton.addEventListener("click", (e) => {
            alert("Stay button clicked");
            //Dealer turn
        });
        betButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                console.log(button.value);
            });
        });

        // console.log("Player Value: " + this.getHandValue(this.playerHand));
        // console.log("Dealer Value: " + this.getHandValue(this.dealerHand));
        //then dealer turn
    }
}

let game = new BlackjackGame(1000);
game.playGame();

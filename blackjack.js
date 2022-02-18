//Need to grab DOM elements to append to
const dealButton = document.getElementById("deal-button");
const hitButton = document.getElementById("hit-button");
const stayButton = document.getElementById("stay-button");
const betButtons = document.querySelectorAll(".bet");
const statuses = document.querySelectorAll(".status");
const playerHandDiv = document.getElementById("player-hand");
const dealerHandDiv = document.getElementById("dealer-hand");
const playerStatusElement = document.getElementById("player-status");
const dealerStatusElement = document.getElementById("dealer-status");
const instructions = document.getElementById("instructions");
const bankRollElement = document.getElementById("bankroll");

class BlackjackGame {
    constructor(bankRoll) {
        this.bankRoll = bankRoll;
        this.newDeal();
    }

    getHandValue(playerHand) {
        let currentHand = [...playerHand];
        let handValue = 0;

        currentHand.forEach((card, i) => {
            if (card.rank === "A") {
                let removedCard = currentHand.splice(i, 1);
                currentHand.push(removedCard[0]);
            }
        });

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

    displayHand(cards, playerType, isDealersFirstHand) {
        let currentCards = [...cards];
        let domElement;

        if (playerType === "player") {
            domElement = playerHandDiv;
        } else {
            domElement = dealerHandDiv;
        }
        domElement.innerHTML = "";

        //hide one of the dealers cards
        if (isDealersFirstHand) {
            currentCards.shift();
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
                cardElement.className = "card red";
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

        if (playerType === "player") {
            this.displayHandValue(currentCards, playerStatusElement);
        } else {
            this.displayHandValue(currentCards, dealerStatusElement);
        }
    }

    displayHandValue(playerHand, domElement) {
        domElement.textContent = " Value: " + this.getHandValue(playerHand);
    }

    //and bets
    updateStatus(statusMessage, gameEnding, isBlackjack) {
        if (isBlackjack) {
            this.betAmount *= 1.5;
        }
        //player wins, dealer wins, push
        switch (gameEnding) {
            case "player wins":
                //can add localStorage here
                this.bankRoll += this.betAmount;
                break;
            case "dealer wins":
                this.bankRoll -= this.betAmount;
                break;
        }
        instructions.innerHTML = statusMessage;
        bankRollElement.textContent = `$${this.bankRoll}`;

        this.newDeal();
    }

    getStats() {
        console.log("Deck");
        console.log(this.deck);
        console.log("Player hand");
        console.log(this.playerHand);
        console.log("Dealer hand");
        console.log(this.dealerHand);
    }

    newDeal() {
        // intialize the Bankroll and the bet
        // hide the deal and beat buttons
        // make visible hit and stay (and split)
        this.playerHand = [];
        this.dealerHand = [];
        this.deck = new Deck();
        this.deck.shuffleDeck();
        this.betAmount = 0;
        this.startGameView();
    }

    playerTurn() {
        //first move
        this.playerHand.push(this.deck.cards.pop());
        this.dealerHand.push(this.deck.cards.pop());
        this.playerHand.push(this.deck.cards.pop());
        this.dealerHand.push(this.deck.cards.pop());

        //Display hands
        this.displayHand(this.playerHand, "player", false);
        this.displayHand(this.dealerHand, "dealer", true);
        this.checkForBlackjack();
    }

    dealerTurn() {
        this.dealerGameView();
        this.displayHand(this.dealerHand, "dealer", false);

        while (this.getHandValue(this.dealerHand) < 17) {
            this.dealerHand.push(this.deck.cards.pop());
            this.displayHand(this.dealerHand, "dealer", false);
        }
        let playerHandValue = this.getHandValue(this.playerHand);
        let dealerHandValue = this.getHandValue(this.dealerHand);

        if (dealerHandValue > 21) {
            this.updateStatus("Dealer Busts. You Win.", "player wins", false);
        } else if (playerHandValue === dealerHandValue) {
            this.updateStatus("It's a tie. You Push.", "push", false);
        } else if (playerHandValue > dealerHandValue) {
            this.updateStatus("You Win.", "player wins", false);
        } else {
            this.updateStatus("Dealer Wins.", "dealer wins", false);
        }
    }

    checkForBlackjack() {
        let playerHandValue = this.getHandValue(this.playerHand);
        let dealerHandValue = this.getHandValue(this.dealerHand);

        if (playerHandValue === 21 && dealerHandValue === 21) {
            this.displayHand(this.dealerHand, "dealer", false);
            this.updateStatus("Both have Blackjack Push", "push", false);
        } else if (playerHandValue === 21) {
            this.displayHand(this.dealerHand, "dealer", false);
            this.updateStatus(
                "You have Blackjack! You win.",
                "player wins",
                true
            );
        } else if (dealerHandValue === 21) {
            this.displayHand(this.dealerHand, "dealer", false);
            this.updateStatus(
                "Dealer has Blackjack! You lose.",
                "dealer wins",
                false
            );
        }
    }
    checkForPlayerWin() {
        let playerHandValue = this.getHandValue(this.playerHand);

        if (playerHandValue === 21) {
            this.dealerTurn();
        } else if (playerHandValue > 21) {
            this.displayHand(this.dealerHand, "dealer", false);
            this.updateStatus("You busted! You lose.", "dealer wins", false);
        }
    }

    playerGameView() {
        console.log("in player view");
        dealButton.style.visibility = "hidden";
        hitButton.style.visibility = "visible";
        stayButton.style.visibility = "visible";
        betButtons.forEach((button) => {
            button.style.visibility = "hidden";
        });
        statuses.forEach((status) => {
            status.style.visibility = "visible";
        });
    }
    dealerGameView() {
        console.log("in dealer view");
        hitButton.style.visibility = "hidden";
        stayButton.style.visibility = "hidden";
    }
    startGameView() {
        console.log("in start view");
        dealButton.style.visibility = "visible";
        this.dealerGameView();
        dealButton.disabled = true;
        betButtons.forEach((button) => {
            button.style.visibility = "visible";
        });
    }
}

let game = new BlackjackGame(1000);
//wire up the control buttons
statuses.forEach((status) => {
    status.style.visibility = "hidden";
});
dealButton.addEventListener("click", (e) => {
    game.playerGameView();
    instructions.innerHTML = "Your bet is $" + game.betAmount;
    game.playerTurn();
});
betButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        game.betAmount += parseInt(button.value);
        dealButton.disabled = false;
        console.log(game.betAmount);
        instructions.innerHTML = "Your bet is $" + game.betAmount;
    });
});
hitButton.addEventListener("click", (e) => {
    game.playerHand.push(game.deck.cards.pop());
    game.displayHand(game.playerHand, "player", false);
    game.checkForPlayerWin();
});
stayButton.addEventListener("click", (e) => {
    game.dealerTurn();
});

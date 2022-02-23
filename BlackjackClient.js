const ws = new WebSocket("ws://localhost:8001");
// const playerHandDiv = document.getElementById("player-hand");
// const dealerHandDiv = document.getElementById("dealer-hand");
const numberOfPlayersDiv = document.getElementById("num-of-players");

// const Deck = require("./deck.js");

ws.addEventListener("open", () => {
    console.log("We are running!");
    // ws.send("Hey, how's it going?");
});

ws.addEventListener("message", ({data}) => {
    // let cards = JSON.parse(data);
    // console.log(cards);
    numberOfPlayersDiv.innerHTML = "Waiting for Players: " + data;
});

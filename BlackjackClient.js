const ws = new WebSocket("ws://localhost:8001");
// const playerHandDiv = document.getElementById("player-hand");
// const dealerHandDiv = document.getElementById("dealer-hand");
const numberOfPlayersDiv = document.getElementById("num-of-players");
const playerIdDiv = document.getElementById("player-id");
const startButton = document.getElementById("start-button");

class GameCommand {
    constructor(action, data) {
        this.action = action; //hit, stay, id, total, start
        this.data = data;
    }
}
let playerId = 0;
// const Deck = require("./deck.js");

ws.addEventListener("open", () => {
    console.log("We are running!");
    // ws.send("Hey, how's it going?");
});

ws.addEventListener("message", ({data}) => {
    console.log(data);
    let command = JSON.parse(data);
    console.log(command);

    switch (command.action) {
        case "id":
            playerId = command.data;
            playerIdDiv.innerHTML = "I am Player " + playerId;
            // console.log(playerId);
            break;
        case "total":
            numberOfPlayersDiv.innerHTML =
                "Waiting for Players: " + command.data;
            break;
        case "start":
            startButton.style.visibility = "hidden";
            break;
        case "hands":
            console.log(command.data);
            break;
        default:
            console.log("Invalid Command!");
    }
});

startButton.addEventListener("click", (e) => {
    ws.send(`{"action": "start"}`);
    // startButton.style.visibility = "hidden";
});

// const WebSocket = require("ws");
import WebSocket, {WebSocketServer} from "ws";
import Deck from "./deck.js";

const wss = new WebSocketServer({port: 8001});
// const wss2 = new WebSocketServer({port: 8002});
let numberOfPlayers = 0;
let GameDeck = new Deck();
GameDeck.shuffleDeck();
wss.on("connection", (ws) => {
    numberOfPlayers++;
    console.log(
        "New Client connnected! Number of players = " + numberOfPlayers
    );
    wss.clients.forEach((client) => {
        client.send(numberOfPlayers);
    });
    ws.on("message", (data) => {
        console.log("Client has sent us: " + data);
    });

    let card = JSON.stringify(GameDeck.cards);
    //console.log(card);
    ws.send(numberOfPlayers);

    ws.on("close", () => {
        console.log("Client has disconnnected!");
    });
});

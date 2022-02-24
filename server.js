// const WebSocket = require("ws");
import WebSocket, {WebSocketServer} from "ws";
import Deck from "./deck.js";
import Player from "./player.js";

const wss = new WebSocketServer({port: 8001});
// const wss2 = new WebSocketServer({port: 8002});
let numberOfPlayers = 0;
let players = [];
let GameDeck = new Deck();
GameDeck.shuffleDeck();
wss.on("connection", (ws) => {
    numberOfPlayers++;
    console.log(
        "New Client connnected! Number of players = " + numberOfPlayers
    );
    ws.send(`{"action": "id", "data": "${numberOfPlayers}"}`);

    wss.clients.forEach((client) => {
        client.send(`{"action": "total", "data": "${numberOfPlayers}"}`);
    });
    // ws.send(ws);
    //console.log(ws);
    ws.on("message", (data) => {
        let {action} = JSON.parse(data);
        console.log("Client has sent us: " + action);
        switch (action) {
            case "start":
                wss.clients.forEach((client) => {
                    client.send(`{"action": "start"}`);
                });

                //deal the cards
                //create dealer
                let dealer = new Player();
                players.push(dealer);

                //create the other players
                for (let i = 0; i < numberOfPlayers; i++) {
                    let newPlayer = new Player(1000);
                    players.push(newPlayer);
                }

                players.forEach((player) => {
                    player.cards.push(GameDeck.cards.pop());
                });
                players.forEach((player) => {
                    player.cards.push(GameDeck.cards.pop());
                });
                let handsCommand = `{"action":"hands","data":${JSON.stringify(
                    players
                )}}`;
                wss.clients.forEach((client) => {
                    client.send(handsCommand);
                });
                break;
            default:
                console.log("invalid command!");
        }
    });

    //console.log(card);
    //  ws.send(numberOfPlayers);

    ws.on("close", () => {
        console.log("Client has disconnnected!");
    });
});

# [WIP] Message-Router

The Message Routing Service allows other services to publish messages to clients, without the client needing to maintain an active connection to every single service. The Message Router maintains a websocket connection with the client, and exposes a simple API for other Services to interact with.

### Problem Scenario, or, Why this Service Exists:
A group of players have formed a party together (via the match-making service). The host of the party indicates that they are ready, and the party is moved into the queued state. The match maker does its thing, finds a suitable match, and needs to convey this information to each of the party members. 

Instead of the Match Maker maintaining a persistent connection to each of these players (which would get out of hand as the number of services grows), it can utilize the Message Router's API.

'use strict';

const _ = require('lodash');


class ConnectionManager {
    constructor() {
        this.connections = {};
    }

    addConnection(playerId, socket) {
        this.connections[playerId] = socket;
    }

    removeConnection(socket) {
        for(let playerId in this.connections) {
            if(this.connections[playerId] === socket) {
                delete this.connections[playerId];
            }
        }
    }

    sendMessage(recipient, message) {
        if(!this.connections.hasOwnProperty(recipient)) {
            return;
        }

        this.connections[recipient].emit('message', message);
    }
}

module.exports = new ConnectionManager();
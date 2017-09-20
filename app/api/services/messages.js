'use strict';

const connectionManager = require('../../connection_manager');
const _ = require('lodash');

exports.publishMessage = function(args, res, next) {
    /**
     * Publish a message to the provided recipients
     *
     * @path: POST - /messages/
     * @param: message - Message - message to publish
     * @returns: status - 201 - Message - The published message
    **/

    const message = args.message.value;

    if(!message.hasOwnProperty('recipients')) {
        res.status(400).send();
        next();
    }

    _.forEach(message.recipients, function(recipient) {
        connectionManager.sendMessage(recipient, _.omit(message, 'recipients'));
    });

    res.status(203).send();
    next();
};
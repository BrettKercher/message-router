'use strict';

const url = require('url');
const Messages = require('../services/messages');

module.exports.publishMessage = function publishMessage (req, res, next) {
    Messages.publishMessage(req.swagger.params, res, next);
};

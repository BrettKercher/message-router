const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const swaggerExpress = require('swagger-express-mw');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const connectionManager = require('./app/connection_manager');

app.use(bodyParser.json());
app.use(cors());

const swaggerConfig = {
    appRoot: __dirname,
    swaggerFile: __dirname + '/app/api/swagger/swagger.yaml'
};

swaggerExpress.create(swaggerConfig, function(err, swaggerExpress) {
    if (err) { throw err; }

    swaggerExpress.register(app);

    const port = process.env.PORT || 5001;
    http.listen(port, 'localhost', function() {
        console.log('Message Routing Server Listening on port ' + port);
    });
});

io.on('connection', function(socket) {

    socket.on('auth', function(msg) {
        const playerUUID = msg.uuid;
        connectionManager.addConnection(playerUUID, socket);
    });

    socket.on('disconnect', function() {
        connectionManager.removeConnection(socket);
    });

});
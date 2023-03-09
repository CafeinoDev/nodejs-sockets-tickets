const express = require('express');
const cors = require('express');
const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app    = express();
        this.PORT   = process.env.PORT;
        this.server = require('http').createServer( this.app );
        this.io     = require('socket.io')( this.server );

        this.paths = {};

        // Middlewares
        this.middlewares();

        // Routes
        this.routes(); 

        // Sockets
        this.sockets();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Public directory
        this.app.use( express.static('public') );
    }

    routes() {

        // this.app.use( this.paths.auth, require('../routes/auth') );
          
    }

    sockets() {
        this.io.on('connection', socketController);
    }

    listen() {
        this.server.listen(this.PORT, () => {
            console.log('Server running on port: ', this.PORT)
        });

    }

}

module.exports = Server;
const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit( 'last-ticket', 'Ticket ' + ticketControl.last );
    socket.emit( 'actual-status', ticketControl.lastFour );
    socket.emit('pending-tickets', ticketControl.tickets.length);

    // Pending tickets
    // socket.on( 'pending-tickets', (payload, callback) => {
    //     callback(ticketControl.tickets.length);
    // })

    socket.on( 'next-ticket', ( payload, callback ) => {
        const next = ticketControl.nextTicket();

        callback( next );
        
        socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);

    })

    socket.on( 'answer-ticket', ({ desktop }, callback) => {
        if( !desktop ){
            return callback({
                ok: false,
                msg: 'Desktop is required'
            })
        }

        const ticket = ticketControl.answerTicket( desktop );

        socket.broadcast.emit( 'actual-status', ticketControl.lastFour );

        socket.emit('pending-tickets', ticketControl.tickets.length);
        socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);

        if( !ticket ){
            return callback({
                ok: false,
                msg: 'There is not pending tickets'
            })
        }else{
            callback({
                ok: true,
                ticket
            })
        }

    })
}

module.exports = {
    socketController,
}
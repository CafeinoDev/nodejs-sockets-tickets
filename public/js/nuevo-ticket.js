//HTML Refs
const lblNewTicket = document.getElementById('lblNuevoTicket')
const btnCreate    = document.querySelector('button')

const socket = io();

socket.on('connect', () => {
    btnCreate.disabled = false;
});

socket.on('disconnect', () => {
    btnCreate.disabled = true;
});

socket.on('last-ticket', (payload) => {
    lblNewTicket.innerText = payload;
})

btnCreate.addEventListener( 'click', () => {
    
    socket.emit( 'next-ticket', null, ( ticket ) => {
        lblNewTicket.innerText = ticket;
    });

});

console.log('Nuevo Ticket HTML');
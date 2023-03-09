// HTML refs
const lblDesktop = document.querySelector('h1');
const btnAnswer  = document.querySelector('button'); 
const lblTicket  = document.querySelector('small');
const divAlert   = document.querySelector('.alert');
const lblPending = document.querySelector('#lblPendientes');

const socket = io();



const searchParams = new URLSearchParams( window.location.search );

if( !searchParams.has('escritorio') ){
    window.location = '/';
    throw new Error('Desktop is required')
}

const desktop = searchParams.get('escritorio');
lblDesktop.innerText = desktop;

socket.on('connect', () => {
    btnAnswer.disabled = false;
    divAlert.style.display = 'none';
});

socket.on('disconnect', () => {
    btnAnswer.disabled = true;
});

socket.on('pending-tickets', (payload) => {
    lblPending.innerText = payload;
})


socket.on('last-ticket', (payload) => {
    // lblNewTicket.innerText = payload;
})

btnAnswer.addEventListener( 'click', () => {
    
    socket.emit( 'answer-ticket', { desktop }, ( { ok, ticket, msg } ) => {
        if( !ok ){
            lblTicket.innerText = `Nadie`;
            return divAlert.style.display = '';
        }

        lblTicket.innerText = `Ticket ` + ticket.number;
    })
    // socket.emit( 'next-ticket', null, ( ticket ) => {
    //     lblNewTicket.innerText = ticket;
    // });

});

console.log('Nuevo Ticket HTML');
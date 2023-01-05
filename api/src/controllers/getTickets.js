const {Ticket} = require("../db");
const qrCode = require("qrcode");



const getTickets = async(userId) =>{

    const ticket = await Ticket.findAll({

        where:{usersId: userId}
    });

    let ticketUser = [];

    const qrGenerate = async text => {

        try {
            const qr = await qrCode.toDataURL(text);

            for(let i=0; i<ticket.length; i++){

                console.log("ticketid", ticket[i].id);
                console.log("qr::::", qr);

                ticketUser.push({
                    ticket: ticket[i],
                    QR: qr
                });

            };

        } catch (error) {
            
            console.log(error);
        }
    }
    
    for(let i=0; i<ticket.length; i++){   // invoco la funcion por cada ticket que me traje de la BD y le paso la data que va a tener el QR
                                     
        qrGenerate(`                      
            event: ${ticket[i].name},
            price: ${ticket[i].price},
            typeTicket: ${ticket[i].typeTicket},
            usersId: 01,
            ticketId: ${ticket[i].id}
        `);
    };


    return ticketUser;

};

module.exports = getTickets;
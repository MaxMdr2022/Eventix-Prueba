const {Ticket} = require("../db");
const qrCode = require("qrcode");



const getTickets = async(userId) =>{

    const ticket = await Ticket.findAll({

        where:{usersId: userId}
    });

//     let ticketUser = [];

//     const qrGenerate = async text => {

//         try {
//             let qr = await qrCode.toDataURL(text);

//             // for(let i=0; i<ticket.length; i++){

//                 console.log("ticketfuncion", ticket[0]);
//                 console.log("qr::::", qr);

//                 ticketUser.push(qr);
// // {
// //                     ticket: ticket[i],
// //                     QR: qr
// //                 }
//             // };

//             return qr


//         } catch (error) {
            
//             console.log(error);
//         }
//     };
    
    // for(let i=0; i<ticket.length; i++){   // invoco la funcion por cada ticket que me traje de la BD y le paso la data que va a tener el QR
                                     
    //     qrGenerate(`                      
    //         event: ${ticket[i].event},
    //         price: ${ticket[i].price},
    //         typeTicket: ${ticket[i].typeTicket},
    //         usersId: 01,
    //         ticketId: ${ticket[i].id}
    //     `);
    //     console.log("ticketevent:", ticket[i].event);
    // };
    // qrGenerate("hola")



    // si no encontro tickets que mande un erro
    //console.log("ticket getTicket", ticket);

    if(!ticket.length > 0){

        return "No tickets"
    };
    
    return ticket;

};

module.exports = getTickets;
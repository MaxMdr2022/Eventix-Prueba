const {Ticket} = require("../db");

const getTickets = async(userId) =>{

    const ticket = await Ticket.findAll({

        where:{usersId: userId}
    });

    return ticket;

};

module.exports = getTickets;
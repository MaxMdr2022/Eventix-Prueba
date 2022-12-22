const {Event} = require("../db");

const createEvent = async(req) =>{

    const {name, date, image, location, price, description} = req;

    await Event.create({

        name,
        date,
        image,
        location,
        price,
        description
    })
};

module.exports = createEvent;
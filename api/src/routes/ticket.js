const {Router} = require("express");
const getTickets= require("../controllers/getTickets");

const route = Router();


route.get("/:userId", async(req,res)=>{

    try {
        
        const {userId} = req.params;


        const ticket = await getTickets(Number(userId));
        console.log("tickets ruta:" ,ticket);

        ticket? res.status(200).json(ticket) : res.status(400).send("No ticket");

    } catch (error) {
        
        res.status(500).send(error.message);
    }
});

module.exports= route;

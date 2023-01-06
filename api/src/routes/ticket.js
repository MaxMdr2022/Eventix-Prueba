const {Router} = require("express");
const getTickets= require("../controllers/getTickets");
const qrCode = require("qrcode");


const route = Router();


route.get("/:userId", async(req,res)=>{

    try {
        
        const {userId} = req.params;


        // const ticket = await getTickets(Number(userId));


        const qrGenerate = async text => {

            try {
                let qr = await qrCode.toDataURL(text);

    
                // console.log("ticketfuncion", ticket[0]);
                console.log("qr::::", qr);
 
                return res.status(200).json(qr)
    
    
            } catch (error) {
                
                console.log(error);
            }
        };

        qrGenerate("hola")

        // console.log("tickets ruta:" ,ticket);

        // ticket? res.status(200).json(ticket) : res.status(400).send("No ticket");

    } catch (error) {
        
        res.status(500).send(error.message);
    }
});

module.exports= route;

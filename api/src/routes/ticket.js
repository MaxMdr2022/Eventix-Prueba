const {Router} = require("express");
const getTickets= require("../controllers/getTickets");
const qrCode = require("qrcode");


const route = Router();


route.get("/:userId", async(req,res)=>{

    try {
        
        const {userId} = req.params;


        const ticket = await getTickets(Number(userId));

        let ticketUser = []

        console.log("largoo",ticket.length);
        
for(let i=0; i<ticket.length; i++){ 

        const qrGenerate = async text => {

            try {

            //    for(let i=0; i<ticket.length; i++){

                let qr = await qrCode.toDataURL(text);

                
                
                
                
                ticketUser.push({
                    ticket: ticket[i],
                    QR: qr
                })

            
                
                
    
                // console.log("ticketfuncion", ticket[0]);
                // console.log("qr::::", qr);
                if(i == ticket.length -1){

                    return res.status(200).json(ticketUser)
                }
                
            // }
                    
            } catch (error) {
                
                console.log(error);
            }
        

        };
            // if(ticket)
         // invoco la funcion por cada ticket que me traje de la BD y le paso la data que va a tener el QR
                            
            qrGenerate(`                      
                event: ${ticket[i].event},
                price: ${ticket[i].price},
                typeTicket: ${ticket[i].typeTicket},
                usersId: 01,
                ticketId: ${ticket[i].id}
            `);
            // console.log("ticketevent:", ticket[i].event);
         }
           

        // console.log("ticketuserrut",ticketUser);
        // return res.status(200).json(ticketUser)
        // qrGenerate(`                      
        //          event: soda Stereo dfasdagdfggagsgdddddddd,
        //          price: 2000,
        //          typeTicket: dasdas,
        //          usersId: 01,
        //          ticketId: 123456dasdfsadf3234fa23r22fasdf2r
        //      `)

        // console.log("tickets ruta:" ,ticket);

        // ticket? res.status(200).json(ticket) : res.status(400).send("No ticket");

    } catch (error) {
        
        res.status(500).send(error.message);
    }
});

module.exports= route;

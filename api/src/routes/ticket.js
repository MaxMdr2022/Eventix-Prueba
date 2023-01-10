const {Router} = require("express");
const getTickets= require("../controllers/getTickets");
const qrCode = require("qrcode");
const {Ticket} = require("../db");
const nodemailer = require("nodemailer");
require('dotenv').config();
const {PASS_GMAIL, GMAIL} = process.env;

const route = Router();

route.get("/notification/:infoPago", async(req,res)=>{
    

    try {
        
        const {infoPago} = req.params;

        console.log("id0", infoPago);

        
        const ticket = await getTickets(Number(infoPago));

        // if el ticket es un string que retorne un res.send(el usuario no tiene tickets)

        if(typeof ticket === "string"){

            console.log("tipeof ticket", typeof ticket === "string");
            return res.status(400).send("The user has not purchased tickets recently")
        }  


        let ticketUser = []

        console.log("largoo",ticket.length);
        
        for(let i=0; i<ticket.length; i++){ 

            if(ticket[i].emailSent === false && ticket[i].paymentMade === true){ // && ticket[i].paymentMade === true
                //probar agregar el if emailsent aca para no crear qr de tickets ya enviados 
                const qrGenerate = async text => {

                    try {

                        let qr = await qrCode.toDataURL(text);

                        ticketUser.push({
                            ticket: ticket[i],
                            QR: qr
                        })

                        // console.log("ticketfuncion", ticket[0]);
                        // console.log("qr::::", qr);
                        if(i == ticket.length -1){

                            for(let i= 0; i< ticketUser.length; i++){

                
                            
                                // if(ticketUser[i].ticket.emailSent === false){// lo remplazo por el de abajo
                                // if(ticket[i].emailSent === false){
                    
                                    console.log("tiquet enviado", ticketUser[i].QR);
                    
                                    // console.log("id ticket",ticketUser[i].ticket.id);
                                    //.................................

                                    await Ticket.update({emailSent: true},{ where: {id: ticketUser[i].ticket.id}})

                                    if(i == ticketUser.length -1){

                                        const transporter = nodemailer.createTransport({
                                            host: 'smtp.gmail.com',//smtp.ethereal.email
                                            port: 465,//587
                                            secure: true,// true for 465, false for other ports
                                            auth: {
                                                user: `${GMAIL}`,
                                                pass: `${PASS_GMAIL}`
                                            }
                                        });

                                        let mostrarInfo = ticketUser.map(function(info){
                                            return  '<div>'
                                                        +'<p>Thanks for your purchase. Enjoy the event :D</p>'
                                                        +'<p>'+info.ticket.event+'</p>'
                                                        +'<p>QR:</p>'
                                                        +'<img src='+info.QR+' />' 
                                                        +'<p>Eventix</p>'
                                                    +'</div>';
                                        }).join('')
                                    
                                        const mailOption = {

                                            from: 'Eventix', // sender address
                                            to: "pc_escritorio2022@outlook.com", // list of receivers
                                            subject: "Eventix tickets", // Subject line
                                            html: `<div>${mostrarInfo}</div>`
                                            
                                            // text: ` Event: ${ticketUser[i].ticket.event}
                                            // price: ${ticketUser[i].ticket.price}
                                            // typeTicket: ${ticketUser[i].ticket.typeTicket}
                                            // QR: ${ticketUser[i].QR}`, // plain text body
                                            
                                        };


                                        transporter.sendMail(mailOption, async(err, info) =>{

                                            if(err){

                                                res.status(404).send(err.message);
                                            }else{

                                                console.log("email enviado");
                                                
                                                res.status(200).json(info);
                                            }
                                        });
                                    }
                                    
                                // }
                                
                                    
                            }
                    
                            console.log("tiquet enviado");

                            // return res.status(200).send("oka")
                        }
                        
                
                            
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
        }
           
        
    } catch (error) {
        
        res.status(500).json(error.message)
    }
});


route.get("/:userId", async(req,res)=>{

    try {
        
        const {userId} = req.params;


        const ticket = await getTickets(Number(userId));

        // if el ticket es un string que retorne un res.send(el usuario no tiene tickets)

        if(typeof ticket === "string"){

            return res.status(400).send("The user has not purchased tickets recently")
        } 

        let ticketUser = []

        //console.log("largoo",ticket.length);
        
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

const {Router} = require("express");
require('dotenv').config();
const {COINBASE_API_KEY, DOMAIN, COINBASE_WEBHOOK_SECRET} = process.env;
const {Client, resources, Webhook} = require("coinbase-commerce-node"); // resources son los servicios que ofrece coinbase. Si queremos crear una orden de pago, lo inficamos en resources
const {Ticket} = require("../db");
const { Op } = require("sequelize");
const qrCode = require("qrcode");

Client.init(COINBASE_API_KEY);  // conectamos a coinbase

const {Charge} = resources;  // charge: Crear ordende pago (le indicamos a coinbase cuanto queremos cobrar y por que producto ). checkout: un producto a un precio definido. Event: 

const route = Router();



route.post("/create-charge", async(req,res)=>{   // ruta de pago http://localhost:3001/paycrypto/create-charge

    const {total,name,description, typeTicket, price, cantidad} = await req.body;
    // creo el ticket y lo guardo en la BD ---------------------------


    for(let i = 0; i< cantidad; i++){

        await Ticket.create({
            event: name,
            price: price,
            typeTicket: typeTicket,
            usersId: 01,
            QR:"empty",
            paymentMade:false
        })
    };
    
    const ticket = await Ticket.findAll({where:{usersId: 01}}); // me traigo el ticket que cree recien para tomar el id y pasarlo a los datos del pago
    console.log("ticketsPay", ticket);
    //creo el qr

    const qrGenerate = async text => {

        try {
            const qr = await qrCode.toDataURL(text);

            for(let i=0; i<ticket.length; i++){

                console.log("ticketid", ticket[i].id);
                console.log("qr::::", qr);
                await Ticket.update({QR: qr},{ where: {id: ticket[i].id}})

            };

        } catch (error) {
            
            console.log(error);
        }
    }
    
    for(let i=0; i<ticket.length; i++){

        qrGenerate("hola");
    };
    
    // {
    //     event: name,
    //     price: price,
    //     typeTicket: typeTicket,
    //     usersId: 01,
    //     ticketId: ticket[i].id
    // }
    //-------------------------------------------------------------------------------------------------------

    

    // console.log(total,name, description);

    const chargeData = {                    //  datos del pago
        name: name,
        description: description, 
        local_price: {
            amount: total,
            currency: 'USD'
        },
        pricing_type: 'fixed_price',
        metadata: {                        // info del comprador. para guardar en la base de datos.
            customer_id: "idusuaro",
            customer_name: "Maxi Meder",
            customer_id_ticket: ticket.map(e => e.id)  //guardo el id de cada ticket
        },
        redirect_url: `${DOMAIN}/perfil`, // ${DOMAIN}/perfilusuario/pago   cuando el pago se finaliza le sale un boton para continuar. Esa url es donde lo va a redirigir el boton. NOTA: tiene que ser un dominio https. Si no coinbase no redirecciona. 
        cancel_url: `${DOMAIN}/perfil`,  // cuando se calcele el pago, va a redireccionar a esta ruta.
    };

    const charge = await Charge.create(chargeData);  // le pasamos los datos para que cree la orden de pago. charge es un json con toda la info. donde vamos a tomar el parametro hosted_url que contiene la url que nos manda a la pasarela de pago
    
    // res.send(charge); //  podemos ver el json con todos los parametros entrando en http://localhost:3001/paycrypto/create-charge

    const url = charge.hosted_url;  // guardamos la url de la pasarela

    console.log("url::::",url);

    res.send(url)
    // res.redirect(url); // redireccionamos a la url de la pasarela de pago. 
   
});


//---------------esto creo que no se va a usar.-----------------------------------

// route.get("/succes-payment", async (req,res)=>{ // que redireccione a una pag cuando el pago se confirme

//     // res.send("payment succesfull");

//     res.redirect("https://eventix-prueba.vercel.app"); // que redireccione al perfil del usuario dnde va a poder ver los tickets comprados.
// });

// route.get("/cancel-payment", async(req,res)=>{ // lo mismo pero cuando el pago se cancele. 
 
//     // res.send("cancel payment");
//     console.log("DOMINIO",DOMAIN);
//     return res.redirect(DOMAIN);
// });

//-------------------------------------------------------------------------------------------

route.post("/payment-handler", async(req,res)=>{   /// trae los estados del pago

    const rawBody = req.rawBody;  // coinbase envia el estado de la transaccion en formato binario. 

    const signature = req.headers['x-cc-webhook-signature'];

    const webhookSecret = COINBASE_WEBHOOK_SECRET;

    let event;  // el estadoo de la transaccion
    
    try {
        
        event = Webhook.verifyEventBody(rawBody, signature, webhookSecret);  // esta clase recibe por el metodo verifyEventBody: el rewBody (la data que envia coinbase) asignatur y webhooksecret. Es para validar si lo que me envia es valido  
        // console.log("event",event);
        //comprobamos el tipo de evento, los estados del pago que manda coinbase


        if(event.type === "charge:confirmed"){  // se confirmo el pago

            // busco el ticket en la base de datos (ticket.find(where: userId: )) y lo envio al perfil del usuario y al email
            //const ticket = await getTickets(event.metadata.customer_id)
            //event.metadata me trae los datos del usuario uso esos datos para buscar el ticket y renderizar el QR o borrarlo en el caso del failed
            console.log("pago realizado");  
            // res.send(ticket); //mostrar en el perfil del usuario este mensaje y con un condicional si es asi que se envie el ticket.
        

            // para hacer las pruebas gratuitas hacer un findAll() y que devuela todos los tickets. despues en el front lo recorro y me quedo solo con el del id del user. 
            // return res.send("pago realizado")
//-----------------------------------------------------------------------------------------------------

            // creamos el qr con la siguiente info: 
            // event: soda,
            // price: 1000,
            // typeTicket: entrada general,
            // usersId: 01,

            //entonces cuando hacemos la prueba va a guardar en la bd el qr, despues hacemos lo de abajo. lo de la action

            // me traigo la info de la bd y creo el qr. Despues desde la action hago un get a otra ruta donde va a preguntar si el ticket de la bd tiene el qr, si no lo tiene es que esta pendiente
            // si lo tiene es que se confirmo el pago y lo renderoza y si no existe el ticket en la bd es que se cancelo y lo borro en el ultimo if.
            // for(let i=0; i<event.customer_id_ticket.length; i++){

            //     await Ticket.update({paymentMade: true},{ where: {[Op.and]: [{usersId: 01},{id:event.customer_id_ticket[i]}]}});
            // };
        
            //PARA HACER LA PRUEBA BUSCAR POR EL ID DEL USER Y MODIFICAR EN TRUE EL QR

            await Ticket.update({paymentMade: true},{ where: {usersId: 01}})
        };

        if(event.type === "charge:pending"){


            console.log("pago pendiente");

        };

        if(event.type === "charge:failed"){ // si el pago se cancela, busco los tickets por id de usuario y id de ticket y los elimino de la BD
            
            console.log("pago fallido");
     

            // for(let i=0; i<event.customer_id_ticket.length; i++){

            //     await Ticket.destroy ({ where: {[Op.and]: [{usersId: 01},{id:event.customer_id_ticket[i]}]}})
            // }
            //    userId: event.metadata.customer_id


            await Ticket.destroy ({ where: {usersId: 01}})
        };

        res.status(200).send("ok");

    } catch (error) {
        console.log("fail",error);
        res.status(500).send(error.message);
    }
});


module.exports = route;


//DOCUMENTACION: 
//https://docs.cloud.coinbase.com/sign-in-with-coinbase/docs/client-libraries
//https://www.npmjs.com/package/coinbase-commerce-node
//https://www.youtube.com/watch?v=MmSzVCrP3U8
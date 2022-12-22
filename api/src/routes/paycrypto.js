const {Router} = require("express");
require('dotenv').config();
const {COINBASE_API_KEY, DOMAIN} = process.env;
const {Client, resources} = require("coinbase-commerce-node"); // resources son los servicios que ofrece coinbase. Si queremos crear una orden de pago, lo inficamos en resources
const data = require("../middlewares/middlewareCoinbase");


Client.init(COINBASE_API_KEY);  // conectamos a coinbase

const {Charge} = resources;  // charge: Crear ordende pago (le indicamos a coinbase cuanto queremos cobrar y por que producto ). checkout: un prodicto a un precio definido. Event: 

const route = Router();



route.post("/create-charge", async(req,res)=>{   // ruta de pago http://localhost:3001/paycrypto/create-charge

    
    const {precio,cantidad,total,name,date,img} = await req.body;
    console.log(precio,cantidad,total,name,date,img);

    const chargeData = {                    //  datos del pago
        name: "soda",
        description: 'Recital 2007 Buenos Aires Argentina. Estadio Monumental', // concatenar los datos para que salga todo en la description
        local_price: {
            amount: "10.00",
            currency: 'USD'
        },
        pricing_type: 'fixed_price',
        metadata: {                        // info del comprador. para guardar en la base de datos.
            customer_id: "idusuaro",
            customer_name: "Maxi Meder"
        },
        redirect_url: `${DOMAIN}/success-payment`, // cuando el pago se finaliza le sale un boton para continuar. Esa url es donde lo va a redirigir el boton. NOTA: tiene que ser un dominio de verdad https. Si no coinbase no redirecciona. 
        cancel_url: `${DOMAIN}/cancel-payment`,  // cuando se calcele el pago, va a redireccionar a esta ruta.
    };

    const charge = await Charge.create(chargeData);  // le pasamos los datos para que cree la ruta de pago. charge es un json con toda la info. donde vamos a tomar el parametro hosted_url que contiene la url que nos manda a la pasarela de pago
    
    res.send(charge); // por esre res podemos ver el json entrando en http://localhost:3001/paycrypto/create-charge

    const url = charge.hosted_url;  // guardamos la url de la pasarela

    console.log("url::::",url);

    // res.redirect(url); // redireccionamos a la url de la pasarela de pago. 
   
});


route.get("/succes-payment", async (req,res)=>{

    res.send("payment succesfull");
});

route.get("/cancel", async(req,res)=>{

    res.send("cancel payment");
});

module.exports = route;
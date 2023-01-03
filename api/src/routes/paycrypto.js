const {Router} = require("express");
require('dotenv').config();
const {COINBASE_API_KEY, DOMAIN} = process.env;
const {Client, resources} = require("coinbase-commerce-node"); // resources son los servicios que ofrece coinbase. Si queremos crear una orden de pago, lo inficamos en resources



Client.init(COINBASE_API_KEY);  // conectamos a coinbase

const {Charge} = resources;  // charge: Crear ordende pago (le indicamos a coinbase cuanto queremos cobrar y por que producto ). checkout: un producto a un precio definido. Event: 

const route = Router();



route.post("/create-charge", async(req,res)=>{   // ruta de pago http://localhost:3001/paycrypto/create-charge

    
    const {total,name,description} = await req.body;
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
            customer_name: "Maxi Meder"
        },
        // redirect_url: `${DOMAIN}/success-payment`, // cuando el pago se finaliza le sale un boton para continuar. Esa url es donde lo va a redirigir el boton. NOTA: tiene que ser un dominio https. Si no coinbase no redirecciona. 
        // cancel_url: `${DOMAIN}/cancel-payment`,  // cuando se calcele el pago, va a redireccionar a esta ruta.
    };

    const charge = await Charge.create(chargeData);  // le pasamos los datos para que cree la orden de pago. charge es un json con toda la info. donde vamos a tomar el parametro hosted_url que contiene la url que nos manda a la pasarela de pago
    
    // res.send(charge); //  podemos ver el json con todos los parametros entrando en http://localhost:3001/paycrypto/create-charge

    const url = charge.hosted_url;  // guardamos la url de la pasarela

    console.log("url::::",url);

    res.send(url)
    // res.redirect(url); // redireccionamos a la url de la pasarela de pago. 
   
});


route.get("/succes-payment", async (req,res)=>{ // que redireccione a una pag cuando el pago se confirme

    res.send("payment succesfull");

    // res.redirect("http://localhost:3001/user"); // que redireccione al perfil del usuario dnde va a poder ver los tickets comprados.
});

route.get("/cancel", async(req,res)=>{ // lo mismo pero cuando el pago se cancele. 
 
    res.send("cancel payment");
    // res.redirect("http://localhost:3001/user");
});

module.exports = route;


//DOCUMENTACION: 
//https://docs.cloud.coinbase.com/sign-in-with-coinbase/docs/client-libraries
//https://www.npmjs.com/package/coinbase-commerce-node
//https://www.youtube.com/watch?v=MmSzVCrP3U8
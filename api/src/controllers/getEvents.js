// const getApi = require("../../../apiDev/API");
const {Event}= require("../db");


const getEvents = async()=>{

    // const api = await getApi();
    const eventDB = await Event.findAll();
    let id = 1;

    const eventDb = eventDB.map(e => {

        return {

            id: e.id,
            name: e.name,
            date: e.date.length > 0 ? e.date : ["Funciones Disponibles"],
            location: e.location,
            // price: typeof e.price  === "object"? e.price.filter(e => e.includes("$") ): "Info price", // solo muestra un precio de entrada
            price: e.price?.map(el=>{

                return {
                    tipoDeTicket: el.tipoDeTicket,
                    precio:  el.precio
                }
            }),
            description: e.description,
            image: e.image
        };
    });
    
    const eventApi = api.results.map(e => {

        return {

            id: id++,
            name: e.name,
            date: e.date.length > 0 ? e.date : ["Funciones Disponibles"],
            location: e.location,
            locationMap: e.location.slice( e.location.indexOf("\n",0) + 1, e.location.length),
            price: e.price?.map(el=>{

                return {
                    tipoDeTicket: el.tipoDeTicket,
                    precio:  el.precio != "Entrada Liberada" ? el.precio.replace(/\D/g, "") : el.precio
                }
            }),
            description: e.description.map( e => e.replace("Passline.", "Eventix.").replace("Passline", "Eventix")).filter(e=> !e.includes("  ")),
            image: e.image,
            imageBanner: e.imageBanner,
            typeEvent: e.typeEvent
        };
    });


    

    const events = [...eventApi, ...eventDb];

    return events;
};

module.exports= getEvents;
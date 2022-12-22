const getEvents = require("./getEvents");


const filterByAge = async (age, state)=> {

    // const events = await getEvents();

    const events = await state;

    // const {ages} = age;

    if(age){

        if (age == "mayores"){

            const eventsFilter = events.filter( e => e.name?.includes("(+"));

           if (eventsFilter.length >0 ) return eventsFilter

           return "There are no adult-only events."
        }

        if(age === "atp"){


            const eventsFilter = events.filter( e => !e.name?.includes("(+"));

            if (eventsFilter.length >0 ) return eventsFilter

            return "There are no events suitable for everyone"
        }
    }

    return "You must enter a value"
    
};

const filterByDate = async(day, month, year, state) =>{

    const events = state;
    // console.log(store);
    const events2 = events.map(e => {
        
        return {  
            id: e.id,
            name: e.name,
            date: e.date[0].split(" "),
            location: e.location,
            price: e.price, 
            image: e.image
        }
    
    });

    if(day && month && year){

        const eventsFilterDate = events2.filter( e => e.date[1] === day.toString() && e.date[3] === month.toString() && e.date[4] === year.toString());

        if(eventsFilterDate.length > 0){

            const eventsDate = eventsFilterDate.map(e => {

                return {
                    id: e.id,
                    name: e.name,
                    date: e.date.join(" "),
                    location: e.location,
                    price: e.price, 
                    image: e.image
                }

            });

            return eventsDate;
        };
           
        return "There is no event on that date";
    };
    
    return "You must enter a date";
};

const filterByLocation = (location, state) => {

    const events = state;

    if( location){


        const eventsFilter = events.filter(e => e.location.toLowerCase().includes(location.toLowerCase()));

        if(!eventsFilter.length > 0) return "there are no events in that location"

        return eventsFilter;
    }

    return "no location entered"

};

const filterByPrice = async(price, state) =>{ //price tiene que ser un [min, max] 

    const events = state;
    // const events = await getEvents();

    // typeof e.price  === "object"? e.price.filter(e => e.includes("$") ): "Info price"

    // price = [ 0 , 500] [500 ,1000] [1000, 5000] [5000 10000] [10000, 30000] [min, max]

    let eventsFilter = [];

    // const {price} = prices;    // COMENTARRR AL USAR COMBINADOOOO     <------------------------------------------

    // console.log(price[1]);

    if(price[0] === "0"){

        
        eventsFilter = events.filter( e => {
            

            console.log(e.price?.map(el=>el.precio.replace(/\D/g, "")))  


            return e.price?.filter(el=>Number(el.precio.replace(/\D/g, "")) <= Number(price[1])).length > 0 ? true : false 
            
            || e.price?.filter(e=>e.precio == "Entrada Liberada" ).length > 0 ? true : false  
        

        });
        
        return eventsFilter.length > 0 ? eventsFilter : "There are no tickets in that price range.";
    }

    // eventsFilter = events.filter( e => {
        
    //     // console.log("1: ", e.price?.filter(el=>Number(el.precio.replace(/\D/g, "")) <= Number(price[1])).length > 0 ? true : false );

    //     // console.log("el 1: ", e.price?.filter(el=>Number(el.precio.replace(/\D/g, ""))));
        
    //     // console.log("2: ", e.price?.filter(el=> Number(el.precio.replace(/\D/g, "")) >= Number(price[0])).length > 0 ? true : false );

    //     // console.log("el 2: ", e.price?.filter(el=> Number(el.precio.replace(/\D/g, ""))));

    //     // console.log("total ", e.price?.filter(el=>Number(el.precio.replace(/\D/g, "")) <= Number(price[1])).length > 0 ? true : false  && e.price?.filter(el=> Number(el.precio.replace(/\D/g, "")) >= Number(price[0])).length > 0 ? true : false );

    //     return  e.price?.filter(el=>Number(el.precio.replace(/\D/g, "")) <= Number(price[1])).length > 0 ? true : false 
        
    //     && e.price?.filter(el=> Number(el.precio.replace(/\D/g, "")) >= Number(price[0])).length > 0 ? true : false 
    
    // });

    if(!eventsFilter.length > 0){

        return "There are no tickets in that price range."
    }

    return eventsFilter;
};
//Entrada Liberada



module.exports = {
    filterByAge,
    filterByDate,
    filterByLocation,
    filterByPrice,
};
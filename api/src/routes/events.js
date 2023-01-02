const {Router} = require("express");
const getEvents = require("../controllers/getEvents");
const createEvent = require("../controllers/createEvent");
const sort = require("../controllers/sort");

const route = Router();

route.get(`/page/:page`,async(req,res)=>{         // GET http://localhost:3001/events/allevents
    const {name} = req.query
    const {page} = req.params
        try {
        const event = await getEvents();
        if(name){
            const searchEvent = event.filter((event) => event.name.toLowerCase().includes(name.toLowerCase())) 
            searchEvent.length ? 
            res.status(200).json(searchEvent)
            :
            res.status(404).json({msg : `Can´t find event ${name}`})
        } else {
            const lastevent = page*4
            const currentEvents = event.slice(lastevent - 4, lastevent)
            // console.log(currentEvents)
            res.status(200).json(currentEvents);
        }
    } catch (error) {

        res.status(500).send(error.message);
        
    };

});

route.get('/allevents', async (req, res) => {
    try {
        const event = await getEvents();
        res.status(200).json(event)
    } catch (error) {
        res.status(500).json({msg : error.message});
    }
})


route.post("/", async(req,res) =>{

    try {
        
        await createEvent(req.body);

        res.status(200).send("Event created successfully");


    } catch (error) {
        
        res.status(500).send(error.message);
    }

});


route.get("/order/:order", async(req,res)=>{

    try {
        
        const {order} = req.params;

        // console.log(order);

        const eventFilter = await sort(order);

        res.status(200).json(eventFilter);


    } catch (error) {
        
        res.status(500).send(error.message);
    }
});


route.get("/:id",async(req,res)=>{         // GET http://localhost:3001/events

    try {
        const {id} = req.params
        const event = await getEvents();
        const eventId = event.filter((event) => event.id == id)

        res.status(200).json(eventId);

    } catch (error) {

        res.status(500).send(error.message);
        
    };

});

module.exports= route;
const {Router} = require("express");
const storeFiltered = require("../controllers/storeFiltered");
// const checkData = require("../middlewares/checkDataFilterDate");

const route = Router();

route.post("/", async(req, res) =>{

    try {

        const eventsDate = await storeFiltered(req.body);
        
        typeof eventsDate === "object" ? res.status(200).json(eventsDate) : res.status(400).json(eventsDate);

    } catch (error) {
        
        res.status(500).send(error.message);
    };
});

module.exports = route;
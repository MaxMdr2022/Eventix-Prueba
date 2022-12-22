const {Router} = require("express");
// const initialization = require("../../../apiDev/server");
const getApi = require("../../../apiDev/API");

const route = Router();


route.get("/", async(req,res)=>{

    try {

        // const api = await initialization();

        const api = await getApi();
        
        res.status(200).json(api);

    } catch (error) {
        
        res.status(500).send(error.message);
    };
});

module.exports = route; 
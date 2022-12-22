const checkData = (req,res,next) =>{

    const {day, month, year, funcionesDisponibles} = req.body;

    if(!funcionesDisponibles){

        if(!day) return res.status(404).send("No ingresaste el dia gil");

        if(!month) return res.status(404).send("No se ingreso el mes");

        if(!year) return res.status(404).send("No se ingreso el año");
    
    }else{

        next();
    };
    
    next();

};

module.exports = checkData; 
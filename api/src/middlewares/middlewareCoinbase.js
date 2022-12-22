const data = async(req, res, next)=>{

    const datos = await req.body;

    return datos
};

module.exports = data;
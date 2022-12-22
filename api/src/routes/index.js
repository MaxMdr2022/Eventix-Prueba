const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const api = require("./Api");
const events = require("./events");
const filters = require("./filters");
const paycrypto = require("./paycrypto");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/api", api);

router.use("/events", events);

router.use("/filters", filters);

router.use("/paycrypto", paycrypto);



module.exports = router;
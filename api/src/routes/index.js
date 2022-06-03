const { Router } = require('express');
const routerDogs = require('./dogs');
const routerTemperaments = require('./temperaments');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

//* Middleware de routes
router.use('/dogs', routerDogs);
router.use('/temperament', routerTemperaments);

module.exports = router;
// const axios = require('axios').default;
const { Router } = require('express');
const { Dog, Temperament } = require('../db.js');
// const Temperament = require('../models/Temperament');

const router = Router();

router.get('/', async(req, res, next) => {
    const temperament = await Temperament.findAll();
    // console.table(temperament);
    return res.status(200).json(temperament);
});


module.exports = router;
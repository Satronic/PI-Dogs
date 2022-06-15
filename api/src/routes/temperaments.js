// const axios = require('axios').default;
const { Router } = require('express');
const { Temperament } = require('../db.js');
// const Temperament = require('../models/Temperament');

const router = Router();

router.get('/', async(req, res, next) => {
    try {
        const temperament = await Temperament.findAll();
        return res.status(200).json(temperament);
    } catch (error) {
        return res.send({ msg: error.parent.detail });
    }
});


module.exports = router;
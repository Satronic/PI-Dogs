// const axios = require('axios').default;
const { Router } = require('express');
const { Temperament } = require('../db.js');
// const Temperament = require('../models/Temperament');

const router = Router();

router.get('/', async(req, res, next) => {
    try {
        const temperament = await Temperament.findAll({
            order: [
                ['name', 'ASC']
            ]
        });
        return res.status(200).json(temperament);
    } catch (error) {
        next(error);
    }
});


module.exports = router;
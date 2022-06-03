const { Router } = require('express');
const axios = require('axios');
const { Dog, Temperament } = require('../db.js');

const router = Router();

router.get('/', async(req, res, next) => {

    const { name } = req.query;

    try {
        const resultAPI = await axios.get('https://api.thedogapi.com/v1/breeds');
        const resultBD = await Dog.findAll({ include: Temperament });
        let dogsByName = [];

        const allDogsAPI = resultAPI.data.map(dog => {
            return {
                id: dog.id,
                name: dog.name,
                weight: dog.weight.metric,
                image: dog.image.url,
                temperament: dog.temperament
            };
        });

        const allDogsBD = resultBD.map(dog => {

            const arrTemperaments = dog.temperaments.map(temp => {
                return temp.name;
            })
            let strTemperaments = arrTemperaments.toString();

            return {
                id: dog.id,
                name: dog.name,
                weight: dog.weight,
                image: dog.image,
                temperament: strTemperaments
            };
        });


        let allDogs = [...allDogsAPI, ...allDogsBD];

        //* FILTRO POR QUERY 
        if (name) {
            dogsByName = allDogs.filter((dog) => {
                let dogName = dog.name.toLowerCase();
                let nameLC = name.toLowerCase();
                return dogName.includes(nameLC);
            });

            return res.status(200).json(dogsByName);
        }

        //* ALL DOGS
        return res.status(200).json(allDogs);
        // return res.status(200).json(resultBD);

    } catch (error) {
        return res.send({ msg: error.parent.detail });
    }
});

router.get('/:id', async(req, res) => {
    const { id } = req.params;

    try {
        const resultAPI = await axios.get('https://api.thedogapi.com/v1/breeds');

        const dogFounded = resultAPI.data.find(dog => {
            return dog.id === Number(id);
        });

        if (dogFounded) {

            const dog = [dogFounded].map(dog => {
                return {
                    id: dog.id,
                    name: dog.name,
                    height: dog.height.metric,
                    weight: dog.weight.metric,
                    life_span: dog.life_span,
                    image: dog.image.url,
                    // temperament: dog.temperament
                };
            });

            return res.status(200).json(dog);
        }

        //******************************************** */
        const resultBD = await Dog.findOne({
            where: {
                id: id
            },
            include: Temperament
        });

        if (resultBD) {
            return res.status(200).json([resultBD]);
        }

        return res.send('No se encuentra el id');

    } catch (error) {
        return res.send({ msg: error.parent.detail });
    }
});

router.post('/', async(req, res) => {
    const { name, height, weight, life_span, image, temperament } = req.body;

    try {
        const dogCreated = await Dog.create({ name, height, weight, life_span, image });

        temperament.forEach(async(obj) => {
            let temperament = await Temperament.findByPk(obj.id);
            await dogCreated.addTemperament(temperament);
        });

        return res.status(201).send([dogCreated]);

    } catch (error) {
        return res.send({ msg: error.parent.detail });
        // return res.status(400).send({ msg: error });
    }
})

module.exports = router;
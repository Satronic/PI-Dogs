const { Router } = require('express');
const axios = require('axios');
const { Dog, Temperament } = require('../db.js');

const router = Router();

// initData();

router.get('/', async(req, res, next) => {

    const { name, temperament } = req.query;
    // console.log(name, temperament);
    let dogsByName = [];
    let dogsByTemperament = [];

    try {
        const resultAPI = await axios.get('https://api.thedogapi.com/v1/breeds');
        const resultBD = await Dog.findAll({ include: Temperament });


        const allDogsAPI = resultAPI.data.map(dog => {
            return {
                id: dog.id,
                name: dog.name,
                weight: (dog.weight.metric.length < 3) ? `${dog.weight.metric} - ${dog.weight.metric} kg` : `${dog.weight.metric}`,
                image: dog.image.url,
                temperament: dog.temperament
            };
        });

        const allDogsBD = resultBD.map(dog => {

            //* Array de temperaments a string de temperaments
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

        //* FILTRO POR RAZA
        if (name) {
            dogsByName = allDogs.filter((dog) => {
                let dogName = dog.name.toLowerCase();
                let nameLC = name.toLowerCase();
                return dogName.includes(nameLC);
            });

            return res.status(200).json(dogsByName);
        }

        //* FILTRO POR TEMPERAMENTO
        if (temperament) {
            dogsByTemperament = allDogs.filter((dog) => {
                console.log('Lista de Temperamentos', dog.temperament);
                let temperamentInDog = (dog.temperament === undefined) ? '' : dog.temperament.toLowerCase();
                let temperamentLC = temperament.toLowerCase();
                return temperamentInDog.includes(temperamentLC);
            });

            return res.status(200).json(dogsByTemperament);
        }

        //* ALL DOGS
        return res.status(200).json(allDogs);
        // return res.status(200).json(resultBD);

    } catch (error) {
        // return res.send({ msg: error.parent.detail });
        next(error);
    }
});

router.get('/:id', async(req, res, next) => {
    const { id } = req.params;

    try {
        const resultAPI = await axios.get('https://api.thedogapi.com/v1/breeds');

        const dogAPI = resultAPI.data.find(dog => {
            return dog.id === Number(id);
        });

        if (dogAPI) {

            const dog = [dogAPI].map(dog => {
                return {
                    id: dog.id,
                    name: dog.name,
                    height: `${dog.height.metric} cm`,
                    weight: `${dog.weight.metric} kg`,
                    life_span: dog.life_span,
                    image: dog.image.url,
                    temperament: dog.temperament
                };
            });

            return res.status(200).json(dog);
        }

        //******************************************** */
        const resultBD = await Dog.findByPk(id, {
            include: Temperament
        });

        if (resultBD) {

            const dog = [resultBD].map(dog => {
                const arrTemperaments = resultBD.temperaments.map(temp => {
                    return temp.name;
                })
                let strTemperaments = arrTemperaments.toString();

                return {
                    id: dog.id,
                    name: dog.name,
                    height: dog.height,
                    weight: dog.weight,
                    life_span: dog.life_span,
                    image: dog.image,
                    temperament: strTemperaments
                };
            })

            return res.status(200).json(dog);
        }

        return res.status(404).json({ msg: 'No se encuentra el id' });

    } catch (error) {
        next(error);
    }
});

router.post('/', async(req, res, next) => {
    const { name, height, weight, life_span, image, temperament } = req.body;

    try {
        const dogCreated = await Dog.create({ name, height, weight, life_span, image });
        console.log(temperament)
        temperament.forEach(async(objTemperament) => {
            let temperamentFounded = await Temperament.findByPk(objTemperament.id);
            await dogCreated.addTemperament(temperamentFounded);
        });

        return res.status(201).send([dogCreated]);

    } catch (error) {
        next(error);
        // return res.status(400).send({ msg: error });
    }
})

module.exports = router;
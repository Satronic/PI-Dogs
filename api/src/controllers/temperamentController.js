const axios = require('axios');
const { conn } = require('../db.js');

const { Temperament } = conn.models;

function getList(arrObjects) {
    let arrayTemperaments = [];
    let setTemperaments = {};

    arrObjects.forEach(object => {
        if (object.temperament) {
            let array = object.temperament.split(', ');
            arrayTemperaments = arrayTemperaments.concat(array);
        }
    });
    setTemperaments = new Set(arrayTemperaments);
    return [...setTemperaments];
}

async function getAllTemperaments() {

    try {
        const checkTemperaments = await Temperament.findAll();
        console.log(checkTemperaments.length === 0);
        if (checkTemperaments.length !== 0) {
            return console.info('Ya existen datos en la tabla Temperaments');
        }

        const result = await axios.get('https://api.thedogapi.com/v1/breeds');
        const list = getList(result.data);
        list.forEach(async(item) => {
            await Temperament.create({
                name: item,
                // name: 'Hola',
            })
        });

        return console.info('Datos gurdados con exito en la tabla Temperaments');
    } catch (error) {
        console.log({ msg: error });

    }
}

module.exports = getAllTemperaments;
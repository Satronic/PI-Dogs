const axios = require('axios');
const { conn } = require('../db.js');

const { Dog, Temperament } = conn.models;

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
    // const result = await axios.get('https://api.thedogapi.com/v1/breeds');
    // const list = getList(result.data);
    await Temperament.create({
        // name: list[0],
        name: 'Hola',
    })
}

module.exports = getAllTemperaments;
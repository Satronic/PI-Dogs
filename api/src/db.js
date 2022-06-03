require('dotenv').config();
const axios = require('axios');
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
} = process.env;

//*
// const getAllTemperaments = require('./controllers/temperamentController');

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`, {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Dog, Temperament, Dog_temperament } = sequelize.models;
// console.log(sequelize.models);
// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Dog.belongsToMany(Temperament, { through: Dog_temperament });
Temperament.belongsToMany(Dog, { through: Dog_temperament });


//* Carga inicial de la base de datos

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
        const result = await axios.get('https://api.thedogapi.com/v1/breeds');
        const list = getList(result.data);
        list.forEach(async(item) => {
            await Temperament.create({
                name: item,
                // name: 'Hola',
            })
        })
    } catch (error) {
        console.log(error.parent.detail);
    }

}

getAllTemperaments();

module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
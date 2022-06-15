const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('dog', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        height: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                let strHeight = this.getDataValue('height');
                return `${strHeight} cm`;
            }
        },
        weight: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                let strWeight = this.getDataValue('weight');
                return `${strWeight} kg`;
            }
        },
        life_span: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                let strLifeSpan = this.getDataValue('life_span');
                return `${strLifeSpan} years`;
            }
        },
        image: {
            type: DataTypes.STRING,
        },
    }, {
        timestamps: false,
    });
};
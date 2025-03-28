const { DataTypes } = require("sequelize");

const inscriptionModel = (Sequelize) => {
    const inscription = Sequelize.define(
        'inscription',
        {
            id_event:{
                type: DataTypes.INTEGER,
                references:{
                    model:'events',
                    key:'id',
                },
                allowNull: false,
            },
            id_user:{
                type: DataTypes.INTEGER,
                references:{
                    model:'users',
                    key:'id',
                },
            },
        },
        {
            tableName: 'inscriptions',
            timestamps: false,
        }
    );
    
    return inscription;
};

module.exports = inscriptionModel;
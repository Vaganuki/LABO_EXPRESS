const { DataTypes } = require("sequelize");

const categorieModel = (Sequelize) => {
    const categorie = Sequelize.define(
        "categorie",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'categories',
            timestamps: false,
        }
    );

    return categorie;
};

module.exports = categorieModel;
const {DataTypes } = require("sequelize");

const categorieModel = (Sequelize) => {
    const categorie = Sequelize.define(
        "categorie",
        {
            id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            name:{
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'categories',
            timestamps: false,
        }
    );

    categorie.associate = (models) => {
        categorie.hasMany(models.event, {
            foreignKey: 'id_categorie',
        });
    };

    return categorie;
};

module.exports = categorieModel;
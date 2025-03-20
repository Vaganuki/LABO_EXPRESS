const { DataTypes } = require("sequelize");

const userModel = (sequelize) => {
    const user = sequelize.define(
        "user",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            nom: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            prenom: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            mail: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            mdp: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ddn: {
                type: DataTypes.DATE,
            },
        },
        {
            tableName: 'users',
            timestamps: false,
        }
    );

    user.associate = (models) => {
        user.hasMany(models.inscription, {
            foreignKey: 'id_user'
        });
    };

    return user;
};

module.exports = userModel;
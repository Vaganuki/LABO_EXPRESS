const {DataTypes } = require("sequelize");

const formatModel = (Sequelize) => {
    const format = Sequelize.define(
        "format",
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
            tableName: 'formats',
            timestamps: false,
        }
    );

    format.associate = (models) => {
        format.hasMany(models.event, {
            foreignKey: 'id_format',
        });
    };

    return format;
};

module.exports = formatModel;
const { DataTypes } = require("sequelize");

const eventModel = (Sequelize) => {
    const event = Sequelize.define(
        "event",
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
            description:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            places_count:{
                type: DataTypes.INTEGER,
            },
            id_categorie:{
                type: DataTypes.INTEGER,
                references: {
                    model: 'categories',
                    key:'id',
                },
                allowNull: false,
            },
            id_format:{
                type: DataTypes.INTEGER,
                references: {
                    model: 'formats',
                    key:'id',
                },
                allowNull: false,
            },
            image:{
                type: DataTypes.STRING,
            },
            date_debut:{
                type: DataTypes.DATE,
                allowNull: false,
            },
            date_fin:{
                type: DataTypes.DATE,
                allowNull: false,
            },
            annulation:{
                type: DataTypes.BOOLEAN,
            },
            id_createur:{
                type: DataTypes.INTEGER,
            },
        },
        {
            tableName: 'events',
            timestamps: false,
        }
    );

    event.associate = (models) => {
        event.belongsTo(models.categorie, {
            foreignKey: 'id_categorie',
        });
        event.belongsTo(models.format, {
            foreignKey: 'id_format',
        });
        event.hasMany(models.inscription,{
            foreignKey:'id_event',
        });
    };

    return event;
};

module.exports = eventModel;
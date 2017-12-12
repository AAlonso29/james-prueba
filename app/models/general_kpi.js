//The General kpi model.
'use strict'; 

var Sequelize = require('sequelize'),
    bcrypt = require('bcrypt');

var config = require('../config'),
    db = require('../services/database');

// 1: The model schema.
var modelGeneral_kpi = {
    fans: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    alcance: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    impresiones: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    interacciones: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    publicaciones: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    followers: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    reach: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    impressions: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    contribuidores: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    twettGenerados: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    retweets: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    respuestas: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    menciones: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    visitas: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    rebote: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    permanencia: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    nombreTipoMedio: {
        type: Sequelize.STRING,
        allowNull: true
    },

    fechaInicio: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },

    fechaFinal: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
};

// 3: Define the User model.
var General_kpiModel = db.define('general_kpi', modelGeneral_kpi);


module.exports = General_kpiModel;
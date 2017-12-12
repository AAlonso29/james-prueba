//The Cliente model.
'use strict'; 

var Sequelize = require('sequelize'),
    bcrypt = require('bcrypt');

var config = require('../config'),
    db = require('../services/database');

// 1: The model schema.
var modelCliente = {
    nombre: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },

    apellido: {
        type: Sequelize.STRING,
        allowNull: false
    }

    // contraseña: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // }
};

// 2: The model options.
var modelOptions = {
    instanceMethods: {
        comparePasswords: comparePasswords
    },
    hooks: {
        beforeValidate: hashPassword
    }
};

// 3: Define the User model.
var ClienteModel = db.define('cliente', modelCliente, modelOptions);

// Compares two passwords.
function comparePasswords(password, callback) {
    // TODO: Password comparison logic.
}

// Hashes the password for a user object.
function hashPassword(cliente) {
    // TODO: Password hashing logic.
}

module.exports = ClienteModel;
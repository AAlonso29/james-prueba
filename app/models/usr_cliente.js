//The usr_cliente model.
'use strict'; 

var Sequelize = require('sequelize'),
    bcrypt = require('bcrypt');

var config = require('../config'),
    db = require('../services/database');

var empresa = require('../models/empresa');

// 1: The model schema.
var modelusr_cliente = {
    nombreCliente: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },

    apellidoPCliente: {
        type: Sequelize.STRING,
        allowNull: false
    },

    apellidoMCliente: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    emailCliente: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },

    telefonoFijoCliente: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    telefonoMovilCliente: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    
    password: {
        type: Sequelize.STRING,
        allowNull: true
    },

    // idEmpresa: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     unique: true
    // }

    // empresaId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //       model: 'empresa',
    //       key: 'id'
    //     }
    //   }

};

// modelusr_cliente.hasMany(this.empresa, {
//     foreingKey: 'id',
//     constraints: false,
//     as: 'post'
// });

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
var usr_clienteModel = db.define('usr_cliente', modelusr_cliente, modelOptions);

// Compares two passwords.
function comparePasswords(password, callback) {
    // TODO: Password comparison logic.
     bcrypt.compare(password, this.password, function(error, isMatch) {
        if(error) {
            return callback(error);
        }

        return callback(null, isMatch);
    });
}

// Hashes the password for a user object.
function hashPassword(usr_cliente) {
    // TODO: Password hashing logic.
    if(usr_cliente.changed('password')) {
        return bcrypt.hash(usr_cliente.password, 10).then(function(password) {
            usr_cliente.password = password;
        });
    }
}

module.exports = usr_clienteModel;
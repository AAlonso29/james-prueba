//The empresa model.
//PASO 1: se debe crear el model de la nueva entidad o tabla.  

'use strict'; 

var Sequelize = require('sequelize');
 //   bcrypt = require('bcrypt');

var config = require('../config'),
    db = require('../services/database');

// 1: The model schema.
var modelEmpresa = {
    nombreEmpresa: {
        type: Sequelize.STRING
        // unique: true,
        //allowNull: false
    }
};



// 3: Define the User model.
var EmpresaModel = db.define('empresa', modelEmpresa);


module.exports = EmpresaModel;

// Una vez que el model ha sido creado, este se exporta y se procede a configurar el authController.
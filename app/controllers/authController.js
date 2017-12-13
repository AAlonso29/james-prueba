// PASO 2: Teniedo ya creado el model, se procede a configurar la creacion de la nueva tabla eb BDD; para ello, se crean una sincronizacion con
// base de datos (MYsql) y se le pasan los parametros contenidos en el models.

'use strict';

var jwt = require('jsonwebtoken');

// var Sequelize = require('sequelize');

var config = require('../config'),
    db = require('../services/database'),
    User = require('../models/user'),
    Empresa = require('../models/empresa'),
    usr_Cliente = require('../models/usr_cliente'),
    General_kpi = require('../models/general_kpi');
//  var sequelize = new Sequelize(config.db.name, config.db.user, '1234');

// The authentication controller.
var AuthController = {};

// Register a user.
AuthController.signUp = function(req, res) {
    if(!req.body.nombreUsuario || !req.body.apellidoUsuario || !req.body.emailUsuario || !req.body.password ) {
        res.json({ message: 'Por favor ingrese datos requeridos.' });
    } else {
        db.sync().then(function() {
            var newUser = {
                nombreUsuario: req.body.nombreUsuario,
                apellidoUsuario: req.body.apellidoUsuario,
                emailUsuario: req.body.emailUsuario,
                avatarUsuario: req.body.avatarUsuario,
                password: req.body.password,
                telefonoMovil: req.body.telefonoMovil,
                telefonoFijo: req.body.telefonoFijo
            };

            return User.create(newUser).then(function() {
                res.status(201).json({ message: 'Account created!' });
            });
        }).catch(function(error) {
            console.log(error);
            res.status(403).json({ message: 'nombreUsuario already exists!' });
        });

    }
}

//Registro empresa
AuthController.empresa = function(req, res) {
    if(!req.body.nombreEmpresa) {
        res.json({ message: 'Ingrese nombre de la empresa.' });
    } else {
        db.sync().then(function() {
            var newEmpresa = {
                nombreEmpresa: req.body.nombreEmpresa
            };

            return Empresa.create(newEmpresa).then(function() {
                res.status(201).json({ message: 'Empresa guardada!' });
            });
        }).catch(function(error) {
            console.log(error);
            res.status(403).json({ message: 'La empresa ya existe!' });
        });
   }
}

//Registro de clientes
AuthController.usr_cliente = function(req, res) {
    if(!req.body.nombreCliente || !req.body.apellidoPCliente ||!req.body.emailCliente || !req.body.password) {
        res.json({ message: 'El nombre, apellido paterno, email, contraseña y empresa son datos obligatorios.' });
    } else {
        db.sync().then(function() {
            var newusr_Cliente = {
                nombreCliente: req.body.nombreCliente,
                apellidoPCliente: req.body.apellidoPCliente,
                apellidoMCliente: req.body.apellidoMCliente,
                emailCliente: req.body.emailCliente,
                telefonoFijoCliente: req.body.telefonoFijoCliente,
                telefonoMovilCliente: req.body.telefonoMovilCliente,
                password: req.body.password
            };

            return usr_Cliente.create(newusr_Cliente).then(function() {
                res.status(201).json({ message: 'Cliente guardado satisfactoriamente!' });
            });
        }).catch(function(error) {
            console.log(error);
            res.status(403).json({ message: 'El cliente ya existe!' });
        });
    }
}

///Registro en tabla general los datos para kpi
AuthController.general_kpi = function(req, res) {

        db.sync().then(function() {
            var newGeneral_kpi = {
                fans: req.body.fans,
                alcance: req.body.alcance,
                impresiones: req.body.impresiones,
                interacciones: req.body.interacciones,
                publicaciones: req.body.publicaciones,
                followers: req.body.followers,
                reach: req.body.reach,
                impressions: req.body.impressions,
                contribuidores: req.body.contribuidores,
                twettGenerados: req.body.twettGenerados,
                retweets: req.body.retweets,
                respuestas: req.body.respuestas,
                menciones: req.body.menciones,
                visitas: req.body.visitas,
                rebote: req.body.rebote,
                permanencia: req.body.permanencia,
                nombreTipoMedio: req.body.nombreTipoMedio,
                fechaInicio: req.body.fechaInicio,
                fechaFinal: req.body.fechaFinal
            };

            return General_kpi.create(newGeneral_kpi).then(function() {
                res.status(201).json({ message: 'Datos guardados satisfactoriamente!' });
            });
        }).catch(function(error) {
            console.log(error);
            res.status(403).json({ message: 'ya existe!' });
        });
    
}

// Authenticate a user.
AuthController.authenticateUser = function(req, res) {
    if(!req.body.nombreUsuario || !req.body.password) {
        res.status(404).json({ message: 'nombreUsuario and password are needed!' });
    } else {
        var nombreUsuario = req.body.nombreUsuario,
            password = req.body.password,
            potentialUser = { where: { nombreUsuario: nombreUsuario } };

        User.findOne(potentialUser).then(function(user) {
            if(!user) {
                res.status(404).json({ message: 'Authentication failed!' });
            } else {
                user.comparePasswords(password, function(error, isMatch) {
                    if(isMatch && !error) {
                        var token = jwt.sign(
                            { nombreUsuario: user.nombreUsuario },
                            config.keys.secret,
                            { expiresIn: '30m' }
                        );

                        res.json({
                            success: true,
                            token: 'JWT ' + token,
                            role: user.role
                        });
                    } else {
                        res.status(404).json({ message: 'Login failed!' });
                    }
                });
            }
        }).catch(function(error) {
            res.status(500).json({ message: 'There was an error!' });
        });
    }
}

module.exports = AuthController;

// Una vez que la configuracion y soncronizacion con BDD este realizada, se procede a exportar el authController y a crear el controlador del model.
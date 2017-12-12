//PASO 5: teniendo ya creado y configurado el model, el authController, el controlador del model y el authService. 
//Ya es posible comenx¡zar a enrrurar todos ellos, para que asi el sistema cumpla su objetivo. 

'use strict';

var router = require('express').Router();
var User = require('../models/user');

var config = require('../config'),
    allowOnly = require('../services/routesHelper').allowOnly,
    AuthController = require('../controllers/authController'),
    UserController = require('../controllers/userController'),
    AdminController = require('../controllers/adminController');


var APIRoutes = function(passport) {
    // POST Routes.
    router.post('/signup', AuthController.signUp);
    router.post('/empresa', AuthController.empresa);
    router.post('/usr_cliente', AuthController.usr_cliente);
    router.post('/general_kpi', AuthController.general_kpi);
    router.post('/authenticate', AuthController.authenticateUser);

    // GET Routes.
    router.get('/profile', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, UserController.index));
    
    router.get('/admin', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.guest, AdminController.index));

    router.get('/signup', AuthController.getUser);
 
    // router.get('/signup', function (request, response) {
        
    //         console.log('GET /signup');
        
    //         User.find(function (error, signup) {
        
    //           if (error) {
    //             response.status(500).send(error);
    //             return;
    //           }
        
    //           console.log(users);
        
    //           response.json(signup);
    //         });
    //       });

    return router;
};

module.exports = APIRoutes;

// posterior a la configuracion de rutas se procede a crear la capa de presentacion o HTML.
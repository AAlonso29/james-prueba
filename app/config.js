// Application configuration.
'use strict';

var config = module.exports;

config.db = {
    user: 'root', 
    password: '1234',
    name: 'james_auth'
};

config.db.details = {
    host: 'localhost',
    port: 3307,      
    dialect: 'mysql'
};

config.keys = {
    secret: '/jVdfUX+u/Kn3qPY4+ahjwQgyV5UhkM5cdh1i2xhozE=' // Not anymore...
};

var userRoles = config.userRoles = {
    guest: 1,    // ...001
    user: 2,     // ...010
    admin: 4     // ...100
    // admin:1,
    // cmAdmin:2,
    // cm:3,
    // cliente:4,
    // other:5
};



config.accessLevels = {
    guest: userRoles.guest | userRoles.user | userRoles.admin,    // ...111
    user: userRoles.user | userRoles.admin,                       // ...110
    admin: userRoles.admin                                        // ...100

    // admin: user.Roles.admin,
    // cmAdmin: user.Roles.user | user.Roles.admin,

};
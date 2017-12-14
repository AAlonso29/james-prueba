(function() {
    'use strict';

    angular
        .module('jamesAuth')
        .controller('AuthController', [
            '$http',
            getperfilController
        ]);

    function getperfilController($http) {
        var vm = this;

        vm.message = '';
   

        $http({ method: 'GET', url: '/api/getperfil' })
            .then(function(response) {
                if(response && response.data) {
                    vm.message = response.data.message;

                }
            });
    }
})();
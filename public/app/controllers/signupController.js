(function() {
    'use strict';

    angular
        .module('jamesAuth')
        .controller('SignupController', [
            '$scope',
            'authService', 
            signupController
        ]);

    function signupController($scope, authService) {
        var vm = this;

        vm.signupSuccess = false;
        vm.signupError = false
        vm.signupErrorMessage = null;

        vm.signup = signup;
        // vm.cliente = cliente;

        function signup() {
            vm.signupSuccess = false;
            vm.signupError = false
            vm.signupErrorMessage = null;

            if(!vm.nombreUsuario || !vm.apellidoUsuario|| !vm.emailUsuario || !vm.password) {
                vm.signupError = true;
                vm.signupErrorMessage = 'Ingrese datos requeridos!';
                return;
            }

            authService.signup(vm.nombreUsuario, vm.apellidoUsuario, vm.emailUsuario, vm.avatarUsuario, vm.password, vm.telefonoMovil, vm.telefonoFijo)
                .then(handleSuccessfulSignup)
                .catch(handleFailedSignup);
        }

        function handleSuccessfulSignup(response) {
            vm.signupSuccess = true;
        }

        function handleFailedSignup(response) {
            vm.signupSuccess = false;

            if(response && response.data) {
                vm.signupErrorMessage = response.data.message;
                vm.signupError = true;
            }
        }
    }

})();
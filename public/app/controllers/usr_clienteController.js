(function() {
    'use strict';

    angular
        .module('jamesAuth')
        .controller('usr_clienteController', [
            '$scope',
            'authService', 
            usr_clienteController
        ]);

    function usr_clienteController($scope, authService) {
        var vm = this;

        vm.usr_clienteSuccess = false;
        vm.usr_clienteError = false
        vm.usr_clienteErrorMessage = null;

        vm.usr_cliente = usr_cliente;
        // vm.cliente = cliente;

        function usr_cliente() {
            vm.usr_clienteSuccess = false;
            vm.usr_clienteError = false
            vm.usr_clienteErrorMessage = null;

            if(!vm.nombreCliente || !vm.apellidoPCliente || !vm.emailCliente || !vm.password) {
                vm.usr_clienteError = true;
                vm.usr_clienteErrorMessage = 'Ingrese datos requeridos!';
                return;
            }

            authService.usr_cliente(vm.nombreCliente, vm.apellidoPCliente, vm.apellidoMCliente, vm.emailCliente, vm.telefonoFijoCliente, vm.telefonoMovilCliente, vm.password)
                .then(handleSuccessfulusr_cliente)
                .catch(handleFailedusr_cliente);
        }


        function handleSuccessfulusr_cliente(response) {
            vm.usr_clienteSuccess = true;
        }

        function handleFailedusr_cliente(response) {
            vm.usr_clienteSuccess = false;

            if(response && response.data) {
                vm.usr_clienteErrorMessage = response.data.message;
                vm.usr_clienteError = true;
            }
        }
    }

})();
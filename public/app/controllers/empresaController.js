//PASO 3: Se procede a crear el controlador del model, en donde se configuraran las acciones especificas a realizar por la entidad (empresa).

(function() {
    'use strict';

    angular
        .module('jamesAuth')
        .controller('empresaController', [
            '$scope',
            'authService', 
            empresaController
        ]);

    function empresaController($scope, authService) {
        var vm = this;

        vm.empresaSuccess = false;
        vm.empresaError = false
        vm.empresaErrorMessage = null;

        vm.empresa = empresa;


        function empresa() {
            vm.empresaSuccess = false;
            vm.empresaError = false
            vm.empresaErrorMessage = null;

            if(!vm.nombreEmpresa) {
                vm.empresaError = true;
                vm.empresaErrorMessage = 'Ingrese nombre de la empresa!';
                return;
            }

            authService.empresa(vm.nombreEmpresa)
                .then(handleSuccessfulempresa)
                .catch(handleFailedempresa);
        }


        function handleSuccessfulempresa(response) {
            vm.empresaSuccess = true;
        }

        function handleFailedempresa(response) {
            vm.empresaSuccess = false;

            if(response && response.data) {
                vm.empresaErrorMessage = response.data.message;
                vm.empresaError = true;
            }
        }
    }

})();

// cuando ya este listo el controlador del model, se procede a configurar el authService.
(function() {
    'use strict';

    angular
        .module('jamesAuth')
        .controller('general_kpiController', [
            '$scope',
            'authService', 
            general_kpiController
        ]);

    function general_kpiController($scope, authService) {
        var vm = this;

        vm.general_kpiSuccess = false;
        vm.general_kpiError = false
        vm.general_kpiErrorMessage = null;

        vm.general_kpi= general_kpi;
        // vm.cliente = cliente;

        function general_kpi() {
            vm.general_kpiSuccess = false;
            vm.general_kpiError = false
            vm.general_kpiErrorMessage = null;

            if(!vm.fechaInicio || !vm.fechaFinal) {
                vm.general_kpiError = true;
                vm.general_kpiErrorMessage = 'Ingrese fechas requeridas!';
                return;
            }

            // if(seleccionRd=='facebook'){
            //     vm.nombreTipoMedio = 'facebook'; 
            // }else{
            //     if(seleccionRd == 'twitter'){
            //         vm.nombreTipoMedio = 'twitter'
            //     }else{
            //         if(seleccionRd == 'web'){
            //             vm.nombreTipoMedio = 'web'
            //         }
            //     }
            // };

            vm.nombreTipoMedio = $scope.seleccionRd;

            authService.general_kpi(vm.fans, vm.alcance, vm.impresiones, vm.interacciones, vm.publicaciones, 
                vm.followers, vm.reach, vm.impressions, vm.contribuidores, vm.twettGenerados, vm.retweets, vm.respuestas, vm.menciones,
                 vm.visitas, vm.rebote, vm.permanencia, vm.nombreTipoMedio, vm.fechaInicio, vm.fechaFinal)
                .then(handleSuccessfulgeneral_kpi)
                .catch(handleFailedgeneral_kpi);
        }


        function handleSuccessfulgeneral_kpi(response) {
            vm.general_kpiSuccess = true;
        }

        function handleFailedgeneral_kpi(response) {
            vm.general_kpiSuccess = false;

            if(response && response.data) {
                vm.general_kpiErrorMessage = response.data.message;
                vm.general_kpiError = true;
            }
        }
    }

})();
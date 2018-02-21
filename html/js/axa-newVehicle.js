var app = angular.module("newVehicle", ['ngSanitize']);

app.directive('validatenifformat', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.validatenifformat = function (modelValue, viewValue) {

                if (modelValue) {
                    var dni = modelValue;

                    var numero,
                        let, letra;

                    var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;

                    dni = dni.toUpperCase();

                    numero = dni.substr(0, dni.length - 1);
                    numero = numero.replace('X', 0);
                    numero = numero.replace('Y', 1);
                    numero = numero.replace('Z', 2);
                    let = dni.substr(dni.length - 1, 1);
                    numero = numero % 23;
                    letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
                    letra = letra.substring(numero, numero + 1);

                    if (letra != let || expresion_regular_dni.test(dni) !== true) {
                        return false;
                    }
                    return true;
                }
            }
        }

    };
});

app.directive('validatenumregister', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.validatenumregister = function (modelValue, viewValue) {

                if (modelValue) {

                    var numReg = modelValue;

                    numReg = numReg.toUpperCase();

                    var regexp_numReg = /^[0-9]{4}[A-Z]{3}$/;

                    if (regexp_numReg.test(numReg) !== true) {
                        return false;
                    }
                    return true;

                }

            }
        }
    };
});



app.controller('newVehicleCtrl', function ($scope, $http, $timeout) {

    var fileName = "axa-nuevo-vehiculo.html";

    window.history.pushState({
        page: 1
    }, "", fileName + "#step1");
    setTimeout(function () {
        $('.d-nuevo-vehiculo').addClass('visible-content');
    }, 1000);


    

    $scope.steps = true;
    $scope.step1 = true;
    $scope.step2 = false;
    $scope.completed = false;
    $scope.errorsession = false;
    $scope.errorlink = false;
    $scope.errorform = false;



    $scope.user = {
        name: 'Verónica'
    };


    // step 1
    $scope.nif = '';

    $scope.nextStep = function () {
        $scope.step1 = false;
        $scope.step2 = true;

        window.history.pushState({
            page: 2
        }, "", fileName + "#step2");
    }


    // step 2
    $scope.vehicle = {
        brand: "SEAT",
        model: "PANDA"
    }

    $scope.newVehicle = {
        brand: "ASTON MARTIN",
        model: "DB11",
        version: "V12 COUPE 3P",
        property: "GLOSS SILVER",
        insurance: "TODO RIESGO SIN FRANQUICIA",
        annualPrice: "999,99"
    }
 
    

    $scope.numberregister = "";
    
    $scope.startdate = "";
    $scope.required = "true";

    $scope.send = function(){
        $scope.steps = false;
        switch($scope.numberregister){
            case "1111abc":
                $scope.errorsession = true;
                window.history.pushState({
                    page: 2
                }, "", fileName + "#errorsession");
          
            break;
            case "2222abc":
                $scope.errorlink = true;            
                window.history.pushState({
                    page: 2
                }, "", fileName + "#errorlink");
          
            break;
            case "3333abc":
                $scope.errorform = true;
                window.history.pushState({
                    page: 2
                }, "", fileName + "#errorform");
          
            break;
            default:
                $scope.completed = true; 
                window.history.pushState({
                    page: 2
                }, "", fileName + "#complete");
             
        }
    }
});
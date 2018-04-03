var app = angular.module("gdpr", ['ngSanitize']);

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


app.controller('gdprController', function ($scope, $http, $timeout) {

    var fileName = "axa-gdpr.html";

    window.history.pushState({
        page: 1
    }, "", fileName + "#step1");
    setTimeout(function () {
        $('.a-gdpr').addClass('visible-content');
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

    // step2

    $scope.pp = {
        radio1: '' ,
        radio2: '',
        radio3: ''
    };

    $scope.nextStep = function () {
        $scope.step1 = false;
        $scope.step2 = true;

        window.history.pushState({
            page: 2
        }, "", fileName + "#step2");
    }
    
    $scope.required = "true";

   
    $scope.send = function(){
        $scope.steps = false;

        if($scope.pp.radio1 == 'no' && $scope.pp.radio2 == 'no' && $scope.pp.radio3 == 'no'){
            $scope.errorform = true;
            window.history.pushState({
                page: 2
            }, "", fileName + "#errorsave");
        }
        else if($scope.pp.radio1 == 'no' && $scope.pp.radio2 == 'no' && $scope.pp.radio3 == 'yes'){
            $scope.errorsession = true;
            window.history.pushState({
                page: 2
            }, "", fileName + "#errorsession");
        }
        else if($scope.pp.radio1 == 'no' && $scope.pp.radio2 == 'yes' && $scope.pp.radio3 == 'yes'){
            
            $scope.errorlink = true;            
            window.history.pushState({
                page: 2
            }, "", fileName + "#errorlink");
        }
        else{
            $scope.completed = true; 
            window.history.pushState({
                page: 2
            }, "", fileName + "#complete");
        }
    }

});
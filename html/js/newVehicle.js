var app = angular.module("newVehicle", ['ngSanitize']);


app.directive('validatedate', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.validatedate = function (modelValue, viewValue) {
                newdate = modelValue.split("-").reverse().join("-");

                var date = new Date(newdate);
                var _now = new Date();

                _now.setFullYear(_now.getFullYear()-1); //no mas antiguo de un año desde hoy

                if (date.getTime() > _now.getTime()) {
                    return false;
                }
                return true;
            };
        }
    };
});

app.directive('validatenif', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.validatenif = function (modelValue, viewValue) {
              
                if (modelValue.length < 2 ) {
                    return false;
                }
                return true;
            };
        }
    };
});


app.controller('newVehicleCtrl', function($scope, $http, $timeout) {

    $scope.user = {
        name: 'Verónica'
    };
    var date=new Date();
    var today_day = date.getDate();
    var today_month = date.getMonth() + 1;
    today_day = (today_day < 10) ? ("0" + today_day) : today_day;
    today_month = today_month < 10 ? ("0" + today_month) : today_month;

    $scope.data2 = {
        date: today_day+'-'+today_month+'-'+date.getFullYear()
    }

    $scope.enableNext = false;

    $scope.checkNIF = function(){
        if($('#nif').val() ) {
            console.log($('#nif').val() );
        }
    };
});
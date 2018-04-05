var app = angular.module("gdpr", ['ngSanitize']);

app.directive('validatenifformat', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.validatenifformat = function (modelValue, viewValue) {
                /**
                 * ValidateSpanishID. Returns the type of document and checks its validity.
                 * 
                 * Usage:
                 *     ValidateSpanishID( str );
                 * 
                 *     > ValidateSpanishID( '12345678Z' );
                 *     // { type: 'dni', valid: true }
                 *     
                 *     > ValidateSpanishID( 'B83375575' );
                 *     // { type: 'cif', valid: false }
                 * 
                 * The algorithm is adapted from other solutions found at:
                 * - http://www.compartecodigo.com/javascript/validar-nif-cif-nie-segun-ley-vigente-31.html
                 * - http://es.wikipedia.org/wiki/C%C3%B3digo_de_identificaci%C3%B3n_fiscal
                 */
                ValidateSpanishID = (function () {
                    'use strict';
                  
                    var DNI_REGEX = /^(\d{8})([A-Z])$/;
                    var CIF_REGEX = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;
                    var NIE_REGEX = /^[XYZ]\d{7,8}[A-Z]$/;
                  
                    var ValidateSpanishID = function (str) {
                  
                      // Ensure upcase and remove whitespace
                      str = str.toUpperCase().replace(/\s/, '');
                  
                      var valid = false;
                      var type = spainIdType(str);
                  
                      switch (type) {
                        case 'dni':
                          valid = validDNI(str);
                          break;
                        case 'nie':
                          valid = validNIE(str);
                          break;
                        case 'cif':
                          valid = validCIF(str);
                          break;
                      }
                  
                      return  valid;
                      
                  
                    };
                  
                    var spainIdType = function (str) {
                      if (str.match(DNI_REGEX)) {
                        return 'dni';
                      }
                      if (str.match(CIF_REGEX)) {
                        return 'cif';
                      }
                      if (str.match(NIE_REGEX)) {
                        return 'nie';
                      }
                    };
                  
                    var validDNI = function (dni) {
                      var dni_letters = "TRWAGMYFPDXBNJZSQVHLCKE";
                      var letter = dni_letters.charAt(parseInt(dni, 10) % 23);
                  
                      return letter == dni.charAt(8);
                    };
                  
                    var validNIE = function (nie) {
                  
                      // Change the initial letter for the corresponding number and validate as DNI
                      var nie_prefix = nie.charAt(0);
                  
                      switch (nie_prefix) {
                        case 'X': nie_prefix = 0; break;
                        case 'Y': nie_prefix = 1; break;
                        case 'Z': nie_prefix = 2; break;
                      }
                  
                      return validDNI(nie_prefix + nie.substr(1));
                  
                    };
                  
                    var validCIF = function (cif) {
                  
                      var match = cif.match(CIF_REGEX);
                      var letter = match[1],
                        number = match[2],
                        control = match[3];
                  
                      var even_sum = 0;
                      var odd_sum = 0;
                      var n;
                  
                      for (var i = 0; i < number.length; i++) {
                        n = parseInt(number[i], 10);
                  
                        // Odd positions (Even index equals to odd position. i=0 equals first position)
                        if (i % 2 === 0) {
                          // Odd positions are multiplied first.
                          n *= 2;
                  
                          // If the multiplication is bigger than 10 we need to adjust
                          odd_sum += n < 10 ? n : n - 9;
                  
                          // Even positions
                          // Just sum them
                        } else {
                          even_sum += n;
                        }
                  
                      }
                  
                      var control_digit = (10 - (even_sum + odd_sum).toString().substr(-1));
                      var control_letter = 'JABCDEFGHI'.substr(control_digit, 1);
                  
                      // Control must be a digit
                      if (letter.match(/[ABEH]/)) {
                        return control == control_digit;
                  
                        // Control must be a letter
                      } else if (letter.match(/[KPQS]/)) {
                        return control == control_letter;
                  
                        // Can be either
                      } else {
                        return control == control_digit || control == control_letter;
                      }
                  
                    };
                  
                    return ValidateSpanishID;
                  })();

                if (modelValue) {
                    
                    return ValidateSpanishID( modelValue );

                }
            }
        }

    };
});

app.directive('capitalize', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {
        var capitalize = function(inputValue) {
          if (inputValue == undefined) inputValue = '';
          var capitalized = inputValue.toUpperCase();
          if (capitalized !== inputValue) {
            // see where the cursor is before the update so that we can set it back
            var selection = element[0].selectionStart;
            modelCtrl.$setViewValue(capitalized);
            modelCtrl.$render();
            // set back the cursor after rendering
            element[0].selectionStart = selection;
            element[0].selectionEnd = selection;
          }
          return capitalized;
        }
        modelCtrl.$parsers.push(capitalize);
        capitalize(scope[attrs.ngModel]); // capitalize initial value
      }
    };
});


app.controller('gdprController', function ($scope, $http, $timeout) {

    var fileName = "direct-gdpr.html";

    window.history.pushState({
        page: 1
    }, "", fileName + "#step1");
    setTimeout(function () {
        $('.d-gdpr').addClass('visible-content');
    }, 1000);



    $scope.steps = true;
    $scope.step1 = true;
    $scope.step2 = false;
    $scope.completed = false;
    $scope.errorsession = false;
    $scope.errorlink = false;
    $scope.errorform = false;
    $scope.nifFinded = true;

    $scope.user = {
        name: 'Verónica',
        nif:'11111111H'
    };

    // step 1
    $scope.nif = '';

    $scope.findNif = function(){
        
        if( $scope.nif == $scope.user.nif ){
            $scope.nifFinded = true;
        }else{
            $scope.nifFinded = false;
        }
    }

    // step2

    $scope.pp = {
        radio1: '' ,
        radio2: '',
        radio3: ''
    };

    $scope.scrollToError = function () {
        console.log($('has-herror:visible').first());
        
       $scope.scrollToAnchor($scope.from2.$error.required[0].$name);
    }

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
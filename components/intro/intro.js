/**
 * Created by petry_000 on 15.11.2016.
 */
angular.module('SolvIn')
    .controller('IndexController', function ($scope, $state) {
    
        $scope.gotoWizard = function () {
            $state.go('wizard')
        };
    });
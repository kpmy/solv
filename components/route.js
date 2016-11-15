/**
 * Created by pk on 08.11.2016.
 */
angular.module('SolvIn')
    .config(function ($stateProvider) {
        $stateProvider
            .state({
                name: 'wizard',
                url: '/wizard?id',
                controller: 'WizardController',
                templateUrl: 'components/wizard/wizard.html'
            })
            .state({
                name: 'intro',
                url: '/',
                controller: 'IndexController',
                templateUrl: 'components/intro/intro.html'
            })
            .state({
                name: 'otherwise',
                url: '*path',
                controller: function ($state) {
                    $state.go('intro');
                }
            });
    });
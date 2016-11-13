angular.module('SolvIn')
    .controller('WizardController', function ($scope, $state, $stateParams, $mdToast, PureBeing, PureNothing, Becoming, Passing, Uprising, ExtantBeing, Nihility, Quality, Something, FluentSomething, Definition, Limit, Quantity, Progress) {
        $scope.steps = [];
        $scope.stepsMap = {};

        var injected = arguments;

        function pushSteps(...ids) {
            Array.from(ids).forEach(function (id) {
                var step = Array.from(injected).find(s => _.isEqual(s.id, id) && _.isArray(s.words));
                if (_.isObject(step)) {
                    $scope.steps.push(step);
                    $scope.stepsMap[id] = $scope.steps.length - 1;
                } else {
                    console.log(`no step for ${id}`);
                }
            });
        }

        pushSteps('PureBeing', 'PureNothing', 'Becoming', 'Passing', 'Uprising', 'ExtantBeing', 'Nihility', 'Quality', 'Something', 'FluentSomething', 'Definition', 'Limit', 'Quantity', 'Progress');

        $scope.rotate = function (w) {
            return [0, 0, 0, 90, -90][Math.round(4 * Math.random())];
        };

        let update = $scope.update = function () {
            $scope.words = [];
            const maxWords = 200;
            let step = $scope.step = $scope.steps[$scope.stepIdx];

            for(var i = 0; i<maxWords; i++){
                $scope.words.push({
                    name: step.words[Math.round((step.words.length -1) * Math.random())],
                    score: i < (2 * maxWords / 3) ? Math.random() / 2 : Math.random(),
                    index: i
                })
            }
        };
        
        $scope.events = {
            click: function (tag) {
                $mdToast.showSimple('КЛИК')
            }
        };

        $scope.showStep = function (idx){
           if(_.isNumber(idx)) {
               $scope.stepIdx = idx;
           } else {
               $scope.stepIdx = $scope.stepsMap[idx];
           }

            $state.go('wizard', {id: _.invert($scope.stepsMap)[$scope.stepIdx]}, {reload: true});
        };

        $scope.showNextStep = function () {
            $scope.showStep($scope.stepIdx + 1);
        };

        $scope.showPrevStep = function () {
            $scope.showStep($scope.stepIdx - 1);
        };

        $scope.hasNextStep = function () {
            return ($scope.stepIdx + 1) < $scope.steps.length;
        };

        $scope.hasPrevStep = function () {
            return ($scope.stepIdx - 1) >= 0;
        };

        if (_.isUndefined($stateParams.id)) {
            $scope.showStep('PureBeing');
        } else {
            $scope.stepIdx = $scope.stepsMap[$stateParams.id];
            update();
        }

    });
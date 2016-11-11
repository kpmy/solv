angular.module('SolvIn')
    .value('PureBeing', {
        name: 'Чистое бытие',
        words: ['есть', 'чистое', 'бытие'],
        facts: [{
            title: 'Есть', description: `Про всё можно сказать, что оно есть, хотя бы в виде слова.`
        }, {
            title: 'Бытие', description: `Всё, что есть - есть бытие.`
        }, {
            title: 'Чистое бытие', description: `Самое простое бытие, то есть бытие без всякой дальнейшей определённости, абстракция.`
        }, {
            title: 'Оно есть', description: `Кроме того, что <em>чистое&nbsp;бытие</em> есть, <em>ничего</em> о
нём сказать нельзя.`
        }, {
            title: `Слово о ничто`, description: `Если о чистом бытии более нельзя сказать ничего, то как это <em>ничего</em> назвать?`,
            actions: [{name: 'Ничто', value: `PureNothing`}]
        }]
    })
    .value('PureNothing', {
        name: 'Чистое ничто',
        words: ['чистое', 'ничто'],
        facts: [{title: 'Чистое ничто', description: 'Ничто чистого бытия, абстракции, есть абстрактное, <em>чистое&nbsp;ничто</em>.'},
            {title: 'Переход', description: `Обсуждая понятие <em>чистое&nbsp;бытие</em> диалектически перешли к понятию <em>чистое&nbsp;ничто</em>.`},
            {title: 'Чистое бытие переходит в чистое ничто.'}
        ]
    })
    .controller('WizardController', function ($scope, $state, $stateParams, $mdToast, PureBeing, PureNothing) {
        $scope.steps = [];
        $scope.stepsMap = {};

        function pushStep(id, step) {
            $scope.steps.push(step);
            $scope.stepsMap[id] = $scope.steps.length -1;
        }
        pushStep('PureBeing', PureBeing);
        pushStep('PureNothing', PureNothing);

        $scope.rotate = function (w) {
            return [0, 90, -90][Math.round(2 * Math.random())];
        };

        $scope.events = {
           click: function (tag) {
                $mdToast.showSimple('КЛИК')
           }
        };

        let update = $scope.update = function () {
            $scope.words = [];
            const maxWords = 300;
            let step = $scope.step = $scope.steps[$scope.stepIdx];

            for(var i = 0; i<maxWords; i++){
                $scope.words.push({
                    name: step.words[Math.round((step.words.length -1) * Math.random())],
                    score: i < (2 * maxWords / 3) ? Math.random() / 2 : Math.random(),
                    index: i
                })
            }
        };

        $scope.showStep = function (idx){
           if(_.isNumber(idx)) {
               $scope.stepIdx = idx;
           } else {
               $scope.stepIdx = $scope.stepsMap[idx];
           }

            $state.go('wizard', {id: _.invert($scope.stepsMap)[$scope.stepIdx]});
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

        $scope.showStep(_.isUndefined($stateParams.id) ? 'PureBeing' : $scope.stepsMap[$stateParams.id]);
        update();
    });
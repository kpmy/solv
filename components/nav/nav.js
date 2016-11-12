/**
 * Created by pk on 08.11.2016.
 */
angular.module('SolvIn')
    .directive('navbar', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/nav/nav.html',
            controller: function ($scope, $mdSidenav) {
                $scope._=_; //усатый-полосатый

                $scope.todayPhrase = null;

                $scope.phrase = function () {
                    var phrases = [`Метод есть осознание формы внутреннего самодвижения содержания изучаемого предмета.`,
                        `Свобода — это господство над обстоятельствами со знанием дела.`, `Всё является примером диалектики.`, `Истина состоит в том, чтобы представить данный предмет как живое противоречие.`];
                    return _.isNull($scope.todayPhrase) ? ($scope.todayPhrase = phrases[Math.min(Math.round(Math.random()*phrases.length), phrases.length - 1)]) : $scope.todayPhrase;
                };

                $scope.toggleNav = function (id) {
                    $mdSidenav(id).toggle();
                }
            }
        }
    });
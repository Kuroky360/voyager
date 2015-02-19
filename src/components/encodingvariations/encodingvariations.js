'use strict';

/**
 * @ngdoc directive
 * @name facetedviz.directive:encodingVariations
 * @description
 * # encodingVariations
 */
angular.module('facetedviz')
  .directive('encodingVariations', function (Visrec, Bookmarks, $document) {

    return {
      templateUrl: 'components/encodingvariations/encodingvariations.html',
      restrict: 'E',
      replace: true,
      scope: {},
      link: function postLink(scope/*, element, attrs*/) {
        scope.Visrec = Visrec;
        scope.Bookmarks = Bookmarks;

        function escape(e) {

          if (e.keyCode === 27) {
            console.log('escape');
            scope.close();
            angular.element($document).off('keydown', escape);
          }
        }

        angular.element($document).on('keydown', escape);

        scope.isInList = function(chart) {
          return Visrec.selectedCluster &&
            chart.fieldSetKey === Visrec.selectedCluster.key;
        }

        scope.select = function(subcluster) {
          scope.selectedSubcluster = subcluster;
        };

        scope.close = function() {
          console.log('close');
          scope.Visrec.selectedCluster = null;
        };

        scope.$watch('Visrec.selectedCluster', function(selectedCluster) {
          scope.selectedSubcluster = selectedCluster ? selectedCluster[0] : null;
        });
      }
    };
  });

angular.module('app.controllers', [])
  
.controller('loginCtrl', function($scope) {

})
   
.controller('signupCtrl', function($scope) {

})
   
.controller('summaryPageCtrl', function($scope) {

})
      
.controller('growthRateCtrl', function($scope) {

})
   
.controller('recentTransactionsCtrl', function($scope) {

})
  .controller('slideCtrl', function($scope) {

})
  .controller('pre_verificationCtrl', function($scope) {

})
  .controller('post_verificationCtrl', function($scope) {

})
    
.controller('accountCtrl', function($scope) {

})
.controller('faqCtrl', function($scope) {

})
.controller('privacyCtrl', function($scope) {

})
.controller('sidemenuCtrl', function($scope) {

})
.controller('investCtrl', function($scope) {

})
.controller('withdrawCtrl', function($scope) {

})
.controller('tourCtrl', function($scope) {

})

.controller('MyCtrl', function($scope) {
  $scope.groups = [];
    $scope.groups["0"] = {name: "sumanth",items: ["1", "2"] };
  
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
  
})
.controller('MyCtrl_swipe', function ($scope, $ionicTabsDelegate) {

    $scope.goForward = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1) {
            $ionicTabsDelegate.select(selected + 1);
        }
    }

    $scope.goBack = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1 && selected != 0) {
            $ionicTabsDelegate.select(selected - 1);
        }
    }
})
.controller('MyCtrl_test', function($scope, $ionicSlideBoxDelegate) {
	    $scope.goForward = function () {
       $ionicSlideBoxDelegate.next();
    }

    $scope.goBack = function () {
       $ionicSlideBoxDelegate.previous();
    }
   $scope.nextSlide = function() {
      $ionicSlideBoxDelegate.next();
   }
});
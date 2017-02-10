angular.module('ionicApp', ['ionic','ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "sidemenus/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'menuContent': {
          templateUrl: "sidemenus/home.html",
          controller: 'HomeTabCtrl'
        }
      }
    })
    .state('tabs.facts', {
      url: "/facts",
      views: {
        'menuContent': {
          templateUrl: "sidemenus/ionform.html",
          controller: 'MyController'
        }
      }
    })
    .state('tabs.facts2', {
      url: "/facts2",
      views: {
        'menuContent': {
          templateUrl: "sidemenus/facts2.html"
        }
      }
    })
    .state('tabs.about', {
      url: "/about",
      views: {
        'menuContent': {
          templateUrl: "sidemenus/about.html"
        }
      }
    })
    .state('tabs.navstack', {
      url: "/navstack",
      views: {
        'menuContent': {
          templateUrl: "sidemenus/nav-stack.html"
        }
      }
    })
    .state('tabs.contact', {
      url: "/contact",
      views: {
        'menuContent': {
          templateUrl: "sidemenus/contact.html"
        }
      }
    });


   $urlRouterProvider.otherwise("/tab/home");

})

.controller('HomeTabCtrl', function($scope) {
  
})

.controller('MyController', function($scope) {

});
angular.module('ionicApp', ['ionic','ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      controller: 'maincontroller',
      templateUrl: "sidemenus/tabscustomerpage.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'menuContent': {
          templateUrl: "sidemenus/home.html"
        }
      }
    })
     .state('tabs.userinfo', {
      url: "/userinfo",
      views: {
        'menuContent': {
          controller: 'userinfocontroller',
          templateUrl: "sidemenus/userinfo.html"
        }
      }
    })
    .state('tabs.shoplist', {
      url: "/shoplist",
      views: {
        'menuContent': {
          templateUrl: "sidemenus/shoplist.html",
          controller: 'shoplistctrl'
        }
      }
    })
    ;
    


   $urlRouterProvider.otherwise("/tab/home");

})

.controller('shoplistctrl', function($scope) {

	  $scope.data = {
			    showDelete: false
			  };
			  
			  $scope.edit = function(item) {
			    alert('Edit Item: ' + item.id);
			  };
			  $scope.share = function(item) {
			    alert('Share Item: ' + item.id);
			  };
			  
			  $scope.onItemDelete = function(item) {
			    $scope.items.splice($scope.items.indexOf(item), 1);
			  };
	  $scope.clearSearch = function(){	  
		  $scope.searchval = {};
	  };
	  
	  $scope.searchval = {};
	
	  $scope.items = [
		    { id: 0 , name:"jay" },
		    { id: 1 , name:"ryan" },
		    { id: 2 , name:"oliveros" },
		    { id: 3 , name:"eraine" },
		    { id: 4 , name:"bernadette" },
		    { id: 5 , name:"santos" },
		    { id: 6 , name:"otayde" },
		    { id: 7 , name:"angeles" },
		    { id: 8 , name:"jaylord" },
		    { id: 9 , name:"jaybee" },
		    { id: 10 , name:"jayson" }
		  ];

})
.controller('maincontroller', function($scope,$ionicLoading,$ionicPopup){
	$scope.dologout = function (){
	     var confirmPopup = $ionicPopup.confirm({
	         title: 'Hello',
	         template: 'Are you sure you want to logout?'
	       });
	       confirmPopup.then(function(res) {
	         if(res) {  
	  		 $ionicLoading.show({
		    	 template: ' <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'+
		            '<p>Loging out...</p>',
		          animation: 'fade-in',
		          noBackdrop: false,
		          maxWidth: 200,
		          showDelay: 500,
		      duration: 3000
			 }).then(function(){
				 window.location.href = '/logout';
			 });
	         } else {
	           console.log('You are not sure');
	         }
	     });
	       

	};
})
.controller('userinfocontroller', function($scope,$http){
	var init = function () {
		    $http({
			  method: 'GET',
			  url: '/currentuserinfo'
			}).then(function successCallback(response) {
			     console.log(response);
			  }, function errorCallback(response) {
				 console.log(response);
			  });	 
		};

		init();
})
.controller('backController', function($scope, $ionicHistory,$state) {
	$scope.myGoBack = function() {
/*		if($ionicHistory.currentStateName() == 'tabs.register'){
			$state.go('tabs.loginregister', {}, { location: false } );
		}*/
	};
});
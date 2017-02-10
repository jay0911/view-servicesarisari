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
          templateUrl: "sidemenus/home.html"
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
   .state('tabs.loginregister', {
      url: "/loginregister",
      views: {
        'menuContent': {
          templateUrl: "sidemenus/loginregister.html"
        }
      }
    })
    .state('tabs.register', {
      url: "/register",
      views: {
        'menuContent': {
          templateUrl: "sidemenus/register.html",
          controller: 'registercontroller'
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
.controller('registercontroller', function($scope,$http,$state,$ionicPopup) {
	  $scope.gender=[
       	{text:"Male",value:"male"},
       	{text:"Female",value:"female"}
      ];
	  
	  $scope.gendervalue = {value:"male"};
	  
	  $scope.name = {last:"",first:""};
	 
	  
	  $scope.customer = {
			  fullname:"",
			  contactnumber:"",
			  emailaddress:"",
			  address:"",
			  gender:"",
			  username:"",
			  password:""
	  };
	  

	  
	  
	  $scope.onsubmit = function (){
		  $scope.customer.fullname = $scope.name.first + " " +$scope.name.last;
		  $scope.customer.gender = $scope.gendervalue.value;
	  
		  alert(JSON.stringify($scope.customer));  
		  
		  $http.post('/registerhere', JSON.stringify($scope.customer)).then(function (data) {
			  	  console.log(data.data.code);
			  	  if(data.data.code == "200"){
			  		  	   
			       var alertPopup = $ionicPopup.alert({
			           title: 'Registration',
			           template: 'Success!'
			        });

			        alertPopup.then(function(res) {
	
			        	$state.go('tabs.loginregister', {}, { location: false } );
			        });
			  	  };
			  	  
			  }, function (data) {
				  console.log(data);
			  });
		  
	  };
	  
			  			
})

.controller('backController', function($scope, $ionicHistory,$state) {
	$scope.myGoBack = function() {
		if($ionicHistory.currentStateName() == 'tabs.register'){
			$state.go('tabs.loginregister', {}, { location: false } );
		}
	};
});
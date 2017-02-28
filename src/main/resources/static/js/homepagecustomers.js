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
    .state('tabs.shopmaintenance', {
        url: "/shopmaintenance",
        views: {
          'menuContent': {
            templateUrl: "sidemenus/shopmaintenance.html",
            controller: 'shopmaintenancectrl'
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
.controller('userinfocontroller', function($scope,$http,$ionicLoading,$ionicPopup,$state){
	
	  $scope.customer = {
			  fullname:"",
			  contactnumber:"",
			  emailaddress:"",
			  address:"",
			  gender:"",
			  username:"",
			  password:""
	  };
	  
	  $scope.name = {
			  firstname:"",
			  lastname:""
	  };
	  
	  $scope.dataloaded = false;
	  
	  $scope.gender=[
	       	{text:"Male",value:"male"},
	       	{text:"Female",value:"female"}
	      ];
		  
	  $scope.gendervalue = {value:""};
	
	var init = function () {
		    $http({
			  method: 'GET',
			  url: '/currentuserinfo'
			}).then(function successCallback(response) {
			     console.log(response);
			     $scope.customer.contactnumber = response.data.contactnumber;
			     $scope.customer.address = response.data.address;
			     $scope.customer.emailaddress = response.data.emailaddress;
			     $scope.gendervalue.value = response.data.gender;
			     $scope.customer.username = response.data.username;
			     var fullnamesplit = response.data.fullname.split(" ");
			     $scope.name.first = fullnamesplit[0];
			     $scope.name.last = fullnamesplit[1];
			     $scope.dataloaded = true;
			}, function errorCallback(response) {
				 console.log(response);
			});	 
		};

		init();
		
		  $scope.onsubmit = function (){
			  
			  $ionicLoading.show({
			    	 template: ' <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'+
			            '<p>Modifying ...</p>',
			          animation: 'fade-in',
			          noBackdrop: false,
			          maxWidth: 500,
			          showDelay: 0
			  });
			  
			  $scope.customer.fullname = $scope.name.first + " " +$scope.name.last;
			  $scope.customer.gender = $scope.gendervalue.value;
			  
		  
			  
			  $http.post('/modifyaccount', JSON.stringify($scope.customer)).then(function (data) {
				  	  console.log(data.data.code);
				  	  if(data.data.code == "200"){
				  		  	   
				       var alertPopup = $ionicPopup.alert({
				           title: 'Modifying',
				           template: 'Success!'
				        });

				        alertPopup.then(function(res) {
				        	//do after click ok
				        	$state.go('tabs.home', {}, { location: false } );
				        	window.location.href = '/homepagecustomers'
				        });
				  	  };
				  	  if(data.data.code == "400"){
					       var alertPopup = $ionicPopup.alert({
					           title: 'Error',
					           template: 'Modifying Failed!'
					        });

					        alertPopup.then(function(res) {
					        	//do after click ok
					        });
				  	  };
				  	  
			  }, function (data) {
					  console.log(data);
			  }).finally(function() {
					    // called no matter success or failure
				  $ionicLoading.hide();
			  });
			  
		  };
		  
})
.controller('shopmaintenancectrl', function($scope,$http,$ionicLoading) {
	$scope.file = "";
	$scope.isregistered = true;
    $scope.shop= {
            quantity:1,
            name:"",
            details:"",
        }
    $scope.uploadFile = function(files){
        var filename = files[0].name;
        $scope.file = filename;
        alert('file was selected: ' + filename);
    };
    
    var init = function () {
	    $http({
		  method: 'GET',
		  url: '/checkshop'
		}).then(function successCallback(response) {
		     console.log(response);
		     if(response.data.details != "400"){
		    	 $scope.isregistered = true;
		    	 $scope.shop.name = response.data.name;
		    	 $scope.shop.details = response.data.details
		     }else{
		    	 $scope.isregistered = false;
		     }
		}, function errorCallback(response) {
			 console.log(response);
		});	 
	};

	init();
    
	$scope.onregister = function (){
		$scope.isregistered = true;
		console.log("registered");
		
		  $ionicLoading.show({
		    	 template: ' <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'+
		            '<p>Saving ...</p>',
		          animation: 'fade-in',
		          noBackdrop: false,
		          maxWidth: 500,
		          showDelay: 0
		  });		  
		  console.log(JSON.stringify($scope.shop));
		  $http.post('/registershop', JSON.stringify($scope.shop)).then(function (data) {			  		  	   
			      var alertPopup = $ionicPopup.alert({
			           title: 'Modifying',
			           template: 'Success!'
			      });  	  
		  }, function (data) {
				  console.log(data);
		  }).finally(function() {
				    // called no matter success or failure
			  $ionicLoading.hide();

		  });
		
		
		
		
		
	};
    
    $scope.addProduct = function (){
    	alert($scope.file);
    	
    	 var fd = new FormData();
         fd.append('file', file);
         $http.post(uploadUrl, fd, {
             transformRequest: angular.identity,
             headers: {'Content-Type': undefined}
         })
         .success(function(){
         })
         .error(function(){
         });
    };

})
.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeFunc = scope.$eval(attrs.customOnChange);
      element.bind('change', function(event){
		var files = event.target.files;
		onChangeFunc(files);
      });
        
      element.bind('click', function(){
      	element.val('');
      });
    }
  };
})
.controller('backController', function($scope, $ionicHistory,$state) {
	$scope.myGoBack = function() {
/*		if($ionicHistory.currentStateName() == 'tabs.register'){
			$state.go('tabs.loginregister', {}, { location: false } );
		}*/
	};
});
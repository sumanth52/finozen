angular.module('app.subcontrollerTwo', [])

    .controller('changeCtrl', function(changePinService,$scope,$sessionStorage,$ionicPopup,$state){

        $scope.forgotPin=function(changePinForm){

            changePinForm.clientCode=$sessionStorage.SessionClientCode;
            changePinForm=JSON.stringify(changePinForm);
            console.log(changePinForm + " form data");
//changePinService.changePin(changePinForm);
            changePinService.save(changePinForm,function(data){
                console.log(data);
                if(data.responseCode == "Cali_SUC_1030") {


                    var popup= $ionicPopup.alert({
                        title: 'Password Change status',
                        template: 'Password Changed Successfully'
                    });

                    popup.then(function(res) {
                        $state.go("account");
                    });
                }
                else {
                    console.log("Error");
                    $ionicPopup.alert({
                        title: 'Password Change status',
                        template: 'Password Changed UnSuccessfully'
                    });
					popup.then(function(res) {
                        $state.go("account");
                    });
                }
            },function(error){
                console.log("eror");

            });

        }

    })

    /*for destroying the session storage*/
    .controller('signoutCtrl',function($scope,$state,$ionicHistory,$timeout){

        $scope.signOut = function(){
           
            $timeout(function () {
                $ionicHistory.clearCache();
               $ionicHistory.clearHistory();
            },100)
             $state.go('login');
        }
    })


    .controller('forgotPinCtrl', function($scope,$sessionStorage,$http,$state,$ionicPopup) {
        $scope.resetPin=function(change) {
          $scope.forget5 = JSON.parse(forgotPin2(change));
          $scope.forget5.mobileNumber = JSON.stringify($sessionStorage.forgotPinPhone);
          var forgotpinPass = JSON.stringify($scope.forget5);
          console.log(forgotpinPass + 'string');
          $http.post('http://205.147.99.55:8080/WealthWeb/ws/clientFcps/setNewPassword', forgotpinPass).success(function(data){
            console.log(data+'response');
            if(data.responseCode=="Cali_SUC_1030"){

              var popup= $ionicPopup.alert({
                title: 'PIN Change status',
                template: 'PIN Changed Successfully'
              });

              popup.then(function(res) {
                $state.go("login");
              });
            }
			else {
				$ionicPopup.alert({
                title: 'PIN Change status',
                template: 'PIN Changed UnSuccessfully'
				});
				popup.then(function(res) {
                $state.go("login");
              });
			}


          }).error(function(data){
            {
              console.log("Error");
              $ionicPopup.alert({
                title: 'PIN Change status',
                template: 'PIN Changed UnSuccessfully'
              });
            }
          });

        }
        var  forgotPin2 = function(change2){
            return JSON.stringify(change2)
        }



})
/*For session timeout*/
    .controller('EventsCtrl', function($scope, Idle,$ionicPopup) {
    $scope.events = [];

    $scope.$on('IdleStart', function() {
        // the user appears to have gone idle
        console.log("Start");
    });

    $scope.$on('IdleWarn', function(e, countdown) {
        console.log("Warning");
        // follows after the IdleStart event, but includes a countdown until the user is considered timed out
        // the countdown arg is the number of seconds remaining until then.
        // you can change the title or display a warning dialog from here.
        // you can let them resume their session by calling Idle.watch()
        alert('You are about to be logged out');
        Idle.watch();
    });

    $scope.$on('IdleTimeout', function() {
        // the user has timed out (meaning idleDuration + timeout has passed without any activity)
        // this is where you'd log them
        console.log("Signout");
        $ionicPopup.alert({
                        title: 'Timeout',
                        template: 'You will be logged out'
                    });
    });

    $scope.$on('IdleEnd', function() {
        // the user has come back from AFK and is doing stuff. if you are warning them, you can use this to hide the dialog
    });

    $scope.$on('Keepalive', function() {
        // do something to keep the user's session alive
    });

})

  .controller('LoadingCtrl', function($scope, $ionicLoading,$timeout) {
	  console.log("loading start");
    $scope.show = function() {
      $timeout(function () {
        $ionicLoading.show({
          template: 'Loading...'
        });

      }, 3000)

        $ionicLoading.hide();
    }
  })
  
  // for pan verification
  .controller('panAuthCtrl',function($scope,$http,$ionicPopup,$state,$cordovaCamera){
	$scope.panAuth=function(){
		 $http.post('', "panNumber").success(function(data){
            console.log(data+'response');
            if(data.responseCode=="Cali_SUC_1030"){

              var popup= $ionicPopup.alert({
                title: 'PAN status',
                template: 'Your Kyc is done'
              });

              popup.then(function(res) {
                $state.go("panImage");
              });
            }
			else {
				$ionicPopup.alert({
                title: 'PAN status',
                template: 'Sorry your not Kyced'
				});
				popup.then(function(res) {
                $state.go("aadhar");
              });
			}


          }).error(function(data){
            {
              console.log("Error");
              $ionicPopup.alert({
                title: 'PAN status',
                template: 'Please re-enter your PAN number or call us'
              });
            }
          });
	}  
	

	$scope.takeit=function(){
  document.addEventListener("deviceready", function () {
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 400,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true,
	  correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.imageData = imageData;
      $scope.cimage = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      // error
    });

  }, false);
}
	$scope.bank=function(){
		console.log($scope.imageData);
		$scope.panImageData={};
		$scope.panImageData.imageData=$scope.imageData;
		$scope.panImageData.pannumber=$scope.panNumber;
		var panimage=JSON.stringify($scope.panImageData);
			 $http.post('', panimage).success(function(data){
            console.log(data+'response');
            if(data.responseCode=="Cali_SUC_1030"){

              var popup= $ionicPopup.alert({
                title: 'Image status',
                template: 'Your Image has been sent'
              });

              popup.then(function(res) {
                $state.go("bank");
              });
            }
			else {
				$ionicPopup.alert({
                title: 'Image status',
                template: 'Your Image has been not been sent'
				});
              }
			}).error(function(data){
            {
              console.log("Error");
              $ionicPopup.alert({
                title: 'PAN status',
                template: 'Please re-enter your PAN number or call us'
              });
            }
          });
	  

	}
  })
angular.module('DirectiveApp', ['ngMap', 'angularMoment'])

	.controller('MainCtrl', ['$scope', function($scope){
		$scope.test = "Hello World";
		$scope.message = {
			text: 'hello world!',
	    	time: new Date()
		}
	}])

	.constant('angularMomentConfig', {
	    preprocess: 'utc', // optional
	})

	.directive('currentWeather', function() {
	  return {
	    restrict: 'AE',
	    scope: {
	      city: '@'
	    },
	    // template: '<div class="current-weather"><h4>Weather for {{city}}</h4>{{weather.main.temp}}</div>',
	    templateUrl: 'templates/current-weather-template.html',
	    //transclude: true,
	    controller: ['$scope', '$http',
	      function ($scope, $http) {
	        // var url = "http://api.openweathermap.org/data/2.5/weather?mode=json&cnt=7&units=imperial&callback=JSON_CALLBACK&q="
	       	var url = "http://api.openweathermap.org/data/2.5/forecast?mode=json&units=imperial&callback=JSON_CALLBACK&q="
	        $scope.getWeather = function(city) {
	          $http({ method: 'JSONP', url: url + city })
	            .success(function(data) {
	              console.log(data.list)
	              $scope.weather = data.list;
	            });
	        }
	    }],
	    link: function (scope, element, attrs) {
	      scope.weather = scope.getWeather(attrs.city);
	    }
	  }
	})

	



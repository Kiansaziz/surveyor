var app = angular.module('app', ['ngRoute', 'toastr','angularUtils.directives.dirPagination', 'angular.morris']);
    app.config(["$routeProvider",
    function($routeProvider) {
      $routeProvider
      .when("/", {
          templateUrl : "dashboard.html",
          controller  : "dashboardController",
          activetab   : ''
      })
      .when("/profile", {
          templateUrl : "profile.html"
      })
      .when("/chart", {
          templateUrl : "chart.html",
          controller  : "chartController",
          activetab   : 'chart'
      })
      .when("/pesan", {
          templateUrl : "pesan.html",
          controller  : "pesanController",
          activetab   : 'pesan'
      })
      .when("/group/a", {
          templateUrl : "chart/a.html",
          controller  : "groupAController",
          activetab   : 'group'
      })
      .when("/group/b", {
          templateUrl : "chart/b.html",
          controller  : "groupBController",
          activetab   : 'group'
      })
      .when("/group/c", {
          templateUrl : "chart/c.html",
          controller  : "groupCController",
          activetab   : 'group'
      })
      .when("/group/d", {
          templateUrl : "chart/d.html",
          controller  : "groupDController",
          activetab   : 'group'
      })
      .when("/group/e", {
          templateUrl : "chart/e.html",
          controller  : "groupEController",
          activetab   : 'group'
      })
      .when("/group/f", {
          templateUrl : "chart/f.html",
          controller  : "groupFController",
          activetab   : 'group'
      })
      .when("/group/g", {
          templateUrl : "chart/g.html",
          controller  : "groupGController",
          activetab   : 'group'
      })
      .when("/group/h", {
          templateUrl : "chart/h.html",
          controller  : "groupHController",
          activetab   : 'group'
      })
      .when("/group/i", {
          templateUrl : "chart/i.html",
          controller  : "groupIController",
          activetab   : 'group'
      })
      .when("/group/j", {
          templateUrl : "chart/j.html",
          controller  : "groupJController",
          activetab   : 'group'
      })
      .when("/group/k", {
          templateUrl : "chart/k.html",
          controller  : "groupKController",
          activetab   : 'group'
      })
      .otherwise({
          redirectTo : "/"
      });
    }])
    .run(['$rootScope','AuthService', function($rootScope, AuthService){
      $rootScope.$on('$routeChangeStart', function (event, next) {
        var token;
        if(localStorage['_token']){
          var token =  JSON.parse(localStorage['_token']);
          AuthService.checkValid(token).then(function(response){
            if (response.level != '4') {
              localStorage.clear();
              window.location.href = '../';
              console.log("Blocked");
            }
          });
        } else if(localStorage['_token']=='undefined') {
          localStorage.clear();
          window.location.href = '../';
        } else {
          localStorage.clear();
          window.location.href = '../';
        }

      });
    }]);

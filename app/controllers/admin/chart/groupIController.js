(function(){

    app.controller('groupIController', function($location, $scope, $http, toastr, filterFilter){

      $scope.checkPoint = '';
      $scope.filter     = {};




      $scope.post901    = {
        'p901a' : 'a',
        'p901b' : 'b',
      }
      $scope.post902    = {
        'p902a' : 'a',
        'p902b' : 'b',
      }
      $scope.post903    = {
        'p903a' : 'a',
        'p903b' : 'b',
      }
      $scope.post904    = {
        'p904a' : 'a',
        'p904b' : 'b',
      }
      $scope.post905    = {
        'p905a' : 'a',
        'p905b' : 'b',
      }
      $scope.post906    = {
        'p906a' : 'a',
        'p906b' : 'b',
      }
      $scope.post907    = {
        'p907a' : 'a',
        'p907b' : 'b',
      }
      $scope.post908    = {
        'p908a' : 'a',
        'p908b' : 'b',
      }
      $scope.post909    = {
        'p909a' : 'a',
        'p909b' : 'b',
        'p909c' : 'c',
        'p909d' : 'd',
      }
      $scope.post910    = {
        'p910a' : 'a',
        'p910b' : 'b',
        'p910c' : 'c',
        'p910d' : 'd',
      }
      $scope.post911    = {
        'p911a' : 'a',
        'p911b' : 'b',
        'p911c' : 'c',
        'p911d' : 'd',
      }
      $scope.post912    = {
        'p912a' : 'a',
        'p912b' : 'b',
        'p912c' : 'c',
        'p912d' : 'd',
      }
      $scope.post913    = {
        'p913c' : 'c',
        'p913d' : 'd',
      }
      $scope.post914    = {
        'p914c' : 'c',
        'p914d' : 'd',
      }
      $scope.post915    = {
        'p915c' : 'c',
        'p915d' : 'd',
      }
      $scope.post916    = {
        'p916c' : 'c',
        'p916d' : 'd',
      }
      $scope.post917    = {
        'p917c' : 'c',
        'p917d' : 'd',
      }
      $scope.post918    = {
        'p918c' : 'c',
        'p918d' : 'd',
      }
      $scope.post919    = {
        'p919c' : 'c',
        'p919d' : 'd',
      }
      $scope.post920    = {
        'p920c' : 'c',
        'p920d' : 'd',
      }
      $scope.post921    = {
        'p921c' : 'c',
        'p921d' : 'd',
      }
      $scope.post922    = {
        'p922c' : 'c',
        'p922d' : 'd',
      }

      $scope.getData = function(table, poin, filter, type, x) {
        $scope.checkPoint   = poin;
        var post = {
          'table'   : table,
          'poin'    : poin,
          'x'       : x
        }
        var onSuccess       = function(response){
          console.log(response);
          $scope[poin]      = response.data.hasil;
          $scope[poin].type = type;
          $scope[poin].filtered = filterFilter(response.data.hasil, {tppu: filter.tppu, tppt: filter.tppt, usia: filter.usia, profesi: filter.profesi});
          setOutputA($scope[poin].filtered, poin, type, 'a');
          setOutputB($scope[poin].filtered, poin, type, 'b');
          setOutputC($scope[poin].filtered, poin, type, 'c');
          setOutputD($scope[poin].filtered, poin, type, 'd');
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/master/group.php", post).then(onSuccess, onError);
      }
      $scope.getData('tbl_jwb_gb_i', 'p901', $scope.filter, 'bar', $scope.post901);

      $scope.filterGroup = function(filter, poin){
        if (!$scope[poin]) {
          return false
        }
        $scope[poin].series   = [];                         //kembali dikosongkan
        var type              = $scope[poin].type;    //kembali mengambil type jika melalui filter
        $scope[poin].filtered = filterFilter($scope[poin], {tppu: filter.tppu, tppt: filter.tppt, usia: filter.usia, profesi: filter.profesi});
        setOutputA($scope[poin].filtered, poin, type, 'a');
        setOutputB($scope[poin].filtered, poin, type, 'b');
        setOutputC($scope[poin].filtered, poin, type, 'c');
        setOutputD($scope[poin].filtered, poin, type, 'd');
      }


      var setOutputA = function(data, poin, type, sub){
        $scope[poin][sub] = {};
        var GroupBy     = _.groupBy(data, 'a');
        var ObjectKey   = Object.keys(GroupBy);
        var CountBy     = _.countBy(data,'a');
        var chartData   = _.map(CountBy, function(value, key){
            return {
                name: key,
                y: value
            };
        });
        passingChart(ObjectKey, chartData, poin, type, sub)
      }
      var setOutputB = function(data, poin, type, sub){
        $scope[poin][sub] = {};
        var filteredArray = _.filter(data,function(obj) {
             return obj.b;
        });
        var GroupBy     = _.groupBy(filteredArray, 'b');
        var ObjectKey   = Object.keys(GroupBy);
        var CountBy     = _.countBy(filteredArray,'b');
        var chartData   = _.map(CountBy, function(value, key){
            return {
                name: key,
                y: value
            };
        });
        passingChart(ObjectKey, chartData, poin, type, sub)
      }
      var setOutputC = function(data, poin, type, sub){
        $scope[poin][sub] = {};
        var GroupBy     = _.groupBy(data, 'c');
        var ObjectKey   = Object.keys(GroupBy);
        var CountBy     = _.countBy(data,'c');
        var chartData   = _.map(CountBy, function(value, key){
            return {
                name: key,
                y: value
            };
        });
        passingChart(ObjectKey, chartData, poin, type, sub)
      }
      var setOutputD = function(data, poin, type, sub){
        $scope[poin][sub] = {};
        var filteredArray = _.filter(data,function(obj) {
             return obj.d;
        });
        var GroupBy     = _.groupBy(filteredArray, 'd');
        var ObjectKey   = Object.keys(GroupBy);
        var CountBy     = _.countBy(filteredArray,'d');
        var chartData   = _.map(CountBy, function(value, key){
            return {
                name: key,
                y: value
            };
        });
        passingChart(ObjectKey, chartData, poin, type, sub)
      }

      var passingChart = function(ObjectKey, chartData, poin, type, sub){
          $scope[poin][sub].chart    = {
              chart: {
                  type: type
              },
              title: {
                  text: 'Survey Persepsi Publik'
              },
              subtitle: {
                  text: 'Pertanyann Poin ' + poin
              },
              xAxis: {
                  type: 'category'
              },
              yAxis: {
                  title: {
                      text: 'Jawaban Responden'
                  }
              },
              credits: {
                  enabled: false
              },
              plotOptions: {
                  pie: {
                      allowPointSelect: true,
                      cursor: 'pointer',
                      dataLabels: {
                          enabled: true,
                          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                          style: {
                              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                          }
                      }
                  }
              },
              series: [{
                  name:'Jumlah',
                  colorByPoint: true,
                  data: chartData
              }]
          };
      }

    });

}());

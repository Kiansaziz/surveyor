(function(){

    app.controller('groupJController', function($location, $scope, $http, toastr, filterFilter){

      $scope.checkPoint = '';
      $scope.filter     = {};

      $scope.post1001    = {
        'p1001a' : 'p1001a',
        'p1001b' : 'p1001b',
        'p1001c' : 'p1001c',
        'p1001d' : 'p1001d',
        'p1001e' : 'p1001e',
        'p1001f' : 'p1001f',
        'p1001g' : 'p1001g',
      }
      $scope.post1002    = {
        'p1002a' : 'p1002a',
        'p1002b' : 'p1002b',
        'p1002c' : 'p1002c',
        'p1002d' : 'p1002d',
        'p1002e' : 'p1002e',
      }
      $scope.post1003    = {
        'p1003' : 'name',
      }
      $scope.post1004    = {
        'p1004a' : 'p1004a',
        'p1004b' : 'p1004b',
        'p1004c' : 'p1004c',
        'p1004d' : 'p1004d',
        'p1004e' : 'p1004e',
        'p1004f' : 'p1004f',
        'p1004g' : 'p1004g',
        'p1004h' : 'p1004h',
      }
      $scope.post1005    = {
        'p1005' : 'name',
      }

      $scope.getData = function(table, poin, filter, type, x) {
        $scope.checkPoint   = poin;
        var post = {
          'table'   : table,
          'poin'    : poin,
          'x'       : x
        }
        var onSuccess       = function(response){
          $scope[poin]      = response.data.hasil;
          $scope[poin].type = type;
          $scope[poin].series   = [];
          $scope[poin].key      = [];
          $scope[poin].filtered = filterFilter(response.data.hasil, {tppu: filter.tppu, tppt: filter.tppt, usia: filter.usia, profesi: filter.profesi});
          if (poin == 'p1001') {
            changeOutput1001($scope[poin].filtered, poin, type);
          }
          if (poin == 'p1002') {
            changeOutput1002($scope[poin].filtered, poin, type);
          }
          if (poin == 'p1003') {
            setOutput($scope[poin].filtered, poin, type);
          }
          if (poin == 'p1004') {
            changeOutput1004($scope[poin].filtered, poin, type);
          }
          if (poin == 'p1005') {
            setOutput($scope[poin].filtered, poin, type);
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/master/group.php", post).then(onSuccess, onError);
      }
      $scope.getData('tbl_jwb_gb_j', 'p1001', $scope.filter, 'column', $scope.post1001);


      $scope.filterGroup = function(filter, poin){
        if (!$scope[poin]) {
          return false
        }
        $scope[poin].series   = [];                         //kembali dikosongkan
        var type              = $scope[poin].type;    //kembali mengambil type jika melalui filter
        $scope[poin].filtered = filterFilter($scope[poin], {tppu: filter.tppu, tppt: filter.tppt, usia: filter.usia, profesi: filter.profesi});
        if (poin == 'p1001') {
          changeOutput1001($scope[poin].filtered, poin, type);
        }
        if (poin == 'p1002') {
          changeOutput1002($scope[poin].filtered, poin, type);
        }
        if (poin == 'p1003') {
          setOutput($scope[poin].filtered, poin, type);
        }
        if (poin == 'p1004') {
          changeOutput1004($scope[poin].filtered, poin, type);
        }
        if (poin == 'p1005') {
          setOutput($scope[poin].filtered, poin, type);
        }
      }


      // Chart tidak-jarang-sering-sangat 1001 1002 1003 1004-----------------------------------------------------------------------------------------------------------
      var changeOutput1001 = function(data, poin, type){
        var temp1001 =[
        {
          name: 'Tidak Pernah',
          data:
          [
            data.filter(function(el) { return el.p1001a == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1001b == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1001c == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1001d == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1001e == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1001f == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1001g == 'Tidak Pernah' }).length,
          ]
        },
        {
          name: 'Jarang',
          data:
          [
            data.filter(function(el) { return el.p1001a == 'Jarang' }).length,
            data.filter(function(el) { return el.p1001b == 'Jarang' }).length,
            data.filter(function(el) { return el.p1001c == 'Jarang' }).length,
            data.filter(function(el) { return el.p1001d == 'Jarang' }).length,
            data.filter(function(el) { return el.p1001e == 'Jarang' }).length,
            data.filter(function(el) { return el.p1001f == 'Jarang' }).length,
            data.filter(function(el) { return el.p1001g == 'Jarang' }).length,
          ]
        },
        {
          name: 'Sering',
          data:
          [
            data.filter(function(el) { return el.p1001a == 'Sering' }).length,
            data.filter(function(el) { return el.p1001b == 'Sering' }).length,
            data.filter(function(el) { return el.p1001c == 'Sering' }).length,
            data.filter(function(el) { return el.p1001d == 'Sering' }).length,
            data.filter(function(el) { return el.p1001e == 'Sering' }).length,
            data.filter(function(el) { return el.p1001f == 'Sering' }).length,
            data.filter(function(el) { return el.p1001g == 'Sering' }).length,
          ]
        },
        {
          name: 'Selalu/Sangat Sering',
          data:
          [
            data.filter(function(el) { return el.p1001a == 'Selalu/Sangat Sering' }).length,
            data.filter(function(el) { return el.p1001b == 'Selalu/Sangat Sering' }).length,
            data.filter(function(el) { return el.p1001c == 'Selalu/Sangat Sering' }).length,
            data.filter(function(el) { return el.p1001d == 'Selalu/Sangat Sering' }).length,
            data.filter(function(el) { return el.p1001e == 'Selalu/Sangat Sering' }).length,
            data.filter(function(el) { return el.p1001f == 'Selalu/Sangat Sering' }).length,
            data.filter(function(el) { return el.p1001g == 'Selalu/Sangat Sering' }).length,
          ]
        }];
        $scope[poin].series = temp1001;
        $scope[poin].key = ['a','b','c','d','e','f','g'];
        passingChart($scope[poin].key, $scope[poin].series, poin, type)
      }

      var changeOutput1002 = function(data, poin, type){
        var temp1002 =[
        {
          name: 'Tidak Pernah',
          data:
          [
            data.filter(function(el) { return el.p1002a == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1002b == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1002c == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1002d == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1002e == 'Tidak Pernah' }).length,
          ]
        },
        {
          name: 'Jarang',
          data:
          [
            data.filter(function(el) { return el.p1002a == 'Jarang' }).length,
            data.filter(function(el) { return el.p1002b == 'Jarang' }).length,
            data.filter(function(el) { return el.p1002c == 'Jarang' }).length,
            data.filter(function(el) { return el.p1002d == 'Jarang' }).length,
            data.filter(function(el) { return el.p1002e == 'Jarang' }).length,
          ]
        },
        {
          name: 'Sering',
          data:
          [
            data.filter(function(el) { return el.p1002a == 'Sering' }).length,
            data.filter(function(el) { return el.p1002b == 'Sering' }).length,
            data.filter(function(el) { return el.p1002c == 'Sering' }).length,
            data.filter(function(el) { return el.p1002d == 'Sering' }).length,
            data.filter(function(el) { return el.p1002e == 'Sering' }).length,
          ]
        },
        {
          name: 'Selalu/Sangat Sering',
          data:
          [
            data.filter(function(el) { return el.p1002a == 'Selalu/Sangat Sering' }).length,
            data.filter(function(el) { return el.p1002b == 'Selalu/Sangat Sering' }).length,
            data.filter(function(el) { return el.p1002c == 'Selalu/Sangat Sering' }).length,
            data.filter(function(el) { return el.p1002d == 'Selalu/Sangat Sering' }).length,
            data.filter(function(el) { return el.p1002e == 'Selalu/Sangat Sering' }).length,
          ]
        }];
        $scope[poin].series = temp1002;
        $scope[poin].key = ['a','b','c','d','e'];
        passingChart($scope[poin].key, $scope[poin].series, poin, type)
      }

      var changeOutput1004 = function(data, poin, type){
        var temp1004 =[
        {
          name: 'Tidak Pernah',
          data:
          [
            data.filter(function(el) { return el.p1004a == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1004b == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1004c == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1004d == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1004e == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1004f == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1004g == 'Tidak Pernah' }).length,
            data.filter(function(el) { return el.p1004h == 'Tidak Pernah' }).length,
          ]
        },
        {
          name: 'Jarang',
          data:
          [
            data.filter(function(el) { return el.p1004a == 'Jarang' }).length,
            data.filter(function(el) { return el.p1004b == 'Jarang' }).length,
            data.filter(function(el) { return el.p1004c == 'Jarang' }).length,
            data.filter(function(el) { return el.p1004d == 'Jarang' }).length,
            data.filter(function(el) { return el.p1004e == 'Jarang' }).length,
            data.filter(function(el) { return el.p1004f == 'Jarang' }).length,
            data.filter(function(el) { return el.p1004g == 'Jarang' }).length,
            data.filter(function(el) { return el.p1004h == 'Jarang' }).length,
          ]
        },
        {
          name: 'Sering',
          data:
          [
            data.filter(function(el) { return el.p1004a == 'Sering' }).length,
            data.filter(function(el) { return el.p1004b == 'Sering' }).length,
            data.filter(function(el) { return el.p1004c == 'Sering' }).length,
            data.filter(function(el) { return el.p1004d == 'Sering' }).length,
            data.filter(function(el) { return el.p1004e == 'Sering' }).length,
            data.filter(function(el) { return el.p1004f == 'Sering' }).length,
            data.filter(function(el) { return el.p1004g == 'Sering' }).length,
            data.filter(function(el) { return el.p1004h == 'Sering' }).length,
          ]
        },
        {
          name: 'Selalu/Sangat Sering',
          data:
          [
            data.filter(function(el) { return el.p1004a == 'Selalu/Sangat Sering' }).length,
            data.filter(function(el) { return el.p1004b == 'Selalu/Sangat Sering' }).length,
            data.filter(function(el) { return el.p1004c == 'Selalu/Sangat Sering' }).length,
            data.filter(function(el) { return el.p1004d == 'Selalu/Sangat Sering' }).length,
            data.filter(function(el) { return el.p1004e == 'Selalu/Sangat Sering' }).length,
            data.filter(function(el) { return el.p1004f == 'Selalu/Sangat Sering' }).length,
            data.filter(function(el) { return el.p1004g == 'Selalu/Sangat Sering' }).length,
            data.filter(function(el) { return el.p1004h == 'Selalu/Sangat Sering' }).length,
          ]
        }];
        $scope[poin].series = temp1004;
        $scope[poin].key = ['a','b','c','d','e','f','g','h'];
        passingChart($scope[poin].key, $scope[poin].series, poin, type)
      }

      var passingChart = function(ObjectKey, data, poin, type){
        $scope[poin].chart = {
          chart: {
              type: type,
              width: 1200
          },
          title: {
              text: 'Survey Persepsi Publik'
          },
          subtitle: {
              text: 'Pertanyann Poin '+poin
          },
          xAxis: {
              categories: ObjectKey,
              title: {
                  text: null
              }
          },
          yAxis: {
              min: 0,
              title: {
                  text: 'Jumlah Jawaban Responden'
              }
          },
          tooltip: {
              valueSuffix: ' Responden'
          },
          plotOptions: {
              bar: {
                  dataLabels: {
                      enabled: true
                  }
              }
          },
          legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'top',
              x: -40,
              y: 80,
              floating: true,
              borderWidth: 1,
              backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
              shadow: true
          },
          credits: {
              enabled: false
          },
          series: data
        }
      }
      // Chart tidak-jarang-sering-sangat 1001 1002 1003 1004-----------------------------------------------------------------------------------------------------------


      // Chart PIE 1003 1005 -------------------------------------------------------------------------------------------------------------------------------------------
      var setOutput = function(data, poin, type){
        var GroupBy     = _.groupBy(data, 'name');
        var ObjectKey   = Object.keys(GroupBy);                 // untuk xAxis categories
        var CountBy     = _.countBy(data,'name');
        var chartData   = _.map(CountBy, function(value, key){  // untuk data series
            return {
                name: key,
                y: value
            };
        });
        passingChartPie(ObjectKey, chartData, poin, type)
      }

      var passingChartPie = function(ObjectKey, chartData, poin, type){
        // PIE, BAR Dan Column SINGLE
        if (['pie','bar','column'].indexOf(type) > -1) {
          // $scope[poin].axis     = ObjectKey; // untuk bar (GANTI / GAUSAH DULU)
          $scope[poin].chart    = {
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
                  name:'Jawaban',
                  colorByPoint: true,
                  data: chartData
              }]
          };
        }
      } // passing
      // Chart PIE 1003 1005 -------------------------------------------------------------------------------------------------------------------------------------------

    });

}());

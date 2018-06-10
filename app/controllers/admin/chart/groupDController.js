(function(){

    app.controller('groupDController', function($location, $scope, $http, toastr, filterFilter){

      $scope.checkPoint = '';
      $scope.filter     = {};
      $scope.emptyOrNull = function(item){
        return !(item.p405e === null || item.p405e.trim().length === 0)
      }

      $scope.post401    = {
        'p401' : 'name',
      }
      $scope.post402    = {
        'p402' : 'name',
      }
      $scope.post403    = {
        'p403' : 'name',
      }
      $scope.post404    = {
        'p404a1' : 'p404a1',
        'p404a2' : 'p404a2',
        'p404a3' : 'p404a3',
        'p404b' : 'p404b',
        'p404c' : 'p404c',
        'p404d' : 'p404d',
        'p404e' : 'p404e',
        'p404f' : 'p404f',
        'p404g' : 'p404g',
        'p404h' : 'p404h',
        'p404i' : 'p404i',
        'p404j' : 'p404j',
        'p404k' : 'p404k',
        'p404l' : 'p404l',
        'p404m' : 'p404m',
      }
      $scope.post405    = {
        'p405a' : 'p405a',
        'p405b' : 'p405b',
        'p405c' : 'p405c',
        'p405d' : 'p405d',
        'p405e' : 'p405e',
      }
      $scope.post406    = {
        'p406a' : 'p406a',
        'p406b' : 'p406b',
        'p406c' : 'p406c',
        'p406d' : 'p406d',
        'p406e' : 'p406e',
        'p406f' : 'p406f',
        'p406g' : 'p406g',
        'p406h' : 'p406h',
        'p406i' : 'p406i',
        'p406j' : 'p406j',
        'p406k' : 'p406k',
        'p406l' : 'p406l',
        'p406m' : 'p406m',
        'p406n' : 'p406n',
        'p406o' : 'p406o',
        'p406p' : 'p406p',
        'p406q' : 'p406q',
        'p406r' : 'p406r',
        'p406s' : 'p406s',
        'p406t' : 'p406t',
        'p406u' : 'p406u',
        'p406v' : 'p406v',
        'p406w' : 'p406w',
        'p406x' : 'p406x',
        'p406y' : 'p406y',
      }
      $scope.post407    = {
        'p407a' : 'p407a',
        'p407b' : 'p407b',
        'p407c' : 'p407c',
        'p407d' : 'p407d',
        'p407e' : 'p407e',
        'p407f' : 'p407f',
        'p407g' : 'p407g',
        'p407h' : 'p407h',
        'p407i' : 'p407i',
        'p407j' : 'p407j',
        'p407k' : 'p407k',
        'p407l' : 'p407l',
        'p407m' : 'p407m',
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
          if (poin == 'p401' || 'p402' || 'p403') {
            setOutput($scope[poin].filtered, poin, type);
          }
          if (poin == 'p404') {
            changeOutput404($scope[poin].filtered, poin, type);
          }
          if (poin == 'p405') {
            changeOutput405($scope[poin].filtered, poin, type);
          }
          if (poin == 'p406') {
            changeOutput406($scope[poin].filtered, poin, type);
          }
          if (poin == 'p407') {
            changeOutput407($scope[poin].filtered, poin, type);
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/master/group.php", post).then(onSuccess, onError);
      }
      $scope.getData('tbl_jwb_gb_d', 'p401', $scope.filter, 'bar', $scope.post401);


      $scope.filterGroup = function(filter, poin){
        if (!$scope[poin]) {
          return false
        }
        $scope[poin].series   = [];                         //kembali dikosongkan
        var type              = $scope[poin].type;    //kembali mengambil type jika melalui filter
        $scope[poin].filtered = filterFilter($scope[poin], {tppu: filter.tppu, tppt: filter.tppt, usia: filter.usia, profesi: filter.profesi});
        if (poin == 'p401' || 'p402' || 'p403') {
          setOutput($scope[poin].filtered, poin, type);
        }
        if (poin == 'p404') {
          changeOutput404($scope[poin].filtered, poin, type);
        }
        if (poin == 'p405') {
          changeOutput405($scope[poin].filtered, poin, type);
        }
        if (poin == 'p406') {
          changeOutput406($scope[poin].filtered, poin, type);
        }
        if (poin == 'p407') {
          changeOutput407($scope[poin].filtered, poin, type);
        }
      }


      // 401 402 403 ------------------------------------------------------------------------------------------------------------------------------------------------------
      var setOutput = function(data, poin, type){
        var GroupBy     = _.groupBy(data, 'name');
        var ObjectKey   = Object.keys(GroupBy);
        var CountBy     = _.countBy(data,'name');
        var chartData   = _.map(CountBy, function(value, key){
            return {
                name: key,
                y: value
            };
        });
        passingChart(ObjectKey, chartData, poin, type)
      }

      var passingChart = function(ObjectKey, chartData, poin, type){
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
                  text: 'Pertanyann Poin '+poin
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
      }
      // 401 402 403 ------------------------------------------------------------------------------------------------------------------------------------------------------



      // 404 --------------------------------------------------------------------------------------------------------------------------------------------------------------
      var changeOutput404 = function(data, poin, type){
        var loop      = true;
        for (i = 1; i <= 10; i++) {
          if (i==10) { loop = false; }
          setOutput404(data, i, poin, loop, type)
        }
      }

      var setOutput404 = function(data, i, poin, loop, type){
        var temp404 = {
          name: i,
          data:
          [
            data.filter(function(el) { return el.p404a1 == i }).length,
            data.filter(function(el) { return el.p404a2 == i }).length,
            data.filter(function(el) { return el.p404a3 == i }).length,
            data.filter(function(el) { return el.p404b == i }).length,
            data.filter(function(el) { return el.p404c == i }).length,
            data.filter(function(el) { return el.p404d == i }).length,
            data.filter(function(el) { return el.p404e == i }).length,
            data.filter(function(el) { return el.p404f == i }).length,
            data.filter(function(el) { return el.p404g == i }).length,
            data.filter(function(el) { return el.p404h == i }).length,
            data.filter(function(el) { return el.p404i == i }).length,
            data.filter(function(el) { return el.p404j == i }).length,
            data.filter(function(el) { return el.p404k == i }).length,
            data.filter(function(el) { return el.p404l == i }).length,
            data.filter(function(el) { return el.p404m == i }).length,
          ]
        };
        $scope[poin].series.push(temp404);
        $scope[poin].key = ['a1','a2','a3','b','c','d','e','f','g','h','i','j','k','l','m'];
        if (!loop) {
          passingChart404($scope[poin].key, $scope[poin].series, poin, type)
        }
      }

      var passingChart404 = function(ObjectKey, data, poin, type){
        $scope[poin].chart = {
          chart: {
              type: type,
              width: 1200
          },
          title: {
              text: 'Survey Persepsi Publik'
          },
          xAxis: {
              categories: ObjectKey
          },
          subtitle: {
              text: 'Pertanyann Poin '+poin
          },
          yAxis: {
              min: 0,
              title: {
                  text: 'Jumlah Jawaban Responden'
              }
          },
          tooltip: {
              pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
              shared: true
          },
          plotOptions: {
              column: {
                  stacking: 'percent'
              }
          },
          series: data
        }
      }
      // 404 --------------------------------------------------------------------------------------------------------------------------------------------------------------


      // 405 --------------------------------------------------------------------------------------------------------------------------------------------------------------
      var changeOutput405 = function(data, poin, type){
        var loop      = true;
        for (i = 1; i <= 10; i++) {
          if (i==10) { loop = false; }
          setOutput405(data, i, poin, loop, type)
        }
      }

      var setOutput405 = function(data, i, poin, loop, type){
        var temp405 = {
          name: i,
          data:
          [
            data.filter(function(el) { return el.p405a == i }).length,
            data.filter(function(el) { return el.p405b == i }).length,
            data.filter(function(el) { return el.p405c == i }).length,
            data.filter(function(el) { return el.p405d == i }).length,
          ]
        };
        $scope[poin].series.push(temp405);
        $scope[poin].key = ['a','b','c','d'];
        if (!loop) {
          passingChart405($scope[poin].key, $scope[poin].series, poin, type)
        }
      }

      var passingChart405 = function(ObjectKey, data, poin, type){
        $scope[poin].chart = {
          chart: {
              type: type,
              width: 1200
          },
          title: {
              text: 'Survey Persepsi Publik'
          },
          xAxis: {
              categories: ObjectKey
          },
          subtitle: {
              text: 'Pertanyann Poin '+poin
          },
          yAxis: {
              min: 0,
              title: {
                  text: 'Jumlah Jawaban Responden'
              }
          },
          tooltip: {
              pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
              shared: true
          },
          plotOptions: {
              column: {
                  stacking: 'percent'
              }
          },
          series: data
        }
      }
      // 405 --------------------------------------------------------------------------------------------------------------------------------------------------------------


      // 406 --------------------------------------------------------------------------------------------------------------------------------------------------------------
      var changeOutput406 = function(data, poin, type){
        var loop      = true;
        for (i = 1; i <= 10; i++) {
          if (i==10) { loop = false; }
          setOutput406(data, i, poin, loop, type)
        }
      }

      var setOutput406 = function(data, i, poin, loop, type){
        var temp406 = {
          name: i,
          data:
          [
            data.filter(function(el) { return el.p406a == i }).length,
            data.filter(function(el) { return el.p406b == i }).length,
            data.filter(function(el) { return el.p406c == i }).length,
            data.filter(function(el) { return el.p406d == i }).length,
            data.filter(function(el) { return el.p406e == i }).length,
            data.filter(function(el) { return el.p406f == i }).length,
            data.filter(function(el) { return el.p406g == i }).length,
            data.filter(function(el) { return el.p406h == i }).length,
            data.filter(function(el) { return el.p406i == i }).length,
            data.filter(function(el) { return el.p406j == i }).length,
            data.filter(function(el) { return el.p406k == i }).length,
            data.filter(function(el) { return el.p406l == i }).length,
            data.filter(function(el) { return el.p406m == i }).length,
            data.filter(function(el) { return el.p406n == i }).length,
            data.filter(function(el) { return el.p406o == i }).length,
            data.filter(function(el) { return el.p406p == i }).length,
            data.filter(function(el) { return el.p406q == i }).length,
            data.filter(function(el) { return el.p406r == i }).length,
            data.filter(function(el) { return el.p406s == i }).length,
            data.filter(function(el) { return el.p406t == i }).length,
            data.filter(function(el) { return el.p406u == i }).length,
            data.filter(function(el) { return el.p406v == i }).length,
            data.filter(function(el) { return el.p406w == i }).length,
            data.filter(function(el) { return el.p406x == i }).length,
            data.filter(function(el) { return el.p406y == i }).length,
          ]
        };
        $scope[poin].series.push(temp406);
        $scope[poin].key = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y'];
        if (!loop) {
          passingChart406($scope[poin].key, $scope[poin].series, poin, type)
        }
      }

      var passingChart406 = function(ObjectKey, data, poin, type){
        $scope[poin].chart = {
          chart: {
              type: type,
              width: 1200
          },
          title: {
              text: 'Survey Persepsi Publik'
          },
          xAxis: {
              categories: ObjectKey
          },
          subtitle: {
              text: 'Pertanyann Poin '+poin
          },
          yAxis: {
              min: 0,
              title: {
                  text: 'Jumlah Jawaban Responden'
              }
          },
          tooltip: {
              pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
              shared: true
          },
          plotOptions: {
              column: {
                  stacking: 'percent'
              }
          },
          series: data
        }
      }
      // 406 --------------------------------------------------------------------------------------------------------------------------------------------------------------


      // 407 --------------------------------------------------------------------------------------------------------------------------------------------------------------
      var changeOutput407 = function(data, poin, type){
        var loop      = true;
        for (i = 1; i <= 10; i++) {
          if (i==10) { loop = false; }
          setOutput407(data, i, poin, loop, type)
        }
      }

      var setOutput407 = function(data, i, poin, loop, type){
        var temp407 = {
          name: i,
          data:
          [
            data.filter(function(el) { return el.p407a == i }).length,
            data.filter(function(el) { return el.p407b == i }).length,
            data.filter(function(el) { return el.p407c == i }).length,
            data.filter(function(el) { return el.p407d == i }).length,
            data.filter(function(el) { return el.p407e == i }).length,
            data.filter(function(el) { return el.p407f == i }).length,
            data.filter(function(el) { return el.p407g == i }).length,
            data.filter(function(el) { return el.p407h == i }).length,
            data.filter(function(el) { return el.p407i == i }).length,
            data.filter(function(el) { return el.p407j == i }).length,
            data.filter(function(el) { return el.p407k == i }).length,
            data.filter(function(el) { return el.p407l == i }).length,
            data.filter(function(el) { return el.p407m == i }).length,
          ]
        };
        $scope[poin].series.push(temp407);
        $scope[poin].key = ['a','b','c','d','e','f','g','h','i','j','k','l','m'];
        if (!loop) {
          passingChart407($scope[poin].key, $scope[poin].series, poin, type)
        }
      }

      var passingChart407 = function(ObjectKey, data, poin, type){
        $scope[poin].chart = {
          chart: {
              type: type,
              width: 1200
          },
          title: {
              text: 'Survey Persepsi Publik'
          },
          xAxis: {
              categories: ObjectKey
          },
          subtitle: {
              text: 'Pertanyann Poin '+poin
          },
          yAxis: {
              min: 0,
              title: {
                  text: 'Jumlah Jawaban Responden'
              }
          },
          tooltip: {
              pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
              shared: true
          },
          plotOptions: {
              column: {
                  stacking: 'percent'
              }
          },
          series: data
        }
      }
      // 407 --------------------------------------------------------------------------------------------------------------------------------------------------------------


    });

}());

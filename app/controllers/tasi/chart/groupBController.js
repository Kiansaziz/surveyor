(function(){

    app.controller('groupBController', function($location, $scope, $http, toastr, filterFilter){

      $scope.checkPoint = '';
      $scope.filter     = {};




      $scope.post201    = {
        'p201'  : 'name',
        'p201x' : 'p201x',
      }
      $scope.post202    = {
        'p202a1'  : 'p202a1',
        'p202a2'  : 'p202a2',
        'p202b11'  : 'p202b11',
        'p202b12'  : 'p202b12',
        'p202b21'  : 'p202b21',
        'p202b22'  : 'p202b22',
        'p202b31'  : 'p202b31',
        'p202b32'  : 'p202b32',
        'p202b41'  : 'p202b41',
        'p202b42'  : 'p202b42',
        'p202b51'  : 'p202b51',
        'p202b52'  : 'p202b52',
        'p202b61'  : 'p202b61',
        'p202b62'  : 'p202b62',
        'p202b71'  : 'p202b71',
        'p202b72'  : 'p202b72',
        'p202b81'  : 'p202b81',
        'p202b82'  : 'p202b82',
      }
      $scope.post203    = {
        'p203a11'  : 'p203a11',
        'p203a12'  : 'p203a12',
        'p203a21'  : 'p203a21',
        'p203a22'  : 'p203a22',
        'p203a31'  : 'p203a31',
        'p203a32'  : 'p203a32',
        'p203a41'  : 'p203a41',
        'p203a42'  : 'p203a42',
        'p203a51'  : 'p203a51',
        'p203a52'  : 'p203a52',
        'p203a51'  : 'p203a51',
        'p203b11'  : 'p203b11',
        'p203b12'  : 'p203b12',
        'p203b21'  : 'p203b21',
        'p203b22'  : 'p203b22',
        'p203b31'  : 'p203b31',
        'p203b32'  : 'p203b32',
        'p203b41'  : 'p203b41',
        'p203b42'  : 'p203b42',
      }

      $scope.getData = function(table, poin, filter, type, x) {
        $scope.checkPoint   = poin;
        var post = {
          'table'   : table,
          'poin'    : poin,
          'x'       : x
        }
        var onSuccess       = function(response){
          $scope[poin]      = response.data.hasil;// dapatkan hasil pemanggilan
          $scope[poin].type = type;               // menentukan type chart
          var filtered  = filterFilter(response.data.hasil, {tppu: filter.tppu, tppt: filter.tppt, usia: filter.usia, profesi: filter.profesi});
          if (poin == 'p201') {
            setOutput201(filtered, poin, type);
          }
          if (poin == 'p202') {
            setOutput202a(filtered, poin, type, 'a');
            setOutput202b(filtered, poin, type, 'b');
            changeOutput202bDrill(filtered, poin, type, 'b');
          }
          if (poin == 'p203') {
            setOutput203a(filtered, poin, type, 'a');
            changeOutput203aDrill(filtered, poin, type, 'a');
            setOutput203b(filtered, poin, type, 'b');
            changeOutput203bDrill(filtered, poin, type, 'b');
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/master/group.php", post).then(onSuccess, onError);
      }
      $scope.getData('tbl_jwb_gb_b', 'p201', $scope.filter, 'column', $scope.post201);

      $scope.filterGroup = function(filter, poin){
        if (!$scope[poin]) {
          return false
        }
        var type        = $scope[poin].type;                    // kembali mengambil type jika melalui filter
        var filtered    = filterFilter($scope[poin], {tppu: filter.tppu, tppt: filter.tppt, usia: filter.usia, profesi: filter.profesi});
        if (poin == 'p201') {
          setOutput201(filtered, poin, type);
        }
        if (poin == 'p202') {
          setOutput202a(filtered, poin, type, 'a');
          setOutput202b(filtered, poin, type, 'b');
          changeOutput202bDrill(filtered, poin, type, 'b');
        }
        if (poin == 'p203') {
          setOutput203a(filtered, poin, type, 'a');
          changeOutput203aDrill(filtered, poin, type, 'a');
          setOutput203b(filtered, poin, type, 'b');
          changeOutput203bDrill(filtered, poin, type, 'b');
        }
      }

      // 201 ----------------------------------------------------------------------------------------------------------------------------------------------------
      var setOutput201    = function(data, poin, type){
        var GroupBy     = _.groupBy(data, 'name');
        var ObjectKey   = Object.keys(GroupBy);
        var CountBy     = _.countBy(data,'name');
        var chartData   = _.map(CountBy, function(value, key){
            return {
                name: key,
                y: value,
                drilldown : key
            };
        });
        // yang ini untuk drilldowb
        var filteredForDrill = _.filter(data,function(obj) {
             return obj.p201x;
        });
        var CountByDrill     = _.countBy(filteredForDrill,'p201x');
        var chartDataDrill   = _.map(CountByDrill, function(value, key){
            return [
              key, value
            ];
        });
        passingChart201(ObjectKey, chartData, poin, type, chartDataDrill)
      }
      var passingChart201 = function(ObjectKey, chartData, poin, type, chartDataDrill){
        if (['pie','bar','column'].indexOf(type) > -1) {
          $scope[poin].chart    = {
              chart: {
                  type: type,
                  width: 1200
              },
              title: {
                  text: 'Survey Persepsi Publik'
              },
              subtitle: {
                  text: 'Pertanyann Poin 201'
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
              }],
              drilldown: {
                  series: [{
                      name: 'Profesi Lainnya',
                      id: 'Profesi Lainnya',
                      data:
                          chartDataDrill

                  }]
              }
          };
        }
      } // passing
      // 201 ----------------------------------------------------------------------------------------------------------------------------------------------------


      // 202 A ---------------------------------------------------------------------------------------------------------------------------------------------------
      var setOutput202a     = function(data, poin, type, sub){
        var GroupBy     = _.groupBy(data, 'p202a1');
        var ObjectKey   = Object.keys(GroupBy);
        $scope[poin][sub] = {};
        var CountBy     = _.countBy(data,'p202a1');
        var chartData   = _.map(CountBy, function(value, key){  // untuk data series
            return {
                name: key,
                y: value,
                drilldown : key
            };
        });
        // yang ini untuk drilldowb
        var filteredForDrill = _.filter(data,function(obj) {
             return obj.p202a2;
        });
        var CountByDrill     = _.countBy(filteredForDrill,'p202a2');
        var chartDataDrill   = _.map(CountByDrill, function(value, key){
            return [
              key, value
            ];
        });
        passingChart202a(ObjectKey, chartData, poin, type, chartDataDrill, sub)
      }
      var passingChart202a  = function(ObjectKey, chartData, poin, type, chartDataDrill, sub){
        if (['pie','bar','column'].indexOf(type) > -1) {
          $scope[poin][sub].chart    = {
              chart: {
                  type: 'pie'
              },
              title: {
                  text: 'Survey Persepsi Publik'
              },
              subtitle: {
                  text: 'Pertanyann Poin 202 A'
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
              }],
              drilldown: {
                  series: [{
                      name: 'Ya',
                      id: 'Ya',
                      data:
                          chartDataDrill

                  }]
              }
          };
        }
      } // passing
      // 202 A ---------------------------------------------------------------------------------------------------------------------------------------------------


      // BATAMH
      // 202 B ---------------------------------------------------------------------------------------------------------------------------------------------------
      var setOutput202b     = function(data, poin, type, sub){
        $scope[poin][sub] = {};
        var temp202b =[
        {
          name: 'Ya',
          data:
          [
            data.filter(function(el) { return el.p202b11 == 'Ya' }).length,
            data.filter(function(el) { return el.p202b21 == 'Ya' }).length,
            data.filter(function(el) { return el.p202b31 == 'Ya' }).length,
            data.filter(function(el) { return el.p202b41 == 'Ya' }).length,
            data.filter(function(el) { return el.p202b51 == 'Ya' }).length,
            data.filter(function(el) { return el.p202b61 == 'Ya' }).length,
            data.filter(function(el) { return el.p202b71 == 'Ya' }).length,
            data.filter(function(el) { return el.p202b81 == 'Ya' }).length,
          ]
        },
        {
          name: 'Tidak',
          data:
          [
            data.filter(function(el) { return el.p202b11 == 'Tidak' }).length,
            data.filter(function(el) { return el.p202b21 == 'Tidak' }).length,
            data.filter(function(el) { return el.p202b31 == 'Tidak' }).length,
            data.filter(function(el) { return el.p202b41 == 'Tidak' }).length,
            data.filter(function(el) { return el.p202b51 == 'Tidak' }).length,
            data.filter(function(el) { return el.p202b61 == 'Tidak' }).length,
            data.filter(function(el) { return el.p202b71 == 'Tidak' }).length,
            data.filter(function(el) { return el.p202b81 == 'Tidak' }).length,
          ]
        }];
        $scope[poin].series = temp202b;
        $scope[poin].key = ['b1','b2','b3','b4','b5','b6','b7','b8'];
        passingChart202b($scope[poin].key, $scope[poin].series, poin, type, sub)
      }
      var passingChart202b  = function(ObjectKey, data, poin, type, sub){
        $scope[poin][sub].chart = {
          chart: {
              type: type,
              width: 1200
          },
          title: {
              text: 'Survey Persepsi Publik'
          },
          subtitle: {
              text: 'Pertanyann Poin 202 B'
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
      // 202 B ---------------------------------------------------------------------------------------------------------------------------------------------------

      // PIE
      // 202 B DRILL ---------------------------------------------------------------------------------------------------------------------------------------------
      var changeOutput202bDrill = function(data, poin, type, sub){
        var loop      = true;
        var param     = '';
        var jml       = 8; // Jumlah looping (PERTANYAAN)
        for (i = 1; i <= jml; i++) {
          if (i==jml) { loop = false; }
          if (i == 1) { param = 'satu';  }
          if (i == 2) { param = 'dua'; }
          if (i == 3) { param = 'tiga'; }
          if (i == 4) { param = 'empat'; }
          if (i == 5) { param = 'lima'; }
          if (i == 6) { param = 'enam'; }
          if (i == 7) { param = 'tujuh'; }
          if (i == 8) { param = 'delapan';; }
          setOutput202bDrill(data, i, param, poin, loop, type, sub)
        }
      }
      var setOutput202bDrill    = function(data, i, param, poin, loop, type, sub){
        var kolom1      = 'p202b' + i + '1';
        var kolom2      = 'p202b' + i + '2';
        var GroupBy     = _.groupBy(data, kolom1);
        var ObjectKey   = Object.keys(GroupBy);
        $scope[poin][sub][param] = {};
        var CountBy     = _.countBy(data, kolom1);
        var chartData   = _.map(CountBy, function(value, key){  // untuk data series
            return {
                name: key,
                y: value,
                drilldown : key
            };
        });
        // yang ini untuk drilldowb
        var filteredForDrill = _.filter(data,function(obj) {
            if (i == 1) { return obj.p202b12; }
            if (i == 2) { return obj.p202b22; }
            if (i == 3) { return obj.p202b32; }
            if (i == 4) { return obj.p202b42; }
            if (i == 5) { return obj.p202b52; }
            if (i == 6) { return obj.p202b62; }
            if (i == 7) { return obj.p202b72; }
            if (i == 8) { return obj.p202b82; }
        });
        var CountByDrill     = _.countBy(filteredForDrill, kolom2);
        var chartDataDrill   = _.map(CountByDrill, function(value, key){
            return [
              key, value
            ];
        });
        passingChart202bDrill(ObjectKey, chartData, poin, type, chartDataDrill, sub, param)
      }
      var passingChart202bDrill = function(ObjectKey, chartData, poin, type, chartDataDrill, sub, param){
        if (['pie','bar','column'].indexOf(type) > -1) {
          $scope[poin][sub][param].chart    = {
              chart: {
                  type: 'pie'
              },
              title: {
                  text: 'Survey Persepsi Publik'
              },
              subtitle: {
                  text: 'Pertanyann Poin 202 B '+ param
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
              }],
              drilldown: {
                  series: [{
                      name: 'Ya',
                      id: 'Ya',
                      data:
                          chartDataDrill

                  }]
              }
          };
        }
      }
      // 202 B DRILL----------------------------------------------------------------------------------------------------------------------------------------------


      // BATANG
      // 203 A ---------------------------------------------------------------------------------------------------------------------------------------------------
      var setOutput203a     = function(data, poin, type, sub){
        $scope[poin][sub] = {};
        var temp203a =[
        {
          name: 'Ya',
          data:
          [
            data.filter(function(el) { return el.p203a11 == 'Ya' }).length,
            data.filter(function(el) { return el.p203a21 == 'Ya' }).length,
            data.filter(function(el) { return el.p203a31 == 'Ya' }).length,
            data.filter(function(el) { return el.p203a41 == 'Ya' }).length,
            data.filter(function(el) { return el.p203a51 == 'Ya' }).length,
          ]
        },
        {
          name: 'Tidak',
          data:
          [
            data.filter(function(el) { return el.p203a11 == 'Tidak' }).length,
            data.filter(function(el) { return el.p203a21 == 'Tidak' }).length,
            data.filter(function(el) { return el.p203a31 == 'Tidak' }).length,
            data.filter(function(el) { return el.p203a41 == 'Tidak' }).length,
            data.filter(function(el) { return el.p203a51 == 'Tidak' }).length,
          ]
        }];
        $scope[poin].series = temp203a;
        $scope[poin].key = ['a1','a2','a3','a4','a5'];
        passingChart203a($scope[poin].key, $scope[poin].series, poin, type, sub)
      }
      var passingChart203a  = function(ObjectKey, data, poin, type, sub){
        $scope[poin][sub].chart = {
          chart: {
              type: type,
              width: 1200
          },
          title: {
              text: 'Survey Persepsi Publik'
          },
          subtitle: {
              text: 'Pertanyann Poin 203 A'
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
      // 203 A ---------------------------------------------------------------------------------------------------------------------------------------------------

      // PIE
      // 203 A DRILL ---------------------------------------------------------------------------------------------------------------------------------------------
      var changeOutput203aDrill = function(data, poin, type, sub){
        var loop      = true;
        var param     = '';
        var jml       = 5; // Jumlah looping (PERTANYAAN)
        for (i = 1; i <= jml; i++) {
          if (i==jml) { loop = false; }
          if (i == 1) { param = 'satu';  }
          if (i == 2) { param = 'dua'; }
          if (i == 3) { param = 'tiga'; }
          if (i == 4) { param = 'empat'; }
          if (i == 5) { param = 'lima'; }
          setOutput203aDrill(data, i, param, poin, loop, type, sub)
        }
      }
      var setOutput203aDrill    = function(data, i, param, poin, loop, type, sub){
        var kolom1      = 'p203a' + i + '1';
        var kolom2      = 'p203a' + i + '2';
        var GroupBy     = _.groupBy(data, kolom1);
        var ObjectKey   = Object.keys(GroupBy);
        $scope[poin][sub][param] = {};
        var CountBy     = _.countBy(data, kolom1);
        var chartData   = _.map(CountBy, function(value, key){  // untuk data series
            return {
                name: key,
                y: value,
                drilldown : key
            };
        });
        // yang ini untuk drilldowb
        var filteredForDrill = _.filter(data,function(obj) {
            if (i == 1) { return obj.p203a12; }
            if (i == 2) { return obj.p203a22; }
            if (i == 3) { return obj.p203a32; }
            if (i == 4) { return obj.p203a42; }
            if (i == 5) { return obj.p203a52; }
        });
        var CountByDrill     = _.countBy(filteredForDrill, kolom2);
        var chartDataDrill   = _.map(CountByDrill, function(value, key){
            return [
              key, value
            ];
        });
        passingChart203aDrill(ObjectKey, chartData, poin, type, chartDataDrill, sub, param)
      }
      var passingChart203aDrill = function(ObjectKey, chartData, poin, type, chartDataDrill, sub, param){
        if (['pie','bar','column'].indexOf(type) > -1) {
          $scope[poin][sub][param].chart    = {
              chart: {
                  type: 'pie'
              },
              title: {
                  text: 'Survey Persepsi Publik'
              },
              subtitle: {
                  text: 'Pertanyann Poin 203 A '+ param
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
              }],
              drilldown: {
                  series: [{
                      name: 'Ya',
                      id: 'Ya',
                      data:
                          chartDataDrill

                  }]
              }
          };
        }
      }
      // 203 A DRILL----------------------------------------------------------------------------------------------------------------------------------------------


      // BATANG
      // 203 B ---------------------------------------------------------------------------------------------------------------------------------------------------
      var setOutput203b     = function(data, poin, type, sub){
        $scope[poin][sub] = {};
        var temp203b =[
        {
          name: 'Ya',
          data:
          [
            data.filter(function(el) { return el.p203b11 == 'Ya' }).length,
            data.filter(function(el) { return el.p203b21 == 'Ya' }).length,
            data.filter(function(el) { return el.p203b31 == 'Ya' }).length,
            data.filter(function(el) { return el.p203b41 == 'Ya' }).length,
          ]
        },
        {
          name: 'Tidak',
          data:
          [
            data.filter(function(el) { return el.p203b11 == 'Tidak' }).length,
            data.filter(function(el) { return el.p203b21 == 'Tidak' }).length,
            data.filter(function(el) { return el.p203b31 == 'Tidak' }).length,
            data.filter(function(el) { return el.p203b41 == 'Tidak' }).length,
          ]
        }];
        $scope[poin].series = temp203b;
        $scope[poin].key = ['b1','b2','b3','b4'];
        passingChart203b($scope[poin].key, $scope[poin].series, poin, type, sub)
      }
      var passingChart203b  = function(ObjectKey, data, poin, type, sub){
        $scope[poin][sub].chart = {
          chart: {
              type: type,
              width: 1200
          },
          title: {
              text: 'Survey Persepsi Publik'
          },
          subtitle: {
              text: 'Pertanyann Poin 203 B'
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
      // 203 B ---------------------------------------------------------------------------------------------------------------------------------------------------

      // PIE
      // 203 B DRILL ---------------------------------------------------------------------------------------------------------------------------------------------
      var changeOutput203bDrill = function(data, poin, type, sub){
        var loop      = true;
        var param     = '';
        var jml       = 4; // Jumlah looping (PERTANYAAN)
        for (i = 1; i <= jml; i++) {
          if (i==jml) { loop = false; }
          if (i == 1) { param = 'satu';  }
          if (i == 2) { param = 'dua'; }
          if (i == 3) { param = 'tiga'; }
          if (i == 4) { param = 'empat'; }
          setOutput203bDrill(data, i, param, poin, loop, type, sub)
        }
      }
      var setOutput203bDrill    = function(data, i, param, poin, loop, type, sub){
        var kolom1      = 'p203b' + i + '1';
        var kolom2      = 'p203b' + i + '2';
        var GroupBy     = _.groupBy(data, kolom1);
        var ObjectKey   = Object.keys(GroupBy);
        $scope[poin][sub][param] = {};
        var CountBy     = _.countBy(data, kolom1);
        var chartData   = _.map(CountBy, function(value, key){  // untuk data series
            return {
                name: key,
                y: value,
                drilldown : key
            };
        });
        // yang ini untuk drilldowb
        var filteredForDrill = _.filter(data,function(obj) {
            if (i == 1) { return obj.p203b12; }
            if (i == 2) { return obj.p203b22; }
            if (i == 3) { return obj.p203b32; }
            if (i == 4) { return obj.p203b42; }
        });
        var CountByDrill     = _.countBy(filteredForDrill, kolom2);
        var chartDataDrill   = _.map(CountByDrill, function(value, key){
            return [
              key, value
            ];
        });
        passingChart203bDrill(ObjectKey, chartData, poin, type, chartDataDrill, sub, param)
      }
      var passingChart203bDrill = function(ObjectKey, chartData, poin, type, chartDataDrill, sub, param){
        if (['pie','bar','column'].indexOf(type) > -1) {
          $scope[poin][sub][param].chart    = {
              chart: {
                  type: 'pie'
              },
              title: {
                  text: 'Survey Persepsi Publik'
              },
              subtitle: {
                  text: 'Pertanyann Poin 203 B '+ param
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
              }],
              drilldown: {
                  series: [{
                      name: 'Ya',
                      id: 'Ya',
                      data:
                          chartDataDrill

                  }]
              }
          };
        }
      }
      // 203 B DRILL----------------------------------------------------------------------------------------------------------------------------------------------


    });

}());

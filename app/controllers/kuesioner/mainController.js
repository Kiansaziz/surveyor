(function(){

    app.controller('mainController', function($scope, $rootScope, AuthService, $http, toastr, $location, $route){

      if (localStorage['_modal'] == 'true') {
        $('#myModalWelcome').modal('show');
      }
      $scope.stopModal = function(){
        localStorage.setItem("_modal", false);
      }

      $scope.$route = $route;
      $scope.now = new Date().toISOString();

      $scope.logout = function(){
        AuthService.out();
      }



      // PEMANGGILAN PRIMARY
      var kuesioner = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.error('Terjadi Kesalahan');
          } else {
            $rootScope.kuesioner  = response.data;
            $scope.kuesioner.aksi = {};
            $scope.kuesioner.alert = {};
            jawabanA();
            jawabanB();
            jawabanC();
            jawabanD();
            jawabanE();
            jawabanF();
            jawabanG();
            jawabanH();
            jawabanI();
            jawabanJ();
            jawabanK();
            jawabanL();
            jawabanM();
            jawabanN();
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=kuesioner",{"token":token})
        .then(onSuccess, onError);
      }
      kuesioner();







      // PEMANGGILAN DULU SEMUA BERDASARKAN GRUP
      var jawabanA = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.kuesioner.a        = response.data;
              $scope.kuesioner.aksi.a   = 'update';
              $scope.kuesioner.alert.a  = true;
            } else {
              $scope.kuesioner.aksi.a   = 'insert';
              $scope.kuesioner.alert.a  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawabanA",{"token":token})
        .then(onSuccess, onError);
      }

      var jawabanB = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.kuesioner.b        = response.data;
              $scope.kuesioner.aksi.b   = 'update';
              $scope.kuesioner.alert.b  = true;
            } else {
              $scope.kuesioner.aksi.b   = 'insert';
              $scope.kuesioner.alert.b  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawabanB",{"token":token})
        .then(onSuccess, onError);
      }

      var jawabanC = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.kuesioner.c        = response.data;
              $scope.kuesioner.aksi.c   = 'update';
              $scope.kuesioner.alert.c  = true;
            } else {
              $scope.kuesioner.aksi.c   = 'insert';
              $scope.kuesioner.alert.c  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawabanC",{"token":token})
        .then(onSuccess, onError);
      }

      var jawabanD = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.kuesioner.d        = response.data;
              $scope.kuesioner.aksi.d   = 'update';
              $scope.kuesioner.alert.d  = true;
            } else {
              $scope.kuesioner.aksi.d   = 'insert';
              $scope.kuesioner.alert.d  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawabanD",{"token":token})
        .then(onSuccess, onError);
      }

      var jawabanE = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.kuesioner.e        = response.data;
              $scope.kuesioner.aksi.e   = 'update';
              $scope.kuesioner.alert.e  = true;
            } else {
              $scope.kuesioner.aksi.e   = 'insert';
              $scope.kuesioner.alert.e  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawabanE",{"token":token})
        .then(onSuccess, onError);
      }

      var jawabanF = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.kuesioner.f        = response.data;
              $scope.kuesioner.aksi.f   = 'update';
              $scope.kuesioner.alert.f  = true;
            } else {
              $scope.kuesioner.aksi.f   = 'insert';
              $scope.kuesioner.alert.f  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawabanF",{"token":token})
        .then(onSuccess, onError);
      }

      var jawabanG = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.kuesioner.g        = response.data;
              $scope.kuesioner.aksi.g   = 'update';
              $scope.kuesioner.alert.g  = true;
            } else {
              $scope.kuesioner.aksi.g   = 'insert';
              $scope.kuesioner.alert.g  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawabanG",{"token":token})
        .then(onSuccess, onError);
      }

      var jawabanH = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.kuesioner.h        = response.data;
              $scope.kuesioner.aksi.h   = 'update';
              $scope.kuesioner.alert.h  = true;
            } else {
              $scope.kuesioner.aksi.h   = 'insert';
              $scope.kuesioner.alert.h  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawabanH",{"token":token})
        .then(onSuccess, onError);
      }

      var jawabanI = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.kuesioner.i        = response.data;
              $scope.kuesioner.aksi.i   = 'update';
              $scope.kuesioner.alert.i  = true;
            } else {
              $scope.kuesioner.aksi.i   = 'insert';
              $scope.kuesioner.alert.i  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawabanI",{"token":token})
        .then(onSuccess, onError);
      }

      var jawabanJ = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.kuesioner.j        = response.data;
              $scope.kuesioner.aksi.j   = 'update';
              $scope.kuesioner.alert.j  = true;
            } else {
              $scope.kuesioner.aksi.j   = 'insert';
              $scope.kuesioner.alert.j  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawabanJ",{"token":token})
        .then(onSuccess, onError);
      }

      var jawabanK = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.kuesioner.k        = response.data;
              $scope.kuesioner.aksi.k   = 'update';
              $scope.kuesioner.alert.k  = true;
            } else {
              $scope.kuesioner.aksi.k   = 'insert';
              $scope.kuesioner.alert.k  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawabanK",{"token":token})
        .then(onSuccess, onError);
      }

      var jawabanL = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.kuesioner.l        = response.data;
              $scope.kuesioner.aksi.l   = 'update';
              $scope.kuesioner.alert.l  = true;
            } else {
              $scope.kuesioner.aksi.l   = 'insert';
              $scope.kuesioner.alert.l  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawabanL",{"token":token})
        .then(onSuccess, onError);
      }

      var jawabanM = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.kuesioner.m        = response.data;
              $scope.kuesioner.aksi.m   = 'update';
              $scope.kuesioner.alert.m  = true;
            } else {
              $scope.kuesioner.aksi.m   = 'insert';
              $scope.kuesioner.alert.m  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawabanM",{"token":token})
        .then(onSuccess, onError);
      }

      var jawabanN = function(){
        var token =  JSON.parse(localStorage['_token']);
        var onSuccess = function(response){
          if (response.data == "error") {
            toastr.danger('Terjadi Kesalahan');
          } else {
            if (response.data != 'null') {
              $scope.kuesioner.n        = response.data;
              $scope.kuesioner.aksi.n   = 'update';
              $scope.kuesioner.alert.n  = true;
            } else {
              $scope.kuesioner.aksi.n   = 'insert';
              $scope.kuesioner.alert.n  = false;
            }
          }
        }
        var onError = function(reason){
          toastr.error('Terjadi Kesalahan');
        }
        $http.post("../api/kuesioner/primaryKuesioner.php?type=jawabanN",{"token":token})
        .then(onSuccess, onError);
      }








      $scope.submit = function(dataSubmit, tableTujuan, aksi, grup){
        // PENGATURAN GRUP B
        if (grup == 'b') {
          if(dataSubmit.p201     != 'Profesi Lainnya'){ dataSubmit.p201x = ''; }
          if(dataSubmit.p202a1   != 'Ya'){ dataSubmit.p202a2 = '';  }
          if(dataSubmit.p202b11  != 'Ya'){ dataSubmit.p202b12 = ''; }
          if(dataSubmit.p202b21  != 'Ya'){ dataSubmit.p202b22 = ''; }
          if(dataSubmit.p202b31  != 'Ya'){ dataSubmit.p202b32 = ''; }
          if(dataSubmit.p202b41  != 'Ya'){ dataSubmit.p202b42 = ''; }
          if(dataSubmit.p202b51  != 'Ya'){ dataSubmit.p202b52 = ''; }
          if(dataSubmit.p202b61  != 'Ya'){ dataSubmit.p202b62 = ''; }
          if(dataSubmit.p202b71  != 'Ya'){ dataSubmit.p202b72 = ''; }
          if(dataSubmit.p202b81  != 'Ya'){ dataSubmit.p202b82 = ''; }
          if(dataSubmit.p203a11  != 'Ya'){ dataSubmit.p203a12 = ''; }
          if(dataSubmit.p203a21  != 'Ya'){ dataSubmit.p203a22 = ''; }
          if(dataSubmit.p203a31  != 'Ya'){ dataSubmit.p203a32 = ''; }
          if(dataSubmit.p203a41  != 'Ya'){ dataSubmit.p203a42 = ''; }
          if(dataSubmit.p203a51  != 'Ya'){ dataSubmit.p203a52 = ''; }
          if(dataSubmit.p203b11  != 'Ya'){ dataSubmit.p203b12 = ''; }
          if(dataSubmit.p203b21  != 'Ya'){ dataSubmit.p203b22 = ''; }
          if(dataSubmit.p203b31  != 'Ya'){ dataSubmit.p203b32 = ''; }
          if(dataSubmit.p203b41  != 'Ya'){ dataSubmit.p203b42 = ''; }
        }
        // PENGATURAN GRUP C
        if (grup == 'c') {
          if(dataSubmit.p303a == 'Ya'){ dataSubmit.p303b1 = ''; dataSubmit.p303b2 = ''; dataSubmit.p303b3 = ''; dataSubmit.parameter = ''; }
        }
        // PENGATURAN GRUP E
        if (grup == 'e') {
          if(dataSubmit.p501a == 'Tidak'){ dataSubmit.p501b1 = ''; dataSubmit.p501b2 = ''; dataSubmit.p501b3 = ''; dataSubmit.p501b4 = ''; dataSubmit.p501b5 = ''; dataSubmit.p501b6 = ''; dataSubmit.p501b7 = ''; dataSubmit.p501b8 = ''; }
          if(dataSubmit.p502a == 'Tidak'){ dataSubmit.p502b1 = ''; dataSubmit.p502b2 = ''; dataSubmit.p502b3 = ''; dataSubmit.p502b4 = ''; dataSubmit.p502b5 = ''; dataSubmit.p502b6 = ''; }
        }
        // PENGATURAN GRUP F
        if (grup == 'f') {
          if(dataSubmit.p603a == 'Ya'){ dataSubmit.p603b1 = ''; dataSubmit.p603b2 = ''; dataSubmit.p603b3 = ''; dataSubmit.parameter = ''; }
        }
        // PENGATURAN GRUP I
        if (grup == 'i') {
          if(dataSubmit.p901a <= 5){ dataSubmit.p901b = ''; }
          if(dataSubmit.p902a <= 5){ dataSubmit.p902b = ''; }
          if(dataSubmit.p903a <= 5){ dataSubmit.p903b = ''; }
          if(dataSubmit.p904a <= 5){ dataSubmit.p904b = ''; }
          if(dataSubmit.p905a <= 5){ dataSubmit.p905b = ''; }
          if(dataSubmit.p906a <= 5){ dataSubmit.p906b = ''; }
          if(dataSubmit.p907a <= 5){ dataSubmit.p907b = ''; }
          if(dataSubmit.p908a <= 5){ dataSubmit.p908b = ''; }
          if(dataSubmit.p909a <= 5){ dataSubmit.p909b = ''; }
          if(dataSubmit.p909c <= 5){ dataSubmit.p909d = ''; }
          if(dataSubmit.p910a <= 5){ dataSubmit.p910b = ''; }
          if(dataSubmit.p910c <= 5){ dataSubmit.p910d = ''; }
          if(dataSubmit.p911a <= 5){ dataSubmit.p911b = ''; }
          if(dataSubmit.p911c <= 5){ dataSubmit.p911d = ''; }
          if(dataSubmit.p912a <= 5){ dataSubmit.p912b = ''; }
          if(dataSubmit.p912c <= 5){ dataSubmit.p912d = ''; }
          if(dataSubmit.p913c <= 5){ dataSubmit.p913d = ''; }
          if(dataSubmit.p914c <= 5){ dataSubmit.p914d = ''; }
          if(dataSubmit.p915c <= 5){ dataSubmit.p915d = ''; }
          if(dataSubmit.p916c <= 5){ dataSubmit.p916d = ''; }
          if(dataSubmit.p917c <= 5){ dataSubmit.p917d = ''; }
          if(dataSubmit.p918c <= 5){ dataSubmit.p918d = ''; }
          if(dataSubmit.p919c <= 5){ dataSubmit.p919d = ''; }
          if(dataSubmit.p920c <= 5){ dataSubmit.p920d = ''; }
          if(dataSubmit.p921c <= 5){ dataSubmit.p921d = ''; }
          if(dataSubmit.p922c <= 5){ dataSubmit.p922d = ''; }
        }
        // PENGATURAN GRUP H
        if (grup == 'h') {
          if(dataSubmit.p801a == 'Tidak Pernah' && dataSubmit.p801b == 'Tidak Pernah' && dataSubmit.p801c == 'Tidak Pernah' && dataSubmit.p801d == 'Tidak Pernah'){
            dataSubmit.p802a = '';
            dataSubmit.p802b = '';
            dataSubmit.p802c = '';
            dataSubmit.p802d = '';
            dataSubmit.p802e = '';
            dataSubmit.p802f = '';
          }
        }
        var data = {
          'jawaban' : dataSubmit,
          'tabel'   : tableTujuan,
          'aksi'    : aksi,
          'grup'    : grup,
          'token'   : JSON.parse(localStorage['_token'])
        }
        $http.post('../api/kuesioner/allProccess.php?type=submit', data).success(function(response){
          console.log(response);
          if (response.status == 'success') {
            toastr.success(response.keterangan);
            $scope.kuesioner.aksi[grup]   = 'update';
            $scope.kuesioner.alert[grup]  = true;
            if (response.hasil == 'insert') {
              if (grup == 'a') { $location.path('/b'); }
              if (grup == 'b') { $location.path('/c'); }
              if (grup == 'c') { $location.path('/d'); }
              if (grup == 'd') { $location.path('/e'); }
              if (grup == 'e') { $location.path('/f'); }
              if (grup == 'f') { $location.path('/g'); }
              if (grup == 'g') { $location.path('/h'); }
              if (grup == 'h') { $location.path('/i'); }
              if (grup == 'i') { $location.path('/j'); }
              if (grup == 'j') { $location.path('/k'); }
              if (grup == 'k') { $location.path('/l'); }
              if (grup == 'l') { $location.path('/m'); }
              if (grup == 'm') { $location.path('/n'); }
            }
          } else if (response.status != 'success') {
            toastr.error(response.keterangan);
          } else {
            toastr.error('Terjadi Kesalahan');
          }
        });
      }



    });
}());

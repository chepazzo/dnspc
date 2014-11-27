var pcApp = angular.module('pcApp', []);

pcApp.config(['$interpolateProvider', function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
  }]);

pcApp.controller('PCCtrl', function ($scope,$http) {
    $scope.add_rule = function(data) {
        var url = '{{url_for('addrule')}}';
        var method = 'POST';
        $http(
            {method: method, url: url,data: JSON.stringify(data)}
        ).success(function(data, status) {
            $scope.get_rules();
        }).error(function(data, status) {
            console.log('ERROR');
            console.log(data);
            console.log(status);
        });
    };
    $scope.del_rule = function(uid) {
        var data = {'uid':uid};
        var url = '{{url_for('delrule')}}';
        var method = 'POST';
        $http(
            {method: method, url: url,data: JSON.stringify(data)}
        ).success(function(data, status) {
            //gotDel(data,status);
            $scope.get_rules();
        }).error(function(data, status) {
            console.log('ERROR');
            console.log(data);
            console.log(status);
        });
    };
    $scope.get_rules = function() {
        var url = '{{url_for('get_rules')}}';
        var method = 'GET';
        $http(
            {method: method, url: url}
        ).success(function(data, status) {
            //gotRules(data,status);
            $scope.myrules = data.data;
            console.log(data.data);
        }).error(function(data, status) {
            console.log('ERROR');
            console.log(data);
            console.log(status);
        });
    };

    $scope.parsedow = function(dow) {
        var a = ['S','M','T','W','T','F','S'];
        var newdow = [];
        var dows = dow.split(',');
        for (i=0; i<dows.length; i++) {
            var d = parseInt(dows[i]);
            newdow.push(a[d]);
        }
        return newdow.join(',');
    };

    $scope.get_rules();
});


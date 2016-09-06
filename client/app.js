
var lyricList = angular.module('lyricList', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all inputs and show them
    $http.get('/api/inputs')
        .success(function(data) {
            $scope.inputs = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createList = function() {
        $http.post('/api/inputs', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.inputs = data;
                // var dataInput = '';
                // data.forEach(function(item) {
                //   dataInput += item.text;
                // });
                // console.log(dataInput);
                // console.log($scope.input.text)
                
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a list after clicking it
    $scope.deleteList = function(id) {
        $http.delete('/api/inputs/' + id)
            .success(function(data) {
                $scope.inputs = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


}
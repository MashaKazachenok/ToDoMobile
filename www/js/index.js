function TodoCtrl($scope){

    $scope.todoList =
        [
            { text:'go', done:false }

        ];

    $scope.addTask = function()
    {
        $scope.todoList.push({text:$scope.newTask, done:false});
        $scope.newTask= "";
    };

    $scope.clearCompleted = function()
    {
        $scope.todoList = _.filter($scope.todoList, function(todo){
            return !todo.done;
        });
    };

    $scope.getActive = function(){


    };

    $scope.getCompleted = function()
    {


    };

    $scope.getAllTask = function()
    {
        return $scope.todoList.length;
    };

            }

    var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        //document.addEventListener('DOMContentLoaded', this.onDeviceReady, false);
      //  document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('DOMContendLoaded', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
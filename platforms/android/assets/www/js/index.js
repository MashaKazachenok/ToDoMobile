/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var tasks = [];

function vvod() {
    if(event.keyCode == 13){
        addClickHandler();
        displayPodval();
        getActiveTaskCount();
        getCompletedTaskCount();
    };
}

function addClickHandler() {
    var description = getDescription();
    tasks.push(description);
    displayTasks(tasks);
}

function getDescription() {
    return getInput().value;
}


function getInput() {
    return document.getElementById('task');
}

function getContainer() {
    return document.getElementById('list');
}


function clearClickHandler(argument) {
    var container = getContainer();
    container.innerHTML = null;
}

function showAll(event) {
    setInactiveStyleAllButton();
    var but = event.target;
    but.className = "act";
    var activeTasks = arrGetActive();
    setDisplayForTasks(activeTasks, "");
    var completedTasks = arrGetCompleted();
    setDisplayForTasks(completedTasks, "");
}

function arrGetActive (event) {


    var container = getContainer();
    var tasks = container.children;
    var activeTasks = [];

    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        var completed = task.children[0].checked;

        if (!completed)
        {
            activeTasks.push(task);
        }
    }

    return activeTasks;
}

function arrGetCompleted (event) {

    var container = getContainer();
    var tasks = container.children;
    var completedTasks = [];

    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        var completed = task.children[0].checked;

        if (completed)
        {
            completedTasks.push(task);
        }
    }

    return completedTasks;
}

function showActive(event) {
    setInactiveStyleAllButton();
    but = event.target;
    but.className = "act";
    var activeTasks = arrGetActive();
    //activeTasks.className = "act";
    //console.log(activeTasks);
    setDisplayForTasks(activeTasks, "");

    var completedTasks = arrGetCompleted();
    setDisplayForTasks(completedTasks, "none");

}

function setDisplayForTasks(tasks, display) {
    for (var i = 0; i < tasks.length; i++) {
        tasks[i].style.display = display;
    }
}

function setInactiveStyleAllButton () {
    var activeButton =  document.querySelector('input.act');

    if (activeButton) {
        activeButton.className = "Btn";
    }
}

function showCompleted() {
    setInactiveStyleAllButton();
    var but = event.target;
    but.className = "act";
    var activeTasks = arrGetActive();
    setDisplayForTasks(activeTasks, "none");

    var completedTasks = arrGetCompleted();
    setDisplayForTasks(completedTasks, "");
}

function clearCompleted() {
    var container = getContainer();
    var completedTasks = arrGetCompleted();

    // удаляем завершенные задачи
    for (var i = 0; i < completedTasks.length; i++) {
        container.removeChild(completedTasks[i])
    }
    displayPodval();
}


function del(event) {
    var task = event.target.parentNode;
    var container = task.parentNode;
    container.removeChild(task);
    getActiveTaskCount()
    displayPodval();
}

function changeStatus(event) {
    var task = event.target.parentNode;
    var desription = task.children[1];

    var status = event.target;

    task.className = (status.checked) ? "completed" : "active";

    getActiveTaskCount();
    getCompletedTaskCount();
}

function displayTasks(tasks) {

    var taskDescription = tasks[tasks.length-1];

    var changeStatusAction = document.createElement('input');
    changeStatusAction.type = "checkbox";
    changeStatusAction.addEventListener("click", changeStatus);

    var description = document.createElement('span');
    description.innerHTML = taskDescription;

    var deleteAction = document.createElement('input');
    deleteAction.type = "button";
    deleteAction.value = "x";
    //delete
    deleteAction.addEventListener("click", del);

    var task = document.createElement('p');
    task.className = "active";
    task.appendChild(changeStatusAction);
    task.appendChild(description);
    task.appendChild(deleteAction);

    var container = getContainer();
    container.appendChild(task);

}

function  getActiveTaskCount() {

    var activeTasks = arrGetActive();

    document.getElementById('count').innerHTML = activeTasks.length;
}

function  getCompletedTaskCount() {

    var completedTasks = arrGetCompleted();

    var description = document.getElementById('clearCompleted').attributes['data-description'].value;

    document.getElementById('clearCompleted').value = description + completedTasks.length;
}

function displayPodval () {

    var container = getContainer();
    var tasks = container.children;

    var display = (tasks.length > 0) ? '' : 'none';

    document.getElementById('podval').style.display = display;
}



window.onload = function(){
    getInput().addEventListener("keydown", vvod);

    document.getElementById('clearCompleted').addEventListener('click', clearCompleted);
    document.getElementById('showCompleted').addEventListener('click', showCompleted);
    document.getElementById('showActive').addEventListener('click', showActive);
    document.getElementById('showAll').addEventListener('click', showAll);
    getCompletedTaskCount();
    getActiveTaskCount();
    displayPodval();

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
        document.addEventListener('deviceready', this.onDeviceReady, false);
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
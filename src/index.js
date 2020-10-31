const { ipcRenderer } = require('electron')
const path = require('path')
const TaskHandler = require(path.join('../src/TaskHandler.js'))
const TaskComponents = require(path.join('../src/TaskComponents.js'))

var index_counter = 0

createBaseNode()

document.addEventListener('click', function(e) {
    button = e.target

    if (button.id == 'send_btn') {
        checkCreateNewTaskButton()
    }
    else {
       checkOtherTaskButtons(button)
    }
})

function checkCreateNewTaskButton() {
    var result = ipcRenderer.sendSync('create-new-task-action')
    
    if (result != -1) {
        TaskHandler.addTask(index_counter)
        index_counter++
    }
}

function checkOtherTaskButtons(button) {
    for(var i = 0; i <= index_counter; i++) {
        var parent_node = button.parentNode

        switch(button.id) {
            case "done" + i:
                doneButtonClickAction(parent_node)
                break

            case "settings" + i:
                settingsButtonClickAction(parent_node)
                break
        }
    }
}

function doneButtonClickAction(parent_node) {
    TaskHandler.removeTask(parent_node.id)
}

function settingsButtonClickAction(parent_node) {
    var result = ipcRenderer.sendSync('task-settings-action')

    switch(result) {
        case 0:
            //TaskComponents.addComponentToTask(parent_node, "checklist")
            console.log("Add component menu")
            break
        case 1:
            console.log("Delete component menu")
            break
        default:
            break
    }
}

function createBaseNode() {
    var root = document.getElementsByTagName("body")[0]
    var base_node = document.createElement('div')
    base_node.setAttribute('id', "base_node")
    root.appendChild(base_node)
}
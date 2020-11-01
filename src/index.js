const { ipcRenderer } = require('electron')
const path = require('path')
const TaskHandler = require(path.join('../src/TaskHandler.js'))
const TaskComponents = require(path.join('../src/TaskComponents.js'))

var index_counter = 0

createBaseNode()

document.addEventListener('click', function(e) {
    button = e.target

    console.log(button.parentNode.id)

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
    var parent_node = button.parentNode

    switch(button.id) {
        case "done":
            //doneButtonClickAction(parent_node)
            settingsButtonClickAction(parent_node)
            break

        case "settings":
            toggleButton(button)
            break
        case "delete_component":
            deleteComponentClickAction(parent_node)
            break
    }
}

function toggleButton() {
    var components_box = TaskComponents.getComponentsBoxFromTask(button.parentNode)
    var children_component_array = components_box.childNodes

    var task = components_box.parentNode
    var editable = getAllEditableElementsFromTask(task)

    if(button.getAttribute('class') == 'toggle_on') {
        button.setAttribute('class', 'toggle_off')

        for(var i = 0; i < children_component_array.length; i++) {
           children_component_array[i].querySelector("button").setAttribute("class", "hidden")
        }

        for(var i = 0; i < editable.length; i++) {
            editable[i].setAttribute("contenteditable", "false")
         }
    }
    else {
        button.setAttribute('class', 'toggle_on')

        for(var i = 0; i < children_component_array.length; i++) {
           children_component_array[i].querySelector("button").setAttribute("class", "shown")
        }

        for(var i = 0; i < editable.length; i++) {
           editable[i].setAttribute("contenteditable", "true")
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
            TaskComponents.addComponentToTask(parent_node, "checklist")
            console.log("Add component menu")
            break
        case 1:
            console.log("Delete component menu")
            break
        default:
            break
    }
}

function deleteComponentClickAction(button) {
    var component = button.parentNode
    var target_task = component.parentNode
    TaskComponents.removeComponent(target_task, component)
}

function getAllEditableElementsFromTask(target_task) {
    return target_task.querySelectorAll("[contenteditable]")
}

function createBaseNode() {
    var root = document.getElementsByTagName("body")[0]
    var base_node = document.createElement('div')
    base_node.setAttribute('id', "base_node")
    root.appendChild(base_node)
}
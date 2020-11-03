const { ipcRenderer } = require('electron')
const sh = require('./shared.js')

module.exports.init = init
module.exports.respond = respond

var TaskDataArray = []

function init() {
    addEventListener('click', (event) => {
        var button = event.target
        ButtonClickAction(button)
    })
}

function respond(event, data) {
    if (data != null) {
        ipcRenderer.invoke('send-task-data-action', data)
    }
    ipcRenderer.invoke('get-task-data-action', 'create-tasks')
}

ipcRenderer.on('create-tasks', (event, data) => {
    if (data != null) {
        TaskDataArray = data
        
        if (TaskDataArray.length > 0) {
            for(var i = 0; i < TaskDataArray.length; i++) {
                sh.AddTask(document.getElementById('tasks'), TaskDataArray[i])
            }
        }
    }

})

function ButtonClickAction(button) {
    switch(button.id) {
        case 'create':
            ipcRenderer.invoke('create-new-task-action')
            sh.ForwardToHTMLPage('create_task')
            break
        
        case 'done':
            doneButtonClickAction(button.parentNode)
            break

        case 'edit':
            toggleButton(button)
            break

        case 'delete_component':
            deleteComponentClickAction(button.parentNode)
            break

        default:
            console.log(button.id)
            break
    }
}

function toggleButton(button) {
    var task = button.parentNode
    var components_box = task.querySelector('#components')
    var children_component_array = components_box.childNodes

    var task = components_box.parentNode
    var editable = GetAllEditableElementsFromTask(task)

    console.log(editable)
    console.log(components_box)
    console.log(children_component_array)

    if(button.getAttribute('class') == 'toggle_on') {
        button.setAttribute('class', 'toggle_off')

        /*for(var i = 0; i < children_component_array.length; i++) {
           children_component_array[i].querySelector("button").setAttribute("class", "hidden")
        }*/

        for(var i = 0; i < editable.length; i++) {
            editable[i].setAttribute("contenteditable", "false")
        }
    }
    else {
        button.setAttribute('class', 'toggle_on')

        /*for(var i = 0; i < children_component_array.length; i++) {
           children_component_array[i].querySelector("button").setAttribute("class", "shown")
        }*/

        for(var i = 0; i < editable.length; i++) {
           editable[i].setAttribute("contenteditable", "true")
        }
    }
}

function GetAllEditableElementsFromTask(target_task) {
    return target_task.querySelectorAll("[contenteditable]")
}

function doneButtonClickAction(parent_node) {
    sh.RemoveTask(parent_node)

    var parent_node_title = parent_node.querySelector('#title').innerHTML
    
    for(var i = 0; i < TaskDataArray.length; i++) {
        if (TaskDataArray[i][0] == parent_node.id) {
            TaskDataArray.splice(i, 1)
        }
    }

    ipcRenderer.invoke('replace-task-array-action', TaskDataArray)
}

function deleteComponentClickAction(button) {
    var component = button.parentNode
    var target_task = component.parentNode
    TaskComponents.removeComponent(target_task, component)
}
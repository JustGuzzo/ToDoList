const Task = require(path.join('../src/TaskHandler.js'))

function addComponentToTask(target_task, component_name) {
    if(target_task != null) {
        switch(component_name) {
            case 'checklist':
                addCheckbox(target_task)
                break
    
            default:
                console.log("ERROR: wrong component name")
        }
    }
    else {
        console.log("ERROR: first set current task, then add component")
    }
}

function getComponentsBoxFromTask(target_task) {
    return target_task.querySelector("#components")
}

function addCheckbox(target_task) {
    var components_box = getComponentsBoxFromTask(target_task)

    var checkbox_list = Task.createElement("section", false, ["id", "checkbox"], false)
    var label = Task.createElement("span", true, ["id", "label"], "Checkbox List")
    var delete_button = Task.createElement("button", false, ["id", "delete_component", "class", "hidden"], "X")
    var nav_bar = Task.createElement("navbar", false, ["id", "component"], false)

    var checkbox = Task.createElement("input", false, ["type", "checkbox"], false)
    var checkbox_label = Task.createElement("span", true, ["id", "chk_label"], "checkbox option")
    
    nav_bar.append(label)
    nav_bar.append(delete_button)

    checkbox_list.append(nav_bar)
    checkbox_list.innerHTML += "<br>"
    checkbox_list.append(checkbox)
    checkbox_list.append(checkbox_label)
    
    components_box.append(checkbox_list)
}

function removeComponent(target_task, target_component) {
    target_task.removeChild(target_component)
}

module.exports.addComponentToTask = addComponentToTask
module.exports.getComponentsBoxFromTask = getComponentsBoxFromTask
module.exports.removeComponent = removeComponent
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
    var checkbox_list = Task.createElement("h4", true, ["id", "checklist " + target_task.id], "Checkbox List")
    var components_box = getComponentsBoxFromTask(target_task)
    //var checkbox 


    components_box.append(checkbox_list)
}

module.exports.addComponentToTask = addComponentToTask
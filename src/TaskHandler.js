function addTask(task_id) {
    var contener = createElement("div", false, ["id", "task" + task_id], false)
    var components_box = createElement("div", false, ["id", "components"], false)

    var task_label = createElement("h3", true, [], "New Task " + task_id)

    var done_button = createElement("button", false, ["id", "done"], "DONE")
    var settings_button = createElement("button", false, ["id", "settings"], "EDIT")

    task = appendElementsToTaskWithLineBreak(contener, [
        task_label, false,
        components_box, true,
        done_button, false,
        settings_button, true
    ])

    appendToRootNode(task)
}

function createElement(html_tag, is_editable, list_of_attributes, inner_html) {
    var element = document.createElement(html_tag)

    for(var i = 0; i < list_of_attributes.length; i += 2) {
        element.setAttribute(list_of_attributes[i], list_of_attributes[i + 1])
    }

    if (is_editable) {
        element.setAttribute("contenteditable", "true")
    }

    if (inner_html) {
        element.innerHTML += inner_html
    }

    return element
}

function appendElementsToTaskWithLineBreak(contener, task_elements) {
    for (var i = 0; i < task_elements.length; i += 2) {
        contener.appendChild(task_elements[i])

        if (task_elements[i + 1] == true) {
            contener.innerHTML += "<br>"
        }
    }

    return contener
}

function appendToRootNode(task) {
    document.getElementById("base_node").appendChild(task)
}

function removeTask(elementId) {
    var element = document.getElementById(elementId);
    document.getElementById("base_node").removeChild(element);
}

module.exports.addTask = addTask
module.exports.removeTask = removeTask
module.exports.createElement = createElement
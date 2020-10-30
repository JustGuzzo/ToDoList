const { ipcRenderer } = require('electron')

var root = document.getElementsByTagName("body")[0]
var base_node = document.createElement('div')
base_node.setAttribute('id', "base_node")
root.appendChild(base_node)

var index_counter = 0

document.addEventListener('click', function(e) {
    if (e.target.id == 'send_btn') {
        var result = ipcRenderer.sendSync('click-action')
    
        if (result != -1) {
            addTask(index_counter)
            index_counter++
        }
    }
    else {
        for(var i = 0; i <= index_counter; i++) {
            if (e.target.id == "done" + i) {
                removeElement(e.target.parentNode.id)
            }

            if (e.target.id == "settings" + i) {
                console.log(e.target.id)
            }
        }
    }
})

function removeElement(elementId) {
    var element = document.getElementById(elementId);
    document.getElementById("base_node").removeChild(element);
}

function addTask(task_id) {
    var contener = CreateElement("div", false, ["id", "task" + task_id], false)

    var task_label = CreateElement("div", true, [], "New Task " + task_id)
    var text_node = CreateElement("input", false, ["type", "text"], false)

    var done_button = CreateElement("button", false, ["id", "done" + task_id], "DONE")
    var settings_button = CreateElement("button", false, ["id", "settings" + task_id], "SETTINGS")

    task = AppendElementsToTaskWithLineBreak(contener, [
        task_label, true,
        text_node, true,
        done_button, false,
        settings_button, true
    ])

    AppendToRootNode(task)
}

function CreateElement(html_tag, is_editable, list_of_attributes, inner_html) {
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

function AppendElementsToTaskWithLineBreak(contener, task_elements) {
    for (var i = 0; i < task_elements.length; i += 2) {
        contener.appendChild(task_elements[i])

        if (task_elements[i + 1] == true) {
            contener.innerHTML += "<br>"
        }
    }

    return contener
}

function AppendToRootNode(task) {
    base_node.appendChild(task)
}
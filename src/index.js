const { ipcRenderer } = require('electron')

var root = document.getElementsByTagName("body")[0]
var base_node = document.createElement('div')
base_node.setAttribute('id', "base_node")
root.appendChild(base_node)

var index_counter = 0

document.addEventListener('click', function(e) {
    if (e.target.id == 'send_btn') {
        var result = ipcRenderer.sendSync('click-action')
        console.log(result)
    
        if (result != -1) {
            addTaskElement(index_counter)
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

function addTaskElement(task_id) {
    var contener = document.createElement("div")
    contener.setAttribute("id", "task" + task_id)

    var task_label = document.createElement("div")
    task_label.setAttribute("contenteditable", "true")
    task_label.innerHTML += "New Task " + task_id

    var text_node = document.createElement("input")
    text_node.setAttribute("type", "text")

    var done_button = document.createElement("button")
    done_button.setAttribute("id", "done" + task_id)
    done_button.innerHTML = "DONE"

    var settings_button = document.createElement("button")
    settings_button.setAttribute("id", "settings" + task_id)
    settings_button.innerHTML = "SETTINGS"
    
    contener.appendChild(task_label)
    contener.innerHTML += "<br>"
    contener.appendChild(text_node)
    contener.innerHTML += "<br>"
    contener.appendChild(done_button)
    contener.appendChild(settings_button)
    contener.innerHTML += "<br>"

    base_node.appendChild(contener)
}
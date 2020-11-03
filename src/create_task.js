const { ipcRenderer } = require('electron')
const sh = require('./shared.js')

module.exports.init = init
module.exports.respond = respond

function init() {
    document.getElementById('submit').addEventListener('click', (event) => {
        var formData = GetFormData()

        var index = ipcRenderer.sendSync('get-index-action')

        formData.unshift('task' + index)

        sh.ForwardToHTMLPage('index')
        ipcRenderer.invoke('send-form-data-action', formData)
    })
}

function respond(event, data) {
    
}

function GetFormData() {
    var rawFormData = document.getElementById('create_task_form').elements
    var formData = []

    for(var i = 0; i < rawFormData.length; i++) {
        if (rawFormData[i].checked) {
            formData[i] = rawFormData[i].id
        }
        else if (!rawFormData[i].checked && rawFormData[i].value == 'on') {
            continue
        }
        else {
            formData[i] = rawFormData[i].value
        }
    }

    return formData
}
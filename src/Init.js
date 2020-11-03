const { ipcRenderer } = require('electron')
const index = require('./index.js')
const create_task = require('./create_task.js')

window.onload = function() {
    ipcRenderer.invoke('loaded')

    if(document.getElementById('index')) {
        index.init()
    }

    if(document.getElementById('create_task')) {
        create_task.init()
    }
}

ipcRenderer.on('respond', async (event, data) => {
    if(document.getElementById('index')) {
        index.respond(event, data)
    }

    if(document.getElementById('create_task')) {
        create_task.respond(event, data)
    }
})
const { ipcRenderer } = require('electron')
const sh = require('./shared.js')

module.exports.init = init
module.exports.update = update

function init() {
    document.getElementById('submit').addEventListener('click', (event) => {
        sh.forwardToHTMLPage('index')
        ipcRenderer.invoke('click', 2)
    })
}

function update(event, data) {
    var h3 = document.createElement('h3')
    data != null ? h3.innerHTML = 'Second ' + data : h3.innerHTML = 'Second element'
    document.getElementById('form').appendChild(h3)
}
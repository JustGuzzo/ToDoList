const { dialog } = require('electron');

module.exports.taskSettings = taskSettings
module.exports.createNewTask = createNewTask

function createNewTask(event) {
    var options = {
        title: "Add new Task",
        message: "Would you like to add new task to list?",
        buttons: [
            "Ok",
            "Cancel"
        ],
        defaultId: 0,
        cancelId: -1,
        type: "warning"
    }

    var buttons_id = [
        0,
        -1
    ]

    showMessageBox(options, buttons_id, event)
}

function taskSettings(event){
    var options = {
        title: "Task Settings",
        buttons: [
            "Cancel",
            "Add New Component",
            "Edit Task"
        ],
        defaultId: 0,
        cancelId: -1,
        type: "warning"
    }

    var buttons_id = [
        -1,
        0,
        1
    ]

    showMessageBox(options, buttons_id, event)
}

function showMessageBox(options, buttons_id, event) {
    dialog.showMessageBox(options).then((value, checkbox) => {
        event.returnValue = buttons_id[value.response]
    })
}
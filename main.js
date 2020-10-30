const { app, BrowserWindow, ipcMain} = require('electron')
const { dialog } = require('electron');

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    }) 

    win.loadFile('./src/index.html')
    win.webContents.openDevTools()
}

ipcMain.on('click-action', (event) => {
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

    ShowMessageBox(options, buttons_id, event)
})

function ShowMessageBox(options, buttons_id, event) {
    dialog.showMessageBox(options).then((value, checkbox) => {
        event.returnValue = buttons_id[value.response]
    })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
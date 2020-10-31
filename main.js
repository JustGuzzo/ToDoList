const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron')
const path = require('path')
const ActionHandler = require(path.join(app.getAppPath() + '/src/ActionHandler.js'))

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        }
    })

    win.loadFile('./src/index.html')
    win.webContents.openDevTools()
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

ipcMain.on('create-new-task-action', (event) => {
    ActionHandler.createNewTask(event)
})

ipcMain.on('task-settings-action', (event) => {
    ActionHandler.taskSettings(event)
})
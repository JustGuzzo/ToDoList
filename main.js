const { app, BrowserWindow, shell } = require('electron')
const { ipcMain } = require('electron')
const path = require('path')

var Data = null
var TaskDataArray = [['task0', 'task', 'test task']]
var Index = 0

ipcMain.handle('click', (event, data) => {
    Data = data
})

ipcMain.handle('loaded', (event) => {
    event.sender.send('respond', Data)
})

ipcMain.handle('create-new-task-action', (event) => {
    event.sender.send('respond')
})

ipcMain.handle('send-form-data-action' , (event, data) => {
    Data = data
})

ipcMain.handle('get-form-data-action', (event) => {
    event.sender.send('respond', Data)
})

ipcMain.handle('send-task-data-action', (event, data) => {
    if (TaskDataArray.length == 0) {
        TaskDataArray = new Array(1)
        TaskDataArray[0] = data
    }
    else {
        TaskDataArray.push(data)
    }
})

ipcMain.handle('replace-task-array-action', (event, data) => {
    TaskDataArray = data
})

ipcMain.handle('get-task-data-action', (event, destination) => {
    if(TaskDataArray != null && destination != null) {
        console.log(TaskDataArray)
        event.sender.send(destination, TaskDataArray)
    }
})

ipcMain.on('get-index-action', (event) => {
    event.returnValue = Index
    Index++
})


function createWindow () {
    let win = new BrowserWindow({
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

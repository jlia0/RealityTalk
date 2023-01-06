const { app, BrowserWindow, nativeImage } = require('electron');
// const url = require('url');
const path = require('path');

function createWindow () {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true, // 是否启用node集成 渲染进程的内容有访问node的能力
            webviewTag: true, // 是否使用<webview>标签 在一个独立的 frame 和进程里显示外部 web 内容
            webSecurity: false, // 禁用同源策略
            nodeIntegrationInWorker: true,
            nodeIntegrationInSubFrames: true, // 是否允许在子页面(iframe)或子窗口(child window)中集成Node.js
            preload: path.resolve(__dirname, './renderer.js'),
            // contextIsolation: false
        }
    })

    // 加载应用 --打包react应用后，__dirname为当前文件路径
    // mainWindow.loadURL(url.format({
    //   pathname: path.join(__dirname, './build/index.html'),
    //   protocol: 'file:',
    //   slashes: true
    // }));

    // 加载应用 --开发阶段  需要运行 npm run start
    mainWindow.loadURL('http://localhost:3000/');

}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
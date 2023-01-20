const path = require("path");
const { app, BrowserWindow } = require("electron");
// const isDev = require("electron-is-dev");

function createWindow() {
    const win = new BrowserWindow({
        minWidth: 1024,
        minHeight: 1024,
        webPreferences: {
            // preload: path.join(__dirname, 'preload.js'), // preload js
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            nodeIntegrationInWorker: true,
            nodeIntegrationInSubFrames: true,
        },
    });

    win.maximize();

    // win.loadURL(
    //     isDev
    //         ? "http://localhost:3000"
    //         : `file://${path.join(__dirname, "../build/index.html")}`
    // );

    win.loadURL(`file://${path.join(__dirname, "../build/index.html")}`);

    // if (isDev) win.webContents.openDevTools({ mode: 'detach' })
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () =>
    process.platform !== "darwin" ? app.quit() : undefined
);

app.on("activate", () =>
    BrowserWindow.getAllWindows().length === 0 ? createWindow() : undefined
);

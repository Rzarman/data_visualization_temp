const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile(path.join(__dirname, 'dist', 'signin.html'));
}

app.whenReady().then(() => {
  createWindow();

	ipcMain.on('open-pdf', (event, filename) => {
	  // PDF 在 extraResources 下
	  const pdfPath = path.join(process.resourcesPath, 'pdf', filename);
	  console.log('打开 PDF:', pdfPath);
	  shell.openPath(pdfPath).then(result => {
	    if (result) console.error('打开失败:', result);
	  });
	});
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

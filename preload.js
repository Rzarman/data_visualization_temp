const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openPDF: (filename) => {
    // 发送事件给主进程去打开 PDF
    ipcRenderer.send('open-pdf', filename);
  }
});

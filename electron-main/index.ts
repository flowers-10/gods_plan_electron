import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
//app 控制应用程序的事件生命周期。
//BrowserWindow 创建并控制浏览器窗口。

let win: BrowserWindow | null;
//定义全局变量获取 窗口实例

const createWindow = () => {
  win = new BrowserWindow({  
    frame:false,
    height:880,
    width:1280,
    transparent:true,
    icon: path.resolve('./public/favicon.png'),
    // movable:false,
    webPreferences: {
      devTools: true,
      contextIsolation: false,
      nodeIntegration: true,
      //允许html页面上的javascipt代码访问nodejs 环境api代码的能力（与node集成的意思）
    }
  })

  if(process.env.NODE_ENV != 'development') {
    win.loadFile(path.join(__dirname, "../index.html"));
  }else {
    win.loadURL(`http://localhost:${process.env['VITE_DEV_SERVER_PORT']}`)
  }

  // win.webContents.openDevTools()
  
  ipcMain.on('message',(_:any,num:number)=>{
    console.log(num,'来了');
    win?.webContents.send('load',{message:'初始化完成了'})
    // win?.close()
    // win?.maximize()
    // win?.minimize()
  })
  ipcMain.on('close',()=>{
    win?.close()
  })
  ipcMain.on('maximize',()=>{
    win?.maximize()
  })
  ipcMain.on('minimize',()=>{
    win?.minimize()
  })
  ipcMain.on('orignal-window', () => {
    win?.unmaximize();
});
  

}
// isPackage 不好使换下面的

//在Electron完成初始化时被触发
app.whenReady().then(createWindow)
import configureStore from "../../store";
import { remote } from "electron";

const { ipcRenderer } = require("electron");
const electron = require("electron");
const { dialog } = electron.remote;
const mainWindow = remote.getCurrentWindow();

setTimeout(() => {
  configureStore.subscribe(() => {
    var info = configureStore.getState().Notify;
    if (info.show) {
      const options1 = {
        type: info.type,
        buttons: ["Cancel", "Yes, please", "No, thanks"],
        defaultId: 2,
        title: info.title,
        message: info.message,
        detail: info.detail,
      };

      const options2 = {
        type: info.type,
        buttons: ["Cancel"],
        defaultId: 2,
        title: info.title,
        message: info.message,
        detail: info.detail,
      };

      dialog
        .showMessageBox(
          mainWindow,
          info.state === "msgBox" ? options2 : options1
        )
        .then((result) => {
          if (result.response === 1) {
          } else {
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
}, 300);

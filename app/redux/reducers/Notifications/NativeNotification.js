"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("../../store");
var electron_1 = require("electron");
var ipcRenderer = require("electron").ipcRenderer;
var electron = require("electron");
var dialog = electron.remote.dialog;
var mainWindow = electron_1.remote.getCurrentWindow();
setTimeout(function () {
    store_1.default.subscribe(function () {
        var info = store_1.default.getState().Notify;
        if (info.show) {
            var options1 = {
                type: info.type,
                buttons: ["Cancel", "Yes, please", "No, thanks"],
                defaultId: 2,
                title: info.title,
                message: info.message,
                detail: info.detail,
            };
            var options2 = {
                type: info.type,
                buttons: ["Cancel"],
                defaultId: 2,
                title: info.title,
                message: info.message,
                detail: info.detail,
            };
            dialog
                .showMessageBox(mainWindow, info.state === "msgBox" ? options2 : options1)
                .then(function (result) {
                if (result.response === 1) {
                }
                else {
                }
            })
                .catch(function (err) {
                console.log(err);
            });
        }
    });
}, 300);
//# sourceMappingURL=NativeNotification.js.map
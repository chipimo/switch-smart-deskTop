"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var updater_1 = require("../../dataBase/updater");
var store_1 = require("../../store");
var uuidv4 = require("uuid/v4");
function CreateId() {
    return uuidv4();
}
function int(dbhook, sendCallback) {
    dbhook
        .select()
        .from("users")
        .then(function (config) {
        if (config.length === 0)
            dbhook("users")
                .insert({
                id: CreateId(),
                userName: "Administrator",
                pin: "1234",
                department: "all",
                prevarges: "1",
                notifications: JSON.stringify({ id: CreateId(), list: [] }),
            })
                .then(function () {
                sendCallback({ done: true });
            });
        else
            sendCallback({ done: true });
    });
}
exports.UserLogIn = function (props, dbhook, sendCallback) {
    int(dbhook, function (callback) {
        if (callback.done) {
            dbhook
                .select()
                .where("pin", props.pin)
                .from("users")
                .then(function (config) {
                if (config.length !== 0)
                    sendCallback({ isLoggedIn: true, config: config });
                else
                    sendCallback({ isLoggedIn: false });
            });
        }
    });
};
exports.GetUsers = function (dbhook, sendCallback) {
    dbhook
        .select()
        .from("users")
        .then(function (config) {
        sendCallback(config);
    });
};
exports.NewUser = function (props, dbhook, sendCallback) {
    var data = {
        id: CreateId(),
        userName: props.userName,
        pin: props.pin,
        department: store_1.default.getState().Dep.dep,
        prevarges: props.prevarges,
        notifications: JSON.stringify({ id: CreateId(), list: [] }),
    };
    dbhook("users")
        .insert(data)
        .then(function () {
        sendCallback({ done: true });
    });
    updater_1.default._UpdateUsers(data, function (reciveCallback) { });
};
exports.EditUser = function (props, dbhook, sendCallback) {
    dbhook("users")
        .where({ id: props.id })
        .update({
        userName: props.userName,
        pin: props.pin,
        department: props.department,
        prevarges: props.prevarges,
    })
        .then(function () {
        sendCallback({ done: true });
    });
};
exports.DeleteUser = function (props, dbhook, sendCallback) {
    console.log(props);
    dbhook("users")
        .where({ id: props.id })
        .del()
        .then(function () {
        sendCallback({ done: true });
    });
};
//# sourceMappingURL=User.js.map
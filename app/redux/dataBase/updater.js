"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("../store");
var _1 = require(".");
var uuidv4 = require("uuid/v4");
var low = require("lowdb");
var FileAsync = require("lowdb/adapters/FileAsync");
function CreateId() {
    return uuidv4();
}
// let defaultPath = getDatafilePath;
// const ConfigPath = defaultPath + "/dataFiles/Products/config.json";
// const FolderPath = defaultPath + "/dataFiles/Products/
var ConfigAdapter = new FileAsync("backup.json");
var Updater = /** @class */ (function () {
    function Updater() {
    }
    Updater.prototype._is_Conn = function () {
        var conn = store_1.default.getState().SocketConn.isConn;
        return { conn: conn, socket: store_1.default.getState().SocketConn.socket };
    };
    Updater.prototype._setToUpdate = function (props, sendCallback) {
        // console.log(props);
        switch (props.type) {
            case "products":
                low(ConfigAdapter).then(function (tempdb) {
                    var isWriten = tempdb.get("UpDates").value();
                    var initalData = {
                        id: props.props.id,
                        type: "products",
                        props: props.props.props,
                    };
                    if (!isWriten) {
                        tempdb.defaults({ UpDates: [initalData] }).write();
                    }
                    else {
                        tempdb.get("UpDates").push(initalData).write();
                    }
                });
                break;
            default:
                break;
        }
    };
    Updater.prototype._runUpates = function (data, callback) {
        var _this = this;
        low(ConfigAdapter).then(function (tempdb) {
            var isWriten = tempdb.get("UpDates").value();
            var product = tempdb.get("UpDates").find({ id: data.productKey }).value();
            // console.log(product.props);
            if (_this._is_Conn().conn)
                _this._UpdateProducts(product, function (reciveCallback) {
                    tempdb
                        .get("UpDates")
                        .remove({ id: data.productKey })
                        .write()
                        .then(function () {
                        callback({
                            isDeleted: true,
                        });
                    });
                });
        });
    };
    Updater.prototype.isOnline = function () {
        // if (this._is_Conn().conn) this._runUpates();
    };
    Updater.prototype._UpdateWorkPeriod = function (props, sendCallback) {
        if (this._is_Conn().conn) {
            this._is_Conn().socket.emit("HANDEL_WORKPERIODS", props);
        }
        else {
        }
    };
    Updater.prototype._UpdateProducts = function (props, sendCallback) {
        if (this._is_Conn().conn) {
            // console.log(props.props);
            this._is_Conn().socket.emit("UPDATENEWPROUDCT", {
                from: store_1.default.getState().Dep.dep,
                data: props.props,
            });
            this._is_Conn().socket.on("UPDATEPRODUSTS", function (callback) {
                setTimeout(function () {
                    sendCallback(callback);
                    // console.log(callback);
                    store_1.default.dispatch({
                        type: "SYNC",
                        item: callback.data.name,
                    });
                    _1.default.HandelProducts({ _type: "sync", name: callback.data.name }, function (serverCallback) {
                        store_1.default.dispatch({
                            type: "STOPSYNC",
                        });
                        sendCallback(serverCallback);
                    });
                }, 500);
                setTimeout(function () {
                    store_1.default.dispatch({
                        type: "STOPSYNC",
                    });
                }, 2000);
                if (callback.from !== store_1.default.getState().Dep.dep)
                    _1.default.HandelProducts(callback.data, function (serverCallback) {
                        sendCallback(serverCallback);
                    });
            });
        }
        else {
            this._setToUpdate({ type: "products", props: props }, function (callback) { });
        }
    };
    Updater.prototype._UpdateInventory = function (props, sendCallback) {
        if (this._is_Conn().conn) {
            this._is_Conn().socket.emit("UPDATEINVENTORTY", {
                dep: store_1.default.getState().Dep.dep,
                data: props,
            });
        }
    };
    Updater.prototype._UpdateUsers = function (props, sendCallback) {
        if (this._is_Conn().conn) {
            this._is_Conn().socket.emit("UPDATEUSERS", props);
        }
    };
    Updater.prototype._UpdateSalesRports = function (props, sendCallback) {
        if (store_1.default.getState().SocketConn.isConn) {
            this._is_Conn().socket.emit("SALESREPORT", props);
            this._is_Conn().socket.on("SALESREPORTLIST", function (callbackProps) {
                sendCallback(callbackProps);
            });
        }
    };
    return Updater;
}());
var Backup = new Updater();
exports.default = Backup;
//# sourceMappingURL=updater.js.map
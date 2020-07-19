"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    Updater.prototype._runUpates = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loaded;
            var _this = this;
            return __generator(this, function (_a) {
                loaded = false;
                _1.default.HandleServerBackUp(false, function (reciveCallback) {
                    _this._is_Conn().socket.emit("HANDEL_REPORTS_BACKUP", {
                        type: "tikets",
                        data: reciveCallback.data,
                    });
                    _this._is_Conn().socket.on("HANDEL_REPORTS_BACKUP_ISDONE", function (callback) {
                        // configureStore.dispatch({
                        //   type: "UPDATINGSERVERDONE",
                        //   product:callback.Datetrack
                        // });
                        if (callback.type === "tikets")
                            _1.default.HandelReports({ _type: "ServerBackup", tabelId: "tikets", id: callback.id }, function (callbackRecived) { });
                        if (!loaded) {
                            loaded = true;
                            _1.default.HandleServerBackUp(true, function (reciveCallback) {
                                // console.log(reciveCallback);
                                _this._is_Conn().socket.emit("HANDEL_REPORTS_BACKUP", {
                                    type: "totals",
                                    data: reciveCallback.data,
                                });
                            });
                        }
                        // else {
                        //   configureStore.dispatch({
                        //     type: "UPDATINGSERVER",
                        //     product:callback.Datetrack    ,
                        //   });
                        // }
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    Updater.prototype.isOnline = function () {
        if (this._is_Conn().conn)
            this._runUpates();
    };
    Updater.prototype._UpdateWorkPeriod = function (props, sendCallback) {
        if (this._is_Conn().conn) {
            this._is_Conn().socket.emit("HANDEL_WORKPERIODS", props);
        }
        else {
        }
    };
    Updater.prototype._SyncProduct = function (props, sendCallback) {
        // console.log(props.ItemName);
        if (props.isMulity) {
            _1.default.GetTabelData({ table: "mulitProducts",
                id: "productName",
                value: props.ItemName, }, function (reciveCallback) {
                console.log(reciveCallback);
            });
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
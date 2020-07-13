"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("../../store");
var dataBase_1 = require("../../dataBase");
var moment = require("moment");
exports.CheckDepartments = function (props, callback) {
    if (store_1.default.getState().SocketConn.isConn) {
        store_1.default.getState().SocketConn.socket.emit("GETDEPARTMENTS");
        store_1.default.getState().SocketConn.socket.on("DEP_RESULT", function (result) {
            if (result.exist) {
                callback({ exist: true, deps: result.departments });
            }
            else {
                callback({ exist: false });
            }
        });
    }
};
exports.SetDepartments = function (props, sendCallback) {
    dataBase_1.default.HandleGetUser(function (callback) {
        var data = {
            department: props.department,
            id: "auto",
            phone: props.phone ? props.phone : "+260 975 30 30 30",
            shopNo: props.shopNo ? props.shopNo : "Shop No C3",
            road: props.road ? props.road : "Great East Road",
            state: "Lusaka",
            country: "Zambia",
            tpin: props.tpin ? props.tpin : "1003938315",
            taxType: props.taxType ? props.taxType : "VAT",
            taxRat: props.taxRat ? parseInt(props.taxRat) : 16,
            date: {
                date: moment().format("ddd MMM Do, YYYY"),
                time: moment().format("LTS"),
            },
            user: { Users: callback },
        };
        if (store_1.default.getState().SocketConn.isConn) {
            store_1.default.getState().SocketConn.socket.emit("SETDEPARTMENTS", data);
            store_1.default.getState().SocketConn.socket.on("DEP_SET", function (result) {
                if (!result.alreadyExist) {
                    sendCallback({ set: true, result: result });
                }
                else {
                    sendCallback({ set: false });
                }
            });
        }
    });
    // const dep = db.get("department").value();
    // callback(dep);
};
exports.EditDepartment = function (props, sendCallback) {
    if (store_1.default.getState().SocketConn.isConn) {
        store_1.default
            .getState()
            .SocketConn.socket.emit("EDITDEPARTMENTCOFIG", props.data.newData);
        store_1.default.getState().SocketConn.socket.on("DEP_SET", function (result) {
            if (!result.alreadyExist) {
                sendCallback({ set: true, result: result });
            }
            else {
                sendCallback({ set: false });
            }
        });
    }
    dataBase_1.default.HandleDepartments(props, function (sendCallback) {
    });
};
exports.GetDepartment = function (props, callback) {
    if (store_1.default.getState().SocketConn.isConn)
        store_1.default
            .getState()
            .SocketConn.socket.emit("GETDEPARTMENTCOFIG", props.DepSelected.data);
};
exports.GetDepartmentsList = function (props, callback) {
    if (store_1.default.getState().SocketConn.isConn) {
        store_1.default.getState().SocketConn.socket.emit("GETDEPARTMENTS", props);
        store_1.default
            .getState()
            .SocketConn.socket.on("DEP_RESULT", function (callback_props) {
            callback(callback_props);
        });
    }
};
//# sourceMappingURL=index.js.map
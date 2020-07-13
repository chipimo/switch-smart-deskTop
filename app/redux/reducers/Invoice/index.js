"use strict";
// var invNum = require("invoice-number");
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4 = require("uuid/v4");
function CreateId() {
    return uuidv4();
}
exports.InvoiceNumber = function (props, dbhook, callback) {
    switch (props.type) {
        case "get":
            dbhook
                .select()
                .from("invNum")
                .then(function (data) {
                callback({
                    data: data,
                });
            });
            break;
        case "set":
            dbhook
                .select()
                .from("invNum")
                .then(function (data) {
                if (data.length === 0) {
                    dbhook("invNum")
                        .insert({
                        id: CreateId(),
                        invNumber: 1,
                    })
                        .then(function (data) {
                        callback({
                            data: data,
                        });
                    });
                }
                else {
                    dbhook("invNum")
                        .where({ id: props.id })
                        .update({
                        invNumber: props.inv + 1,
                    })
                        .then(function (data) {
                        callback({
                            data: data,
                        });
                    });
                }
            });
            break;
        default:
            break;
    }
};
exports.quotationNumber = function (props, dbhook, callback) {
    switch (props.type) {
        case "get":
            dbhook
                .select()
                .from("qutNum")
                .then(function (data) {
                callback({
                    data: data,
                });
            });
            break;
        case "set":
            console.log("yteeeeeeee");
            dbhook
                .select()
                .from("qutNum")
                .then(function (data) {
                if (data.length === 0) {
                    dbhook("qutNum")
                        .insert({
                        id: CreateId(),
                        qutNumber: 1,
                    })
                        .then(function (data) {
                        callback({
                            data: data,
                        });
                    });
                }
                else {
                    dbhook("qutNum")
                        .where({ id: props.id })
                        .update({
                        qutNumber: props.inv + 1,
                    })
                        .then(function (data) {
                        callback({
                            data: data,
                        });
                    });
                }
            });
            break;
        default:
            break;
    }
};
//# sourceMappingURL=index.js.map
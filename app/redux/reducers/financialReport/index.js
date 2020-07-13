"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4 = require("uuid/v4");
function CreateId() {
    return uuidv4();
}
exports.financialNumber = function (props, dbhook, callback) {
    switch (props.type) {
        case "get":
            dbhook
                .select()
                .from("financial_Report_number")
                .then(function (data) {
                callback({
                    data: data,
                });
            });
            break;
        case "set":
            dbhook
                .select()
                .from("financial_Report_number")
                .then(function (data) {
                if (data.length === 0) {
                    dbhook("financial_Report_number")
                        .insert({
                        id: CreateId(),
                        financialNumber: 1,
                    })
                        .then(function (data) {
                        callback({
                            data: data,
                        });
                    });
                }
                else {
                    dbhook("financial_Report_number")
                        .where({ id: props.id })
                        .update({
                        financialNumber: props.financialNumber + 1,
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
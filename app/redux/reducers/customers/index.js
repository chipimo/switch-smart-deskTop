"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4 = require("uuid/v4");
function CreateId() {
    return uuidv4();
}
exports.CustomersConfig = function (props, dbhook, sendCallback) {
    setTimeout(function () {
        switch (props._type) {
            case "set":
                dbhook("customers")
                    .insert({
                    id: CreateId(),
                    name: props.newData.name,
                    phone: props.newData.phone,
                })
                    .then(function () {
                    dbhook
                        .select()
                        .from("customers")
                        .then(function (product) {
                        sendCallback({
                            isSet: true,
                        });
                    });
                });
                break;
            case "edit":
                dbhook("customers")
                    .where("id", props.newData.id)
                    .update({
                    name: props.newData.name,
                    phone: props.newData.phone,
                })
                    .then(function () {
                    dbhook
                        .select()
                        .from("customers")
                        .then(function (product) {
                        sendCallback({ isSet: true, type: "update" });
                    });
                });
                break;
            case "get":
                dbhook
                    .select()
                    .from("customers")
                    .then(function (product) {
                    sendCallback({ isSet: true, customers: product });
                });
                break;
            case "delete":
                dbhook("customers")
                    .where("id", props.oldData.id)
                    .del()
                    .then(function () {
                    dbhook
                        .select()
                        .from("customers")
                        .then(function (removed) {
                        sendCallback({ Error: false, customers: removed });
                    });
                })
                    .catch(function (err) {
                    sendCallback({ Error: true });
                });
                break;
            default:
                break;
        }
    }, 300);
};
//# sourceMappingURL=index.js.map
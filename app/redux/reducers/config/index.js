"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigFile = function (props, dbhook, callback) {
    if (props.type === "checkConfig") {
        dbhook
            .select()
            .from("department_config")
            .then(function (config) {
            callback({
                config: config,
            });
        });
    }
    else if (props.type === "set") {
        var data = null;
        if (props.dataType === "selecte")
            data = props.props.DepSelected.data;
        else
            data = props.data.result.departments[0];
        dbhook("department_config")
            .insert({
            id: data.id,
            dep_name: data.dep_name,
            theme: data.theme,
            phone: data.phone,
            shopNo: data.shopNo,
            road: data.road,
            state: data.state,
            country: data.country,
            tpin: data.tpin,
            taxType: data.taxType,
            taxRat: data.taxRat,
            association: "",
            notifications: JSON.stringify({
                notificationId: data.notifications.notificationId,
                list: data.notifications.list,
            }),
        })
            .then(function () {
            dbhook
                .select()
                .from("department_config")
                .then(function (department) {
                callback({
                    isSet: true,
                    department: department,
                });
            });
        });
    }
};
exports.UpdateTax = function (props, dbhook, SendCallback) {
    dbhook("department_config")
        .update({
        taxType: props.ProductName,
        taxRat: props.tax,
        tpin: props.tpin,
    })
        .then(function () {
        dbhook
            .select()
            .from("department_config")
            .then(function (config) {
            SendCallback({ isSet: true, config: config });
        });
    });
};
exports.UpdateDepartment = function (props, dbhook, SendCallback) {
    console.log(props);
    // dbhook("department_config")
    //   .update({
    //     dep_name: props.dep_name,
    //     theme: props.theme,
    //     phone: props.phone,
    //     shopNo: props.shopNo,
    //     road: props.road,
    //     state: props.state,
    //     country: props.country,
    //     tpin: props.tpin,
    //     taxType: props.taxType,
    //     taxRat: props.taxRat,
    //   })
    //   .then(function () {
    //     dbhook
    //       .select()
    //       .from("department_config")
    //       .then(function (config) {
    //         SendCallback({ isSet: true, config });
    //       });
    //   });
};
exports.UpdateTheme = function (props, dbhook, SendCallback) {
    switch (props._type) {
        case "setTheme":
            dbhook("department_config")
                .update({
                theme: props.theme,
            })
                .then(function () { });
            break;
        case "getTheme":
            dbhook
                .select()
                .from("department_config")
                .then(function (config) {
                SendCallback({ isSet: true, config: config });
            });
            break;
        default:
            break;
    }
};
//# sourceMappingURL=index.js.map
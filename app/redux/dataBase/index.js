"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../reducers/config");
var store_1 = require("../store");
var departments_1 = require("../reducers/departments");
var User_1 = require("../reducers/Users/User");
var workPeriod_1 = require("../reducers/WorkPeriod/workPeriod");
var updater_1 = require("./updater");
var group_1 = require("../reducers/groups/group");
var Products_1 = require("../reducers/Products/Products");
var Inventoery_1 = require("../reducers/inventory/Inventoery");
var Reports_1 = require("../reducers/reports/Reports");
var customers_1 = require("../reducers/customers");
var Invoice_1 = require("../reducers/Invoice");
var InventoryTransfer_1 = require("../reducers/inventory/InventoryTransfer");
var financialReport_1 = require("../reducers/financialReport");
var knex = require("../../../knex");
var Called = false;
knex.schema.hasTable("products").then(function (exists) {
    if (!exists) {
        return (knex.schema
            .createTable("Tabs", function (table) {
            table.increments("key");
            table.string("id").notNullable();
            table.string("tabname").notNullable();
            table.string("background").notNullable();
            table.string("color").notNullable();
            table.string("buttonType").notNullable();
            table.boolean("isInstore").notNullable();
            table.boolean("isTaxEnabled").notNullable();
            table.timestamp("date").defaultTo(knex.fn.now());
            table.timestamp("modified").defaultTo(knex.fn.now());
        })
            .createTable("TabList", function (table) {
            table.increments("key");
            table.string("id").notNullable();
            table.string("name").notNullable();
            table.string("groupId").notNullable();
            table.timestamp("date").defaultTo(knex.fn.now());
            table.timestamp("modified").defaultTo(knex.fn.now());
        })
            .createTable("invNum", function (table) {
            table.string("id").notNullable();
            table.integer("invNumber").notNullable();
        })
            .createTable("qutNum", function (table) {
            table.string("id").notNullable();
            table.integer("qutNumber").notNullable();
        })
            .createTable("products", function (table) {
            table.increments("key");
            table.string("productKey").notNullable();
            table.string("group").notNullable();
            table.string("category").notNullable();
            table.string("ItemName").notNullable();
            table.string("barcode1").notNullable();
            table.string("barcode2").notNullable();
            table.string("barcode3").notNullable();
            table.string("barcode4").notNullable();
            table.string("barcode5").notNullable();
            table.integer("sallingprice").notNullable();
            table.integer("initalPrice").notNullable();
            table.integer("qnt").notNullable();
            table.integer("multiplier").notNullable();
            table.integer("alertOut").notNullable();
            table.integer("amountInstore").notNullable();
            table.boolean("sync").notNullable();
            table.boolean("isInstore").notNullable();
            table.boolean("isTaxEnabled").notNullable();
            table.boolean("isMulity").notNullable();
            table.timestamp("date").defaultTo(knex.fn.now());
            table.timestamp("modified").defaultTo(knex.fn.now());
        })
            .createTable("mulitProducts", function (table) {
            table.increments("key");
            table.string("id").notNullable();
            table.string("productName").notNullable();
            table.integer("sallingprice").notNullable();
            table.integer("initalPrice").notNullable();
            table.integer("qnt").notNullable();
            table.string("barcode1").notNullable();
            table.string("barcode2").notNullable();
            table.string("barcode3").notNullable();
            table.string("barcode4").notNullable();
            table.string("barcode5").notNullable();
            table.integer("alertOut").notNullable();
            table.integer("amountInstore").notNullable();
            table.boolean("isInstore").notNullable();
            table.boolean("isTaxEnabled").notNullable();
            table.timestamp("date").defaultTo(knex.fn.now());
            table.timestamp("modified").defaultTo(knex.fn.now());
        })
            // ===== End of products ======
            .createTable("inventory", function (table) {
            table.increments("key");
            table.string("name").notNullable();
            table.string("group").notNullable();
            table.string("backgroundColor").notNullable();
            table.string("textColor").notNullable();
            table.string("cartname").notNullable();
            table.string("barcode").notNullable();
            table.string("sallingprice").notNullable();
            table.string("initalPrice").notNullable();
            table.string("qnt").notNullable();
            table.string("alertOut").notNullable();
            table.string("amountInstore").notNullable();
            table.string("department").notNullable();
            table.boolean("isInstore").notNullable();
            table.boolean("isTaxEnabled").notNullable();
            table.boolean("isMulity").notNullable();
            table.timestamp("date").defaultTo(knex.fn.now());
            table.timestamp("modified").defaultTo(knex.fn.now());
        })
            .createTable("inventory_transfer", function (table) {
            table.increments("key");
            table.string("name").notNullable();
            table.string("quantity").notNullable();
            table.string("date").notNullable();
            table.string("time").notNullable();
            table.string("state").notNullable();
            table.string("from").notNullable();
            table.string("to").notNullable();
            table.timestamp("timestamp").defaultTo(knex.fn.now());
            table.timestamp("modified").defaultTo(knex.fn.now());
        })
            .createTable("sales_reports_tikets", function (table) {
            table.increments("key");
            table.string("id").notNullable();
            table.string("Year").notNullable();
            table.string("Day").notNullable();
            table.string("Month").notNullable();
            table.string("InvoiceNumber").notNullable();
            table.jsonb("TicketList").notNullable();
            table.jsonb("Customer").notNullable();
            table.integer("GrandTotal").notNullable();
            table.integer("AmountPaid").notNullable();
            table.integer("ChangeDue").notNullable();
            table.integer("Balance").notNullable();
            table.integer("RtxGrandTotal").notNullable();
            table.integer("RtxAmountPaid").notNullable();
            table.integer("RtxChangeDue").notNullable();
            table.integer("RtxBalance").notNullable();
            table.integer("Discount").notNullable();
            table.string("Date").notNullable();
            table.string("Datetrack").notNullable();
            table.string("Department").notNullable();
            table.string("User").notNullable();
            table.string("PaymentType").notNullable();
            table.boolean("isTaxInvoice").notNullable();
            table.text("Note").notNullable();
            table.decimal("totalTaxFinal").notNullable();
            table.decimal("totalTax").notNullable();
            table.string("time").notNullable();
            table.boolean("isBackedUp").notNullable();
            table.timestamp("timestamp").defaultTo(knex.fn.now());
            table.timestamp("modified").defaultTo(knex.fn.now());
        })
            .createTable("sales_reports_totals", function (table) {
            table.increments("key");
            table.string("id").notNullable();
            table.string("Year").notNullable();
            table.string("Day").notNullable();
            table.string("Month").notNullable();
            table.integer("SrNo").notNullable();
            table.integer("GrandTotal").notNullable();
            table.integer("AmountPaid").notNullable();
            table.integer("ChangeDue").notNullable();
            table.integer("Balance").notNullable();
            table.integer("Discount").notNullable();
            table.integer("RtxGrandTotal").notNullable();
            table.integer("RtxAmountPaid").notNullable();
            table.integer("RtxChangeDue").notNullable();
            table.integer("RtxBalance").notNullable();
            table.string("Date").notNullable();
            table.string("Datetrack").notNullable();
            table.string("Department").notNullable();
            table.string("totalTaxFinal").notNullable();
            table.string("totalTax").notNullable();
            table.string("time").notNullable();
            table.boolean("isBackedUp").notNullable();
            table.timestamp("timestamp").defaultTo(knex.fn.now());
            table.timestamp("modified").defaultTo(knex.fn.now());
        })
            .createTable("purchases_reports", function (table) {
            table.increments("key");
            table.string("id").notNullable();
            table.string("year").notNullable();
            table.string("month").notNullable();
            table.string("day").notNullable();
            table.jsonb("list").notNullable();
            table.timestamp("timestamp").defaultTo(knex.fn.now());
            table.timestamp("modified").defaultTo(knex.fn.now());
        })
            .createTable("work_period", function (table) {
            table.increments("key");
            table.string("id").notNullable();
            table.string("year").notNullable();
            table.string("month").notNullable();
            table.string("day").notNullable();
            table.string("week").notNullable();
            table.string("dateStarted").notNullable();
            table.string("dateStartedString").notNullable();
            table.string("dateEnded").notNullable();
            table.string("dateEndedString").notNullable();
            table.string("time").notNullable();
            table.string("timeEnded").notNullable();
            table.string("date").notNullable();
            table.string("note").notNullable();
            table.string("department").notNullable();
            table.string("workedFor").notNullable();
            table.integer("ticket_count").notNullable();
            table.integer("sales_total").notNullable();
            table.boolean("isOpen").notNullable();
            table.timestamp("timestamp").defaultTo(knex.fn.now());
            table.timestamp("modified").defaultTo(knex.fn.now());
        })
            .createTable("accounts", function (table) {
            table.increments("key");
            table.string("id").notNullable();
            table.string("Year").notNullable();
        })
            .createTable("customers", function (table) {
            table.increments("key");
            table.string("id").notNullable();
            table.string("name").notNullable();
            table.string("phone").notNullable();
        })
            .createTable("group", function (table) {
            table.increments("key");
            table.string("id").notNullable();
            table.string("group").notNullable();
            table.jsonb("recipes").notNullable();
            table.jsonb("colors").notNullable();
        })
            .createTable("invoice_number", function (table) {
            table.increments("key");
            table.string("id").notNullable();
            table.string("number").notNullable();
        })
            .createTable("users", function (table) {
            table.increments("key");
            table.string("id").notNullable();
            table.string("userName").notNullable();
            table.string("pin").notNullable();
            table.string("department").notNullable();
            table.string("prevarges").notNullable();
            table.jsonb("notifications").notNullable();
        })
            .createTable("department_config", function (table) {
            table.increments("key");
            table.string("id").notNullable();
            table.string("dep_name").notNullable();
            table.string("theme").notNullable();
            table.string("phone").notNullable();
            table.string("shopNo").notNullable();
            table.string("road").notNullable();
            table.string("state").notNullable();
            table.string("country").notNullable();
            table.string("tpin").notNullable();
            table.string("taxType").notNullable();
            table.integer("taxRat").notNullable();
            table.string("association").notNullable();
            table.json("notifications").notNullable();
        })
            .createTable("financial_Report_number", function (table) {
            table.increments("key");
            table.integer("number").notNullable();
        }));
    }
});
var AppDb = /** @class */ (function () {
    function AppDb() {
    }
    // handleUpdates
    AppDb.prototype.UpdateToServer = function (props, callback) {
        if (props._type === "set") {
            updater_1.default._UpdateProducts(props, function (recivecallback) { });
        }
        switch (props._data_type) {
            case "sales_reports":
                updater_1.default._UpdateSalesRports(props, function (reciveCallback) {
                    callback(reciveCallback);
                });
                break;
            case "products":
                updater_1.default._UpdateProducts(props, function (reciveCallback) {
                    callback(reciveCallback);
                });
                break;
            case "add_to_store":
                updater_1.default._UpdateProducts(props, function (reciveCallback) {
                    callback(reciveCallback);
                });
                break;
            default:
                break;
        }
    };
    // Handel department
    AppDb.prototype.CheckConfig = function () {
        config_1.ConfigFile({ type: "checkConfig", id: "mainApp" }, knex, function (callback) {
            if (callback.config.length !== 0) {
                var data = callback.config;
                setTimeout(function () {
                    if (store_1.default.getState().SocketConn.isConn)
                        store_1.default
                            .getState()
                            .SocketConn.socket.emit("DEP_CONNECTED", data);
                    store_1.default.dispatch({
                        type: "SETDEP",
                        dep: data,
                    });
                    store_1.default.dispatch({
                        type: "SETCONFIG",
                        isSet: true,
                        config: callback,
                    });
                }, 3500);
            }
            else {
                store_1.default.dispatch({
                    type: "SETCONFIG",
                    isSet: false,
                    config: {},
                });
            }
        });
    };
    AppDb.prototype.HandleDepartments = function (props, sendCallback) {
        if (props.type === "check") {
            departments_1.CheckDepartments("", function (callback) {
                sendCallback(callback);
            });
        }
        else if (props.type === "set") {
            departments_1.SetDepartments(props.data, function (reciveCallback) {
                sendCallback(reciveCallback);
                config_1.ConfigFile({ type: "set", dataType: "new", data: reciveCallback }, knex, function (callback) {
                    sendCallback(callback);
                });
            });
        }
        else if (props.type === "create") {
            departments_1.SetDepartments(props.data, function (reciveCallback) {
                sendCallback(reciveCallback);
            });
        }
        else if (props.type === "get") {
            departments_1.GetDepartment(props.data, function (reciveCallback) {
                sendCallback(reciveCallback);
            });
        }
        else if (props.type === "getAll") {
            departments_1.GetDepartmentsList(props.data, function (reciveCallback) {
                sendCallback(reciveCallback);
            });
        }
        else if (props.type === "setSelected") {
            config_1.ConfigFile({ type: "set", dataType: "selecte", props: props }, knex, function (callback) {
                sendCallback(callback);
            });
        }
        else if (props.type === "edit") {
            departments_1.EditDepartment(props, function (reciveCallback) {
                sendCallback(reciveCallback);
            });
        }
        else if (props._type === "EditLocal") {
            config_1.UpdateDepartment(props, knex, function (callback) { });
        }
    };
    // Handel Users
    AppDb.prototype.HandleLogIn = function (props, callback) {
        User_1.UserLogIn(props, knex, function (reciveCallback) {
            if (reciveCallback) {
                if (reciveCallback.isLoggedIn) {
                    var userData = {
                        dep: store_1.default.getState().Dep,
                        config: reciveCallback.config,
                    };
                    if (store_1.default.getState().SocketConn.isConn) {
                        store_1.default
                            .getState()
                            .SocketConn.socket.emit("USER_CONNECTED", userData);
                        appDb.HandleDep(function (callback) {
                            var data = {
                                id: callback.config[0].id,
                                dep_name: callback.config[0].dep_name,
                            };
                            store_1.default
                                .getState()
                                .SocketConn.socket.emit("UserConnected", data);
                        });
                    }
                }
                callback(reciveCallback);
            }
        });
    };
    // Handel Users
    AppDb.prototype.HandleLogOut = function (props, callback) {
        User_1.UserLogIn(props, knex, function (reciveCallback) {
            if (reciveCallback) {
                if (reciveCallback.isLoggedIn)
                    if (store_1.default.getState().SocketConn.isConn)
                        store_1.default
                            .getState()
                            .SocketConn.socket.emit("USER_DISCONNECTED", reciveCallback.config);
                callback(reciveCallback);
            }
        });
    };
    AppDb.prototype.HandleNewUser = function (props, sendCallback) {
        User_1.NewUser(props, knex, function (reciveCallback) {
            sendCallback(reciveCallback);
        });
    };
    AppDb.prototype.HandleGetUser = function (sendCallback) {
        User_1.GetUsers(knex, function (reciveCallback) {
            sendCallback(reciveCallback);
        });
    };
    AppDb.prototype.HandleDeleteUser = function (props, sendCallback) {
        User_1.DeleteUser(props, knex, function (reciveCallback) {
            sendCallback(reciveCallback);
        });
    };
    AppDb.prototype.HandleEidtUser = function (props, sendCallback) {
        User_1.EditUser(props, knex, function (reciveCallback) {
            sendCallback(reciveCallback);
        });
    };
    // Handel WorkPeriods
    AppDb.prototype.HandleWorkperiods = function (props, callback) {
        if (props._type === "start") {
            workPeriod_1.StartWorkPeriod(props, knex, function (reciveCallback) {
                if (store_1.default.getState().SocketConn.isConn)
                    store_1.default
                        .getState()
                        .SocketConn.socket.emit("STARTWORKPEROID", props);
                // Backup._UpdateWorkPeriod(
                //   { _type: "start", data: reciveCallback },
                //   (reciveCallback) => {
                //   }
                // );
                callback(reciveCallback);
            });
        }
        else if (props._type === "end") {
            workPeriod_1.EndWorkPeriod(props, knex, function (reciveCallback) {
                if (store_1.default.getState().SocketConn.isConn)
                    store_1.default
                        .getState()
                        .SocketConn.socket.emit("ENDWORKPEROID", props);
                callback(reciveCallback);
            });
        }
        else if (props._type === "check") {
            workPeriod_1.CheckWorkPeriod(knex, function (reciveCallback) {
                callback(reciveCallback);
            });
        }
        else if (props._type === "loadList") {
            workPeriod_1.WorkPeriodList(knex, function (reciveCallback) {
                callback(reciveCallback);
            });
        }
    };
    /**
     * HandleDepConn
     */
    AppDb.prototype.HandleDep = function (sendCallback) {
        config_1.ConfigFile({ type: "checkConfig", id: "mainApp" }, knex, function (callback) {
            sendCallback(callback);
        });
    };
    // HandleProducts
    AppDb.prototype.HandelProducts = function (props, sendCallback) {
        if (props._type === "getServerProducts") {
            if (!Called) {
                Called = true;
                if (store_1.default.getState().SocketConn.isConn) {
                    store_1.default.getState().SocketConn.socket.emit("GETALLPRODUCTS");
                    store_1.default.getState().SocketConn.socket.emit("GETGROUPS", props);
                    store_1.default
                        .getState()
                        .SocketConn.socket.on("GROUPSLIST", function (List) {
                        List.data.map(function (items) {
                            var data = {
                                group: items.group,
                                recipes: [],
                                colors: items.colors,
                            };
                            group_1.SetGroups(data, knex, function (getCallback) { });
                        });
                    });
                    store_1.default
                        .getState()
                        .SocketConn.socket.on("ALLPRODUCTSLIST", function (List) {
                        Products_1.HandelNewProducts({ _type: "addServerProducts", AllProducts: List }, knex, function (receiveCallback) {
                            if (receiveCallback) {
                                sendCallback(receiveCallback);
                                if (receiveCallback.isSet) {
                                    store_1.default.dispatch({
                                        type: "LOADTABEL",
                                    });
                                }
                                setTimeout(function () {
                                    Called = false;
                                }, 10000);
                            }
                        });
                    });
                }
            }
        }
        else {
            Products_1.HandelNewProducts(props, knex, function (receiveCallback) {
                if (receiveCallback) {
                    if (receiveCallback.type === "add") {
                        var data = { id: receiveCallback.productKey, props: props };
                        updater_1.default._UpdateProducts(data, function (receiveBackUpCallback) { });
                    }
                    else if (receiveCallback.type === "add_to_store") {
                        updater_1.default._UpdateInventory(props, function (receiveBackUpCallback) { });
                    }
                    else if (receiveCallback.type === "Add_filter") {
                        updater_1.default._UpdateInventory(props, function (receiveBackUpCallback) { });
                    }
                    else if (receiveCallback.type === "remove_filter") {
                        updater_1.default._UpdateInventory(props, function (receiveBackUpCallback) { });
                    }
                    sendCallback(receiveCallback);
                    if (receiveCallback.isSet) {
                        store_1.default.dispatch({
                            type: "LOADTABEL",
                        });
                    }
                }
            });
        }
        // this.UpdateToServer(props, (callback) => {});
    };
    // HandleProducts
    AppDb.prototype.HandleTaxUpdate = function (props, sendCallback) {
        config_1.UpdateTax(props, knex, function (reciveCallback) {
            sendCallback(reciveCallback);
        });
    };
    // HandleInventory
    AppDb.prototype.HandleInventory = function (props, sendCallback) {
        Inventoery_1.Purchases(props, knex, function (reciveCallbak) {
            sendCallback(reciveCallbak);
        });
    };
    // HandleGroup
    AppDb.prototype.HandelGroup = function (props, sendCallback) {
        if (props._type === "set") {
            if (store_1.default.getState().SocketConn.isConn) {
                store_1.default.getState().SocketConn.socket.emit("SETGROUP", props);
            }
            group_1.SetGroups(props, knex, function (reciveCallback) {
                sendCallback(reciveCallback);
            });
        }
        else if (props._type === "get") {
            group_1.GetGroups(props, knex, function (reciveCallback) {
                sendCallback(reciveCallback);
            });
        }
        else if (props._type === "deleteGroup") {
            if (store_1.default.getState().SocketConn.isConn) {
                store_1.default.getState().SocketConn.socket.emit("DELETEGROUP", props);
            }
            group_1.DeleteGroups(props, knex, function (callback) {
                sendCallback(callback);
            });
        }
    };
    // HandleGroup
    AppDb.prototype.HandelReports = function (props, sendCallback) {
        Reports_1.HandleReports(props, knex, function (recivedCallback) {
            sendCallback(recivedCallback);
        });
        // this.UpdateToServer(props, (callback) => {
        //   // console.log(callback);
        // });
    };
    // HandleGroup
    AppDb.prototype.HandleCustomers = function (props, sendCallback) {
        customers_1.CustomersConfig(props, knex, function (recivedCallback) {
            sendCallback(recivedCallback);
        });
    };
    // HandleGroup
    AppDb.prototype.HandleInventoryTransfer = function (sendCallback) {
        InventoryTransfer_1.InventoryTransfer(knex, function (reciveCallback) {
            sendCallback(reciveCallback);
        });
    };
    AppDb.prototype.HandleTheme = function (props, sendCallback) {
        config_1.UpdateTheme(props, knex, function (reciveCallback) {
            sendCallback(reciveCallback);
        });
    };
    // Invoice Number
    AppDb.prototype.HandleinvNumber = function (props, sendCallback) {
        switch (props._type) {
            case "invo":
                Invoice_1.InvoiceNumber(props, knex, function (reciveCallback) {
                    sendCallback(reciveCallback);
                });
                break;
            case "quot":
                Invoice_1.quotationNumber(props, knex, function (reciveCallback) {
                    sendCallback(reciveCallback);
                });
                break;
            default:
                break;
        }
    };
    AppDb.prototype.HandlefinancialNumber = function (props, sendCallback) {
        financialReport_1.financialNumber(props, knex, function (reciveCallback) {
            sendCallback(reciveCallback);
        });
    };
    // Server BackUp
    AppDb.prototype.HandleServerBackUp = function (props, sendCallback) {
        if (props.tiketsIsDone) {
            Products_1.GetData({
                table: "sales_reports_totals",
                id: "isBackedUp",
                value: false,
            }, knex, function (reciveCallback) {
                sendCallback(reciveCallback);
            });
        }
        else {
            Products_1.GetData({
                table: "sales_reports_tikets",
                id: "isBackedUp",
                value: false,
            }, knex, function (reciveCallback) {
                sendCallback(reciveCallback);
            });
        }
    };
    AppDb.prototype.GetTabelData = function (props, sendCallback) {
        // console.log(props);
        Products_1.GetData({
            table: props.table,
            id: props.id,
            value: props.value,
        }, knex, function (reciveCallback) {
            sendCallback(reciveCallback);
        });
    };
    return AppDb;
}());
var appDb = new AppDb();
exports.default = appDb;
//# sourceMappingURL=index.js.map
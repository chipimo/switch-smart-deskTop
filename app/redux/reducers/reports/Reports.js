"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("../../store");
var path_1 = require("../../dataBase/store/path");
var fs = require("fs-extra");
var moment = require("moment");
var uuidv4 = require("uuid/v4");
var low = require("lowdb");
var FileAsync = require("lowdb/adapters/FileAsync");
var defaultPath = path_1.getDatafilePath;
var ConfigPath = defaultPath + "/dataFiles/Reports/config.json";
var FolderPath = defaultPath + "/dataFiles/Reports/";
var ConfigAdapter = new FileAsync("salesReport.json");
function CreateId() {
    return uuidv4();
}
var isSent = false;
exports.HandleReports = function (props, dbhook, sendCallback) {
    var _a;
    var check = moment(new Date());
    var day = check.format("dddd"); // => ('Monday' , 'Tuesday' ----)
    var month = check.format("MMMM"); // => ('January','February.....)
    var year = check.format("YYYY");
    var time = check.format("LT");
    var PurchasesFile = FolderPath + "purchases.json";
    // if (!fs.existsSync(PurchasesFile)) fs.ensureFileSync(PurchasesFile);
    var PurchasesAdapter = null;
    setTimeout(function () {
        PurchasesAdapter = new FileAsync("purchases.json");
    }, 100);
    // if (!fs.existsSync(SalesFile)) fs.ensureFileSync(SalesFile);
    var SalesAdapter = null;
    setTimeout(function () {
        SalesAdapter = new FileAsync("sales.json");
    }, 100);
    switch (props._type) {
        case "purchases":
            setTimeout(function () {
                var dataList = [];
                props.purchasedList.map(function (list) {
                    dataList.push({
                        name: list.name,
                        quantity: list.quantity,
                        time: time,
                        group: list.group,
                        recipes: list.recipes,
                    });
                });
                var initalData = {
                    year: year,
                    months: [{ month: month, days: [{ day: day, list: dataList }] }],
                };
                low(PurchasesAdapter).then(function (tempdb) {
                    var isWriten = tempdb.get("Products").value();
                    if (isWriten) {
                        var currentYear = tempdb
                            .get("Products")
                            .find({ year: year })
                            .value();
                        if (currentYear) {
                            var currentMonth = tempdb
                                .get("Products")
                                .find({ months: [{ month: month }] })
                                .value();
                            if (currentMonth) {
                                isWriten.map(function (yearList) {
                                    yearList.months.map(function (daysList) {
                                        if (daysList.month === month) {
                                            daysList.days.push({ day: day, list: dataList });
                                            tempdb
                                                .get("Products")
                                                .find({ year: year })
                                                .assign({ months: yearList.months })
                                                .value();
                                            tempdb.write().then(function () { });
                                        }
                                    });
                                });
                            }
                            else {
                                isWriten.map(function (yearList) {
                                    if (yearList.year === year) {
                                        yearList.months.push({
                                            month: month,
                                            days: [{ day: day, list: dataList }],
                                        });
                                        tempdb
                                            .get("Products")
                                            .find({ year: year })
                                            .assign({ months: yearList.months })
                                            .value();
                                        tempdb.write().then(function () { });
                                    }
                                });
                            }
                        }
                        else {
                            tempdb.get("Products").push(initalData).write();
                        }
                    }
                    else {
                        tempdb.defaults({ Products: [initalData] }).write();
                    }
                });
            }, 300);
            break;
        case "get_purchases":
            setTimeout(function () {
                low(PurchasesAdapter).then(function (tempdb) {
                    var data = tempdb.get("Products").value();
                    sendCallback(data);
                });
            }, 300);
            break;
        case "sales":
            if (store_1.default.getState().SocketConn.isConn) {
                if (!isSent) {
                    isSent = true;
                    store_1.default
                        .getState()
                        .SocketConn.socket.emit("SALESREPORT", props);
                    setTimeout(function () {
                        isSent = false;
                    }, 500);
                }
            }
            dbhook("sales_reports_tikets")
                .insert({
                id: props.data.id,
                Year: props.data.year,
                Day: props.data.day,
                Month: props.data.month,
                InvoiceNumber: props.data.invoiceNumber,
                TicketList: JSON.stringify({ list: props.data.ticketList }),
                Customer: JSON.stringify(props.data.Customer),
                GrandTotal: props.data.GrandTotal,
                AmountPaid: props.data.AmountPaid,
                ChangeDue: props.data.ChangeDue,
                Balance: props.data.Balance,
                RtxGrandTotal: props.isTaxInvoice
                    ? props.data.GrandTotal
                    : props.paymentType === "Credit Card"
                        ? props.data.GrandTotal
                        : props.data.RtxGrandTotal,
                RtxAmountPaid: props.isTaxInvoice
                    ? props.data.AmountPaid
                    : props.paymentType === "Credit Card"
                        ? props.data.AmountPaid
                        : props.data.RtxAmountPaid,
                RtxChangeDue: props.isTaxInvoice
                    ? props.data.ChangeDue
                    : props.paymentType === "Credit Card"
                        ? props.data.ChangeDue
                        : props.data.RtxChangeDue,
                RtxBalance: props.isTaxInvoice
                    ? props.data.Balance
                    : props.paymentType === "Credit Card"
                        ? props.data.Balance
                        : props.data.RtxBalance,
                Discount: props.data.Discount,
                Date: props.data.Date,
                Datetrack: props.data.Datetrack,
                Department: props.data.department,
                User: props.data.user,
                PaymentType: props.data.paymentType,
                isTaxInvoice: props.data.isTaxInvoice,
                Note: props.data.note,
                totalTaxFinal: props.data.totalTaxFinal,
                totalTax: props.data.totalTax,
                time: props.data.time,
                isBackedUp: store_1.default.getState().SocketConn.isConn
                    ? true
                    : false,
            })
                .then(function () {
                dbhook
                    .select()
                    .from("sales_reports_totals")
                    .where("Department", props.data.department)
                    .then(function (MainData) {
                    if (MainData.length === 0) {
                        dbhook("sales_reports_totals")
                            .insert({
                            id: props.data.id,
                            Year: props.data.year,
                            Day: props.data.day,
                            Month: props.data.month,
                            SrNo: 1,
                            GrandTotal: props.data.GrandTotal,
                            AmountPaid: props.data.AmountPaid,
                            ChangeDue: props.data.ChangeDue,
                            Balance: props.data.Balance,
                            RtxGrandTotal: props.isTaxInvoice
                                ? props.data.GrandTotal
                                : props.paymentType === "Credit Card"
                                    ? props.data.GrandTotal
                                    : props.data.RtxGrandTotal,
                            RtxAmountPaid: props.isTaxInvoice
                                ? props.data.AmountPaid
                                : props.paymentType === "Credit Card"
                                    ? props.data.AmountPaid
                                    : props.data.RtxAmountPaid,
                            RtxChangeDue: props.isTaxInvoice
                                ? props.data.ChangeDue
                                : props.paymentType === "Credit Card"
                                    ? props.data.ChangeDue
                                    : props.data.RtxChangeDue,
                            RtxBalance: props.isTaxInvoice
                                ? props.data.Balance
                                : props.paymentType === "Credit Card"
                                    ? props.data.Balance
                                    : props.data.RtxBalance,
                            Discount: props.data.Discount,
                            Date: props.data.Date,
                            Datetrack: props.data.Datetrack,
                            Department: props.data.department,
                            totalTaxFinal: props.data.totalTaxFinal,
                            totalTax: props.data.totalTax,
                            time: props.data.time,
                            isBackedUp: store_1.default.getState().SocketConn.isConn
                                ? true
                                : false,
                        })
                            .then(function () { });
                    }
                    else {
                        dbhook
                            .select()
                            .from("sales_reports_totals")
                            .where("Date", props.data.Date)
                            .then(function (data) {
                            if (data.length !== 0) {
                                // console.log(data);
                                // console.log(props.data);
                                dbhook("sales_reports_totals")
                                    .where("Date", props.data.Date)
                                    .update({
                                    GrandTotal: props.data.GrandTotal + data[0].GrandTotal,
                                    AmountPaid: props.data.AmountPaid + data[0].AmountPaid,
                                    ChangeDue: props.data.ChangeDue + data[0].ChangeDue,
                                    Balance: props.data.Balance + data[0].Balance,
                                    RtxGrandTotal: props.isTaxInvoice
                                        ? props.data.GrandTotal + data[0].GrandTotal
                                        : props.paymentType === "Credit Card"
                                            ? props.data.GrandTotal + data[0].GrandTotal
                                            : props.data.RtxGrandTotal + data[0].RtxGrandTotal,
                                    RtxAmountPaid: props.isTaxInvoice
                                        ? props.data.AmountPaid + data[0].AmountPaid
                                        : props.paymentType === "Credit Card"
                                            ? props.data.AmountPaid + data[0].AmountPaid
                                            : props.data.RtxAmountPaid + data[0].RtxAmountPaid,
                                    RtxChangeDue: props.isTaxInvoice
                                        ? props.data.ChangeDue + data[0].ChangeDue
                                        : props.paymentType === "Credit Card"
                                            ? props.data.ChangeDue + data[0].ChangeDue
                                            : props.data.RtxChangeDue + data[0].RtxChangeDue,
                                    RtxBalance: props.isTaxInvoice
                                        ? props.data.Balance + data[0].Balance
                                        : props.paymentType === "Credit Card"
                                            ? props.data.Balance + data[0].Balance
                                            : props.data.RtxBalance + data[0].RtxBalance,
                                    Discount: props.data.Discount + data[0].Discount,
                                    totalTaxFinal: props.data.totalTaxFinal +
                                        Number(data[0].totalTaxFinal),
                                    totalTax: props.data.totalTax + Number(data[0].totalTax),
                                })
                                    .then(function () { });
                            }
                            else {
                                dbhook("sales_reports_totals")
                                    .insert({
                                    id: props.data.id,
                                    Year: props.data.year,
                                    Day: props.data.day,
                                    Month: props.data.month,
                                    SrNo: MainData.length + 1,
                                    GrandTotal: props.data.GrandTotal,
                                    AmountPaid: props.data.AmountPaid,
                                    ChangeDue: props.data.ChangeDue,
                                    Balance: props.data.Balance,
                                    RtxGrandTotal: props.isTaxInvoice
                                        ? props.data.GrandTotal
                                        : props.paymentType === "Credit Card"
                                            ? props.data.GrandTotal
                                            : props.data.RtxGrandTotal,
                                    RtxAmountPaid: props.isTaxInvoice
                                        ? props.data.AmountPaid
                                        : props.paymentType === "Credit Card"
                                            ? props.data.AmountPaid
                                            : props.data.RtxAmountPaid,
                                    RtxChangeDue: props.isTaxInvoice
                                        ? props.data.ChangeDue
                                        : props.paymentType === "Credit Card"
                                            ? props.data.ChangeDue
                                            : props.data.RtxChangeDue,
                                    RtxBalance: props.isTaxInvoice
                                        ? props.data.Balance
                                        : props.paymentType === "Credit Card"
                                            ? props.data.Balance
                                            : props.data.RtxBalance,
                                    Discount: props.data.Discount,
                                    Date: props.data.Date,
                                    Datetrack: props.data.Datetrack,
                                    Department: props.data.department,
                                    totalTaxFinal: props.data.totalTaxFinal,
                                    totalTax: props.data.totalTax,
                                    time: props.data.time,
                                    isBackedUp: store_1.default.getState().SocketConn
                                        .isConn
                                        ? true
                                        : false,
                                })
                                    .then(function () { });
                            }
                        });
                    }
                });
            });
            break;
        case "get_sales":
            if (store_1.default.getState().SocketConn.isConn) {
                store_1.default
                    .getState()
                    .SocketConn.socket.emit("GETSALESREPORT", props);
                store_1.default
                    .getState()
                    .SocketConn.socket.on("SALESREPORTSALET", function (recivedCallback) {
                    var data = recivedCallback;
                    sendCallback({
                        data: data,
                    });
                });
            }
            else {
                dbhook
                    .select()
                    .from("sales_reports_totals")
                    .where({ Department: props.data })
                    .andWhere((_a = {}, _a[props.dateType] = props.date, _a))
                    .then(function (data) {
                    sendCallback({
                        data: data,
                    });
                });
            }
            break;
        case "getAll":
            dbhook
                .select()
                .from("sales_reports_totals")
                .then(function (data) {
                sendCallback({
                    data: data,
                });
            });
            break;
        case "get_sales_tickets":
            if (store_1.default.getState().SocketConn.isConn)
                store_1.default
                    .getState()
                    .SocketConn.socket.emit("GETSALESTICKETS", props.date);
            dbhook
                .select()
                .from("sales_reports_tikets")
                .where({ Datetrack: props.date })
                .then(function (data) {
                sendCallback({
                    data: data,
                });
            });
            break;
        case "ServerBackup":
            if (props.tabelId === "tikets")
                dbhook("sales_reports_tikets")
                    .where({ id: props.id })
                    .update({
                    isBackedUp: true,
                })
                    .then(function (data) { });
        default:
            break;
    }
};
//# sourceMappingURL=Reports.js.map
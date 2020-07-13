import configureStore from "../../store";

import { getDatafilePath } from "../../dataBase/store/path";
const fs = require("fs-extra");
const moment = require("moment");
const uuidv4 = require("uuid/v4");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");

let defaultPath = getDatafilePath;
const ConfigPath = defaultPath + "/dataFiles/Reports/config.json";
const FolderPath = defaultPath + "/dataFiles/Reports/";

const ConfigAdapter = new FileAsync("salesReport.json");
function CreateId() {
  return uuidv4();
}

var isSent = false;

export const HandleReports = (props, dbhook, sendCallback) => {
  var check = moment(new Date());
  var day = check.format("dddd"); // => ('Monday' , 'Tuesday' ----)
  var month = check.format("MMMM"); // => ('January','February.....)
  var year = check.format("YYYY");
  var time = check.format("LT");

  const PurchasesFile = FolderPath + "purchases.json";
  // if (!fs.existsSync(PurchasesFile)) fs.ensureFileSync(PurchasesFile);
  var PurchasesAdapter = null;
  setTimeout(() => {
    PurchasesAdapter = new FileAsync("purchases.json");
  }, 100);

  // if (!fs.existsSync(SalesFile)) fs.ensureFileSync(SalesFile);
  var SalesAdapter = null;
  setTimeout(() => {
    SalesAdapter = new FileAsync("sales.json");
  }, 100);

  switch (props._type) {
    case "purchases":
      setTimeout(() => {
        var dataList = [];

        props.purchasedList.map((list) => {
          dataList.push({
            name: list.name,
            quantity: list.quantity,
            time,
            group: list.group,
            recipes: list.recipes,
          });
        });

        const initalData = {
          year,
          months: [{ month, days: [{ day, list: dataList }] }],
        };

        low(PurchasesAdapter).then((tempdb) => {
          const isWriten = tempdb.get("Products").value();
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
                isWriten.map((yearList) => {
                  yearList.months.map((daysList) => {
                    if (daysList.month === month) {
                      daysList.days.push({ day, list: dataList });

                      tempdb
                        .get("Products")
                        .find({ year: year })
                        .assign({ months: yearList.months })
                        .value();
                      tempdb.write().then(() => { });
                    }
                  });
                });
              } else {
                isWriten.map((yearList) => {
                  if (yearList.year === year) {
                    yearList.months.push({
                      month,
                      days: [{ day, list: dataList }],
                    });

                    tempdb
                      .get("Products")
                      .find({ year: year })
                      .assign({ months: yearList.months })
                      .value();
                    tempdb.write().then(() => { });
                  }
                });
              }
            } else {
              tempdb.get("Products").push(initalData).write();
            }
          } else {
            tempdb.defaults({ Products: [initalData] }).write();
          }
        });
      }, 300);
      break;

    case "get_purchases":
      setTimeout(() => {
        low(PurchasesAdapter).then((tempdb) => {
          var data = tempdb.get("Products").value();
          sendCallback(data);
        });
      }, 300);
      break;

    case "sales":
      if (configureStore.getState().SocketConn.isConn) {
        if (!isSent) {
          isSent = true;
          configureStore
            .getState()
            .SocketConn.socket.emit("SALESREPORT", props);

          setTimeout(() => {
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
                  })
                  .then(function () { });
              } else {
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
                          GrandTotal:
                            props.data.GrandTotal + data[0].GrandTotal,
                          AmountPaid:
                            props.data.AmountPaid + data[0].AmountPaid,
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
                          totalTaxFinal:
                            props.data.totalTaxFinal +
                            Number(data[0].totalTaxFinal),
                          totalTax:
                            props.data.totalTax + Number(data[0].totalTax),
                        })
                        .then(function () { });
                    } else {
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
                        })
                        .then(function () { });
                    }
                  });
              }
            });
        });

      break;
    case "get_sales":
      if (configureStore.getState().SocketConn.isConn) {
        configureStore
          .getState()
          .SocketConn.socket.emit("GETSALESREPORT", props);
        configureStore
          .getState()
          .SocketConn.socket.on("SALESREPORTSALET", (recivedCallback) => {
            var data = recivedCallback;
            sendCallback({
              data,
            });
          });
      } else {
        dbhook
          .select()
          .from("sales_reports_totals")
          .where({ Department: props.data })
          .andWhere({ [props.dateType]: props.date })
          .then(function (data) {
            sendCallback({
              data,
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
            data,
          });
        });
      break;
    case "get_sales_tickets":

      if (configureStore.getState().SocketConn.isConn)
        configureStore
          .getState()
          .SocketConn.socket.emit("GETSALESTICKETS", props.date);

      dbhook
        .select()
        .from("sales_reports_tikets")
        .where({ Datetrack: props.date })
        .then(function (data) {
          sendCallback({
            data,
          });
        });
      break;
    default:
      break;
  }
};

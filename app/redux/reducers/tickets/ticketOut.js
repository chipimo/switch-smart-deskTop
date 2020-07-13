"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var dataBase_1 = require("../../dataBase");
var uuidv4 = require("uuid/v4");
var ipcRenderer = require("electron").ipcRenderer;
var num = 0;
function CreatId() {
    return uuidv4();
}
var Tickets = [];
var TicketOut = function (state, action) {
    if (state === void 0) { state = {
        Tickets: [],
    }; }
    switch (action.type) {
        case "SAVETICKET":
            var data = {
                id: CreatId(),
                invoiceNumber: action.invoiceNumber,
                ticketList: action.payload.ticketList,
                TotalCost: action.payload.GrandTotal,
                TotalPaid: action.payload.AmountPaid,
                ChangeDue: action.payload.ChangeDue,
                Balance: action.payload.Balance,
                Customer: action.payload.Customer,
                Date: action.payload.Date,
            };
            if (Tickets.length === 0) {
                Tickets = action.defaultList;
                Tickets.push(data);
            }
            else {
                Tickets.push(data);
            }
            // console.log(Tickets);
            // generateInvoiceNumber(action.defaultList);
            if (action.payload.ticketHeader !== "Quotation No")
                dataBase_1.default.HandelProducts({ _type: "reduce_store", data: action.payload.ticketList }, function (reciveCallback) { });
            ipcRenderer.send("do_print_receipt", {
                GrandTotal: action.payload.GrandTotal,
                AmountPaid: action.payload.AmountPaid,
                ChangeDue: action.payload.ChangeDue,
                Discount: action.payload.Discount,
                Balance: action.payload.Balance,
                user: action.payload.user,
                date: action.payload.Date,
                time: action.payload.time,
                ticketstate: action.payload.ticketstate,
                state: action.payload.state,
                paymentType: action.payload.paymentType,
                isTaxInvoice: action.payload.isTaxInvoice,
                taxRate: action.payload.taxRate,
                totalTax: action.payload.totalTax,
                ticketHeader: action.payload.ticketHeader,
                items: action.payload.toPrint,
                invoiceNumber: action.payload.invoiceNumber,
                department: action.payload.department,
                road: action.payload.state.road,
                shop: action.payload.state.shopNo,
            });
            state = __assign({}, state, { Tickets: Tickets });
            break;
        case "RESTALL":
            state = __assign({}, state, { Tickets: [] });
            break;
        default:
            return state;
    }
    return state;
};
exports.default = TicketOut;
//# sourceMappingURL=ticketOut.js.map
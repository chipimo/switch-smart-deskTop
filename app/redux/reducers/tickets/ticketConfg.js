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
var TicketConfig = function (state, action) {
    if (state === void 0) { state = {
        config: false,
        taxInvoice: false,
        quotation: false,
        discount: {
            apply: false,
            price: 0.0,
            note: ""
        }
    }; }
    switch (action.type) {
        case "SETTICKETCONFIG":
            // console.log(action.socket);
            state = __assign({}, state, { config: true, taxInvoice: action.payload.taxInvoice, quotation: action.payload.quotation, discount: {
                    apply: action.payload.apply,
                    price: action.payload.price,
                    note: action.payload.note
                } });
            break;
        case "RESETTICKETCONFIG":
            state = __assign({}, state, { config: false, taxInvoice: false, quotation: false, discount: {
                    apply: false,
                    price: 0.0,
                    note: ""
                } });
            break;
        default:
            return state;
    }
    return state;
};
exports.default = TicketConfig;
//# sourceMappingURL=ticketConfg.js.map
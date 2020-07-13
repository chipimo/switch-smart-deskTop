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
var Tax = function (state, action) {
    if (state === void 0) { state = {
        tax_rate: "16",
        total_tax: 0
    }; }
    switch (action.type) {
        case "SETTAXRATE":
            // console.log(action.socket);
            state = __assign({}, state, { tax_rate: action.setTaxRate, total_tax: 0 });
            break;
        case "RESETTAXRATE":
            state = __assign({}, state, { tax_rate: "16", total_tax: 0 });
            break;
        case "CALCULATETOTALTAX":
            state = __assign({}, state, { tax_rate: "16", total_tax: 0 });
            break;
        default:
            return state;
    }
    return state;
};
exports.default = Tax;
//# sourceMappingURL=tax.js.map
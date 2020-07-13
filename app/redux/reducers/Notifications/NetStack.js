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
var StackNotify = function (state, action) {
    if (state === void 0) { state = {
        open: false,
        type: "",
        message: "",
        vertical: "",
        horizontal: "",
        variant: "",
        data: [],
    }; }
    switch (action.type) {
        case "SHOWNOTIFICATION":
            state = __assign({}, state, { open: true, type: action.type, message: action.message, vertical: action.vertical, horizontal: action.horizontal, variant: action.variant, data: action.data });
            break;
        case "DISMISS":
            state = __assign({}, state, { open: false, vertical: "", horizontal: "", variant: "", type: "", message: "", data: [] });
            break;
        default:
            break;
    }
    return state;
};
exports.default = StackNotify;
//# sourceMappingURL=NetStack.js.map
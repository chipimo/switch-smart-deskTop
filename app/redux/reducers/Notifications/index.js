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
require("./NativeNotification");
var Notify = function (state, action) {
    if (state === void 0) { state = {
        show: false,
        type: "",
        title: "",
        message: "",
        state: "",
        detail: "",
        data: {},
    }; }
    switch (action.type) {
        case "SHOW_NETIVE_NOTIFICATION":
            state = __assign({}, state, { show: true, type: action.payload.type, title: action.payload.title, message: action.payload.message, state: action.payload.state, detail: action.payload.detail, data: action.payload.data });
            break;
        case "DISMISS_NETIVE_NOTIFY":
            state = __assign({}, state, { show: false, type: "", title: "", message: "", state: "", detail: "", data: {} });
            break;
        default:
            break;
    }
    return state;
};
exports.default = Notify;
//# sourceMappingURL=index.js.map
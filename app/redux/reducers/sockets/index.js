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
var SocketConn = function (state, action) {
    if (state === void 0) { state = {
        isConn: false,
        socket: {}
    }; }
    switch (action.type) {
        case "CONNECTED":
            state = __assign({}, state, { isConn: true, socket: action.socket });
            break;
        case "CONNCETIONFAILED":
            state = __assign({}, state, { isConn: false, socket: {} });
            break;
        default:
            return state;
    }
    return state;
};
exports.default = SocketConn;
//# sourceMappingURL=index.js.map
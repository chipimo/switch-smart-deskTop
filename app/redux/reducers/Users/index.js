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
var User = function (state, action) {
    if (state === void 0) { state = {
        isLoggedIn: false,
        userLogged: {},
    }; }
    switch (action.type) {
        case "LOGIN":
            state = __assign({}, state, { isLoggedIn: true, userLogged: action.userLogged });
            break;
        case "LOGOUT":
            state = __assign({}, state, { isLoggedIn: false, userLogged: {} });
            break;
        default:
            return state;
    }
    return state;
};
exports.default = User;
//# sourceMappingURL=index.js.map
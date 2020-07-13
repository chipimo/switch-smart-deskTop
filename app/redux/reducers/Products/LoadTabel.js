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
var LoadTabel = function (state, action) {
    if (state === void 0) { state = {
        load: false
    }; }
    switch (action.type) {
        case "LOADTABEL":
            state = __assign({}, state, { load: true });
            break;
        case "CLEARLOADTABEL":
            state = __assign({}, state, { load: false });
            break;
        default:
            return state;
    }
    return state;
};
exports.default = LoadTabel;
//# sourceMappingURL=LoadTabel.js.map
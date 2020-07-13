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
var Model = function (state, action) {
    if (state === void 0) { state = {
        toClose: "",
    }; }
    switch (action.type) {
        case "HANDELCLOSE":
            state = __assign({}, state, { toClose: action.toClose });
            break;
        case "HANDELCLEAR":
            state = __assign({}, state, { toClose: "" });
            break;
        default:
            return state;
    }
    return state;
};
exports.default = Model;
//# sourceMappingURL=index.js.map
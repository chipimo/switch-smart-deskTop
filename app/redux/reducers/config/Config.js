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
var Config = function (state, action) {
    if (state === void 0) { state = {
        isSet: false,
        config: {}
    }; }
    switch (action.type) {
        case "SETCONFIG":
            state = __assign({}, state, { isSet: action.isSet, config: action.config });
            break;
        case "RESTCONFIG":
            state = __assign({}, state, { isSet: false, config: {} });
            break;
        default:
            return state;
    }
    return state;
};
exports.default = Config;
//# sourceMappingURL=Config.js.map
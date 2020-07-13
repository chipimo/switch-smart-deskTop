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
var ProductSync = function (state, action) {
    if (state === void 0) { state = {
        load: false,
        item: "",
    }; }
    switch (action.type) {
        case "SYNC":
            state = __assign({}, state, { load: true, item: action.item });
            break;
        case "STOPSYNC":
            state = __assign({}, state, { load: false, item: "" });
            break;
        default:
            return state;
    }
    return state;
};
exports.default = ProductSync;
//# sourceMappingURL=productSync.js.map
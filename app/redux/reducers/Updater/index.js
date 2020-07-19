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
var Updater = function (state, action) {
    if (state === void 0) { state = {
        isDone: true,
        product: "",
    }; }
    switch (action.type) {
        case "UPDATINGSERVER":
            state = __assign({}, state, { isDone: false, product: action.product });
            break;
        case "UPDATINGSERVERDONE":
            state = __assign({}, state, { isDone: true, product: action.product });
            break;
        default:
            return state;
    }
    return state;
};
exports.default = Updater;
//# sourceMappingURL=index.js.map
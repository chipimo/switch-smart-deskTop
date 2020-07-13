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
var ProductList = function (state, action) {
    if (state === void 0) { state = {
        list: []
    }; }
    switch (action.type) {
        case "ProductList":
            state = __assign({}, state, { list: action.list });
            break;
        case "CLEARPRODUCTTABEL":
            state = __assign({}, state, { list: [] });
            break;
        default:
            return state;
    }
    return state;
};
exports.default = ProductList;
//# sourceMappingURL=productList.js.map
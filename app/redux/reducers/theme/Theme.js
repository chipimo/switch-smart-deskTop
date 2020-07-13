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
var dataBase_1 = require("../../dataBase");
var Theme = function (state, action) {
    if (state === void 0) { state = {
        theme: "light",
    }; }
    switch (action.type) {
        case "setTheme":
            dataBase_1.default.HandleTheme({ _type: "setTheme", theme: action.setTheme }, function (callback) { });
            state = __assign({}, state, { theme: action.setTheme });
            break;
        case "Theme":
            state = __assign({}, state, { theme: action.setTheme });
            break;
        case "resetTheme":
            state = __assign({}, state, { theme: "light" });
            break;
        default:
            return state;
    }
    return state;
};
exports.default = Theme;
//# sourceMappingURL=Theme.js.map
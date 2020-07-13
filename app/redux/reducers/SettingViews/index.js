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
var SettingViews = function (state, action) {
    if (state === void 0) { state = {
        view: null,
        title: "",
    }; }
    switch (action.type) {
        case "CHANGEVIEW":
            // console.log(action.socket);
            state = __assign({}, state, { view: action.view, title: action.title });
            break;
        default:
            return state;
    }
    return state;
};
exports.default = SettingViews;
//# sourceMappingURL=index.js.map